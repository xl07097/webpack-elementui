<template>
  <div>
    <el-button @click="exportExcel"> 导出 </el-button>
    <input type="file" @change="upfile" class="upfile" />
    <el-popover
      placement="bottom-end"
      title=""
      width="200"
      trigger="click"
      popper-class="table-column-popover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    >
      <el-checkbox
        class="table-column-all-check"
        v-model="all"
        label="全选"
        @change="changeAll"
      ></el-checkbox>
      <el-checkbox-group class="table-column-filter" @change="changeSingle" v-model="checkList" size="mini">
        <el-checkbox label="1">1</el-checkbox>
        <el-checkbox label="2">2</el-checkbox>
        <el-checkbox label="3">3</el-checkbox>
        <el-checkbox label="4">4</el-checkbox>
        <el-checkbox label="5">5</el-checkbox>
        <el-checkbox label="6">6</el-checkbox>
        <el-checkbox label="7">7</el-checkbox>
        <el-checkbox label="8">8</el-checkbox>
        <el-checkbox label="9">9</el-checkbox>
      </el-checkbox-group>
      <div class="table-column-popover-footer">
        <el-button type="text">还原</el-button>
        <el-button type="text" @click="confirm">确定</el-button>
      </div>
      <el-button slot="reference">手动激活</el-button>
    </el-popover>
  </div>
</template>

<script>
import writeXlsxFile from 'write-excel-file'
import readXlsxFile from 'read-excel-file'
import { title, row2, row3, row4, row5 } from './excelData'

const Excel = require('exceljs')
export default {
  name: 'AppExcel',
  data() {
    return {
      visible: false,
      checkList: [],
      all: false,
    }
  },
  methods: {
    changeAll(val) {
      if(val){
        this.checkList = ['1','2','3','4','5','6','7','8','9']
      }else{
        this.checkList = []
      }
    },
    changeSingle(val){
      this.all = val.length === 9
    },
    exportExcel() {
      const data = [title, row2, row3, row4, row5]
      console.log(data)
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

      const workbook = new Excel.Workbook()
      const data = await workbook.xlsx.load(file)
      const sheet = data.getWorksheet(1)
      sheet.eachRow(function (rows, rowNumber) {
        let arr = []
        rows.eachCell(function (cell, index) {
          arr.push(cell.text)
          // console.log(cell)
        })
        console.log(rows)
      })
    },
    confirm(){
      this.$nextTick(() => {
        document.body.click()
      })
    }
  },
}
</script>

<style lang="scss">
.table-column-popover {
  padding: 0;
}
.table-column-all-check {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 1em;
  margin-bottom: 4px;
  border-bottom: 1px solid #dadce0;
}
.table-column-filter {
  display: flex;
  flex-direction: column;
  max-height: 240px;
  overflow-y: auto;
  .el-checkbox {
    flex: none;
    margin: 0;
    display: inline-flex;
    align-items: center;
    height: 34px;
    padding: 0 1em;
  }
  .el-checkbox:hover {
    background: #f5f7fa;
  }
}
.table-column-popover-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
  border-top: 1px solid #dadce0;
  .el-button {
    padding: 10px 16px;
    font-size: 14px;
    flex: 1;
  }
}
</style>
