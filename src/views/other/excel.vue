<template>
  <div>
    <el-button @click="exportExcel"> 导出 </el-button>
    <input type="file" @change="upfile" class="upfile" />
  </div>
</template>

<script>
import writeXlsxFile from 'write-excel-file'
import readXlsxFile from 'read-excel-file'
import {title, row2, row3, row4, row5 } from './excelData'

const Excel = require('exceljs')
export default {
  name: 'AppExcel',
  data() {
    return {}
  },
  methods: {
    exportExcel() {
      const data = [
        title,
        row2,
        row3,
        row4,
        row5
      ]
        console.log(data)
      writeXlsxFile(data,
        {
          headerStyle: {
            height: 30,
            fontSize: 16,
          },
          width: 20,
          fileName: '成功人力资源集团服务计算单.xlsx',
        }
      )
    },
    async upfile(e) {
      const file = e.target.files[0]
      readXlsxFile(file).then((rows) => {
        console.log(rows)
      })
      
      const workbook = new Excel.Workbook();
      const data = await workbook.xlsx.load(file)
      console.log(data)
      const sheet = data.getWorksheet(1);
      sheet.eachRow(function(rows, rowNumber){
        let arr = []
        rows.eachCell(function(cell, index){
          arr.push(cell.value)
        })
      console.log(arr)
      })
      const rows = sheet.getRows()
      console.log(rows)
    },
  },
}
</script>
