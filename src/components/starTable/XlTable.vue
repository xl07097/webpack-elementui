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
    index: {
      type: Boolean,
      default: true,
    },
    checkbox: {
      type: Boolean,
      default: true,
    },
    action: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      indexColumn: Object.freeze({
        type: 'seq',
        key: 'seqIndex',
        fixed: 'left',
        title: '序号',
        width: 60,
        align: 'center',
      }),
      checkColumn: Object.freeze({
        type: 'checkbox',
        key: 'checkbox',
        fixed: 'left',
        width: 60,
        align: 'center',
      }),
      actionColumn: Object.freeze({
        key: 'action',
        fixed: 'left',
        title: '操作',
        width: 100,
        align: 'center',
      }),
      selectionList: []
    }
  },
  methods: {
    onCheckboxChange({ records }) {
      this.selectionList = Object.freeze(records)
      this.$emit('checkboxChange', records)
    },
  },
  render(h) {
    const { columns, data, index, checkbox } = this.$props
    const attrs = this.$attrs
    return (
      <vxe-table data={data} size="small" props={attrs} onCheckbox-change={this.onCheckboxChange} onCheckbox-all={this.onCheckboxChange}>
        {index && <TableColumn key="index" columns={this.indexColumn} />}
        {checkbox && <TableColumn key="checkbox" columns={this.checkColumn} />}
        {columns.map((column) => (
          <TableColumn key={column.field} columns={column} />
        ))}
      </vxe-table>
    )
  },
}
</script>
