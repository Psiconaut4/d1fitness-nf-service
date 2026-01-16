import { generateDanfeByInvoiceCode } from '../services/danfeService.js';

export async function downloadDanfe(req, res) {
    try {
        const { invoiceID } = req.params;

        if (!invoiceID) {
            return res.status(400).json({
                error: 'invoiceID é obrigatório'
            });
        }
        const pdfBuffer = await generateDanfeByInvoiceCode(invoiceID);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader(
            'Content-Disposition',
            `attachment; filename=danfe-${invoiceID}.pdf`
        );
        return res.send(pdfBuffer);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao gerar DANFE' });
    }
}