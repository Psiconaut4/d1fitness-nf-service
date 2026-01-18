import { Router } from 'express';
import { getNF } from '../controllers/nf.controller.js';

const router = Router();

/**
 * @swagger
 * /api/nf/{invoiceId}:
 *   get:
 *     summary: Retorna os dados da Nota Fiscal e XML associado a uma venda
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
 *         description: Dados completos da nota fiscal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 invoiceId:
 *                   type: number
 *                   example: 528881
 *                 saleId:
 *                   type: number
 *                   example: 201614
 *                 xml:
 *                   type: string
 *                   example: "<?xml version=\"1.0\" encoding=\"UTF-8\"?><nfeProc versao=\"4.00\" xmlns=\"http://www.portalfiscal.inf.br/nfe\">...</nfeProc>"
 */
router.get('/nf/:invoiceId', getNF);

export default router;