<template>
  <div>
    <el-upload
      :headers="{token}"
      action="/note/upload/file"
      :file-list="fileList"
      name="upfile"
      :on-success="onSuccess"
    >
      <el-button>上传</el-button>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'OperationLog',
  data(){
    return {
      fileList: [],
      token: ''
    }
  },
  methods:{
    onSuccess(res){
      this.fileList.push({
        name: 'jj',
        url: res.data
      })
      
    }
  }
}
</script>

<style>

</style>
