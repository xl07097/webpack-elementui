<template>
  <div style="padding: 10px">
    <el-button @click="hide">hide</el-button>
    <el-button @click="show">show</el-button>
    <Toolbar />
    <XlTable
      ref="tableRef"
      :key="key"
      :columns="columns"
      :data="data"
      border
      max-height="400px"
      show-footer
      :footer-method="footerMethod"
      :span-method="spanMethod"
      @selection="selection"
      @checkbox-change="selection"
      @cell-click="cellClick"
    >
      <TableColumn
        :columns="{ field: 'hah', title: 'hah', minWidth: '100px' }"
      />
    </XlTable>
  </div>
</template>
<script>
import XlTable from '@/components/table/XlTable.vue'
import Toolbar from '@/components/toolbar/Index.vue'
import columns from './column.js'
import TableColumn from '@/components/table/TableColumn.vue'
import { mergeExcel } from '@/utils/commons'
export default {
  components: { XlTable, Toolbar, TableColumn },
  data() {
    return {
      columns: Object.freeze(columns),
      data: [],
      data1: Object.freeze([
        {
          lplp3: 'hahah',
          lplp1: 0,
        },
        {
          lplp3: 'hahah',
          lplp1: 0,
        },
        {
          lplp3: 'hahah',
          lplp1: 0,
        },
        {
          lplp3: 'hahah',
          lplp1: 0,
        },
        {
          lplp3: 'hahah',
          lplp1: 0,
        },
        {
          lplp3: 'hahah',
          lplp1: 0,
        },
      ]),
      key: 'lplp',
    }
  },
  created() {},
  mounted() {
    mergeExcel(this.data1, 'lplp3')
    this.data = this.data1
  },
  methods: {
    spanMethod({row, column}){
      if(column.field === 'lplp3'){
        return row.merge
      }
      return { rowspan: 1, colspan: 1}
    },
    edit(row) {
      console.log(row)
    },
    selection(rows) {
      console.log(rows)
    },
    cellClick({column,row}) {
      console.log(column)
    },
    footerMethod() {
      return [['合计', '0', '0']]
    },
    hide(){
      this.$refs.tableRef.hideColumn('lplp2')
    },
    show(){
      this.$refs.tableRef.showColumn('lplp2')
    }
  },
}
</script>
