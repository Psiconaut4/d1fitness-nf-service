import { Router } from 'express';
import { sendDanfeEmail } from '../controllers/email.controller.js';

const router = Router();

/**
 * @swagger
 * /api/danfe/{invoiceId}/email:
 *   post:
 *     summary: Envia a DANFE e o XML da nota fiscal por e-mail
 *     tags: [Notas Fiscais]
 *     parameters:
 *       - in: path
 *         name: invoiceId
 *         required: true
 *         schema:
 *           type: number
 *         description: ID da nota fiscal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: cliente@teste.com
 *     responses:
 *       200:
 *         description: Confirmação de envio da DANFE
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: DANFE enviada por email com sucesso
 */
router.post('/danfe/:invoiceId/email', sendDanfeEmail);

export default router;