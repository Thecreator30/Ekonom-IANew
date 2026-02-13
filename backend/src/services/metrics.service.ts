
import { prisma } from '../infrastructure/db';

export class MetricsService {
    static async getDashboardStats(merchantId: string) {
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastMonthFirstDay = new Date(now.getFullYear(), now.getMonth() - 1, 1);

        const [
            totalSubscribers,
            newSubscribers,
            lastMonthSubscribers,
            activeCoupons,
            redeemedCoupons
        ] = await Promise.all([
            // 1. Total Subscribers
            prisma.subscriber.count({
                where: { merchant_id: merchantId }
            }),

            // 2. New Subscribers (This Month)
            prisma.subscriber.count({
                where: {
                    merchant_id: merchantId,
                    join_date: { gte: firstDayOfMonth }
                }
            }),

            // 3. Last Month Subscribers (For Growth Calc)
            prisma.subscriber.count({
                where: {
                    merchant_id: merchantId,
                    join_date: {
                        gte: lastMonthFirstDay,
                        lt: firstDayOfMonth
                    }
                }
            }),

            // 4. Active Coupons
            prisma.coupon.count({
                where: {
                    merchant_id: merchantId,
                    status: 'ACTIVE'
                }
            }),

            // 5. Redeemed Coupons (For Revenue Est.)
            prisma.coupon.count({
                where: {
                    merchant_id: merchantId,
                    status: 'USED' // Assuming 'USED' or 'REDEEMED' based on schema
                }
            })
        ]);

        // Revenue Estimation (e.g., Average Basket Size = 55€)
        // In a real app, this would come from a Transaction table.
        const AVG_BASKET_SIZE = 55;
        const revenue = redeemedCoupons * AVG_BASKET_SIZE;

        // Growth Calculation (New Subscribers vs Last Month)
        // Avoid division by zero
        const growth = lastMonthSubscribers > 0
            ? Math.round(((newSubscribers - lastMonthSubscribers) / lastMonthSubscribers) * 100)
            : (newSubscribers > 0 ? 100 : 0);

        return {
            totalSubscribers,
            newSubscribers,
            activeCoupons,
            revenue,
            growth
        };
    }
}
