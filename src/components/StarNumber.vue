<template>
  <div class="input-wraps" :class="($slots.append||append) ? 'input-wrap' : ''">
    <ElInputNumber
      v-bind="$attrs"
      :style="styles"
      v-on="$listeners"
    />
    <div
      v-if="$slots.append || append"
      class="el-input-group__append"
    >
      <slot name="append">
        {{ append }}
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShNumber',
  props: {
    styles: {
      default: '',
      type: String,
    },
    append: {
      default: '',
      type: String,
    },
  },
}
</script>

<style lang="scss">
.input-wraps {
  display: inline-table;
  width: 250px;
  >.el-input-number{
    display: block;
    width: auto;
    .el-input__inner{
      text-align: left;
    }
  }
}
.input-wrap {
  display: inline-table;
  width: auto;
  .el-input-number.is-controls-right .el-input__inner {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  > .el-input-group__append {
    padding: 0 10px;
    line-height: 30px;
  }
}
</style>
