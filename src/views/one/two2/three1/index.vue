<template>
  <div style="padding: 10px">
    <Toolbar />
    <XlTable
      ref="tableRef"
      :key="key"
      :columns="columns"
      :data="data"
      border
      max-height="600px"
      @selection="selection"
      @checkbox-change="selection"
      @cell-click="cellClick"
    />
  </div>
</template>
<script>
import XlTable from '@/components/starTable/XlTable.vue'
import Toolbar from '@/components/toolbar/Index.vue'
import columns from './column.js'

export default {
  components: { XlTable,Toolbar },
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
      ]),
      key: 'lplp'
    }
  },
  created() {
  },
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
    selection(rows){
      console.log(rows)
    },
    cellClick(){
      console.log('cellClick')
    }
  },
}
</script>
