<template>
  <div>
    <el-button @click="exportExcel">
      导出
    </el-button>
  </div>
</template>

<script>
import writeXlsxFile from 'write-excel-file';

export default {
  name: 'AppExcel',
  data() {
    return {};
  },
  methods: {
    exportExcel() {
      const data = [
        {
          name: 'John Smith',
          dateOfBirth: 'John Smith',
          cost: 1800,
          paid: true
        },
        {
          name: 'Alice Brown',
          dateOfBirth: 'John Smith',
          cost: 2599.99,
          paid: false
        },
      ];
      const schema = [
        {
          column: 'Name',
          type: String,
          width: 14,
          span: 2,
          height: 10,
          value: (student) => student.name
        },
        {
          column: 'Date of Birth',
          width: 14,
          color: '#ff0000',
          value: (student) => student.dateOfBirth
        }
      ];
      writeXlsxFile(
        [
          [
            {
              value: 'name',
              rowSpan: 1,
              span: 2,
              fontWeight: 'bold',
              height: 30,
              alignVertical: 'center'
            },
            {
              value: 'age',
              fontWeight: 'bold',
              height: 30,
              alignVertical: 'center'
            },
            {
              value: 'sex',
              fontWeight: 'bold',
              height: 30,
              alignVertical: 'center'
            }
          ],
          [
            {
              value: 'name',
              height: 30,
              fontWeight: 'bold'
            },
            {
              value: 'age',
              height: 30,
              fontWeight: 'bold'
            },
            {
              value: 'sex',
              height: 30,
              fontWeight: 'bold'
            }
          ],
          [
            {
              value: 'hha',
              rowSpan: 1,
              span: 1
            },
            {
              value: 'hha'
            },
            {
              value: 'hha'
            }
          ],
          [
            {
              value: 'hha',
              height: 30,
            },
            {
              value: 'hha'
            },
            {
              value: 'hha'
            }
          ]
        ],
        {
          fileName: 'file.xlsx',
          fontSize: 14
        }
      );
    }
  }
};
</script>

