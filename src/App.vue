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
<style lang="scss">
@import './styles/animate.css';
@import './styles/common.scss';
@import './styles/theme-variable.scss';
div {
  background: $--color-primary;
}
</style>