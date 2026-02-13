import { NextResponse } from 'next/server';
import { PushNotificationService } from '@/services/push.service';

// This endpoint would be called by a cron job (e.g. Vercel Cron)
export async function GET(request: Request) {
    try {
        // In production, verify a CRON_SECRET header here
        const results = await PushNotificationService.processPendingJobs();
        return NextResponse.json({ processed: results.length, jobs: results });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
