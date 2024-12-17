import { Router } from 'express';
const router = Router();
import userRoutes from './userRoutes.js';
router.use('/users', userRoutes);
export default router;
