const routers = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'index',
    meta: {
      title: '首页',
    },
    component: (resolve) => require(['@/views/index.vue'], resolve),
  },
  // {
  //   path: '/file',
  //   name: 'file',
  //   meta: {
  //     title: '首页',
  //   },
  //   component: (resolve) => require(['@/views/file.vue'], resolve),
  // },
  // {
  //   path: '/ws',
  //   name: 'ws',
  //   meta: {
  //     title: '首页',
  //   },
  //   component: (resolve) => require(['@/views/ws.vue'], resolve),
  // },
  // {
  //   path: '/slot/:id',
  //   name: 'slot',
  //   props: true,
  //   meta: {
  //     title: 'slot',
  //   },
  //   component: (resolve) => require(['@/views/Slot.vue'], resolve),
  // },
  // {
  //   path: '/mail/:id',
  //   name: 'mail',
  //   props: true,
  //   meta: {
  //     title: 'mail',
  //   },
  //   component: (resolve) => require(['@/views/SendMail.vue'], resolve),
  // },
  // {
  //   path: '/table',
  //   name: 'table',
  //   meta: {
  //     title: 'table',
  //   },
  //   component: (resolve) => require(['@/views/TestTable.vue'], resolve),
  // },
  // {
  //   path: '/waterFall',
  //   name: 'waterFall',

  //   meta: {
  //     title: 'waterFall',
  //   },
  //   component: (resolve) => require(['@/views/WaterFall.vue'], resolve),
  // },
  // {
  //   path: '/testCom2',
  //   name: 'testCom2',
  //   meta: {
  //     title: 'testCom2',
  //   },
  //   component: (resolve) => require(['@/views/TestCom2.vue'], resolve),
  // },
  // {
  //   path: '/excel',
  //   name: 'excel',
  //   meta: {
  //     title: 'excel',
  //   },
  //   component: (resolve) => require(['@/views/excel.vue'], resolve),
  // },
  // {
  //   path: '/testCom',
  //   name: 'testCom',
  //   meta: {
  //     title: 'testCom',
  //   },
  //   component: (resolve) => require(['@/views/TestCom2.vue'], resolve),
  // },
  // {
  //   path: '/infiniteScroll',
  //   name: 'infiniteScroll',
  //   props: true,
  //   meta: {
  //     title: 'infiniteScroll',
  //   },
  //   component: (resolve) => require(['@/views/InfiniteScroll.vue'], resolve),
  // },
  {
    path: '*',
    name: '404',
    redirect: '/',
  },
];

export default routers;
