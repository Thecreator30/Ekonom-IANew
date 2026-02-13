
import { prisma } from '../infrastructure/db';

export class MetricsService {
    static async getDashboardStats(merchantId: string) {
        const [
            activePromotions,
            totalSubscribers,
            aiUsage,
            recentActivity
        ] = await Promise.all([
            // 1. Active Promotions Count
            prisma.promotion.count({
                where: {
                    merchant_id: merchantId,
                    status: 'PUBLISHED'
                }
            }),

            // 2. Total Subscribers Count
            prisma.subscriber.count({
                where: {
                    merchant_id: merchantId
                }
            }),

            // 3. AI Usage (Mocked for now, or count logs with action 'GENERATE_AI')
            prisma.auditLog.count({
                where: {
                    merchant_id: merchantId,
                    action: 'GENERATE_AI_CONTENT'
                }
            }),

            // 4. Recent Activity (Audit Logs)
            prisma.auditLog.findMany({
                where: {
                    merchant_id: merchantId
                },
                orderBy: {
                    created_at: 'desc'
                },
                take: 5,
                select: {
                    action: true,
                    created_at: true,
                    severity: true,
                    metadata: true
                }
            })
        ]);

        return {
            activePromotions,
            totalSubscribers,
            aiUsage,
            recentActivity
        };
    }
}
