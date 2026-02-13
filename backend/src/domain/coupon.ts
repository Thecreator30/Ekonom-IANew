export type CouponStatus = 'ACTIVE' | 'USED' | 'EXPIRED';

export interface Coupon {
    id: string;
    merchant_id: string;
    subscriber_id: string;
    code: string;
    discount_value: string;
    status: CouponStatus;
    expires_at: Date;
    redeemed_at?: Date;
    created_at: Date;
}

export interface CouponRedeemDTO {
    code: string;
    merchant_id: string;
}

export interface WelcomeOfferPayload {
    merchant_id: string;
    offer_code: string;
    timestamp: number;
}
