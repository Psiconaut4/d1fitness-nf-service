import { generateDanfeByInvoiceCode } from './danfe.service.js'
import { mailTransporter } from '../utils/mailTransporter.js'
import { addSendHistory } from './sendHistory.service.js'

export async function sendDanfeByEmail(invoiceId, toEmail) {
  try {
    const { pdfBuffer, xml } = await generateDanfeByInvoiceCode(invoiceId)

    await mailTransporter.sendMail({
      from: '"D1 Fitness" <no-reply@d1fitness.com>',
      to: toEmail,
      subject: `Nota Fiscal ${invoiceId} - D1FITNESS`,
      text: "Olá! 😊\n\nEm anexo, você encontra a Nota Fiscal e o XML referentes à sua compra na D1 Fitness.\n\nAgradecemos pela preferência!",
      attachments: [
        {
          filename: `DANFE_${invoiceId}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
        {
          filename: `XML_${invoiceId}.xml`,
          content: xml,
          contentType: 'application/xml',
        }
      ],
    })

    await addSendHistory({
      invoiceId,
      email: toEmail,
      status: 'SUCCESS',
    })
  } catch (error) {
    await addSendHistory({
      invoiceId,
      email: toEmail,
      status: 'ERROR',
    })

    throw error
  }
}
