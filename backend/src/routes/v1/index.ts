import { Router } from 'express';
import authRoutes from './auth.routes';
import scannerRoutes from './ai.routes';
import inventoryRoutes from './inventory.routes';
import { requireAuth } from '../../middleware/auth.middleware';

const router = Router();
router.use('/auth', authRoutes);
router.use('/scanner', requireAuth, scannerRoutes);
router.use('/inventory', requireAuth, inventoryRoutes);

export default router;
