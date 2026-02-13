import dotenv from 'dotenv';
dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';
const isProd = NODE_ENV === 'production';

export const env = {
    PORT: process.env.PORT || 3000,
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
    DATABASE_URL: process.env.DATABASE_URL!,
    JWT_SECRET: process.env.JWT_SECRET || (isProd ? '' : 'dev_secret_do_not_use_in_prod'),
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || (isProd ? '' : 'dev_refresh_secret'),
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    HMAC_SECRET: process.env.HMAC_SECRET || (isProd ? '' : 'qr_signing_secret'),
    CRON_SECRET: process.env.CRON_SECRET || (isProd ? '' : 'dev_cron_secret'),
    NODE_ENV,
};

if (!env.DATABASE_URL) {
    throw new Error('DATABASE_URL is missing in environment variables');
}

if (isProd) {
    const required = ['JWT_SECRET', 'JWT_REFRESH_SECRET', 'HMAC_SECRET', 'CRON_SECRET'] as const;
    for (const key of required) {
        if (!env[key]) throw new Error(`${key} must be set in production`);
    }
}