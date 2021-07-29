import fetch from "../utils/fetch";

import { loginapi } from '@/utils/urls';

export function userLogin(data) {
    return fetch.post(loginapi, data)
}
