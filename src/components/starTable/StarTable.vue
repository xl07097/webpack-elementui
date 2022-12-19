<template>
  <div class="sh-table-wrap">
    <VxeTable
      :key="columnKey"
      ref="tableRef"
      :data="tableData"
      :max-height="height"
      stripe
      :size="size"
      :align="align"
      :show-overflow="showOverflow"
      highlight-hover-row
      :show-footer="showFooter"
      :footer-method="footerMethod"
      :tooltip-config="{
        theme: tooltipEffect,
        enterDelay: 10,
        leaveDelay: 10,
        enterable: true,
      }"
      @checkbox-change="selectionChange"
      @checkbox-all="selectionChange"
    >
      <VxeColumn v-if="index" key="seqIndex" type="seq" title="序号" align="center" width="60" />
      <VxeColumn
        v-if="selection"
        key="checkbox"
        type="checkbox"
        title=""
        align="center"
        width="60"
      />
      <VxeColumn v-if="showAction" key="action" title="操作" :width="actionWidth">
        <template
          #default="{ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, _columnIndex }"
        >
          <slot
            name="action"
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
      <VxeColumn
        v-for="clm of columns"
        :key="clm.field"
        :title="clm.title"
        :field="clm.field"
        min-width="140px"
        v-bind="clm"
      >
        <template
          v-if="$slots[clm.field]"
          #default="{ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, _columnIndex }"
        >
          <slot
            :name="column.field"
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
    </VxeTable>
  </div>
</template>

<script>
import TableColumn from './TableColumn.vue'
export default {
  name: 'StarTables',
  components: { TableColumn },
  props: {
    // 是否显示序号
    index: {
      type: Boolean,
      default: true,
    },
    // 是否显示复选框
    selection: {
      type: Boolean,
      default: true,
    },
    showAction: {
      type: Boolean,
      default: true,
    },
    actionWidth: {
      type: [String, Number],
      default: '160px',
    },
    // table 列字段配置
    columns: {
      type: Array,
      default() {
        return []
      },
    },
    tableData: {
      type: Array,
      default() {
        return []
      },
    },
    align: {
      type: String,
      default: 'left',
    },
    height: {
      type: [String, Number],
      default: 0,
    },
    showOverflow: {
      type: Boolean,
      default: false,
    },
    scrollX: {
      type: Object,
      default() {
        return {
          gt: -1,
        }
      },
    },
    scrollY: {
      type: Object,
      default() {
        return {
          gt: -1,
        }
      },
    },
    size: {
      type: String,
      default: 'medium',
    },
    tooltipEffect: {
      type: String, // dark/light
      default: 'dark',
    },
    showFooter: {
      type: Boolean,
      default: false,
    },
    summaryFields: {
      type: Array,
      default() {
        return []
      },
    },
  },
  computed: {
    columnKey() {
      return this.columns.map((item) => item.field).join('')
    },
  },
  data() {
    return {
      selectionList: [],
    }
  },
  watch: {
    tableData() {
      this.selectionList = []
    },
  },
  mounted(){
    console.log(this.$slots.name)
  },
  methods: {
    selectionChange({ records }) {
      this.selectionList = Object.freeze(records)
      this.$emit('selectionChange', records)
    },
    footerMethod({ columns, data }) {
      let sum = ['合计']
      if (data.length === 0) {
        return [sum]
      }
      this.summaryFields.forEach((field) => {
        let index = columns.findIndex((item) => item.property === field.prop)
        let count = 0
        if (field.method) {
          sum[index] = field.method(data)
        } else {
          count = data.reduce((total, current) => {
            return total + (Number(current[field.prop]) || 0)
          }, 0)
          sum[index] = Number(count.toFixed(2))
        }
      })
      return [sum]
    },
    // 刷新 列， 去除错位问题
    refreshColumn() {
      this.$nextTick(() => {
        this.$refs.tableRef.refreshColumn()
      })
    },
  },
}
</script>

<style lang="scss">
.sh-table-wrap {
  padding: 0 10px;
  .vxe-table {
    font-family: Microsoft YaHei, STXihei, '\534E\6587\7EC6\9ED1', '\9ED1\4F53', serif !important;
  }
  .vxe-table thead th {
    background-color: #ebf5ff;
  }
  .vxe-table tfoot .vxe-cell--item {
    padding-left: 6px;
  }
  // .vxe-table--render-default.vxe-editable.size--medium .vxe-body--column,
  // .vxe-table--render-default.size--medium .vxe-header--column.col--ellipsis,
  // .vxe-table--render-default.size--medium .vxe-body--column.col--ellipsis,
  // .vxe-table--render-default.size--medium .vxe-footer--column.col--ellipsis {
  //   height: 46px;
  // }
  // .vxe-table--render-default.size--medium .vxe-header--column.col--ellipsis > .vxe-cell,
  // .vxe-table--render-default.size--medium .vxe-body--column.col--ellipsis > .vxe-cell,
  // .vxe-table--render-default.size--medium .vxe-footer--column.col--ellipsis > .vxe-cell {
  //   max-height: 46px;
  // }

  .vxe-table--render-default .vxe-cell {
    color: #444;
  }
}
</style>
