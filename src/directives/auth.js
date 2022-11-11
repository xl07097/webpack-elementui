import Vue from 'vue'

Vue.directive('auth', function (el, binding) {
  if (binding.value === 2) {
    el.style.display = 'none'
  } else {
    el.style.display = ''
  }
  console.log(binding)
})
