import express from 'express';
import { authRoutes } from './authRoutes';
import { userRoutes } from './userRoutes';
import { visitaRoutes } from './visitaRoutes';
import { AuthMiddleware } from '../middleware/auth';
import { orcamentoRoutes } from './orcamentoRoutes';
import { clienteRoutes } from './clienteRoutes';
import { instalacaoRoutes } from './instalacaoRoutes';

const router = express.Router();
const auth = new AuthMiddleware();

router.use('/auth', authRoutes);

router.use('/user', auth.verifyToken, userRoutes);

router.use('/visita', auth.verifyToken, visitaRoutes);

router.use('/orcamento', auth.verifyToken, orcamentoRoutes);

router.use('/cliente', auth.verifyToken, clienteRoutes);

router.use('/instalacao', auth.verifyToken, instalacaoRoutes);

export default router