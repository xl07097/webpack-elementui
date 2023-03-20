<template>
  <div class="grid-layout-item">
    <div class="grid-layout-label">
      {{ `${label}：` }}
    </div>
    <div class="grid-layout-value">
      {{ value || '' }}
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
