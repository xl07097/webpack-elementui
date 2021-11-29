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
          dateOfBirth: new Date(),
          cost: 1800,
          paid: true,
        },
        {
          name: 'Alice Brown',
          dateOfBirth: new Date(),
          cost: 2599.99,
          paid: false,
        },
      ];
      const schema = [
        {
          column: 'Name',
          value: (student) => student.name,
        },
        {
          column: 'Cost',
          value: (student) => student.cost,
        },
      ];

      await writeXlsxFile(data, {
        schema,
        fileName: 'file.xlsx',
      });
    },
  },
};
</script>

<style></style>
