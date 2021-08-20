import axios from 'axios';
import { Message } from 'element-ui';
import { SUCCESS } from '@/config/statusCode'

let fetch = axios.create({
    baseURL: 'https://tomcat.zhiqiuge.com/note/',
    timeout: 10000,
    withCredentials: true,
})

fetch.interceptors.request.use(config => {
    const token = sessionStorage.getItem("token");
    if (token) {
        config.headers["token"] = token;
    }
    return config;
});

fetch.interceptors.response.use(res => {
    if (res.status === 200) {
        const data = res.data;
        const operCode = data.code;
        if (operCode === SUCCESS) {
            // 请求成功
        } else if (operCode === LOGIN_TIMEOUT) {
            // 登录超时，token过期，返回 login 页面
        }
        return data;
    } else {
        Message({
            message: res.msg || '失败',
            type: 'warning',
            showClose: true
        })
    }
});

export default fetch;
