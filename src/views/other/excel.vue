<template>
  <div>
    <el-button @click="exportExcel"> 导出 </el-button>
    <input
      type="file"
      multiple
      class="upfile"
      @change="upfile"
    >

    <FileUpload
      action="http://localhost:3003/upload/alioss"
      :file-list.sync="list"
      :limits="10"
      :headers="headers"
    />
  </div>
</template>

<script>
import writeXlsxFile from 'write-excel-file'
import { title, row2, row3, row4, row5 } from './excelData'
import batchRequest from '@/utils/ponyfill'
import FileUpload from '@/components/file/FileUpload.vue'
import { storage } from '@/utils/storage'
export default {
  name: 'AppExcel',
  components:{FileUpload},
  data() {
    return {
      list: [],
      headers:{
        AuthToken: 'W88G0R46WEUP9JXKOF6H71WI'
      }
    }
  },
  methods: {
    exportExcel() {
      const data = [title, row2, row3, row4, row5]
      writeXlsxFile(data, {
        headerStyle: {
          height: 30,
          fontWeight: 'bold',
          fontSize: 20,
        },
        width: 20,
        fileName: '成功人力资源集团服务计算单.xlsx',
      })
    },
    async upfile(e) {
      const files = e.target.files
      batchRequest([...files], {
        request: this.uploadFile
      }).then(console.log)
    },
    uploadFile(file){
      const formData = new FormData()
      formData.append('upfile', file)
      return fetch('http://localhost:3003/upload/alioss', {
        method: 'post',
        body: formData,
        headers:{
          'AuthToken': 'W88G0R46WEUP9JXKOF6H71WI'
        }
      }).then((res) => res.json())
    }
  },
}
</script>
<style lang="scss">

</style>