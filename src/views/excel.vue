<template>
  <div>
    <el-button @click="exportExcel">导出</el-button>
    <div class="xl-card">
      <div class="xl-card-img"></div>
      <div class="xl-card-content">
        <div class="xl-card-title">ha标题</div>
        <div class="xl-card-desc">描述</div>
      </div>
    </div>
  </div>
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
          width: 12,
          value: (student) => student.name,
        },
        {
          column: 'Date of Birth',
          value: (student) => student.dateOfBirth,
        },
      ];
      await writeXlsxFile(data, {
        schema: schema,
        fileName: 'file.xlsx',
      });
    },
  },
};
</script>

<style lang="less">
.xl-card {
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  width: 220px;
  height: 66px;
  border: 1px solid #eee;
  padding: 6px 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 10%);
  cursor: pointer;
  .xl-card-content {
    display: inline-flex;
    flex-direction: column;
  }
  .xl-card-title {
    font-size: 12px;
    font-weight: 600;
  }
  .xl-card-desc {
    font-size: 12px;
  }
}
</style>
