
import { Router, Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/authMiddleware';
import { pool } from '../database/db';
import { signQrCode } from '../services/qrService';

const router = Router();

// GET /api/welcome-offer
// Fetch configuration for the welcome offer
router.get('/', authenticate, async (req: AuthRequest, res: any) => {
    const client = await pool.connect();
    try {
        await client.query("SELECT set_config('app.current_merchant_id', $1, true)", [req.merchantId]);
        
        let result = await client.query('SELECT * FROM welcome_offers WHERE merchant_id = $1', [req.merchantId]);
        
        if (result.rows.length === 0) {
            // Auto-create default offer if missing
            result = await client.query(
                `INSERT INTO welcome_offers (merchant_id, discount_value, discount_type, is_active)
                 VALUES ($1, 10, 'percent', true)
                 RETURNING *`,
                [req.merchantId]
            );
        }
        
        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Get Welcome Offer Error:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch welcome offer' });
    } finally {
        client.release();
    }
});

// PUT /api/welcome-offer
// Update configuration
router.put('/', authenticate, async (req: AuthRequest, res: any) => {
    const { discountValue, discountType, isActive } = req.body;
    const client = await pool.connect();
    try {
        await client.query("SELECT set_config('app.current_merchant_id', $1, true)", [req.merchantId]);

        // Check existence
        const check = await client.query('SELECT id FROM welcome_offers WHERE merchant_id = $1', [req.merchantId]);
        
        let result;
        if (check.rows.length > 0) {
            result = await client.query(
                `UPDATE welcome_offers 
                 SET discount_value = $2, discount_type = $3, is_active = $4, updated_at = NOW()
                 WHERE merchant_id = $1
                 RETURNING *`,
                [req.merchantId, discountValue, discountType, isActive]
            );
        } else {
            result = await client.query(
                `INSERT INTO welcome_offers (merchant_id, discount_value, discount_type, is_active)
                 VALUES ($1, $2, $3, $4)
                 RETURNING *`,
                [req.merchantId, discountValue, discountType, isActive]
            );
        }

        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Update Welcome Offer Error:', error);
        res.status(500).json({ success: false, error: 'Failed to update welcome offer' });
    } finally {
        client.release();
    }
});

// GET /api/welcome-offer/qr
// Get the signed QR payload
router.get('/qr', authenticate, async (req: AuthRequest, res: any) => {
    const client = await pool.connect();
    try {
        await client.query("SELECT set_config('app.current_merchant_id', $1, true)", [req.merchantId]);

        // Ensure offer exists to get ID
        let result = await client.query('SELECT id FROM welcome_offers WHERE merchant_id = $1', [req.merchantId]);
        if (result.rows.length === 0) {
            result = await client.query(
                `INSERT INTO welcome_offers (merchant_id, discount_value, discount_type, is_active)
                 VALUES ($1, 10, 'percent', true)
                 RETURNING id`,
                [req.merchantId]
            );
        }
        
        const offerId = result.rows[0].id;
        
        // Generate Signed Token using HMAC service
        const signedToken = signQrCode(req.merchantId!, offerId, 'welcome');
        
        res.json({ success: true, token: signedToken });
    } catch (error) {
        console.error('QR Generation Error:', error);
        res.status(500).json({ success: false, error: 'Failed to generate QR' });
    } finally {
        client.release();
    }
});

export const welcomeOfferRoutes = router;
