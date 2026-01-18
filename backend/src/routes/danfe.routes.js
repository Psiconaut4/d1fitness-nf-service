import { Router } from 'express';
import { downloadDanfe } from '../controllers/danfe.controller.js';

const router = Router();

/**
 * @swagger
 * /api/danfe/{invoiceId}:
 *   get:
 *     summary: Faz o download da DANFE da nota fiscal
 *     tags: [Notas Fiscais]
 *     parameters:
 *       - in: path
 *         name: invoiceId
 *         required: true
 *         schema:
 *           type: number
 *         description: ID da nota fiscal
 *     responses:
 *       200:
 *         description: Retorna o arquivo PDF da DANFE
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 */
router.get('/danfe/:invoiceId', downloadDanfe);

export default router;