import router from './index';
import {LoadingBar,Message} from 'iview';

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
            LoadingBar.start();
            next();
        } else {
            let permission = JSON.parse(sessionStorage.getItem('permission'));
            if (permission.indexOf(to.name) !== -1) {
                LoadingBar.start();
                next();
            } else {
                // Message.error('暂无权限');
                next();
                // next('/index');
            }
        }
    }
});

router.afterEach(() => {
    LoadingBar.finish();
    window.scrollTo(0, 0);
});
