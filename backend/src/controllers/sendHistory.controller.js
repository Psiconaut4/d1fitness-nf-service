import { listSendHistory } from '../services/sendHistory.service.js'

export async function getSendHistory(req, res) {
  try {
    const history = await listSendHistory()
    res.json(history)
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar histórico' })
  }
}
