import { generateDanfeByInvoiceCode } from './danfe.service.js';
import { mailTransporter } from '../utils/mailTransporter.js';

export async function sendDanfeByEmail(invoiceId, toEmail){
    const pdfBuffer = await generateDanfeByInvoiceCode(invoiceId);

    await mailTransporter.sendMail({
        from: ' "D1 Fitness" <no-reply@d1fitness.com>',
        to: toEmail,
        subject: `Nota Fiscal ${invoiceId} - D1FITNESS`,
        text: 'Segue em anexo a Nota Fiscal referente à sua compra na D1 Fitness.',
        attachments: [
            {
                filename: `DANFE_${invoiceId}.pdf`,
                content: pdfBuffer,
                contentType: 'application/pdf'
            }
        ]
    });
}