import { Router } from 'express';
import { listSales, getSale } from '../controllers/sales.controller.js';

const router = Router();

router.get('/', listSales);
router.get('/:saleId', getSale);

export default router;