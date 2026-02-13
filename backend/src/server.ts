import express, { RequestHandler } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authRoutes } from './routes/auth';
import { promoRoutes } from './routes/promotions';
import { aiRoutes } from './routes/ai';
import { welcomeOfferRoutes } from './routes/welcomeOffer';
import { errorHandler } from './middleware/error';
import { env } from './config/env';

const app = express();

// Security Middleware
app.use(helmet() as any);
app.use(cors({
    origin: env.FRONTEND_URL,
    credentials: true, // Allow cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}) as any);
app.use(express.json({ limit: '100kb' }) as any); // Prevent large payloads
app.use(cookieParser() as any);

// Health Check
app.get('/health', (_, res) => res.json({ status: 'ok', version: '1.0.0' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/promotions', promoRoutes);
app.use('/api/welcome-offer', welcomeOfferRoutes);
app.use('/api/eko', aiRoutes);

// Global Error Handler
app.use(errorHandler);

const PORT = env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 EKONOM-IA Backend running on port ${PORT}`);
});