<template>
  <div style="padding: 10px">
    <Toolbar />
    <XlTable
      :columns="columns"
      :data="data"
      border
      max-height="300px"
      @selection="selection"
    />
  </div>
</template>
<script>
import XlTable from '@/components/starTable/XlTable.vue'
import Toolbar from '@/components/toolbar/Index.vue'

export default {
  components: { XlTable,Toolbar },
  data() {
    return {
      columns: Object.freeze([
        {
          field: 'lplp',
          title: '姓名',
          align: 'center',
          minWidth: '160px',
          renderHeader(h) {
            return <span style="color:red;">opopop</span>
          },
        },
        {
          field: 'lplp1',
          title: '性别',
          filters: [
            {value: 0,label:'女'},
            {value: 1,label:'男'}
          ],
          sortable: true,
        },
        {
          field: 'lplp2',
          title: '证件号码',
        },
        {
          field: 'lplp3',
          title: '证件类型',
        },
        {
          field: 'lplp4',
          title: '项目名称',
        },
        {
          field: 'lplp5',
          title: '项目编码',
        },
        {
          field: 'lplp6',
          title: '运营部门',
        },
        {
          field: 'lplp7',
          title: '用户类型',
        },
        {
          field: 'lplp8',
          title: '银行卡号',
          formatter:() => {
            return 'lplp'
          }
        },
        {
          field: 'action',
          title: '操作',
          fixed: 'right',
          render: (h, {row}) => {
            return (
              <div>
                <el-button type="text" size="mini" onClick={() => this.edit(row)}>编辑</el-button>
                <el-button type="text" size="mini" onClick={() => this.edit(row)}>删除</el-button>
              </div>
            )
          }
        },
      ]),
      data: Object.freeze([
        {
          lplp3: 'hahah',
          lplp1: 0,
        },
        {
          lplp3: 'hahah',
          lplp1: 1,
        },
      ]),
    }
  },
  created() {
  },
  mounted() {
    console.time('la')
    this.$nextTick(() => {
      console.timeEnd('la')
    })
  },
  methods: {
    edit(row) {
      console.log(row)
    },
    selection(rows){
      console.log(rows)
    }
  },
}
</script>
