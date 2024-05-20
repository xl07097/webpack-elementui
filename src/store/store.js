import Vue from 'vue'
import Vuex from 'vuex'
import { storage } from '@/utils/storage'
import app from './modules/app'
import permission from './modules/permission'
import tagsView from './modules/tagsView'

Vue.use(Vuex)

// const context = require.context('./modules', false, /\.js$/)
// const modules = context.keys().reduce((acc, key) => {
//   const k = key.replace(/(\.\/|\.js)/g, '')
//   acc[k] = context(key).default
//   return acc
// }, {})

export default new Vuex.Store({
  state: {
    // 状态树   辅助函数 mapState
    loginUser: storage.getItem('loginUser') || {},
  },
  getters: {},
  mutations: {
    setLoginUser(state, payload) {
      storage.setItem('loginUser', payload)
      state.loginUser = payload
    },
  },
  // 模块化
  modules: {
    app,
    permission,
    tagsView,
  },
})

// 正则提取字符串中的字符
// const str = 'abc.js'
// const reg = /(\.\/|\.js)/g
// const result = str.replace(reg, '')
// console.log(result)
