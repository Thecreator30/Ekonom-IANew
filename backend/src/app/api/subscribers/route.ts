
import { NextRequest, NextResponse } from 'next/server';
import { SubscriberService } from '../../../services/subscriber.service';
import { verifyJwt } from '../../../utils/token';

export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get('authorization');
        if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const payload = verifyJwt(authHeader.split(' ')[1]);
        const body = await req.json();

        // payload.merchant_id from JWT
        const subscriber = await SubscriberService.findOrCreate(payload.merchant_id, body);
        return NextResponse.json(subscriber);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get('authorization');
        if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const payload = verifyJwt(authHeader.split(' ')[1]);
        const subscribers = await SubscriberService.list(payload.merchant_id);

        return NextResponse.json(subscribers);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
