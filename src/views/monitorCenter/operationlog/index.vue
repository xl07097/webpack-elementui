<template>
  <div style="padding: 10px;">
    <GridTable
      :columns="columns"
      :data="data" 
      :edit-config="{trigger: 'click', mode: 'cell'}"
    />
  </div>
</template>

<script>
import GridTable from '@/components/table/GridTable.vue'
export default {
  name: 'OperationLog',
  components:{GridTable},
  data() {
    return {
      data: Object.freeze([
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
              slots:{
                default: (scope, h) => {
                  return <span style="color:red;">opopop</span>
                },
              },
            },
            {
              field: 'lplp0',
              title: '姓名',
              align: 'center',
              slots:{
                default: (scope, h) => {
                  return <span style="color:red;">opopop</span>
                },
              },
            },
          ],
        },
        {
          field: 'lplp1',
          title: '性别',
          sortable: true,
          formatter: ({ cellValue }) => {
            return {
              0: '女',
              1: '男',
            }[cellValue]
          },
        },
        {
          field: 'lplp2',
          title: '证件号码',
          editRender: { autofocus: '.el-input__inner' },
          slots:{
            edit: (params, h) => {
              return (
                <ElInput
                  value={params.row.lplp2}
                  on-input={(value) => (params.row.lplp2 = value)}
                ></ElInput>
              )
            },
          }
        },
        {
          field: 'lplp3',
          title: '证件类型',
          formatter: 'formatMoney',
        },
        {
          field: 'lplp5',
          title: '项目编码',
        },
        {
          field: 'lplp4',
          title: '项目名称',
        },
        {
          field: 'lplp7',
          title: '用户类型',
        },
        {
          field: 'lplp6',
          title: '运营部门',
        },
        {
          field: 'lplp81',
          title: '外包人员规模（结算人数）',
          formatter: () => {
            return 'lplp'
          },
        },
        {
          field: 'lplp82',
          title: '银行卡号',
          formatter: () => {
            return 'lplp'
          },
        },
      ])
    }
  },
  mounted(){
  },
  methods: {
    
  },
}
</script>

<style></style>
