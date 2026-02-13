import crypto from 'crypto';
import { Buffer } from 'buffer';
import { env } from '../config/env';

export const signQrCode = (merchantId: string, offerId: string, type: 'welcome' | 'promo'): string => {
    const payload = `${merchantId}:${offerId}:${type}:${Date.now()}`;
    const signature = crypto
        .createHmac('sha256', env.HMAC_SECRET)
        .update(payload)
        .digest('hex');
    
    // Return a payload that the frontend can render into a QR
    // The device scans this, sends to backend, backend verifies signature
    return Buffer.from(JSON.stringify({ p: payload, s: signature })).toString('base64');
};

export const verifyQrCode = (token: string): boolean => {
    try {
        const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
        const { p, s } = decoded;
        
        const expectedSignature = crypto
            .createHmac('sha256', env.HMAC_SECRET)
            .update(p)
            .digest('hex');
            
        return s === expectedSignature;
    } catch {
        return false;
    }
};