import express from 'express';
import { DashboardService } from '../services/dashboardService';

const router = express.Router();

const dashboardService = new DashboardService();

router.get('/getDashboard', async (req, res) => {
  try {
    const result = await dashboardService.getDashboard();
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
});

export const dashboardRoutes = router;