
import Vue from 'vue';
import router from '@/router/index';
import store from '@/store/store';

import './importComponent'

import App from './App';

new Vue({
    el:"#app",
    router,
    store,
    render: h => h(App)
})
