/**
 * 模块化 store
 * menu
 * 仅作学习使用
 */

import router from '@/router/index'
import { getPrivilegeMenu } from '@/apis/menu'
import { deepClone, tree2Array } from '@/utils/commons'

const add = function add({ path, name, pid, component, id }) {
  router.addRoute({
    path: path,
    component: component
      ? () => import(`@/views/${component}`)
      : () => import('@/components/MiddlePage.vue'),
    name: name, // 命名路由
  })
}
const findQuestions = function findQuestions(tree) {
  const list = []
  console.time('label')
  // 模拟栈，管理结点
  const stack = tree
  while (stack.length) {
    // 栈顶节点出栈
    const node = stack.shift()
    list.push({
      ...node,
      children: [],
    })
    add({
      ...node,
      children: [],
    })
    if (node.children && node.children.length) {
      // 将候选顶点入栈，进行下一次循环
      stack.push(...node.children)
    }
  }

  console.timeEnd('label')
  return list
}
export default {
  namespaced: true,
  state: {
    menu: [], // 菜单树
    perms: [], // 权限list
    currentRouterInfo: {}, // 当前路由信息快照
    refresh: false, // 页面是否刷新，false 为刷新
  },
  getters: {
    menuGetter(state) {
      return tree2Array(state.menu)
    },
  },
  mutations: {
    // 同步 // 辅助函数 mapMutations
    setMenu(state, payload) {
      state.menu = payload.menu || []
      state.perms = payload.perms || []
      state.refresh = true
    },
    setCurrentRouterInfo(state, payload) {
      state.currentRouterInfo = payload.data || {}
    },
  },
  actions: {
    // 异步// 辅助函数 mapActions
    getMenu({ commit }) {
      return new Promise((resolve, _reject) => {
        getPrivilegeMenu().then((data) => {
          if (data.code === 200) {
            findQuestions(deepClone(data.data))
            router.addRoute({
              path: '*',
              name: '404',
              redirect: '/index',
            })
            commit('setMenu', {
              menu: Object.freeze(data.data),
              // perms: ['*'],
            })
            resolve()
          }
        })
      })
    },
  },
}