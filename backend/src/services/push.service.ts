import { prisma } from '../infrastructure/db';
import { AuditService } from './audit.service';

export class PushNotificationService {
    private static readonly DAILY_LIMIT = 3;

    static async scheduleCampaign(merchantId: string, title: string, body: string, segment: string = 'ALL') {
        // 1. Check Rate Limits
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

        // 2. Create Job
        const job = await prisma.pushJob.create({
            data: {
                merchant_id: merchantId,
                title,
                body,
                target_segment: segment,
                status: 'PENDING',
                scheduled_at: new Date(), // Immediate for now
            },
        });

        // 3. Audit
        await AuditService.log({
            merchant_id: merchantId,
            action: 'SCHEDULE_PUSH',
            severity: 'HIGH',
            metadata: { job_id: job.id, segment },
        });

        return job;
    }

    // Simulates a worker processing the queue
    static async processPendingJobs() {
        const jobs = await prisma.pushJob.findMany({
            where: { status: 'PENDING' },
            take: 5,
        });

        const results = [];

        for (const job of jobs) {
            try {
                // Update to PROCESSING
                await prisma.pushJob.update({ where: { id: job.id }, data: { status: 'PROCESSING' } });

                // Simulate Sending (e.g. call Expo Push API)
                await new Promise(resolve => setTimeout(resolve, 500));

                // Update to COMPLETED
                const completed = await prisma.pushJob.update({
                    where: { id: job.id },
                    data: {
                        status: 'COMPLETED',
                        sent_at: new Date(),
                        success_count: 1248, // Mock count
                        failure_count: 0
                    }
                });
                results.push(completed);
            } catch (error) {
                await prisma.pushJob.update({
                    where: { id: job.id },
                    data: { status: 'FAILED' }
                });
            }
        }

        return results;
    }
}
