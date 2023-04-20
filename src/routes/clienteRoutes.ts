import express from 'express';
import { ClienteService } from '../services/clienteService';

const router = express.Router();

const clienteService = new ClienteService();

router.post('/create', async (req, res) => {
  try {
    const result = await clienteService.createCliente(req.body);
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get('/findAll', async (req, res) => {
  try {
    const result = await clienteService.getClientes();
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
});

export const clienteRoutes = router;