export interface User {
    id: string;
    email: string;
    role: 'MERCHANT' | 'ADMIN';
    merchant_id: string;
}

export interface JWTPayload {
    sub: string; // user_id / merchant_id
    email: string;
    role: string;
    iat: number;
    exp: number;
}

export interface RefreshToken {
    token_hash: string;
    expires_at: Date;
    revoked: boolean;
    device_id?: string;
}
