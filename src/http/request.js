import $http from './fetch';
import { downloadHandle } from './httpHandle.js';

/**
 * config 中可以配置上传下载进度函数，取消请求等配置
 */

/**
 * GET 请求
 * @param {*} url
 * @param {*} params
 * @param config
 * @returns
 */
export const get = (url, params = {}, config = {}) => {
  return $http.get(url, {
    params,
    ...config,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

/**
 * POST json 求情
 * @param {*} url
 * @param {*} data
 * @param config
 * @returns
 */
export const post = (url, data = {}, config = {}) => {
  return $http.post(url, JSON.stringify(data), {
    ...config,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

/**
 * POST form表单 求情
 * @param {*} url
 * @param {*} data
 * @param config
 * @returns
 */
export const formPost = (url, data = {}, config = {}) => {
  return $http.post(url, data, config);
};

/**
 * POST 文件上传请求
 * @param {*} url
 * @param {*} data
 * @param config
 * @returns
 */
export const uploadPost = (url, data, config = {}) => {
  return $http.post(url, data, config);
};

/**
 * GET 文件下载请求
 * @param {*} url
 * @param {*} params
 * @param config
 * @returns
 */
export const downloadGet = (url, params = {}, config = {}) => {
  return $http
    .get(url, {
      params,
      ...config,
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(downloadHandle);
};

/**
 * POST 文件下载json请求
 * @param {*} url
 * @param {*} data
 * @param config
 * @returns
 */
export const downloadPost = (url, data = {}, config = {}) => {
  return $http
    .post(url, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'blob',
      ...config,
    })
    .then(downloadHandle);
};
