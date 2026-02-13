import dotenv from 'dotenv';
dotenv.config();

export const env = {
    PORT: process.env.PORT || 3000,
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
    DATABASE_URL: process.env.DATABASE_URL!,
    JWT_SECRET: process.env.JWT_SECRET || 'dev_secret_do_not_use_in_prod',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'dev_refresh_secret',
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    HMAC_SECRET: process.env.HMAC_SECRET || 'qr_signing_secret',
    NODE_ENV: process.env.NODE_ENV || 'development'
};

if (!env.DATABASE_URL) {
    throw new Error('DATABASE_URL is missing in environment variables');
}