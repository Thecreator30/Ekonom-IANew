import { Router } from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { generateMarketingContent } from '../services/aiService';

const router = Router();

router.post('/generate', authenticate, async (req, res) => {
    const { instruction } = req.body;
    
    if (!instruction) {
        return res.status(400).json({ success: false, error: 'Instruction required' });
    }

    try {
        const result = await generateMarketingContent(instruction);
        
        if (result.compliance_check === 'needs_review') {
             // In a real system, we might flag this in the DB
             console.warn(`Risk flagged for instruction: ${instruction}`);
        }

        res.json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, error: 'AI Generation failed' });
    }
});

export const aiRoutes = router;