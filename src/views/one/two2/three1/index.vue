<template>
  <div style="padding: 10px">
    <XlTable
      :columns="columns"
      :data="data"
      border
      max-height="300px"
    />
  </div>
</template>
<script>
import XlTable from '@/components/starTable/XlTable.vue'
export default {
  components: { XlTable },
  data() {
    return {
      columns: Object.freeze([
        {
          field: 'lplp',
          title: 'name2',
          sortable: true,
          align: 'center',
          minWidth: '160px',
          renderHeader(h) {
            return <span style="color:red;">opopop</span>
          },
          render(h) {
            return <span style="color:red;border:1px solid red">9090</span>
          },
          formatter:() => {
            return 'lplp'
          }
        },
        {
          field: 'lplp1',
          title: 'name3',
          sortable: true,
        },
        {
          field: 'lplp2',
          title: 'name4',
        },
        {
          field: 'lplp3',
          title: 'name5',
        },
        {
          field: 'lplp4',
          title: 'name6',
        },
        {
          field: 'lplp5',
          title: 'name7',
        },
        {
          field: 'lplp6',
          title: 'name8',
        },
        {
          field: 'lplp7',
          title: 'name9',
        },
        {
          field: 'lplp8',
          title: 'name10',
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
          lplp1: 1,
        },
        {
          lplp3: 'hahah',
          lplp1: 2,
        },
      ]),
    }
  },
  created() {
    console.time('la')
  },
  mounted() {
    this.$nextTick(() => {
      console.timeEnd('la')
    })
  },
  methods: {
    edit(row) {
      console.log(row)
    },
  },
}
</script>
