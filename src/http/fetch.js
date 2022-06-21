import axios from 'axios';
import { showMessage } from '@/utils/message';
import {responseHandle} from './httpHandle'

const instance = axios.create({
  baseURL: '/api/',
  // timeout: 10000,
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  xsrfCookieName: 'xcsrf',
  xsrfHeaderName: 'xcsrf',
});

instance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.token = token;
  }
  return config;
});

instance.interceptors.response.use(
  (res) => {
    if (res.request.responseType === 'blob') {
      return res;
    }
    const data = res.data;
    responseHandle(data)
    return data;
  },
  (err) => {
    let response = err.response;
    console.log(response);
    const { status } = response;
    switch (status) {
    case 404:
      showMessage('资源不存在');
      break;
    case 500:
      showMessage('服务器异常');
      break;
    default:
      showMessage('gaga');
      break;
    }
    return Promise.reject(err);
  }
);

export default instance;
