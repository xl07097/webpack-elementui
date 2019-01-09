<template>
  <div id="app">
    <router-link to="index">首页</router-link>
    <router-link to="/">登录</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      msg: "测试依赖与注入"
    }
  },
  created() {}
};
</script>


<style  lang="less">
html,
body,
#app {
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>

