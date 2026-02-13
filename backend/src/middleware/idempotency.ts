
import { Response, NextFunction } from 'express';
import { pool } from '../database/db';
import { AuthRequest } from './authMiddleware';

export const idempotency = async (req: AuthRequest, res: any, next: NextFunction) => {
    const key = req.headers['idempotency-key'] as string;
    
    // Only apply to mutating methods
    if (!['POST', 'PUT', 'PATCH'].includes(req.method) || !key) {
        return next();
    }

    const client = await pool.connect();
    try {
        const result = await client.query(
            'SELECT response_code, response_body FROM idempotency_keys WHERE key = $1 AND merchant_id = $2',
            [key, req.merchantId]
        );

        if (result.rows.length > 0) {
            const cached = result.rows[0];
            return res.status(cached.response_code).json(cached.response_body);
        }

        // Hook into response.json to save the result
        const originalJson = res.json;
        res.json = function (body: any) {
            client.query(
                'INSERT INTO idempotency_keys (key, merchant_id, path, params, response_code, response_body) VALUES ($1, $2, $3, $4, $5, $6)',
                [key, req.merchantId, req.path, JSON.stringify(req.body), res.statusCode, JSON.stringify(body)]
            ).catch(err => console.error('Idempotency save failed', err));

            return originalJson.call(this, body);
        };

        next();
    } catch (err) {
        next(err);
    } finally {
        client.release();
    }
};
