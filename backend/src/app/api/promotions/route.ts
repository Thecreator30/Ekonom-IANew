import { NextResponse } from 'next/server';
import { PromotionService } from '@/services/promotion.service';
import { verifyToken } from '@/utils/token';

// Middleware helper (simplified)
const getMerchant = (req: Request) => {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('Unauthorized');
    }
    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);
    return payload.sub; // merchant_id
};

export async function POST(request: Request) {
    try {
        const merchantId = getMerchant(request);
        const body = await request.json();
        const result = await PromotionService.create(merchantId, body);
        return NextResponse.json(result);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 401 });
    }
}

export async function GET(request: Request) {
    try {
        const merchantId = getMerchant(request);
        const result = await PromotionService.list(merchantId);
        return NextResponse.json(result);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 401 });
    }
}
