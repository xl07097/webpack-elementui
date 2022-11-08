<template>
  <div>
    <app-header />
    <router-view />
  </div>
</template>
<script>
import AppHeader from '@/layout/header/app-header';

export default {
  name: 'App',
  components: {
    AppHeader
  },
  mounted() {
    window.addEventListener('error', (eventErr) => {
      const filename = eventErr.filename || ''
      if (/(.css|.js)$/.test(filename)) {
        if (this.hasDialog) {
          return
        }
        this.hasDialog = true
        this.$alert('因版本更新，页面需重新载入以加载对应资源！', '提示', {
          confirmButtonText: '确定',
          callback: () => {
            window.location.reload(true)
          },
        })
      }
      eventErr.preventDefault()
    }, true)
  },
};
</script>
<style lang="scss">
@import './styles/animate.css';
@import './styles/common.scss';
@import './styles/theme-variable.scss';
// div {
//   background: $--color-primary;
// }
</style>