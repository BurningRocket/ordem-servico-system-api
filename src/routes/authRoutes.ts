import express from 'express';
import { UserService } from '../services/userService';

const router = express.Router();

const userService = new UserService();

router.post('/register', async (req, res) => {
  try {
    const result = await userService.register(req.body);
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    const result = await userService.login(req.body);
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
});

export const authRoutes = router;