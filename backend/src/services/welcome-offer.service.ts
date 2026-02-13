import { createHmac, randomBytes } from 'crypto';
import { WelcomeOfferPayload, SignedWelcomeOffer } from '../domain/welcome-offer';

const HMAC_SECRET = process.env.QR_HMAC_SECRET || 'dev-hmac-secret';

export class WelcomeOfferService {
    static generate(merchantId: string): SignedWelcomeOffer {
        const payload: WelcomeOfferPayload = {
            merchant_id: merchantId,
            type: 'WELCOME_OFFER',
            timestamp: Date.now(),
            nonce: randomBytes(8).toString('hex'),
        };

        const payloadString = Buffer.from(JSON.stringify(payload)).toString('base64');

        // Sign the payload
        const signature = createHmac('sha256', HMAC_SECRET)
            .update(payloadString)
            .digest('hex');

        // Create the deep link or raw data string for the QR code
        // Format: ekonom-ia://welcome?v=1&p={payload}&s={signature}
        const qr_data = `ekonom-ia://welcome?v=1&p=${payloadString}&s=${signature}`;

        return {
            payload: payloadString,
            signature,
            qr_data
        };
    }

    static verify(payloadString: string, signature: string): boolean {
        const expectedSignature = createHmac('sha256', HMAC_SECRET)
            .update(payloadString)
            .digest('hex');

        return signature === expectedSignature;
    }
}
