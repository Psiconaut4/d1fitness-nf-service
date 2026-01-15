import { getSales } from '../services/sales.service.js';

export async function listSales(req, res) {
    try {
        const sales =  await getSales();
        res.status(200).json(sales);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar vendas' });
    }
}