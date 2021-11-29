<template>
  <div>
    <el-button @click="exportExcel">导出</el-button>
  </div>
</template>

<script>
import writeXlsxFile from "write-excel-file";
export default {
  name: "WriteExcel",
  data() {
    return {};
  },
  methods: {
    exportExcel() {
      let data = [
        {
          name: "John Smith",
          dateOfBirth: "John Smith",
          cost: 1800,
          paid: true,
        },
        {
          name: "Alice Brown",
          dateOfBirth: "John Smith",
          cost: 2599.99,
          paid: false,
        },
      ];

      const schemas = [
        {
          column: "Name",
          type: String,
          width: 90,
          value: (student) => student.name,
        },
        {
          column: "Date of Birth",
          value: (student) => student.dateOfBirth,
        },
      ];
      writeXlsxFile(data, {
        schema: schemas,
        fileName: "file.xlsx",
      }).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style></style>
