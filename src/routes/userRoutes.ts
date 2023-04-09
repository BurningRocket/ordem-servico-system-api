import express from 'express';
import { UserService } from '../services/userService';

const router = express.Router();

const userService = new UserService();

router.get('/findAll', async (req, res) => {
  try {
    const result = await userService.findAll();
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
});

export const userRoutes = router;