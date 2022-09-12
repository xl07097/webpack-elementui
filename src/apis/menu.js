import { get } from '@/http/request.js'

export function getMenu() {
  return get('/sysMenu/tree')
}

export function getPrivilegeMenu() {
  return get('/sysMenu/getPrivilegeMenu')
}
