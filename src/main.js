import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';

import alert from './components/MessageBox/alert';
import confirm from './components/MessageBox/confirm';
import form_modal from './components/FormModal/modal';

import App from './app.vue';
import BaseService from './service/BaseServive';
import 'iview/dist/styles/iview.css';
import SysModal from './components/myModal';
import Table from './components/Table/myTable';
import './libs/filter';
import util from './libs/util';

// 引入样式
import 'vue-easytable/libs/themes-base/index.css';
// 导入 table 和 分页组件
import {VTable,VPagination} from 'vue-easytable';

// 注册到全局
Vue.component(VTable.name, VTable);
Vue.component(VPagination.name, VPagination);
Vue.use(VueRouter);
Vue.use(iView);
Vue.use(alert);
Vue.use(confirm);
Vue.use(form_modal);
Vue.use(SysModal);
Vue.use(Table);
Vue.prototype.$ajax = BaseService;
Vue.prototype.util = util;

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

// router.beforeEach((to, from, next) => {
//     let user =sessionStorage.getItem('sportHealthUserName');
//     if(!user&&to.path != '/login')
//     {
//         next('/login');
//     }
//     else {
//         iView.LoadingBar.start();
//         next();
//
//     }
//
// });




router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});


new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
