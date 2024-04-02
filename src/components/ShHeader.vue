<template>
  <div class="erp-form-header">
    <el-page-header :content="title" @back="back" />
  </div>
</template>

<script>
export default {
  name: 'ShHeader',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  methods: {
    back() {
      this.$emit('back')
    },
  },
}
</script>

<style lang="scss" scoped>
.erp-form-header {
	display: flex;
	align-items: center;
  margin: 6px 20px 14px;
	.head-parent-title {
		font-weight: 700;
		text-decoration: none;
		transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
		color: #303133;
		cursor: pointer;
	}
	.head-title {
		color: #606266;
		cursor: text;
		font-size: 12px;
	}
}
</style>
