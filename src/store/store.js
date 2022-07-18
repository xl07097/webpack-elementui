import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';

import router from '@/router/index';
import { getMenu } from '@/apis/menu';

Vue.use(Vuex);

/**
 * store
 * 仅作学习使用
 */

const add = function add({ path, name, pid, component, id }) {
  router.addRoute({
    path: path,
    component: component ? () => import('@/views/InfiniteScroll.vue') : () => import('@/views/pages/accountInfo.vue'),
    name: name, // 命名路由
  });
};
const list = [];
const findQuestions = function findQuestions(tree) {
  console.time('label');
  // 模拟栈，管理结点
  const stack = tree;
  while (stack.length) {
    // 栈顶节点出栈
    const node = stack.shift();
    list.push({
      ...node,
      children: [],
    });
    add({
      ...node,
      children: [],
    });
    // 查找到目标，退出
    // if (node.value === target) {
    //   return target
    // }
    if (node.children && node.children.length) {
      // 将候选顶点入栈，进行下一次循环
      stack.push(...node.children);
    }
  }

  console.timeEnd('label');
  return list;
};

export default new Vuex.Store({
  state: {
    // 状态树   辅助函数 mapState
    count: 1,
    menu: [],
    perms: [],
    refresh: false,
  },
  getters: {},
  mutations: {
    // 同步   // 辅助函数 mapActions
    setMenu(state, payload) {
      state.menu = payload.menu || [];
      state.perms = payload.perms || [];
      state.refresh = true;
    },
  },
  actions: {
    // 异步// 辅助函数 mapMutations
    getMenu({ commit }) {
      return new Promise((resolve, _reject) => {
        getMenu().then((data) => {
          if (data.code === 200) {
            findQuestions(data.data);
            router.addRoute({
              path: '*',
              name: '404',
              redirect: '/index',
            });
            commit('setMenu', {
              menu: data.data,
              perms: ['*'],
            });
            resolve();
            console.log(router.getRoutes());
          }
        });
      });
    },
  },
  modules: {
    // 模块化
    user,
  },
});
