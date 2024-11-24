<template>
  <div class="sh-table-wrap">
    <div class="sh-tool-wrap">
      <ColumnSetting
        :visible.sync="settingVisible"
        :columns="columns"
        :active-name="activeName"
        @confirm="confirm"
      />
    </div>
    <VxeTable
      :key="columnKey"
      ref="tableRef"
      :data="tableData"
      :size="size"
      highlight-hover-row
      :footer-method="footerMethod"
      :tooltip-config="{
        theme: tooltipEffect,
        enterDelay: 10,
        leaveDelay: 10,
        enterable: true,
      }"
      v-bind="$attrs"
      @checkbox-change="selectionChange"
      @checkbox-all="selectionChange"
      v-on="$listeners"
    >
      <VxeColumn
        v-if="index"
        key="seqIndex"
        type="seq"
        fixed="left"
        title="序号"
        align="center"
        width="60"
      />
      <VxeColumn
        v-if="selection"
        key="checkbox"
        type="checkbox"
        fixed="left"
        title=""
        align="center"
        width="60"
      />
      <VxeColumn
        v-if="showAction"
        key="action"
        fixed="left"
        title="操作"
        :width="actionWidth"
      >
        <template #default="scope">
          <slot name="action" v-bind="scope" />
        </template>
      </VxeColumn>
      <VxeColumn
        v-for="column of tableColumns"
        :key="column.field"
        :title="column.title"
        :field="column.field"
        min-width="100px"
        v-bind="column"
      >
        <template v-if="$slots[column.field]" #default="scope">
          <slot :name="column.field" v-bind="scope" />
        </template>
      </VxeColumn>
    </VxeTable>
  </div>
</template>

<script>
import ColumnSetting from '../ColumnSetting.vue'
export default {
  name: 'StarTables',
  components: { ColumnSetting },
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
    size: {
      type: String,
      default: 'medium',
    },
    tooltipEffect: {
      type: String, // dark/light
      default: 'dark',
    },
    summaryFields: {
      type: Array,
      default() {
        return []
      },
    },
    activeName:{
      type: String,
      default: '',
    },
    setting:{
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      selectionList: [],
      settingVisible: false,
      tableColumns: [],
    }
  },
  computed: {
    columnKey() {
      return this.tableColumns.map((item) => item.field).join('')
    },
    settingColumns() {
      const list = this.tableColumns.map((item) => {
        return {
          title: item.title,
          field: item.field,
        }
      })
      return Object.freeze(list)
    },
  },
  watch: {
    tableData() {
      this.selectionList = []
    },
  },
  created() {
    if(!this.setting){
      this.tableColumns = Object.freeze(this.columns)
    }
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
    // settings() {
    //   this.settingVisible = true
    // },
    confirm(columns) {
      this.tableColumns = Object.freeze(columns)
    },
  },
}
</script>

<style lang="scss">
.sh-table-wrap {
  padding: 0 10px;
  .vxe-table {
    font-family: Microsoft YaHei, STXihei, '\534E\6587\7EC6\9ED1', '\9ED1\4F53',
      serif !important;
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
