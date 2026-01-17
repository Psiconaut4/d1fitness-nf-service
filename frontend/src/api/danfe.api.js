import http from './http'

export function downloadDanfe(invoiceId) {
  return http.get(`/danfe/${invoiceId}`, {
    responseType: 'blob',
  })
}

export function sendDanfeByEmail(invoiceId, email) {
  return http.post(`/danfe/${invoiceId}/email`, {
    email,
  })
}
