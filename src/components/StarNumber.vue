<template>
  <div :class="$slots.append ? 'input-wrap' : 'input-wraps'">
    <ElInputNumber
      v-bind="$attrs"
      v-on="$listeners"
    />
    <div
      v-if="$slots.append"
      class="el-input-group__append"
    >
      <slot name="append" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShNumber',
};
</script>

<style lang="less">
.input-wraps {
  display: inline-table;
}
.input-wrap {
  display: inline-table;
  .el-input-number.is-controls-right .el-input__inner {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  > .el-input-group__append {
    padding: 0 10px;
  }
}
</style>
