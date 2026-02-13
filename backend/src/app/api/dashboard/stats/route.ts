
import { NextRequest, NextResponse } from 'next/server';
import { MetricsService } from '../../../../services/metrics.service';
import { verifyJwt } from '../../../../utils/token';

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get('authorization');
        if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const payload = verifyJwt(authHeader.split(' ')[1]);
        const stats = await MetricsService.getDashboardStats(payload.merchant_id);

        return NextResponse.json(stats);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
