import express from 'express';
import { OrcamentoService } from '../services/orcamentoService';

const router = express.Router();

const orcamentoService = new OrcamentoService();

router.post('/create', async (req, res) => {
  try {
    const result = await orcamentoService.createOrcamento(req.body);
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get('/findAll', async (req, res) => {
  try {
    const result = await orcamentoService.getOrcamentos();
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get('/findAllOpen', async (req, res) => {
  try {
    const result = await orcamentoService.getOrcamentosOpen();
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put('/aprovar', async (req, res) => {
  try {
    const result = await orcamentoService.aprovarOrcamento(req.body);
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put('/reprovar', async (req, res) => {
  try {
    const result = await orcamentoService.reprovarOrcamento(req.body);
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put('/update', async (req, res) => {
  try {
    const result = await orcamentoService.updateOrcamento(req.body);
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const result = await orcamentoService.deleteOrcamento(req.params.id);
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
});

export const orcamentoRoutes = router;
