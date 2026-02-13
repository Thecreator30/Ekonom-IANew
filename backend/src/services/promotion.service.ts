import { prisma } from '../infrastructure/db';
import { AuditService } from './audit.service';
import { PromotionCreateDTO, PromotionUpdateDTO } from '../domain/promotion';

export class PromotionService {
    static async create(merchantId: string, data: PromotionCreateDTO) {
        const promotion = await prisma.promotion.create({
            data: {
                merchant_id: merchantId,
                title: data.title,
                description: data.description,
                discount_value: data.discount_value,
                target_segment: data.target_segment,
                scheduled_at: data.scheduled_at,
                status: 'DRAFT',
            },
        });

        await AuditService.log({
            merchant_id: merchantId,
            action: 'CREATE_PROMOTION',
            severity: 'INFO',
            metadata: { promotion_id: promotion.id, title: promotion.title },
        });

        return promotion;
    }

    static async list(merchantId: string) {
        return prisma.promotion.findMany({
            where: { merchant_id: merchantId },
            orderBy: { created_at: 'desc' },
        });
    }

    static async publish(merchantId: string, promotionId: string) {
        const promotion = await prisma.promotion.findUnique({
            where: { id: promotionId, merchant_id: merchantId },
        });

        if (!promotion) throw new Error('Promotion not found');
        if (promotion.status === 'PUBLISHED') return promotion; // Idempotent
        if (promotion.status === 'ARCHIVED') throw new Error('Cannot publish archived promotion');

        const updated = await prisma.promotion.update({
            where: { id: promotionId },
            data: {
                status: 'PUBLISHED',
                published_at: new Date(),
            },
        });

        // In a real system, we would trigger the PushJob here
        // await PushService.createJob(...)

        await AuditService.log({
            merchant_id: merchantId,
            action: 'PUBLISH_PROMOTION',
            severity: 'HIGH', // High severity because it triggers notifications
            metadata: { promotion_id: promotion.id },
        });

        return updated;
    }
}
