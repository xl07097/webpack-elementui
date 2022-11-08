import 'core-js'

import Vue from 'vue'
import router from '@/router/index'
import store from '@/store/store'
// import './directives/autoHeight';

import './directives/auth'

import './importComponent'
import './importVxeTable'
import 'vxe-table/lib/style.min.css'
import App from './App'
import './router/permission'

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
})
