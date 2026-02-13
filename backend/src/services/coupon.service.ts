
import { prisma } from '../infrastructure/db';
import { AuditService } from './audit.service';
import { randomBytes } from 'crypto';

export class CouponService {
    // Generate a unique, readable code (e.g. SAVE-ABCD-1234)
    private static generateCode(): string {
        return 'CPN-' + randomBytes(3).toString('hex').toUpperCase();
    }

    static async issue(merchantId: string, subscriberId: string, discountValue: string, daysValid: number = 30) {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + daysValid);

        const coupon = await prisma.coupon.create({
            data: {
                merchant_id: merchantId,
                subscriber_id: subscriberId,
                code: this.generateCode(),
                discount_value: discountValue,
                status: 'ACTIVE',
                expires_at: expiresAt,
            }
        });

        await AuditService.log({
            merchant_id: merchantId,
            action: 'ISSUE_COUPON',
            severity: 'INFO',
            metadata: { coupon_id: coupon.id, subscriber_id: subscriberId }
        });

        return coupon;
    }

    static async validate(merchantId: string, code: string) {
        const coupon = await prisma.coupon.findFirst({
            where: {
                merchant_id: merchantId,
                code: code
            },
            include: { subscriber: true }
        });

        if (!coupon) throw new Error('Invalid coupon code');
        if (coupon.status === 'USED') throw new Error('Coupon already used');
        if (coupon.status === 'EXPIRED' || new Date() > coupon.expires_at) throw new Error('Coupon expired');

        return coupon;
    }

    static async redeem(merchantId: string, code: string) {
        // First validate
        const coupon = await this.validate(merchantId, code);

        const redeemed = await prisma.coupon.update({
            where: { id: coupon.id },
            data: {
                status: 'USED',
                redeemed_at: new Date()
            }
        });

        await AuditService.log({
            merchant_id: merchantId,
            action: 'REDEEM_COUPON',
            severity: 'INFO',
            metadata: { coupon_id: coupon.id, code: code }
        });

        return redeemed;
    }
}
