import Vue from 'vue';

Vue.directive('preventClick', {
  inserted(el) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true;
        setTimeout(() => {
          el.disabled = false;
        }, 300);
      }
    });
  },
  unbind(el) {
    el.removeEventListener('click', () => {});
  },
});
