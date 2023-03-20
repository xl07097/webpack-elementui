<template>
  <el-pagination
    :current-page="pageNo"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    :layout="layout"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script>
export default {
  props: {
    pageNo: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 30,
    },
    total: {
      type: Number,
      default: 0,
    },
    pageSizes: {
      type: Array,
      default() {
        return [30, 50, 100]
      },
    },
    layout:{
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    }
  },
  methods: {
    handleSizeChange(size) {
      this.$emit('pageSize', this.pageNo, size)
    },
    handleCurrentChange(page) {
      this.$emit('pageSize', page, this.pageSize)
    },
  },
}
</script>
