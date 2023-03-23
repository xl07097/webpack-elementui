<template>
  <div>
    <el-form
      ref="form"
      label-width="100px"
      label-position="right"
      inline
      :model="obj"
      :rules="rules"
    >
      <el-form-item label="姓名" prop="name"><el-input v-model="obj.name" /></el-form-item>
      <el-form-item label="密码" prop="pwd"><el-input v-model="obj.pwd" /></el-form-item>
      <Address v-model="obj.address" />
      <el-button type="primary" @click="submit"> 获取 </el-button>
    </el-form>
  </div>
</template>

<script>
import Address from './Address'
export default {
  name: 'NoticeInfo',
  components:{ Address },
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
      this.$refs.form.validate((isValid, err) => {
        console.log(err)
      })
    },
  }
}
</script>

<style>

</style>
