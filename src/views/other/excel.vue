<template>
  <div>
    <el-button @click="exportExcel"> 导出 </el-button>
    <input type="file" class="upfile" @change="upfile">
  </div>
</template>

<script>
import writeXlsxFile from 'write-excel-file'
import readXlsxFile from 'read-excel-file'
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
      readXlsxFile(file).then((rows) => {
        console.log(rows)
      })
    },
  },
}
</script>
<style lang="scss">
@keyframes moveX {
  to{
    transform: translateY(200px) translateX(100px);
  }
}
.el-icon-circle-plus-outline{
  font-size: 22px;
  animation: moveX 2s cubic-bezier(0.5, -0.5, 1, 1) forwards;
}
</style>