import { prisma } from '../infrastructure/db';
import { hashPassword, verifyPassword } from '../utils/hash';
import { signAccessToken, verifyToken as verifyJwt } from '../utils/token';
import { User } from '../domain/auth';
import { randomBytes, createHash } from 'crypto';

/** SHA-256 hash for refresh tokens before DB storage */
const hashRefreshToken = (token: string): string =>
    createHash('sha256').update(token).digest('hex');

export class AuthService {
    static async verifyToken(token: string) {
        const payload = verifyJwt(token);
        const merchant = await prisma.merchant.findUnique({
            where: { id: payload.sub },
        });
        if (!merchant) throw new Error('Merchant not found');
        return merchant;
    }

    static async register(data: { email: string; password: string; company_name: string }) {
        const existing = await prisma.merchant.findUnique({ where: { email: data.email } });
        if (existing) throw new Error('Email already registered');

        const hashedPassword = await hashPassword(data.password);

        const merchant = await prisma.merchant.create({
            data: {
                email: data.email,
                password_hash: hashedPassword,
                company_name: data.company_name,
            },
        });

        return this.generateTokens(merchant);
    }

    static async login(data: { email: string; password: string }) {
        const merchant = await prisma.merchant.findUnique({ where: { email: data.email } });
        if (!merchant) throw new Error('Invalid credentials');

        const isValid = await verifyPassword(data.password, merchant.password_hash);
        if (!isValid) throw new Error('Invalid credentials');

        return this.generateTokens(merchant);
    }

    private static async generateTokens(merchant: any) {
        const user: User = {
            id: merchant.id,
            email: merchant.email,
            role: 'MERCHANT',
            merchant_id: merchant.id,
        };

        const accessToken = signAccessToken({ ...user, sub: merchant.id });

        // Refresh Token (Rotation)
        const refreshTokenString = randomBytes(40).toString('hex');
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

        await prisma.refreshToken.create({
            data: {
                token_hash: hashRefreshToken(refreshTokenString),
                merchant_id: merchant.id,
                expires_at: expiresAt,
                revoked: false
            }
        });

        return {
            user,
            accessToken,
            refreshToken: refreshTokenString,
            merchant: {
                id: merchant.id,
                email: merchant.email,
                company_name: merchant.company_name,
                subscription_plan: merchant.subscription_plan,
            }
        };
    }
}
