import 'core-js'

import Vue from 'vue'
import router from '@/router/index'
import store from '@/store/store'

import './directives/auth'

import './styles/theme-variable.scss'
import './importComponent'
import './importVxeTable'
import 'vxe-table/lib/style.css'
// 导入主题变量，也可以重写主题变量
// import 'vxe-table/styles/index.scss'
// import 'vxe-pc-ui/styles/cssvar.scss'

import App from './App'
import './router/permission'
import alert from './components/MessageBox/alert'
import confirm from './components/MessageBox/confirm'

import i18n from './i18n'

Vue.use(alert)
Vue.use(confirm)

new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: (h) => h(App),
})
