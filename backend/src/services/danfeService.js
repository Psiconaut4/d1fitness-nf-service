import { getNFById } from './nfService.js';
import { generateDanfe } from '../utils/generateDanfe';

export async function generateDanfeByInvoiceCode(invoiceCode) {
    const nfResponse = await getNFById(invoiceCode);

    if (!nfResponse?.xml) {
        throw new Error('XML da NF não encontrado.');
    }

    const xmlString = nfResponse.xml;

    const pdfBuffer = await generateDanfe(xmlString);

    return pdfBuffer;
}