import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'lp-[name]',
    entry: 'http://localhost:8081/lp/app1',
    container: '#app1',
    activeRule: '/monitorCenter/operationlog',
  },
  // {
  //   name: 'lp-[name]',
  //   entry: '//localhost:8081/app2',
  //   container: '#sub-app',
  //   activeRule: '/app2',
  // },
]);
// 启动 qiankun
start();