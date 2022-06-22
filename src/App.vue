<template>
  <div>
    <app-header />
    <router-view />
  </div>
</template>
<script>
import AppHeader from '@/components/header/app-header';

export default {
  name: 'App',
  components: {
    AppHeader
  },
  created() {
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('tmpData', '909090');
    });

    console.log(sessionStorage.getItem('tmpData'));
    sessionStorage.removeItem('tmpData');
  }
};
</script>
<style lang="less">
@import 'animate.css';
@import 'common.less';
</style>
