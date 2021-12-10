import { post } from '@/http/request.js';

import { loginApi } from '@/utils/urls';

export function userLogin(data) {
  return post(loginApi, data);
}
