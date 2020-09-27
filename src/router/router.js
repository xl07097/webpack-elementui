const routers = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        name: 'index',
        meta: {
            title: '首页'
        },
        component: (resolve) => require(['@/views/index.vue'], resolve)
    },
    {
        path: '/ws',
        name: 'ws',
        meta: {
            title: '首页'
        },
        component: (resolve) => require(['@/views/ws.vue'], resolve)
    },
    {
        path: '/slot/:id',
        name: 'slot',
        props: true,
        meta: {
            title: 'slot'
        },
        component: (resolve) => require(['@/views/Slot.vue'], resolve)
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
        name: '404',
        redirect: '/index'
    }
];

export default routers;
