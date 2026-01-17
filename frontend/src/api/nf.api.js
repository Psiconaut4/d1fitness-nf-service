import http from './http'

export function getNFByInvoiceId(invoiceId) {
  return http.get(`/nf/${invoiceId}`)
}
