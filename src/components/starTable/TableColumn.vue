<script>
export default {
  name: 'TableColumn',
  props: {
    columns: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  render(h) {
    const { field, title, render, renderHeader, renderFooter, ...attrs } = this.columns
    const slot = {}
    if (renderHeader) {
      slot.header = (props) => renderHeader(h, props)
    }
    if (render) {
      slot.default = (props) => render(h, props)
    }
    if (renderFooter) {
      slot.footer = (props) => renderFooter(h, props)
    }
    attrs.scopedSlots = slot
    return (
      <vxe-column
        field={field}
        title={title}
        minWidth={ attrs.minWidth || attrs.width || '160px'}
        props={attrs}
        {...attrs}
      >
      </vxe-column>
    )
  },
}
</script>
