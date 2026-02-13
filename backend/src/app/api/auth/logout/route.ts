import { NextResponse } from 'next/server';
import { prisma } from '@/infrastructure/db';
import { verifyToken } from '@/utils/token';
import { createHash } from 'crypto';

const hashToken = (token: string): string =>
    createHash('sha256').update(token).digest('hex');

export async function POST(request: Request) {
    try {
        // Optionally verify the access token
        const authHeader = request.headers.get('authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const payload = verifyToken(token);

        const body = await request.json().catch(() => ({}));

        // If a refresh token is provided, revoke it specifically
        if (body.refreshToken) {
            const tokenHash = hashToken(body.refreshToken);
            await prisma.refreshToken.updateMany({
                where: { token_hash: tokenHash, merchant_id: payload.sub },
                data: { revoked: true }
            });
        } else {
            // Revoke all refresh tokens for this merchant
            await prisma.refreshToken.updateMany({
                where: { merchant_id: payload.sub, revoked: false },
                data: { revoked: true }
            });
        }

        return NextResponse.json({ success: true, message: 'Logged out successfully' });
    } catch (error: any) {
        // Even if token is invalid, return success (user is already "logged out")
        return NextResponse.json({ success: true, message: 'Logged out' });
    }
}
