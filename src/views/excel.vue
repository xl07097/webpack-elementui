<template>
  <div>
    <el-button @click="exportExcel"> 导出 </el-button>
    <input type="file" @change="upfile" class="upfile" />
  </div>
</template>

<script>
import writeXlsxFile from 'write-excel-file'
import readXlsxFile from 'read-excel-file'

export default {
  name: 'AppExcel',
  data() {
    return {}
  },
  methods: {
    exportExcel() {
      const data = [
        {
          name: 'John Smith',
          dateOfBirth: 'John Smith',
          cost: 1800,
          paid: true,
        },
        {
          name: 'Alice Brown',
          dateOfBirth: 'John Smith',
          cost: 2599.99,
          paid: false,
        },
      ]
      const schema = [
        {
          column: '姓名',
          type: String,
          width: 30,
          span: 2,
          fontSize: 18,
          height: 24,
          value: (student) => student.name,
        },
        {
          column: '出生日期',
          width: 14,
          color: '#ff0000',
          fontSize: 18,
          value: (student) => student.dateOfBirth,
        },
      ]
      writeXlsxFile(data, {
        schema,
        headerStyle: {
          height: 30,
          fontWeight: 'bold',
          fontSize: 18,
        },
        fileName: 'file2.xlsx',
      })
      writeXlsxFile(
        [
          [
            {
              value: 'name',
              rowSpan: 1,
              span: 2,
              fontWeight: 'bold',
              height: 30,
              alignVertical: 'center',
            },
            {
              value: 'age',
              fontWeight: 'bold',
              height: 30,
              alignVertical: 'center',
            },
            {
              value: 'sex',
              fontWeight: 'bold',
              height: 30,
              alignVertical: 'center',
            },
          ],
          [
            {
              value: 'name',
              height: 30,
              fontWeight: 'bold',
            },
            {
              value: 'age',
              height: 30,
              fontWeight: 'bold',
            },
            {
              value: 'sex',
              height: 30,
              fontWeight: 'bold',
            },
          ],
          [
            {
              value: 'hha',
              rowSpan: 1,
              span: 1,
            },
            {
              value: 'hha',
            },
            {
              value: 'hha',
            },
          ],
        ],
        {
          fileName: 'file.xlsx',
          fontSize: 14,
        }
      )
    },
    upfile(e) {
      const file = e.target.files[0]
      readXlsxFile(file).then((rows) => {
        console.log(rows)
      })
    },
  },
}
</script>
