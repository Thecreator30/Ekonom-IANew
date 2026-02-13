
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { pool } from '../database/db';

export interface AuthRequest extends Request {
    merchantId?: string;
    // Explicitly defining properties to avoid TS errors if Request type is not resolving correctly
    headers: any;
    body: any;
    ip: string;
    method: string;
    path: string;
    params: any;
    query: any;
}

export const authenticate = async (req: AuthRequest, res: any, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, error: 'Unauthorized: No Token' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string };
        req.merchantId = decoded.id;

        // CRITICAL: Set RLS context for this request's database interactions
        // In a real pool scenario, we must ensure this client is released or reset
        // For simplicity here, we assume the route handlers use a transaction client
        // where we perform `SET LOCAL app.current_merchant_id`.
        
        next();
    } catch (error) {
        return res.status(401).json({ success: false, error: 'Unauthorized: Invalid Token' });
    }
};
