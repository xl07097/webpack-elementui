import { Input } from 'element-ui'
export default [
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
        renderHeader(h, prop) {
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
    ],
  },
  {
    field: 'lplp1',
    title: '性别',
    filters: [
      { value: 0, label: '女' },
      { value: 1, label: '男' },
    ],
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
    renderEdit: (h, scope) => {
      return (
        <Input
          value={scope.row.lplp2}
          on-input={(e) => (scope.row.lplp2 = e)}
        ></Input>
      )
    },
  },
  {
    field: 'lplp3',
    title: '证件类型',
    formatter: 'formatMoney',
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
  {
    field: 'lplp83',
    title: '银行卡号',
    formatter: () => {
      return 'lplp'
    },
  },
  {
    field: 'lplp84',
    title: '银行卡号',
    formatter: () => {
      return 'lplp'
    },
  },
  {
    field: 'lplp85',
    title: '银行卡号',
    formatter: () => {
      return 'lplp'
    },
  },
  {
    field: 'lplp86',
    title: '银行卡号',
    formatter: () => {
      return 'lplp'
    },
  },
  {
    field: 'lplp87',
    title: '银行卡号',
    formatter: () => {
      return 'lplp'
    },
  },
  {
    field: 'lplp88',
    title: '银行卡号',
    formatter: () => {
      return 'lplp'
    },
  },
  {
    field: 'lplp89',
    title: '银行卡号',
    formatter: () => {
      return 'lplp'
    },
  },
  {
    field: 'lplp18',
    title: '银行卡号',
    formatter: () => {
      return 'lplp'
    },
  },
  {
    field: 'lplp28',
    title: '银行卡号',
    formatter: () => {
      return 'lplp'
    },
  },
  {
    field: 'lplp38',
    title: '银行卡号',
    formatter: () => {
      return 'lplp'
    },
  },
  {
    field: 'lplp811',
    title: '外包人员规模（结算人数）',
    formatter: () => {
      return 'lplp'
    },
  },
  {
    field: 'lplp812',
    title: '外包人员规模（结算人数）',
    formatter: () => {
      return 'lplp'
    },
  },
  {
    field: 'lplp813',
    title: '外包人员规模（结算人数）',
    formatter: () => {
      return 'lplp'
    },
  },
  {
    field: 'lplp814',
    title: '外包人员规模（结算人数）',
    formatter: () => {
      return 'lplp'
    },
  },
  {
    field: 'lplp815',
    title: '外包人员规模（结算人数）',
    formatter: () => {
      return 'lplp'
    },
  },
]

export const column1 = [
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
        renderHeader(h, prop) {
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
    ],
  },
  {
    field: 'lplp1',
    title: '性别',
    filters: [
      { value: 0, label: '女' },
      { value: 1, label: '男' },
    ],
    sortable: true,
    formatter: ({ cellValue }) => {
      return {
        0: '女',
        1: '男',
      }[cellValue]
    },
    render(h, { row }) {},
  },
  {
    field: 'lplp2',
    title: '证件号码',
    editRender: { autofocus: '.el-input__inner' },
    renderEdit: (h, scope) => {
      return (
        <Input
          value={scope.row.lplp2}
          on-input={(e) => (scope.row.lplp2 = e)}
        ></Input>
      )
    },
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
  {
    field: 'lplp83',
    title: '银行卡号',
    formatter: () => {
      return 'lplp'
    },
  },
  {
    field: 'lplp84',
    title: '银行卡号',
    formatter: () => {
      return 'lplp'
    },
  },
  {
    field: 'lplp85',
    title: '银行卡号',
    formatter: () => {
      return 'lplp'
    },
  },
]
