import axios from 'axios';
import { showMessage } from '@/utils/message';
import { LOGIN_TIMEOUT, SUCCESS } from '@/config/statusCode';

const instance = axios.create({
  baseURL: '/api/',
  // timeout: 10000,
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
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
    const code = data.code;

    switch (code) {
      case SUCCESS: // 请求成功
        //   showMessage(msg);
        break;
      case LOGIN_TIMEOUT: // 登录超时，token过期，返回 login 页面
        showMessage('');
        break;
      default:
        break;
    }
    console.log(data);
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
