import express from 'express';
import { VisitaService } from '../services/visitaService';

const router = express.Router();

const visitaService = new VisitaService();

router.post('/create', async (req, res) => {
  try {
    const result = await visitaService.createVisita(req.body);
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.patch('/update', async (req, res) => {
  try {
      const result = await visitaService.updateVisita(req.body);
      res.status(200).json(result);
  } catch (error: any) {
      console.log(error);
      res.status(500).json(error);
  }
});

router.get('/findAll', async (req, res) => {
  try {
    const result = await visitaService.getVisitas();
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get('/findAllOpen', async (req, res) => {
  try {
    const result = await visitaService.getOpenVisitas();
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put('/finalizar', async (req, res) => {
  try {
    const result = await visitaService.finalizarVisita(req.body);
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const result = await visitaService.deleteVisita(req.params.id);
        res.status(200).json(result);
    } catch (error: any) {
        console.log(error);
        res.status(500).json(error);
    }
});

export const visitaRoutes = router;
