
import { prisma } from '../infrastructure/db';
import { SubscriberCreateDTO, SubscriberUpdateDTO } from '../domain/subscriber';

export class SubscriberService {
    static async findOrCreate(merchantId: string, data: SubscriberCreateDTO) {
        // Simple logic: if push_token exists, try to find by it.
        // In a real app, we might use phone number or a device fingerprint.

        let subscriber;

        if (data.push_token) {
            subscriber = await prisma.subscriber.findFirst({
                where: {
                    merchant_id: merchantId,
                    push_token: data.push_token
                }
            });
        }

        if (!subscriber) {
            subscriber = await prisma.subscriber.create({
                data: {
                    merchant_id: merchantId,
                    push_token: data.push_token,
                    phone_number: data.phone_number,
                    push_enabled: true,
                }
            });
        } else {
            // Update last active
            await prisma.subscriber.update({
                where: { id: subscriber.id },
                data: { last_active_at: new Date() }
            });
        }

        return subscriber;
    }

    static async list(merchantId: string) {
        return prisma.subscriber.findMany({
            where: { merchant_id: merchantId },
            orderBy: { last_active_at: 'desc' }
        });
    }

    static async update(id: string, data: SubscriberUpdateDTO) {
        return prisma.subscriber.update({
            where: { id },
            data
        });
    }
}
