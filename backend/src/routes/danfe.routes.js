import { Router } from 'express';
import { downloadDanfe } from '../controllers/danfe.controller.js';

const router = Router();

router.get('/danfe/:invoiceID', downloadDanfe);

export default router;