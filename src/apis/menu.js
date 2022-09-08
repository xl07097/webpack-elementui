import { get } from '@/http/request.js';

export function getMenu() {
  return get('/sysMenu/tree');
}
