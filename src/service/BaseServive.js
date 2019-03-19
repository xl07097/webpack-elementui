import axios from 'axios';
import urls from './Urls';
import Vue from 'vue';
import router from '../router';

export default function ajax(options) {
    return new Promise((resolve, reject) => {
        axios({
            url: options.url,
            method: 'post',
            baseURL: urls.baseApi,
            data: JSON.stringify(options.data) || '',
            timeout: 8000,
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'auth_token': sessionStorage.getItem('token')
            },
            withCredentials: true
        }).then((response) => {
            if (response.status === 200) {
                if (response.data.code) {
                    let alert = Vue.prototype.$alert;
                    switch (response.data.code) {
                        case 200:
                            resolve(response.data);
                            break;
                        case 1000:
                            window.console.error('接口 ：' + response.config.url + ' 请求异常');
                            alert(response.data.error);
                            break;
                        case 300://未登录
                            if (!window.alertIsShow) {
                                alert({
                                    text: response.data.error,
                                    onOk: function () {
                                        delete window.alertIsShow;
                                        //跳转到登录页面
                                        // let host = '';
                                        // if (window.location.hostname === 'localhost') {//本地开发环境
                                        //     host = '192.1.6.48';
                                        // } else {
                                        //     host = window.location.hostname;
                                        // }
                                        // let loginUrl = 'http://' + host + '/login?' + encodeURIComponent(location.href);
                                        // window.location.href = loginUrl;
                                        sessionStorage.clear();
                                        router.push('/login');
                                    }
                                });
                                window.alertIsShow = true;
                            }
                            break;
                        case 800:
                            resolve(response.data);
                            break;
                        case 500:
                            alert({
                                text: response.data.error,
                                onOk: function () {
                                    delete window.alertIsShow;
                                }
                            });
                            window.alertIsShow = true;
                            break;
                    }
                } else {
                    resolve(response.data);
                }
            } else {
                reject(response.data);
            }
        }, (result) => {
            window.console.error(':::' + result);
        }).catch(() => {

        });
    });
}
