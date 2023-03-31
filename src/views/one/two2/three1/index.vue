<template>
  <div>
    <XlTable
      :columns="columns"
      :data="data"
      border
      height="300px"
    />
  </div>
</template>
<script>
import XlTable from '@/components/starTable/XlTable.vue'
export default {
  components: { XlTable },
  data() {
    return {
      columns: [
        {
          field: 'lplp',
          title: 'name2',
          sortable: true,
          align: 'center',
          fixed: 'left',
          minWidth: '160px',
          renderHeader(h) {
            return 'opopop'
          },
          render(h) {
            // return <Text text="lplp" onTrash={trash} />
            return h(
              'span',
              {
                style: 'color:red;border:1px solid red',
              },
              9090
            )
          },
        },
        { field: 'lplp1', title: 'name3', fixed: 'left', sortable: true },
        { field: 'lplp2', title: 'name4', fixed: 'left', },
        { field: 'lplp3', title: 'name5' },
        { field: 'lplp4', title: 'name6' },
        { field: 'lplp5', title: 'name7' },
        { field: 'lplp6', title: 'name8' },
        { field: 'lplp7', title: 'name9' },
        { field: 'lplp8', title: 'name10' },
        { field: 'lplp89', title: 'name11' },
        { field: 'lplp81', title: 'name11' },
        { field: 'lplp82', title: 'name11' },
        { field: 'lplp83', title: 'name11' },
        { field: 'lplp84', title: 'name11' },
        { field: 'lplp85', title: 'name11' },
        { field: 'lplp86', title: 'name11' },
        { field: 'lplp87', title: 'name11' },
        { field: 'lplp88', title: 'name11' },
        { field: 'lplp819', title: 'name11' },
        { field: 'action', title: '操作', fixed: 'right',
          render:(h, {row}) => {
            return (
              <ElButton v-auth="edit" onClick={() => this.edit(row)}>编辑</ElButton>
            )
          }},
      ],
      data: [
        {
          lplp3: 'hahah',
          lplp1: 1
        },
        {
          lplp3: 'hahah',
          lplp1: 2
        },
      ],
    }
  },
  methods: {
    edit(row){
      console.log(row)
    }
  },

}
</script>
