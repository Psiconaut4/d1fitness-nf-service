import { getNFById } from '../services/nf.service.js';
import { validateXML } from '../utils/xmlValidator.js';

export const getNF = async (req, res) => {
  const { invoiceId } = req.params;

  try {
    const response = await getNFById(invoiceId);

    const notaFiscal = response?.nota_fiscal;

    if (!notaFiscal) {
      return res.status(404).json({
        message: 'Nota fiscal não encontrada'
      });
    }

    const xml =
      notaFiscal.NotaFiscalXML ||
      notaFiscal.NFEs?.[0]?.Arquivo;

    if (!xml) {
      return res.status(422).json({
        message: 'XML da nota fiscal não disponível'
      });
    }
    validateXML(xml);

    return res.json({
      invoiceId: notaFiscal.Codigo,
      saleId: notaFiscal.CodigoVenda,
      xml
    });

  } catch (error) {
    console.error('Erro ao buscar NF:', error.message);

    return res.status(422).json({
      message: error.message || 'Erro ao validar XML da nota fiscal'
    });
  }
};
