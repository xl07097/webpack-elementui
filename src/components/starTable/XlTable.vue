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
      this.$emit('checkbox-change', records)
    },
    sortChange(props){
      this.$emit('sort-change', props)
    },
    clearSort(props){
      this.$emit('clear-sort', props)
    },
    resizableChange(props){
      this.$emit('resizable-change', props)
    }
  },
  render(h) {

    console.log(this.$slots)
    const { columns, data, index, checkbox } = this.$props
    const attrs = this.$attrs
    return (
      <vxe-table 
        ref="tableRef"
        class="xl-table" 
        data={data} 
        size="small" 
        stripe
        rowConfig = {{
          isHover: true
        }}
        props={attrs} 
        columnConfig={{
          resizable: true
        }}
        onCheckbox-change={this.onCheckboxChange} 
        onCheckbox-all={this.onCheckboxChange} 
        onSort-change={this.sortChange} 
        onClear-sort={this.clearSort}
        onResizable-change={this.resizableChange}
      >
        {index && <TableColumn key="index" columns={this.indexColumn} />}
        {checkbox && <TableColumn key="checkbox" columns={this.checkColumn} />}
        {columns.map((column) => (
          <TableColumn key={column.field} columns={column} />
        ))}
        {
          this.$slots.default
        }
      </vxe-table>
    )
  },
}
</script>

<style lang="sass">
.xl-table.vxe-table {
  .vxe-table--header-wrapper{
    color: #444;
  }
  .vxe-table--body-wrapper .vxe-cell{
    color: #333;
  }
  
  // .vxe-table--footer-wrapper{
  //   margin-top: 0 !important;
  // }
}
// .vxe-table--render-default:not(.is--empty).is--footer.is--scroll-x .vxe-table--body-wrapper {
//     overflow-x: inherit;
//   }
  .vxe-table--render-default:not(.is--empty).is--footer.is--scroll-x .vxe-table--footer-wrapper {
    margin-top: -20px !important;
  }
</style>