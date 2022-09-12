<template>
  <div>
    <button type="button" @click="login">登录</button>
    <button type="button" @click="exportss">导出</button>
  </div>
</template>

<script>
import { post, downloadPost } from '@/http/request'
export default {
  name: 'Login',
  methods: {
    login() {
      post('/login', {
        name: 'jack',
        password: '28b064f575db2448c49c1db52e067d6d',
      }).then((res) => {
        if (res.code === 200) {
          sessionStorage.setItem('token', res.data.token)
          sessionStorage.setItem('loginUserId', JSON.stringify(res.data.user))
          this.$router.push('/excel')
        }
      })
    },
    exportss() {
      downloadPost('/user/export').then((res) => {})
    },
  },
}
</script>

<style></style>
