import { generateDanfeByInvoiceCode } from '../services/danfe.service.js';

export async function downloadDanfe(req, res) {
    try {
        const { invoiceId } = req.params;

        if (!invoiceId) {
            return res.status(400).json({
                error: 'invoiceId é obrigatório'
            });
        }

        const pdfBuffer = await generateDanfeByInvoiceCode(invoiceId);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader(
            'Content-Disposition',
            `attachment; filename=DANFE_${invoiceId}.pdf`
        );

        return res.send(pdfBuffer);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Erro ao gerar DANFE'
        });
    }
}
