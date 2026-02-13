import { NextResponse } from 'next/server';
import { PushNotificationService } from '@/services/push.service';
import { env } from '@/config/env';

// This endpoint is called by a cron job (e.g. Vercel Cron)
export async function GET(request: Request) {
    try {
        // Verify CRON_SECRET to prevent unauthorized access
        const authHeader = request.headers.get('authorization');
        if (authHeader !== `Bearer ${env.CRON_SECRET}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const results = await PushNotificationService.processPendingJobs();
        return NextResponse.json({ processed: results.length, jobs: results });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
