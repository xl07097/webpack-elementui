<script>
import TableColumn from '@/components/starTable/TableColumn.vue'
export default {
  props: {
    columns: {
      type: Array,
      default() {
        return []
      },
    },
    data: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {}
  },
  methods: {},
  render(h, ctx) {
    console.log('ctx', ctx)
    const { columns, data } = this
    const attrs = this.$attrs
    const props = {
      ...attrs,
    }
    return (
      <vxe-table data={data} size="small" props={props}>
        {columns.map((column) => {
          return <TableColumn columns={column} />
        })}
      </vxe-table>
    )
  },
}
</script>
