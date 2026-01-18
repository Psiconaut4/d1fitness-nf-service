import { Router } from 'express';
import { getSendHistory } from '../controllers/sendHistory.controller.js';

const router = Router();

router.get('/history', getSendHistory);

export default router;