<template>
  <div>
    <el-upload
      class="upload-demo"
      drag
      action="/api/upload/file"
      :on-success="handleSuccess"
      :headers="header"
      :with-credentials="true"
      name="upfile"
      :file-list="fileList"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
import { storage } from '@/utils/storage'

export default {
  data(){
    return {
      fileList:[],
      header:{
        token: storage.getItem('token')
      }
    }
  },
  methods:{
    handleSuccess(res, file){
      this.fileList.push({
        name: file.name,
        url:res.data
      })
      console.log(res)
    }
  }
}
</script>

<style>

</style>