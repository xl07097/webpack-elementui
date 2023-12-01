<template>
  <div style="padding: 10px">
    <el-button @click="hide">hide</el-button>
    <el-button @click="show">show</el-button>
    <Toolbar />
    <XlTable
      ref="tableRef"
      :key="key"
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
      <TableColumn
        :columns="{ field: 'hah1', title: 'hah', minWidth: '100px' }"
      />
      <TableColumn
        :columns="{ field: 'hah2', title: 'hah', minWidth: '100px' }"
      />
      <TableColumn
        :columns="{ field: 'hah3', title: 'hah', minWidth: '100px' }"
      />
      <TableColumn
        :columns="{ field: 'hah4', title: 'hah', minWidth: '100px' }"
      />
      <TableColumn
        :columns="{ field: 'hah5', title: 'hah', minWidth: '100px' }"
      />
      <TableColumn
        :columns="{ field: 'hah6', title: 'hah', minWidth: '100px' }"
      />
      <TableColumn
        :columns="{ field: 'hah7', title: 'hah', minWidth: '100px' }"
      />
      <TableColumn
        :columns="{ field: 'hah8', title: 'hah', minWidth: '100px' }"
      />
      <TableColumn
        :columns="{ field: 'hah9', title: 'hah', minWidth: '100px' }"
      />
      <TableColumn
        :columns="{ field: 'hah0', title: 'hah', minWidth: '100px' }"
      />
      <TableColumn
        :columns="{ field: 'hah11', title: 'hah', minWidth: '100px' }"
      />
      <TableColumn
        :columns="{ field: 'hah22', title: 'hah', minWidth: '100px' }"
      />
      <TableColumn
        :columns="{ field: 'hah33', title: 'hah', minWidth: '100px' }"
      />
      <TableColumn
        :columns="{ field: 'hah44', title: 'hah', minWidth: '100px' }"
      />
      <TableColumn
        :columns="{ field: 'hah55', title: 'hah', minWidth: '100px' }"
      />
      <TableColumn
        :columns="{ field: 'hah66', title: 'hah', minWidth: '100px' }"
      />
      <TableColumn
        :columns="{ field: 'hah77', title: 'hah', minWidth: '100px' }"
      />
      <TableColumn
        :columns="{ field: 'hah88', title: 'hah', minWidth: '100px' }"
      />
      <TableColumn
        :columns="{ field: 'hah99', title: 'hah', minWidth: '100px' }"
      />
      <TableColumn
        :columns="{ field: 'hah00', title: 'hah', minWidth: '100px' }"
      />
      <TableColumn
        :columns="{ field: 'hah111', title: 'hah', minWidth: '100px' }"
      />
      <TableColumn
        :columns="{ field: 'hah222', title: 'hah', minWidth: '100px' }"
      />
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
      key: 'lplp',
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
      this.$refs.tableRef.hideColumn('lplp2')
    },
    show(){
      this.$refs.tableRef.showColumn('lplp2')
    }
  },
}
</script>
