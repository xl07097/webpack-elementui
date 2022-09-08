import Vue from 'vue';
import Vuex from 'vuex';
import menu from './modules/menu';


Vue.use(Vuex);

/**
 * store
 * 仅作学习使用
 */


export default new Vuex.Store({
  state: {
    // 状态树   辅助函数 mapState
  },
  getters: {},
  mutations: {
    
  },
  actions: {
    
  },
  modules: {
    // 模块化
    menu,
  },
});
