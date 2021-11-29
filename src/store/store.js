import Vue from 'vue';
import Vuex from 'vuex';
import user from './user';

Vue.use(Vuex);

/**
 * store
 * 仅作学习使用
 */

export default new Vuex.Store({
  state: {
    // 状态树   辅助函数 mapState
    count: 1,
    todos: [
      {
        id: 1,
        name: 'jack',
      },
      {
        id: 2,
        name: 'tom',
      },
      {
        id: 3,
        name: 'jim',
      },
    ],
  },
  getters: {
    // 辅助函数 mapGetters
    todoFilter: (store) => (id) => {
      return store.todos.filter((item) => item.id === id);
    },
  },
  actions: {
    // 同步   // 辅助函数 mapActions
    addTodo(state, payload) {
      state.todos.push(payload.data || {});
    },
  },
  mutations: {
    // 异步// 辅助函数 mapMutations
  },
  modules: {
    // 模块化
    user,
  },
});
