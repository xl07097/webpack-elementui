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

// import Excel from 'exceljs'
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

      // const workbook = new Excel.Workbook()
      // const data = await workbook.xlsx.load(file)
      // const sheet = data.getWorksheet(1)
      // sheet.eachRow(function (rows, rowNumber) {
      //   let arr = []
      //   rows.eachCell(function (cell, index) {
      //     arr.push(cell.text)
      //   })
      //   console.log(rows)
      // })
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
  animation: 2s moveX cubic-bezier(0.5, -0.5, 1, 1) forwards;
}
</style>