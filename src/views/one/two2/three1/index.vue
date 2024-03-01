<template>
  <div style="padding: 10px">
    <el-button @click="hide">hide</el-button>
    <el-button @click="show">show</el-button>
    <Toolbar />
    <XlTable
      ref="tableRef"
      :data="data"
      border
      max-height="400px"
      show-footer
      :columns="columns"
      :footer-method="footerMethod"
      :span-method="spanMethod"
      :edit-config="{trigger: 'click', mode: 'cell'}"
      @selection="selection"
      @checkbox-change="selection"
      @cell-click="cellClick"
    >
      <vxe-column
        field="hah"
        title="hah"
        min-width="150px" 
        :edit-render="{autofocus: '.el-input__inner'}"
      >
        <template #default="{ row }">
          <span>{{ row.hah }}</span>
        </template>
        <template #edit="{ row, column, rowIndex }">
          <el-input-number
            v-model="row.hah"
            controls-position="right"
            :precision="2"
            @change="(value) => change(value, column, rowIndex)"
          />
        </template>
      </vxe-column>
      <vxe-column
        field="action"
        title="操作"
        fixed="right"
        min-width="240px" 
      >
        <template #default="{ row }">
          <ButtonSet :row="row" />
        </template>
      </vxe-column>
    </XlTable>
  </div>
</template>
<script>

import XlTable from '@/components/table/XlTable.vue'
import Toolbar from '@/components/toolbar/Index.vue'
import columns, {column1} from './column.js'
// import TableColumn from '@/components/table/TableColumn.vue'
import { mergeExcel } from '@/utils/excel'
import ButtonSet from './ButtonSet.vue'
export default {
  components: { 
    XlTable, 
    Toolbar,
    ButtonSet,
    // TableColumn 
  },
  data() {
    return {
      columns: Object.freeze(columns),
      data: [],
      data1: Object.freeze([
        {
          lplp3: 909090,
          lplp2: '',
          lplp1: 0,
        },
        {
          lplp3: 909090,
          lplp2: '',
          lplp1: 0,
        },
        {
          lplp3: 909090,
          lplp2: '',
          lplp1: 0,
        },
      ]),

    }
  },
  watch:{
    data1(){
      console.log(999)
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
    change(value, column, rowIndex){
      console.log(value, column, rowIndex)
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
      this.columns = Object.freeze(columns)
      // this.$refs.tableRef.hideColumn('lplp2')
    },
    show(){
      this.columns = Object.freeze(column1)
      // this.$nextTick(() => {
      //   this.$refs.tableRef.loadColumn(column1)
      // })
      // this.$refs.tableRef.showColumn('lplp2')
    }
  },
}
</script>
