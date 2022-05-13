import 'core-js';

import Vue from 'vue';
import router from '@/router/index';
import store from '@/store/store';
// import './directives/autoHeight';

import './directives/preventClick';

import './importComponent';
import './importVxeTable';
import 'vxe-table/styles/index.scss';
import App from './App';

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
});
