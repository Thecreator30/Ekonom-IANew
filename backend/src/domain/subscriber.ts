
export interface Subscriber {
    id: string;
    merchant_id: string;
    phone_number?: string | null;
    push_token?: string | null;
    push_enabled: boolean;
    join_date: Date;
    last_active_at: Date;
}

export interface SubscriberCreateDTO {
    phone_number?: string;
    push_token?: string;
}

export interface SubscriberUpdateDTO {
    push_enabled?: boolean;
    last_active_at?: Date;
}
