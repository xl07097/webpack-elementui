import router from './index'
import store from '../store/store'
import { storage, baseStorage } from '@/utils/storage'

router.beforeEach((to, _from, next) => {
  store.commit('permission/setShapshot', to.meta)
  if (to.path === '/login') {
    storage.clear()
    next()
    return
  }

  const token = baseStorage.getItem('token')
  if (!token) {
    next('/login')
    return
  }

  // 刷新状态 ---- 重新获取路由
  if (store.state.permission.refresh === false) {
    store.dispatch('permission/getMenu').then(() => {
      next({ ...to }) // hack方法 确保addRoutes已完成
    })
    return
  }
  next()
})

router.afterEach(() => {
  window.scrollTo(0, 0)
})
