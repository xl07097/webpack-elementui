<template>
  <div>
    <el-button @click="exportExcel"> 导出 </el-button>
    <input type="file" class="upfile" @change="upfile">
    <el-button @click="exportExcel"> 上传 </el-button>
  </div>
</template>

<script>
import LargeFileUpload from '@/utils/LargeFileUpload'
import writeXlsxFile from 'write-excel-file'
import { title, row2, row3, row4, row5 } from './excelData'

export default {
  name: 'AppExcel',
  data() {
    return {
      
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
      const file = e.target.files[0]
      new LargeFileUpload(file, 'http://localhost:3003/upload/chunk', {})
    },
  },
}
</script>
<style lang="scss">

</style>