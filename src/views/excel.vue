<template>
  <el-button @click="exportExcel">导出</el-button>
</template>

<script>
import writeXlsxFile from 'write-excel-file';
export default {
  name: 'Excel',
  data() {
    return {};
  },
  methods: {
    async exportExcel() {
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
      ];
      const schema = [
        {
          column: 'Name',
          type: String,
          width: 10,
          value: (student) => student.name,
        },
        {
          column: 'Date of Birth',
          value: (student) => student.dateOfBirth,
        },
      ];
      writeXlsxFile(data, {
        schema: schema,
        fileName: 'file.xlsx',
      }).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style></style>
