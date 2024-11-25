import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router';

Vue.use(VueRouter);

const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error);
};

export default new VueRouter({
  mode: 'history',
  routes: router,
});
