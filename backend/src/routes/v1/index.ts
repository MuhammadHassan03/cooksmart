import { Router } from 'express';
import authRoutes from './auth.routes';
import scannerRoutes from './scanner.routes'
import { requireAuth } from '../../middleware/auth.middleware';

const router = Router();
router.use('/auth', authRoutes);
router.use('/scanner', requireAuth, scannerRoutes);

export default router;
