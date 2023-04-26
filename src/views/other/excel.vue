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
      // readXlsxFile(file).then((rows) => {
      //   console.log(rows)
      // })

      const schema = {
        '一级损益': {
          prop: 'P1',
          type: String
        },
        '二级损益': {
          prop: 'P2',
          type: String
        },
        '三级损益': {
          prop: 'P3',
          type: String
        },
        '项目管理系统-运营部门': {
          prop: 'P4',
          type: String
        },
        '是否看下级': {
          prop: 'P5',
          type: String
        },
      }

      readXlsxFile(file, { schema }).then(({ rows, errors }) => {
        console.log(rows);
      });
    },
  },
}
</script>
<style lang="scss">

</style>