import http from './http';

export function getSales() {
    return http.get('/sales')
}

export function getSaleById(saleId) {
    return http.get(`/sales/${saleId}`)
}