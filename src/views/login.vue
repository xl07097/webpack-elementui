<template>
  <div>
    <button type="button" @click="login">登录</button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    login() {
      sessionStorage.setItem('loginUserId', '0379');
      this.$router.push('/index');
    },
  },
};
</script>

<style></style>
