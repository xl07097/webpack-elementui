<template>
  <div id="login">
    <b-map></b-map>
  </div>
</template>

<script>
import BMap from '@/components/BMap'
export default {
  name: "login",
  components: {
    BMap
  },
  data() {
    return {};
  },
  methods: {
    login() {}
  }
};
</script>

<style lang="less" scoped>
#login {
  color: red;
}
</style>
