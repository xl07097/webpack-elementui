/**
 * 模块化 store
 * menu
 * 仅作学习使用
 */

import router from '@/router/index'
import { getPrivilegeMenu } from '@/apis/menu'
import { deepClone, tree2Array } from '@/utils/commons'

const add = function add({ path, name, pid, component, id, meta }) {
  router.addRoute({
    path: path,
    component: component
      ? () => import(`@/views/${component}`)
      : () => import('@/components/MiddlePage.vue'),
    name: name, // 命名路由
    meta: {
      ...meta,
    },
  })
}
const findQuestions = function findQuestions(tree) {
  const list = []
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

  return list
}
export default {
  namespaced: true,
  state: {
    menu: [], // 菜单树
    perms: [], // 权限list
    shapshot: {}, // 当前路由信息快照
    refresh: false, // 页面是否刷新，false 为刷新
  },
  getters: {
    menuGetter(state) {
      return tree2Array(state.menu)
    },
    routes(state) {
      return state.menu
    },
  },
  mutations: {
    // 同步 // 辅助函数 mapMutations
    setMenu(state, payload) {
      state.menu = payload.menu || []
      state.perms = payload.perms || []
      state.refresh = true
    },
    setShapshot(state, payload) {
      state.shapshot = Object.freeze(payload || {})
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
    resetLogin() {
      router.push('/login')
      // window.location.reload()
    },
  },
}
