import Vue from 'vue';
import Vuex from 'vuex';
import permission from './modules/permission';
import app from './modules/app';
import {storage} from '@/utils/storage';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 状态树   辅助函数 mapState
    loginUser: storage.getItem('loginUser') || {}
  },
  getters: {},
  mutations: {
    setLoginUser(state, payload){
      storage.setItem('loginUser', payload)
      state.loginUser = payload
    }
  },
  modules: {
    // 模块化
    permission,
    app
  },
});
