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
        component: (resolve) => require(['../views/index.vue'], resolve)
    },
    {
        path: '*',
        redirect: '/index'
    }
];

export default routers;
