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
    const { field, title, render, minWidth, width, renderHeader, renderFooter, ...attrs } = this.columns
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
        minWidth={ minWidth || width || '100px'}
        props={attrs}
        {...attrs}
      >
      </vxe-column>
    )
  },
}
</script>
