import express from 'express';
import { authRoutes } from './authRoutes';
import { userRoutes } from './userRoutes';
import { AuthMiddleware } from '../middleware/auth';

const router = express.Router();
const auth = new AuthMiddleware();

router.use('/auth', authRoutes);

router.use('/user', auth.verifyToken, userRoutes);

export default router