import { prisma } from '../infrastructure/db';
import { AuditService } from './audit.service';

export class PushNotificationService {
    private static readonly DAILY_LIMIT = 3;

    static async scheduleCampaign(merchantId: string, title: string, body: string, segment: string = 'ALL') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const count = await prisma.pushJob.count({
            where: {
                merchant_id: merchantId,
                created_at: { gte: today },
            },
        });

        if (count >= this.DAILY_LIMIT) {
            throw new Error(`Daily push limit reached (${this.DAILY_LIMIT}/day). Upgrade your plan for more.`);
        }

        const job = await prisma.pushJob.create({
            data: {
                merchant_id: merchantId,
                title,
                body,
                target_segment: segment,
                status: 'PENDING',
                scheduled_at: new Date(),
            },
        });

        await AuditService.log({
            merchant_id: merchantId,
            action: 'SCHEDULE_PUSH',
            severity: 'HIGH',
            metadata: { job_id: job.id, segment },
        });

        // Process immediately (in production, use a queue worker)
        this.processPendingJobs().catch(console.error);

        return job;
    }

    static async processPendingJobs() {
        const jobs = await prisma.pushJob.findMany({
            where: { status: 'PENDING' },
            take: 5,
        });

        const results = [];

        for (const job of jobs) {
            try {
                await prisma.pushJob.update({
                    where: { id: job.id },
                    data: { status: 'PROCESSING' },
                });

                const subscribers = await prisma.subscriber.findMany({
                    where: {
                        merchant_id: job.merchant_id,
                        push_enabled: true,
                        push_token: { not: null },
                    },
                    select: { push_token: true },
                });

                const tokens = subscribers
                    .map(s => s.push_token)
                    .filter((t): t is string => t !== null);

                let successCount = 0;
                let failureCount = 0;

                if (tokens.length > 0) {
                    const result = await this.sendExpoPush(tokens, job.title, job.body);
                    if (result.data) {
                        for (const ticket of result.data) {
                            if (ticket.status === 'ok') successCount++;
                            else failureCount++;
                        }
                    }
                }

                const completed = await prisma.pushJob.update({
                    where: { id: job.id },
                    data: {
                        status: 'COMPLETED',
                        sent_at: new Date(),
                        success_count: successCount,
                        failure_count: failureCount,
                        processed_at: new Date(),
                    },
                });
                results.push(completed);
            } catch (error) {
                console.error(`Push job ${job.id} failed:`, error);
                await prisma.pushJob.update({
                    where: { id: job.id },
                    data: { status: 'FAILED', attempt_count: { increment: 1 } },
                });
            }
        }

        return results;
    }

    private static async sendExpoPush(tokens: string[], title: string, body: string) {
        const messages = tokens.map(token => ({
            to: token,
            sound: 'default' as const,
            title,
            body,
        }));

        const response = await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Accept-encoding': 'gzip, deflate',
            },
            body: JSON.stringify(messages),
        });

        if (!response.ok) {
            throw new Error(`Expo Push API error: ${response.status}`);
        }

        return response.json();
    }
}
