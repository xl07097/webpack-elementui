<template>
  <div>
    <router-link to="/">index</router-link>
    <router-link to="/ws">ws</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "App"
};
</script>
<style lang="scss">
@import "common.less";
</style>
