import { getNFById } from './nf.service.js';
import { generateDanfe } from '../utils/generateDanfe.js';

export async function generateDanfeByInvoiceCode(invoiceId) {
    const nfResponse = await getNFById(invoiceId);

    if (!nfResponse?.success || !nfResponse?.nota_fiscal) {
        throw new Error('Nota fiscal não encontrada');
    }

    const notaFiscal = nfResponse.nota_fiscal;

    const xml =
        notaFiscal.NotaFiscalXML ||
        notaFiscal.NFEs?.[0]?.Arquivo;

    if (!xml) {
        throw new Error('XML da NF não encontrado');
    }

    const pdfBuffer = await generateDanfe(xml);

    return pdfBuffer;
}
