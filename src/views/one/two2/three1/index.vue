<template>
  <div style="padding: 10px">
    <Toolbar />
    <XlTable
      ref="tableRef"
      :key="key"
      :columns="columns"
      :data="data"
      :border="false"
      max-height="400px"
      show-footer
      :footer-method="footerMethod"
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
import XlTable from '@/components/starTable/XlTable.vue'
import Toolbar from '@/components/toolbar/Index.vue'
import columns from './column.js'
import TableColumn from '@/components/starTable/TableColumn.vue'

export default {
  components: { XlTable, Toolbar, TableColumn },
  data() {
    return {
      columns: Object.freeze(columns),
      data: Object.freeze([
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
    // console.time('la')
    // this.$refs.tableRef.$refs.tableRef.scrollToColumn('lplp814', '200px')
    // this.$nextTick(() => {
    //   console.timeEnd('la')
    //   // this.columns.at(-1).key='lp'
    //   // this.key = 'poiu'
    //   this.$refs.tableRef.$refs.tableRef.scrollToColumn('lplp814', '200px')
    // })
  },
  methods: {
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
  },
}
</script>
