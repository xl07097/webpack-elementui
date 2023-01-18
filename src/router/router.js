const routers = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'login',
    },
    component: (resolve) => require(['@/views/login.vue'], resolve),
  },
  {
    path: '/index',
    name: 'index',
    meta: {
      title: '首页',
    },
    component: (resolve) => require(['@/views/index.vue'], resolve),
  },
  {
    path: '/ws',
    name: 'ws',
    meta: {
      title: '首页',
    },
    component: (resolve) => require(['@/views/other/ws.vue'], resolve),
  },
  {
    path: '/waterFall',
    name: 'waterFall',

    meta: {
      title: 'waterFall',
    },
    component: (resolve) => require(['@/views/other/WaterFall.vue'], resolve),
  },
  {
    path: '/excel',
    name: 'excel',
    meta: {
      title: 'excel',
    },
    component: (resolve) => require(['@/views/other/excel.vue'], resolve),
  },
  {
    path: '/infiniteScroll',
    name: 'infiniteScroll',
    meta: {
      title: 'infiniteScroll',
    },
    component: (resolve) => require(['@/views/other/InfiniteScroll.vue'], resolve),
  },
  {
    path: '/three',
    name: 'three',
    meta: {
      title: 'three',
    },
    component: (resolve) => require(['@/views/tools/three/index.vue'], resolve),
  },
  // {
  //   path: '*',
  //   name: '404',
  //   redirect: '/index',
  // },
];

export default routers;
