import { prisma } from '../infrastructure/db';

export class AuditService {
    static async log(data: {
        merchant_id: string;
        action: string;
        severity?: 'INFO' | 'WARNING' | 'HIGH' | 'CRITICAL';
        ip_address?: string;
        user_agent?: string;
        metadata?: any;
    }) {
        await prisma.auditLog.create({
            data: {
                merchant_id: data.merchant_id,
                action: data.action,
                severity: data.severity || 'INFO',
                ip_address: data.ip_address,
                user_agent: data.user_agent,
                metadata: data.metadata ? JSON.stringify(data.metadata) : undefined,
            },
        });
    }
}
