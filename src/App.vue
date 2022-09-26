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
};
</script>
<style lang="less">
@import 'animate.css';
@import 'common.less';
</style>
