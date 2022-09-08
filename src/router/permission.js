import router from './index';
import store from '../store/store';

router.beforeEach((to, _from, next) => {
  // debugger
  if (to.path === '/login') {
    sessionStorage.clear();
    next();
    return;
  }

  const token = sessionStorage.getItem('token');
  if (!token) {
    next('/login');
    return;
  }

  // 刷新状态 ---- 重新获取路由
  if (store.state.menu.refresh === false) {
    store.dispatch('menu/getMenu').then(() => {
      next({ ...to }); // hack方法 确保addRoutes已完成
    });
    return;
  }
  const perms = store.state.menu.perms || [];
  if ((perms.length === 1 && perms[0] === '*') || perms.includes(to.name)) {
    next();
    return;
  }

  next('/');
});

router.afterEach(() => {
  window.scrollTo(0, 0);
});
