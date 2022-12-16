<template>
  <div>
    <el-button @click="exportExcel"> 导出 </el-button>
    <input type="file" @change="upfile" class="upfile" />
    <el-form size="small">
      <ElFormItem label="运营部门:" prop="operationDeptIdList">
        <ElCascader
          ref="dept"
          v-model="operationDeptIdList"
          placeholder="请选择运营部门"
          :options="options"
          :props="props"
          filterable
          :clearable="false"
        />
      </ElFormItem>
    </el-form>
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
      operationDeptIdList: [],
      props: { multiple: false },
      options: [
        {
          value: 1,
          label: '东南',
          children: [
            {
              value: 2,
              label: '上海',
              children: [
                { value: 3, label: '普陀' },
                { value: 4, label: '黄埔' },
                { value: 5, label: '徐汇' },
              ],
            },
            {
              value: 7,
              label: '江苏',
              children: [
                { value: 8, label: '南京' },
                { value: 9, label: '苏州' },
                { value: 10, label: '无锡' },
              ],
            },
            {
              value: 12,
              label: '浙江',
              children: [
                { value: 13, label: '杭州' },
                { value: 14, label: '宁波' },
                { value: 15, label: '嘉兴' },
              ],
            },
          ],
        },
        {
          value: 17,
          label: '西北',
          children: [
            {
              value: 18,
              label: '陕西',
              children: [
                { value: 19, label: '西安' },
                { value: 20, label: '延安' },
              ],
            },
            {
              value: 21,
              label: '新疆维吾尔族自治区',
              children: [
                { value: 22, label: '乌鲁木齐' },
                { value: 23, label: '克拉玛依' },
              ],
            },
          ],
        },
      ],
    }
  },
  methods: {
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
  },
}
</script>
