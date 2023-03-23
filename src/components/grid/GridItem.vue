<template>
  <div class="grid-layout-item">
    <div class="grid-layout-label">
      {{ label }}
    </div>
    <div class="grid-layout-value">
      {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'GridItem',
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
  },
}
</script>

<style lang="scss">
.grid-layout-item {
  display: inline-flex;
  padding-right: 24px;
  width: 25%;
  line-height: 22px;
  box-sizing: border-box;
  font-size: 14px;
  color: #484949;

  .grid-layout-label {
    flex: none;
  }

  .grid-layout-value {
    flex: 1;
    word-break: break-all;
    color: #0b0b0b;
  }
}
</style>
