const router = [
    {
        path: '/login',
        meta: {
            title: '登录'
        },
        component: (resolve) => require(['../views/login.vue'], resolve)
    },
    {
        path: '/',
        meta: {
            title: '首页'
        },
        component: (resolve) => require(['../views/index.vue'], resolve)
    },
    {
        path: '/index',
        meta: {
            title: '首页'
        },
        component: (resolve) => require(['../views/index.vue'], resolve)
    }
];

export  default router
