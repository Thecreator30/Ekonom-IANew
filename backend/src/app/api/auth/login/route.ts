import { NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';
import { checkRateLimit } from '@/utils/rateLimit';

export async function POST(request: Request) {
    try {
        const ip = request.headers.get('x-forwarded-for') || 'unknown';
        const { allowed, retryAfterMs } = checkRateLimit(`login:${ip}`);
        if (!allowed) {
            return NextResponse.json(
                { error: 'Too many login attempts. Please try again later.' },
                { status: 429, headers: { 'Retry-After': String(Math.ceil((retryAfterMs || 60000) / 1000)) } }
            );
        }

        const body = await request.json();
        const result = await AuthService.login(body);
        return NextResponse.json({ success: true, data: { accessToken: result.accessToken, refreshToken: result.refreshToken, merchant: result.merchant } });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 401 });
    }
}
