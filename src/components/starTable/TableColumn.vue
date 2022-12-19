<template>
  <!-- 
    :title="column.title"
    :field="column.field" -->
  <VxeColumn min-width="140px" v-bind="columns">
    <template #header v-if="$slots.header">
      <slot name="header" />
    </template>
    <template
      #default="{ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, _columnIndex }"
    >
      <slot
        :row="row"
        :rowIndex="rowIndex"
        :$rowIndex="$rowIndex"
        :column="column"
        :columnIndex="columnIndex"
        :$columnIndex="$columnIndex"
        :_columnIndex="_columnIndex"
      />
    </template>
  </VxeColumn>
</template>

<script>
export default {
  name: 'TableColumn',
  props: {
    columns: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style></style>
