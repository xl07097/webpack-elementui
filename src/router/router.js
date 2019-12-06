const routers = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        meta: {
            title: '首页'
        },
        component: (resolve) => require(['@/views/index.vue'], resolve)
    },
    {
        path: '/ws',
        meta: {
            title: '首页'
        },
        component: (resolve) => require(['@/views/ws.vue'], resolve)
    },
    // {
    //     path: '/animation',
    //     meta: {
    //         title: '首页'
    //     },
    //     component: (resolve) => require(['@/components/Animation.vue'], resolve)
    // },
    {
        path: '*',
        redirect: '/index'
    }
];

export default routers;
