<script>
import Text from './Text.vue'
export default {
  data() {
    return {
      columns: [
        {
          field: 'lplp',
          title: 'name2',
          sortable: true,
          renderHeader(h) {
            return 'opopop'
          },
          render(h) {
            return <Text text="lplp" />
            return h(
              'span',
              {
                style: 'color:red;border:1px solid red',
              },
              9090
            )
          },
        },
        { field: 'lplp1', title: 'name3', sortable: true },
        { field: 'lplp2', title: 'name4' },
        { field: 'lplp3', title: 'name5' },
        { field: 'lplp4', title: 'name6' },
        { field: 'lplp5', title: 'name7' },
        { field: 'lplp6', title: 'name8' },
        { field: 'lplp7', title: 'name9' },
        { field: 'lplp8', title: 'name10' },
        { field: 'lplp89', title: 'name11' },
      ],
      data: [
        {
          lplp3: 'hahah',
        },
      ],
    }
  },
  methods: {
    renderHeader(h, columns) {
      const { field, title, render, renderHeader, ...attrs } = columns
      const slot = {}
      if (renderHeader) {
        slot.header = () => {
          return columns.renderHeader(h)
        }
      }
      if (render) {
        slot.default = ({ row, rowIndex }) => {
          return columns.render(h, { row, rowIndex })
        }
      }
      Object.keys(slot).length > 0 && (attrs.scopedSlots = slot)
      // console.log(attrs)
      return <vxe-column field={field} title={title} props={attrs} {...attrs}></vxe-column>
    },
  },
  render(h, ctx) {
    console.log('ctx', ctx)
    const { columns, data, renderHeader } = this
    return (
      <vxe-table data={data}>
        {columns.map((column) => {
          return renderHeader(h, column)
        })}
      </vxe-table>
    )
  },
}
</script>
