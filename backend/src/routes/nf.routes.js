import { Router } from 'express';
import { getNF } from '../controllers/nf.controller.js';

const router = Router();

router.get('/:invoiceId', getNF);

export default router;