<template>
  <div>
    <input v-model="name" type="text" placeholder="用户名称" />
    <button type="button" @click="login">登录</button>
  </div>
</template>

<script>
import { post } from '@/http/request'
import { baseStorage } from '@/utils/storage'
export default {
  name: 'Login',
  data() {
    return {
      name: '',
    }
  },
  methods: {
    login() {
      post('/login', {
        name: this.name || 'xueliang',
        password: '28b064f575db2448c49c1db52e067d6d',
      }).then((res) => {
        if (res.code === 200) {
          baseStorage.setItem('token', res.data.token)
          baseStorage.setItem('refreshToken', res.data.refreshToken)
          this.$store.commit('setLoginUser', res.data.user)
          this.$router.push('/excel')
        }
      })
    },
  },
}
</script>

<style></style>
