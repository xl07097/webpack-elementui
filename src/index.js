
import Vue from 'vue';
import router from './router/index';
import iView from 'iview';

import 'iview/dist/styles/iview.css'

import App from './App';


import 'babel-polyfill';
// import './router/permission'

Vue.use(iView)

new Vue({
    el:"#app",
    router,
    render: h => h(App)
})
