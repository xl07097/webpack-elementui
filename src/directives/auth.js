import Vue from 'vue'
import store from '@/store/store'

Vue.directive('auth', function (el, binding) {
  const meta = store.state.permission.shapshot || {}
  const authrity = meta.authrity || []
  console.log(binding)
  if (!authrity.some(item => item.functionName === binding.value)) {
    el.parentNode && el.parentNode.removeChild(el)
  }
})
