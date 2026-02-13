import { NextResponse } from 'next/server';
import { PushNotificationService } from '@/services/push.service';
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

export async function POST(request: Request) {
    try {
        const merchantId = getMerchant(request);
        const body = await request.json();

        // Validate body
        if (!body.title || !body.body) {
            return NextResponse.json({ error: "Title and body are required" }, { status: 400 });
        }

        const result = await PushNotificationService.scheduleCampaign(
            merchantId,
            body.title,
            body.body,
            body.segment
        );

        return NextResponse.json(result);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
