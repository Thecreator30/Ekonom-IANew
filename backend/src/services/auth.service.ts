import { prisma } from '../infrastructure/db';
import { hashPassword, verifyPassword } from '../utils/hash';
import { signAccessToken } from '../utils/token';
import { User } from '../domain/auth';
import { randomBytes } from 'crypto';

export class AuthService {
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
                token_hash: refreshTokenString, // In prod, hash this too!
                merchant_id: merchant.id,
                expires_at: expiresAt,
                revoked: false
            }
        });

        return { user, accessToken, refreshToken: refreshTokenString };
    }
}
