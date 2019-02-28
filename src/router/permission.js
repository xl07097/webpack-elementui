import router from './index';

router.beforeEach((to, from, next) => {
    let user = sessionStorage.getItem("username");
    if(user){
        if(to.path === '/login'){
            next();
        }else{
            sessionStorage.clear();
            next('/login')
        }
    }else{
        next('/login')
    }
})