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
    const {
      field,
      title,
      render,
      minWidth,
      width,
      renderHeader,
      renderFooter,
      renderEdit,
      renderContent,
      children = [],
      ...attrs
    } = this.columns
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
    if (renderEdit) {
      slot.edit = (props) => renderEdit(h, props)
    }
    if (renderContent) {
      slot.content = (props) => renderContent(h, props)
    }
    attrs.scopedSlots = slot
    if (children && children.length > 0) {
      return (
        <vxe-colgroup title={title} field={field} {...attrs} props={attrs}>
          {children.map((item) => {
            return <TableColumn key={item.field} columns={item} />
          })}
        </vxe-colgroup>
      )
    }
    return (
      <vxe-column
        field={field}
        title={title}
        minWidth={minWidth || width || '100px'}
        props={attrs}
        {...attrs}
      ></vxe-column>
    )
  },
}
</script>
