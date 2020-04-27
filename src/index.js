
import Vue from 'vue';
import router from '@/router/index';
import store from '@/store/store';

import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';

import App from './App';

Vue.use(ElementUI, { size: 'small'})

new Vue({
    el:"#app",
    router,
    store,
    render: h => h(App)
})
