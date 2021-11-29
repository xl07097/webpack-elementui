import axios from 'axios';
import { showToast } from '@/utils/message';
// import { SUCCESS, LOGIN_TIMEOUT } from './statusCode'
import store from '@/store/store';

const http = axios.create({
  baseURL: '/api/',
  // timeout: 10000,
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});

//请求拦截
http.interceptors.request.use((config) => {
  // const timetamp = Date.now()
  // config.headers.timetamp = timetamp

  return config;
});

// 响应拦截
http.interceptors.response.use(
  (res) => {
    // 文件流 直接过去
    if (res.request.responseType === 'blob') {
      return res;
    }
    const data = res.data;
    const code = data.code;

    switch (code) {
      case 0: // 请求成功
        break;
      case 101: // 登录超时，返回 login 页面
        showToast(data.message);
        store.commit('back_login');
        break;
      default:
        break;
    }

    return data;
  },
  (err) => {
    let response = err.response;
    const { status } = response;
    let errorMessage = response.data.error ? response.data.error : err.message;
    switch (status) {
      case 400:
        showToast(errorMessage, '错误', 'error');
        break;
      case 401:
        showToast('登录超时！', '警告', 'warning');
        break;
      case 404:
        showToast(errorMessage, '错误', 'error');
        break;
      case 405:
        showToast(errorMessage, '错误', 'error');
        break;
      case 422:
        showToast(errorMessage, '错误', 'error');
        break;
      case 503:
        showToast(errorMessage, '错误', 'error');
        break;
      case 504:
        showToast('服务器未启动！ 异常状态码：504', '错误', 'error');
        break;
      case 500:
        showToast('请求失败！ 异常状态码：500', '错误', 'error');
        break;
      default:
        showToast(errorMessage, '错误', 'error');
    }
    return Promise.reject(response);
  },
);

export default http;
