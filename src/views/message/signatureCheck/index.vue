<template>
  <div>
    <el-button @click="test">测试token</el-button> 
  </div>
</template>

<script>
import { post, get, downloadPost } from '@/http/request'
import { storage } from '@/utils/storage'
export default {
  name: 'SignatureCheck',
  data(){
    return {

    }
  },
  mounted(){
    console.log(window.lp?.lk)
  },
  methods:{
    test(){
      storage.removeItem('token')
      get('/article/list').then(console.log)
      post('/dept/list').then(console.log)
      downloadPost('user/export').then(console.log)
    }
  }
}
</script>

<style>

</style>
