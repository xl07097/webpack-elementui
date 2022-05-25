import router from './index';
import store from '../store/store';

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    sessionStorage.clear();
    next();
    return;
  }

  let userId = sessionStorage.getItem('loginUserId');
  if (!userId) {
    next('/login');
    return;
  }

  // 刷新状态 ---- 重新获取路由
  if (store.state.refresh === false) {
    store.dispatch('getMenu').then(() => {
      next({ ...to }); // hack方法 确保addRoutes已完成
    });
    return;
  }
  let perms = store.state.perms || [];
  if ((perms.length === 1 && perms[0] === '*') || perms.includes(to.name)) {
    next();
    return;
  }

  next('/');
});

router.afterEach(() => {
  window.scrollTo(0, 0);
});
