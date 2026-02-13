
import { prisma } from '../infrastructure/db';
import { hashPassword, verifyPassword } from '../utils/hash';
import { AuditService } from './audit.service';

export class MerchantService {
    static async getProfile(merchantId: string) {
        return prisma.merchant.findUnique({
            where: { id: merchantId },
            select: {
                id: true,
                email: true,
                company_name: true,
                subscription_plan: true,
                created_at: true
            }
        });
    }

    static async updateProfile(merchantId: string, data: { company_name?: string }) {
        const updated = await prisma.merchant.update({
            where: { id: merchantId },
            data: {
                company_name: data.company_name
            }
        });

        await AuditService.log({
            merchant_id: merchantId,
            action: 'UPDATE_PROFILE',
            severity: 'INFO',
            metadata: { fields: Object.keys(data) }
        });

        return updated;
    }

    static async getSecurityLogs(merchantId: string) {
        return prisma.auditLog.findMany({
            where: { merchant_id: merchantId },
            orderBy: { created_at: 'desc' },
            take: 20
        });
    }
}
