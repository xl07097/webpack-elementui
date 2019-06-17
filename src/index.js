
import Vue from 'vue';
import router from '@/router/index';
import store from '@/store/store';

import iView from 'iview';

import 'iview/dist/styles/iview.css'

import App from './App';


import 'babel-polyfill';
// import './router/permission'

Vue.use(iView)

new Vue({
    el:"#app",
    router,
    store,
    render: h => h(App)
})
