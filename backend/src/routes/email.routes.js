import { Router } from 'express';
import { sendDanfeEmail } from '../controllers/email.controller.js';

const router = Router();

router.post('/danfe/:invoiceId/email', sendDanfeEmail);

export default router;