import axios from 'axios';

const API_D1_URL = process.env.API_D1_URL;

export async function getSales() {
  const response = await axios.get(`${API_D1_URL}/listarVendas`);
  return response.data;
}
