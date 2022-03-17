import router from './index';

router.beforeEach((to, from, next) => {
  let user = sessionStorage.getItem('sportHealthUserName');
  if (!user && to.path !== '/login') {
    sessionStorage.clear();
    next('/login');
  } else {
    if (to.path === '/login' || to.path === '/') {
      sessionStorage.clear();
      next();
    } else if (to.path === '/index') {
      next();
    } else {
      let permission = JSON.parse(sessionStorage.getItem('permission'));
      if (permission.indexOf(to.name) !== -1) {
        next();
      } else {
        next('/index');
      }
    }
  }
});

router.afterEach(() => {
  window.scrollTo(0, 0);
});
