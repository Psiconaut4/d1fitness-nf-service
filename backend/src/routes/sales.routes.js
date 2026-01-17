import { Router } from 'express';
import { listSales, getSale } from '../controllers/sales.controller.js';

const router = Router();

router.get('/sales', listSales);
router.get('/sales/:saleId', getSale);

export default router;