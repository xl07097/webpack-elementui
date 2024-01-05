<script>
import TableColumn from './TableColumn.vue'
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
      key: '9090',
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
      selectionList: [],
    }
  },
  watch:{
    columns(){
      this.key = Date.now().toString(32)
    }
  },
  methods: {
    onCheckboxChange({ records }) {
      this.selectionList = Object.freeze(records)
      this.$emit('checkbox-change', records)
    },
    sortChange(props) {
      this.$emit('sort-change', props)
    },
    clearSort(props) {
      this.$emit('clear-sort', props)
    },
    resizableChange(props) {
      this.$emit('resizable-change', props)
      this.$nextTick(() => {
        this.$refs.tableRef.refreshColumn()
      })
    },
    cellClick(props) {
      this.$emit('cell-click', props)
    },
    hideColumn(fieldOrColumn) {
      this.$refs.tableRef.hideColumn(fieldOrColumn)
    },
    showColumn(fieldOrColumn) {
      this.$refs.tableRef.showColumn(fieldOrColumn)
    },
    refreshColumn(){
      this.$refs.tableRef.refreshColumn()
    },
    reloadColumn(columns){
      this.$refs.tableRef.reloadColumn(columns)
    },
    loadColumn(columns){
      this.$refs.tableRef.loadColumn(columns)
    },
  },
  render(h) {
    const { columns, data, index, checkbox } = this.$props
    const attrs = this.$attrs
    return (
      <vxe-table
        ref="tableRef"
        key= {this.key}
        class="xl-table"
        data={data}
        size="small"
        stripe
        rowConfig={{
          isHover: true,
        }}
        props={attrs}
        onCheckbox-change={this.onCheckboxChange}
        onCheckbox-all={this.onCheckboxChange}
        onSort-change={this.sortChange}
        onClear-sort={this.clearSort}
        onResizable-change={this.resizableChange}
        onCell-click={this.cellClick}
      >
        {index && <TableColumn key="index" columns={this.indexColumn} />}
        {checkbox && <TableColumn key="checkbox" columns={this.checkColumn} />}
        {columns.map((column) => (
          <TableColumn key={column.field} columns={column} />
        ))}
        {this.$slots.default}
      </vxe-table>
    )
  },
}
</script>

<style lang="scss">
.xl-table.vxe-table {
  .vxe-table--header-wrapper {
    color: #444;
  }
  .vxe-table--body-wrapper .vxe-cell {
    color: #333;
  }
  // &.is--footer .vxe-table--fixed-wrapper .vxe-table--body-wrapper {
  //   overflow-x: hidden !important;
  //   padding-bottom: 17px;
  // }
  .vxe-table--fixed-left-wrapper .vxe-table--body-wrapper{
    width: auto;
  }
}

// .is--footer.size--mini .vxe-table--fixed-wrapper .vxe-table--body-wrapper {
//   overflow-x: hidden !important;
//   padding-bottom: 72px;
// }
</style>
