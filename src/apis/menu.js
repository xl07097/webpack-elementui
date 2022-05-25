import { post } from '@/http/request.js';

export function getMenu() {
  return post('/system/systemMenu');
}
