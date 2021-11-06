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
          name: "jack",
          age: "22",
        },
        {
          name: "tom",
          age: "30",
        },
      ];

      const schemas = [
        {
          column: "姓名",
          value: (row) => row.name,
        },
        {
          column: "年龄",
          value: (row) => row.age,
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
