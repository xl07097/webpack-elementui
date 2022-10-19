<template>
  <div>
    <el-form label-width="100px" label-position="right" inline ref="form" :model="obj" :rules="rules">
      <el-form-item  label="姓名" prop="name"><el-input v-model="obj.name"></el-input></el-form-item>
      <el-form-item label="密码" prop="pwd"><el-input v-model="obj.pwd"></el-input></el-form-item>
      <Address v-model="obj.address"></Address>
      <el-button type="primary" @click="submit"> 获取 </el-button>
    </el-form>
  </div>
</template>

<script>
import Address from '@/views/other/Address'
export default {
  name: 'NoticeInfo',
  components:{Address},
  data(){
    return {
      
      obj: {
        name: '',
        pwd: '',
        address: [
          {
            provice: '',
            city: '',
          },
        ],
      },
      rules: {
        name: [{ required: true }],
        pwd: [{ required: true }],
      },
    }
  },
  methods:{
    submit() {
      this.$refs.form.validate(() => {
        console.log(this.obj)
      })
    },
  }
}
</script>

<style>

</style>
