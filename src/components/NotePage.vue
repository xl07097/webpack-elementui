<template>
  <el-pagination
    :current-page="pageNo"
    :page-size="pageSize"
    :layout="layout"
    :total="total"
    :page-sizes="pageSizes"
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
  data(){
    return {
      pageThrottle: false
    }
  },
  methods: {
    handleSizeChange(size) {
      this.pageSizeSearch(1, size)
    },
    handleCurrentChange(page) {
      this.pageSizeSearch(page, this.pageSize)
    },
    pageSizeSearch(page, pageSize) {
      if (this.pageThrottle === true) {
        return
      }
      this.pageThrottle = true
      this.$emit('update:pageNo', page)
      this.$emit('update:pageSize', pageSize)
      this.$emit('pageSizeSearch', page, pageSize)
      this.pageThrottle = false
    },
  },
}
</script>
