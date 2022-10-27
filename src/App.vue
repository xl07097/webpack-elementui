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
@import './styles/animate.css';
@import './styles/common.less';

</style>
<style lang="scss">
@import './styles/theme-variable.scss';
div {
  background: $--color-primary;
}
</style>