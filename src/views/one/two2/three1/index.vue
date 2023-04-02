<template>
  <div>
    <XlTable :columns="columns" :data="data" border height="300px" />
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
            return 'opopop'
          },
          render(h) {
            return <ElInputNumber placeholder="哈哈哈哈" />
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
        {
          field: 'lplp1',
          title: 'name3',
          sortable: true,
          render(h) {
            return <ElInputNumber placeholder="哈哈哈哈" />
          },
        },
        {
          field: 'lplp2',
          title: 'name4',
          render(h) {
            return <ElInputNumber placeholder="哈哈哈哈" />
          },
        },
        {
          field: 'lplp3',
          title: 'name5',
          render(h) {
            return <ElInputNumber placeholder="哈哈哈哈" />
          },
        },
        {
          field: 'lplp4',
          title: 'name6',
          render(h) {
            return <ElInputNumber placeholder="哈哈哈哈" />
          },
        },
        {
          field: 'lplp5',
          title: 'name7',
          render(h) {
            return <ElInputNumber placeholder="哈哈哈哈" />
          },
        },
        {
          field: 'lplp6',
          title: 'name8',
          render(h) {
            return <ElInputNumber placeholder="哈哈哈哈" />
          },
        },
        {
          field: 'lplp7',
          title: 'name9',
          render(h) {
            return <ElInputNumber placeholder="哈哈哈哈" />
          },
        },
        {
          field: 'lplp8',
          title: 'name10',
          render(h) {
            return <ElInputNumber placeholder="哈哈哈哈" />
          },
        },
        {
          field: 'lplp89',
          title: 'name11',
          render(h) {
            return <ElInputNumber placeholder="哈哈哈哈" />
          },
        },
        {
          field: 'lplp81',
          title: 'name11',
          render(h) {
            return <ElInputNumber placeholder="哈哈哈哈" />
          },
        },
        {
          field: 'lplp82',
          title: 'name11',
          render(h) {
            return <ElInputNumber placeholder="哈哈哈哈" />
          },
        },
        {
          field: 'lplp83',
          title: 'name11',
          render(h) {
            return <ElInputNumber placeholder="哈哈哈哈" />
          },
        },
        {
          field: 'lplp84',
          title: 'name11',
          render(h) {
            return <ElInputNumber placeholder="哈哈哈哈" />
          },
        },
        {
          field: 'lplp85',
          title: 'name11',
          render(h) {
            return <ElInputNumber placeholder="哈哈哈哈" />
          },
        },
        {
          field: 'lplp86',
          title: 'name11',
          render(h) {
            return <ElInputNumber placeholder="哈哈哈哈" />
          },
        },
        {
          field: 'lplp87',
          title: 'name11',
          render(h) {
            return <ElInputNumber placeholder="哈哈哈哈" />
          },
        },
        {
          field: 'lplp88',
          title: 'name11',
          render(h) {
            return <ElInputNumber placeholder="哈哈哈哈" />
          },
        },
        {
          field: 'lplp819',
          title: 'name11',
          render(h) {
            return <ElInputNumber placeholder="哈哈哈哈" />
          },
        },
        {
          field: 'lplp81912',
          title: 'name11',
          render(h) {
            return <ElInputNumber placeholder="哈哈哈哈" />
          },
        },
        {
          field: 'lplp8192',
          title: 'name11',
          render(h) {
            return <ElInputNumber placeholder="哈哈哈哈" />
          },
        },
        {
          field: 'lplp8193',
          title: 'name11',
          render(h) {
            return <ElInputNumber placeholder="哈哈哈哈" />
          },
        },
        {
          field: 'lplp8194',
          title: 'name11',
          render(h) {
            return <ElInputNumber placeholder="哈哈哈哈" />
          },
        },
        {
          field: 'lplp8195',
          title: 'name11',
          render(h) {
            return <ElInputNumber placeholder="哈哈哈哈" />
          },
        },
        {
          field: 'lplp81967',
          title: 'name11',
          render(h) {
            return <ElInputNumber placeholder="哈哈哈哈" />
          },
        },
        {
          field: 'lplp8197',
          title: 'name11',
          render(h) {
            return <ElInputNumber placeholder="哈哈哈哈" />
          },
        },
        {
          field: 'lplp8198',
          title: 'name11',
          render(h) {
            return <ElInputNumber placeholder="哈哈哈哈" />
          },
        },
        {
          field: 'lplp8199',
          title: 'name11',
          render(h) {
            return <ElInputNumber placeholder="哈哈哈哈" />
          },
        },
        {
          field: 'lplp8190',
          title: 'name11',
          render(h) {
            return <ElInputNumber placeholder="哈哈哈哈" />
          },
        },
        {
          field: 'lplp81911',
          title: 'name11',
          render(h) {
            return <ElInputNumber placeholder="哈哈哈哈" />
          },
        },
        {
          field: 'lplp82219',
          title: 'name11',
          render(h) {
            return <ElInputNumber placeholder="哈哈哈哈" />
          },
        },
        {
          field: 'lplp33819',
          title: 'name11',
          render(h) {
            return <ElInputNumber placeholder="哈哈哈哈" />
          },
        },
        {
          field: 'lpl4p819',
          title: 'name11',
          render(h) {
            return <ElInputNumber placeholder="哈哈哈哈" />
          },
        },
        {
          field: 'lpl5p819',
          title: 'name11',
          render(h) {
            return <ElInputNumber placeholder="哈哈哈哈" />
          },
        },
        {
          field: 'lplp6819',
          title: 'name11',
          render(h) {
            return <ElInputNumber placeholder="哈哈哈哈" />
          },
        },
        {
          field: 'action',
          title: '操作',
          fixed: 'right',
          render: (h, { row }) => {
            return <ElButton onClick={() => this.edit(row)}>编辑</ElButton>
          },
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
        {
          lplp3: 'hahah',
          lplp1: 2,
        },
        {
          lplp3: 'hahah',
          lplp1: 2,
        },
        {
          lplp3: 'hahah',
          lplp1: 2,
        },
        {
          lplp3: 'hahah',
          lplp1: 2,
        },
        {
          lplp3: 'hahah',
          lplp1: 2,
        },
        {
          lplp3: 'hahah',
          lplp1: 2,
        },
        {
          lplp3: 'hahah',
          lplp1: 2,
        },
        {
          lplp3: 'hahah',
          lplp1: 2,
        },
        {
          lplp3: 'hahah',
          lplp1: 2,
        },
        {
          lplp3: 'hahah',
          lplp1: 2,
        },
        {
          lplp3: 'hahah',
          lplp1: 2,
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
