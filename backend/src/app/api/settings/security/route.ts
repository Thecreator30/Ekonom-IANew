
import { NextRequest, NextResponse } from 'next/server';
import { MerchantService } from '../../../../services/merchant.service';
import { verifyJwt } from '../../../../utils/token';

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get('authorization');
        if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const payload = verifyJwt(authHeader.split(' ')[1]);
        const logs = await MerchantService.getSecurityLogs(payload.merchant_id);

        return NextResponse.json(logs);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
