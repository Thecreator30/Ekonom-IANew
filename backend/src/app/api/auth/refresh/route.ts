import { NextResponse } from 'next/server';
import { prisma } from '@/infrastructure/db';
import { signAccessToken } from '@/utils/token';
import { createHash, randomBytes } from 'crypto';

const hashToken = (token: string): string =>
    createHash('sha256').update(token).digest('hex');

export async function POST(request: Request) {
    try {
        const { refreshToken } = await request.json();
        if (!refreshToken) {
            return NextResponse.json({ success: false, message: 'Refresh token required' }, { status: 400 });
        }

        const tokenHash = hashToken(refreshToken);

        // Find valid, non-revoked refresh token
        const stored = await prisma.refreshToken.findUnique({ where: { token_hash: tokenHash } });
        if (!stored || stored.revoked || stored.expires_at < new Date()) {
            return NextResponse.json({ success: false, message: 'Invalid or expired refresh token' }, { status: 401 });
        }

        // Get merchant
        const merchant = await prisma.merchant.findUnique({ where: { id: stored.merchant_id } });
        if (!merchant) {
            return NextResponse.json({ success: false, message: 'Merchant not found' }, { status: 401 });
        }

        // Revoke old token (rotation)
        const newRefreshTokenString = randomBytes(40).toString('hex');
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        await prisma.$transaction([
            prisma.refreshToken.update({
                where: { id: stored.id },
                data: { revoked: true, replaced_by: hashToken(newRefreshTokenString) }
            }),
            prisma.refreshToken.create({
                data: {
                    token_hash: hashToken(newRefreshTokenString),
                    merchant_id: merchant.id,
                    expires_at: expiresAt,
                    revoked: false
                }
            })
        ]);

        const accessToken = signAccessToken({
            sub: merchant.id,
            email: merchant.email,
            role: 'MERCHANT',
            merchant_id: merchant.id,
        });

        return NextResponse.json({
            success: true,
            data: {
                accessToken,
                refreshToken: newRefreshTokenString,
                merchant: {
                    id: merchant.id,
                    email: merchant.email,
                    company_name: merchant.company_name,
                    subscription_plan: merchant.subscription_plan,
                }
            }
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
