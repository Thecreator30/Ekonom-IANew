
import { NextRequest, NextResponse } from 'next/server';
import { CouponService } from '../../../../services/coupon.service';
import { verifyJwt } from '../../../../utils/token';

export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get('authorization');
        if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const payload = verifyJwt(authHeader.split(' ')[1]);
        const body = await req.json();

        // Expects: subscriberId, discountValue
        const coupon = await CouponService.issue(payload.merchant_id, body.subscriberId, body.discountValue);

        return NextResponse.json(coupon);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
