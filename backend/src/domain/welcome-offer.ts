export interface WelcomeOfferPayload {
    merchant_id: string;
    type: 'WELCOME_OFFER';
    timestamp: number;
    nonce: string; // Random string to prevent replay/guessing
}

export interface SignedWelcomeOffer {
    payload: string; // Base64 encoded JSON
    signature: string; // HMAC-SHA256
    qr_data: string; // The full string to be encoded in QR: "ekonom-ia://offer?p=...&s=..."
}
