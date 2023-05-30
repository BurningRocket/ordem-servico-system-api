import express from 'express';
import { ProfissionalService } from '../services/profissionalService';

const router = express.Router();

const profissionalService = new ProfissionalService();

router.post('/create', async (req, res) => {
  try {
    const result = await profissionalService.createProfissional(req.body);
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get('/findAll', async (req, res) => {
  try {
    const result = await profissionalService.getProfissionais();
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
});

export const profissionalRoute = router;