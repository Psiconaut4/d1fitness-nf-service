import { Router } from 'express';
import { getSendHistory } from '../controllers/sendHistory.controller.js';

const router = Router();

/**
 * @swagger
 * /api/history:
 *   get:
 *     summary: Retorna histórico de envios de notas fiscais por email
 *     tags: [Notas Fiscais]
 *     responses:
 *       200:
 *         description: Lista de envios com status e timestamp
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   invoiceId:
 *                     type: string
 *                     description: ID da nota fiscal
 *                   email:
 *                     type: string
 *                     description: Email do destinatário
 *                   status:
 *                     type: string
 *                     description: Status do envio (SUCCESS ou ERROR)
 *                   sentAt:
 *                     type: string
 *                     format: date-time
 *                     description: Data e hora do envio
 */
router.get('/history', getSendHistory);

export default router;