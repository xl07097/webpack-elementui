import Vue from 'vue';

Vue.directive('auto-height', {
  bind(el, binding, vnode, oldVnode) {
    console.log('bind');
  },
  inserted(el, binding, vnode, oldVnode) {
    console.log('inserted');

    el.style.height = '100px';
    el.style.border = '1px solid green';
    console.log(el.getBoundingClientRect());
  },
  update(el, binding, vnode, oldVnode) {
    console.log('update');
  },
  componentUpdated(el, binding, vnode, oldVnode) {
    console.log('componentUpdated');
  },
  unbind(el, binding, vnode, oldVnode) {
    console.log('unbind');
  },
});
