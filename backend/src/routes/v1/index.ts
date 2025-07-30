import { Router } from 'express';
import authRoutes from './auth.routes';
import { requireAuth } from '../../middleware/auth.middleware';

const router = Router();
router.use('/auth', authRoutes);
export default router;
