import { sendDanfeByEmail } from '../services/email.service.js';


export async function sendDanfeEmail(req, res) {
    try {
        const { invoiceId } = req.params;
        const { email } = req.body;

        if (!invoiceId || !email) {
            return res.status(400).json({
                error: 'invoiceId e email são obrigatórios'
            });
        }

        await sendDanfeByEmail(invoiceId, email);

        return res.json({
            message: 'DANFE enviada por email com sucesso'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Erro ao enviar DANFE por email'
        });
    }
}