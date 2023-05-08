import express from 'express';
import { InstalacaoService } from '../services/instalacaoService';

const router = express.Router();

const instalacaoService = new InstalacaoService();

router.post('/create', async (req, res) => {
  try {
    const result = await instalacaoService.createInstalacao(req.body);
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get('/findAll', async (req, res) => {
  try {
    const result = await instalacaoService.getInstalacaos();
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put('/finalizar', async (req, res) => {
  try {
    const result = await instalacaoService.finalizarInstalacao(req.body);
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put('/faturar', async (req, res) => {
  try {
    const result = await instalacaoService.faturarInstalacao(req.body);
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
});

export const instalacaoRoutes = router;