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
import ButtonSet from './ButtonSet.vue'

export default {
  components: { XlTable,Toolbar },
  data() {
    return {
      columns: Object.freeze([
        {
          field: 'baseInfo',
          title: '基础信息',
          align: 'center',
          minWidth: '160px',
          children: [
            {
              field: 'lplp',
              title: '姓名',
              align: 'center',
              renderHeader(h) {
                return <span style="color:red;">opopop</span>
              },
            },
            {
              field: 'lplp0',
              title: '姓名',
              align: 'center',
              renderHeader(h) {
                return <span style="color:red;">opopop</span>
              },
            },
          ]
        },
        {
          field: 'lplp1',
          title: '性别',
          filters: [
            {value: 0,label:'女'},
            {value: 1,label:'男'}
          ],
          sortable: true,
          render(h, {row}) {
            return {
              0: '女',
              1: '男'
            }[row.lplp1]
          },
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
          field: 'lplp81',
          title: '外包人员规模（结算人数）',
          formatter:() => {
            return 'lplp'
          }
        },
        {
          field: 'lplp82',
          title: '银行卡号',
          formatter:() => {
            return 'lplp'
          }
        },
        {
          field: 'lplp83',
          title: '银行卡号',
          formatter:() => {
            return 'lplp'
          }
        },
        {
          field: 'lplp84',
          title: '银行卡号',
          formatter:() => {
            return 'lplp'
          }
        },
        {
          field: 'lplp85',
          title: '银行卡号',
          formatter:() => {
            return 'lplp'
          }
        },
        {
          field: 'lplp86',
          title: '银行卡号',
          formatter:() => {
            return 'lplp'
          }
        },
        {
          field: 'lplp87',
          title: '银行卡号',
          formatter:() => {
            return 'lplp'
          }
        },
        {
          field: 'lplp88',
          title: '银行卡号',
          formatter:() => {
            return 'lplp'
          }
        },
        {
          field: 'lplp89',
          title: '银行卡号',
          formatter:() => {
            return 'lplp'
          }
        },
        {
          field: 'lplp18',
          title: '银行卡号',
          formatter:() => {
            return 'lplp'
          }
        },
        {
          field: 'lplp28',
          title: '银行卡号',
          formatter:() => {
            return 'lplp'
          }
        },
        {
          field: 'lplp38',
          title: '银行卡号',
          formatter:() => {
            return 'lplp'
          }
        },
        {
          field: 'lplp811',
          title: '外包人员规模（结算人数）',
          formatter:() => {
            return 'lplp'
          }
        },
        {
          field: 'lplp812',
          title: '外包人员规模（结算人数）',
          formatter:() => {
            return 'lplp'
          }
        },
        {
          field: 'lplp813',
          title: '外包人员规模（结算人数）',
          formatter:() => {
            return 'lplp'
          }
        },
        {
          field: 'lplp814',
          title: '外包人员规模（结算人数）',
          formatter:() => {
            return 'lplp'
          }
        },
        {
          field: 'lplp815',
          title: '外包人员规模（结算人数）',
          formatter:() => {
            return 'lplp'
          }
        },
        {
          field: 'action',
          title: '操作',
          fixed: 'right',
          width: 240,
          render: (h, {row}) => {
            return (
              <ButtonSet />
              // <div>
              //   <el-button type="text" size="mini" onClick={() => this.edit(row)}>编辑</el-button>
              //   <el-button type="text" size="mini" onClick={() => this.edit(row)}>删除</el-button>
              // </div>
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
    console.time('la')
    this.$refs.tableRef.$refs.tableRef.scrollToColumn('lplp814', '200px')
    this.$nextTick(() => {
      console.timeEnd('la')
      // this.columns.at(-1).key='lp'
      // this.key = 'poiu'
      this.$refs.tableRef.$refs.tableRef.scrollToColumn('lplp814', '200px')
    })
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
