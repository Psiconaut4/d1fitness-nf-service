import http from './http';

export function getSendHistory() {
  return http.get('/history');
}