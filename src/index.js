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
import alert from './components/MessageBox/alert'
import confirm from './components/MessageBox/confirm'

Vue.use(alert)
Vue.use(confirm)

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
})
