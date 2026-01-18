import { Router } from 'express';
import { listSales, getSale } from '../controllers/sales.controller.js';

const router = Router();

/**
 * @swagger
 * /api/sales:
 *   get:
 *     summary: Lista todas as vendas
 *     tags: [Vendas]
 *     responses:
 *       200:
 *         description: Lista de vendas com total e códigos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 total:
 *                   type: number
 *                   example: 4
 *                 vendas:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "201612"
 */
router.get('/sales', listSales);

/**
 * @swagger
 * /api/sales/{saleId}:
 *   get:
 *     summary: Retorna os detalhes de uma venda específica
 *     tags: [Vendas]
 *     parameters:
 *       - in: path
 *         name: saleId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da venda
 *     responses:
 *       200:
 *         description: Detalhes completos da venda
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codigoVenda:
 *                   type: number
 *                   example: 201617
 *                 codigoNotaFiscal:
 *                   type: number
 *                   example: 527698
 *                 clienteNome:
 *                   type: string
 *                   example: "Ana Lívia Monteiro"
 *                 dataVenda:
 *                   type: string
 *                   format: date
 *                   example: "2025-10-11"
 *                 valorTotal:
 *                   type: string
 *                   example: "57.40"
 *                 descricaoStatus:
 *                   type: string
 *                   example: "Finalizado"
 *                 entregaEmail:
 *                   type: string
 *                   example: "mendesmaria-cecilia@example.net"
 *                 clienteDocumento:
 *                   type: string
 *                   example: "63745098200"
 */
router.get('/sales/:saleId', getSale);

export default router;