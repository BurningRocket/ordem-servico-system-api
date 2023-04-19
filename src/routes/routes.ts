import express from 'express';
import { authRoutes } from './authRoutes';
import { userRoutes } from './userRoutes';
import { visitaRoutes } from './visitaRoutes';
import { AuthMiddleware } from '../middleware/auth';

const router = express.Router();
const auth = new AuthMiddleware();

router.use('/auth', authRoutes);

//TODO: Add auth middleware
router.use('/user', auth.verifyToken, userRoutes);

router.use('/visita', auth.verifyToken, visitaRoutes);

export default router