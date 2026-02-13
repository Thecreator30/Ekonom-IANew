
import { Router, Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/authMiddleware';
import { idempotency } from '../middleware/idempotency';
import { pool } from '../database/db';
import { signQrCode } from '../services/qrService';

const router = Router();

// Create Promotion
router.post('/', authenticate, idempotency, async (req: AuthRequest, res: any) => {
    const { title, description, startDate, endDate } = req.body;
    
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        // ENFORCE RLS
        await client.query(`SET LOCAL app.current_merchant_id = '${req.merchantId}'`);

        const result = await client.query(
            `INSERT INTO promotions (merchant_id, title, description, start_date, end_date)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [req.merchantId, title, description, startDate, endDate]
        );

        // Log Audit
        await client.query(
            `INSERT INTO audit_logs (merchant_id, action, severity, ip_address)
             VALUES ($1, 'create_promotion', 'info', $2)`,
            [req.merchantId, req.ip]
        );

        await client.query('COMMIT');
        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (err) {
        await client.query('ROLLBACK');
        res.status(500).json({ success: false, error: 'Database transaction failed' });
    } finally {
        client.release();
    }
});

// Get Promotions List
router.get('/', authenticate, async (req: AuthRequest, res: any) => {
    const client = await pool.connect();
    try {
        await client.query(`SET LOCAL app.current_merchant_id = '${req.merchantId}'`);
        const result = await client.query('SELECT * FROM promotions WHERE deleted_at IS NULL ORDER BY created_at DESC');
        res.json({ success: true, data: result.rows });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Query failed' });
    } finally {
        client.release();
    }
});

// Get Single Promotion Details
router.get('/:id', authenticate, async (req: AuthRequest, res: any) => {
    const client = await pool.connect();
    try {
        await client.query(`SET LOCAL app.current_merchant_id = '${req.merchantId}'`);
        const result = await client.query('SELECT * FROM promotions WHERE id = $1 AND deleted_at IS NULL', [req.params.id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Promotion not found' });
        }

        res.json({ success: true, data: result.rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Query failed' });
    } finally {
        client.release();
    }
});

// Get Signed QR Token for a specific Promotion
router.get('/:id/qr', authenticate, async (req: AuthRequest, res: any) => {
    const client = await pool.connect();
    try {
        await client.query(`SET LOCAL app.current_merchant_id = '${req.merchantId}'`);
        
        // Verify existence
        const check = await client.query('SELECT id FROM promotions WHERE id = $1', [req.params.id]);
        if (check.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Promotion not found' });
        }

        // Generate Signed Token using HMAC service with type 'promo'
        const signedToken = signQrCode(req.merchantId!, req.params.id, 'promo');
        
        res.json({ success: true, token: signedToken });
    } catch (error) {
        console.error('QR Generation Error:', error);
        res.status(500).json({ success: false, error: 'Failed to generate QR' });
    } finally {
        client.release();
    }
});

export const promoRoutes = router;
