<template>
  <div class="app-header">
    <router-link to="/">index</router-link>&emsp;
    <router-link :to="{ path: '/ws', query: { id: 10 } }">ws</router-link>&emsp;
    <router-link :to="{ name: 'slot', params: { id: 10 } }">slot</router-link>&emsp;
    <router-link :to="{ name: 'mail', params: { id: 10 } }">mail</router-link>
  </div>
</template>

<script>
export default {
  name: 'appHeader',
};
</script>

<style lang="less" scoped>
.app-header {
  height: 60px;
  display: flex;
  align-items: center;
  background: #eaeaea;
}
</style>
