import { gerarPDF } from 'nfe-danfe-pdf';

export async function generateDanfe(xmlString) {
    return new Promise(async (resolve, reject) => {
        try {
            const pdfStream = await gerarPDF(xmlString, {
                cancelar: false,
                textoRodape: 'Documento emitido automaticamente pelo sistema.',
            });

            const chunks = [];

            pdfStream.on('data', chunk => chunks.push(chunk));
            pdfStream.on('end', () => resolve(Buffer.concat(chunks)));
            pdfStream.on('error', err => reject(err));

        } catch (error) {
            reject(error);
        }
    });
}