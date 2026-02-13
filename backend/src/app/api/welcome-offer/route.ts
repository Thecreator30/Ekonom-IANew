import { NextResponse } from 'next/server';
import { WelcomeOfferService } from '@/services/welcome-offer.service';
import { verifyToken } from '@/utils/token';

const getMerchant = (req: Request) => {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('Unauthorized');
    }
    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);
    return payload.sub;
};

export async function GET(request: Request) {
    try {
        const merchantId = getMerchant(request);
        const result = WelcomeOfferService.generate(merchantId);
        return NextResponse.json(result);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 401 });
    }
}
