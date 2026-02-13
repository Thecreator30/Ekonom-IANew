export type PromotionStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface Promotion {
    id: string;
    merchant_id: string;
    title: string;
    description: string;
    discount_value?: string;
    status: PromotionStatus;
    target_segment?: string;
    scheduled_at?: Date;
    published_at?: Date;
    archived_at?: Date;
    created_at: Date;
    updated_at: Date;
}

export interface PromotionCreateDTO {
    title: string;
    description: string;
    discount_value?: string;
    target_segment?: string;
    scheduled_at?: Date;
}

export interface PromotionUpdateDTO {
    title?: string;
    description?: string;
    discount_value?: string;
    status?: PromotionStatus;
}
