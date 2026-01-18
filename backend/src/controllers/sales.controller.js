import { getSales, getSaleById } from '../services/sales.service.js';

export async function listSales(req, res) {
    try {
        const sales =  await getSales();
        res.status(200).json(sales);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar vendas' });
    }
}

export async function getSale(req, res) {
    try {
        const { saleId } = req.params;

        if (!saleId) {
            return res.status(400).json({ message: 'Código da venda é obrigatório' });
        }
        const response = await getSaleById(saleId);

        if (!response?.success || !response?.venda) {
            return res.status(404).json({ message : 'Venda não encontrada' });
        }
        const { Codigo, CodigoNotaFiscal, ClienteNome, DataVenda, ValorTotal, DescricaoStatus } = response.venda;

        res.json({
            codigoVenda: Codigo,
            clienteNome: ClienteNome,
            dataVenda: DataVenda,
            valorTotal: ValorTotal,
            descricaoStatus: DescricaoStatus,
            codigoNotaFiscal: CodigoNotaFiscal
        });
    } catch (error) {
        console.error('Erro ao buscar venda:', error.response?.data || error.message);

        res.status(500).json({
            message: 'Erro ao buscar venda',
            detail: error.response?.data || error.message
        });
    }
}