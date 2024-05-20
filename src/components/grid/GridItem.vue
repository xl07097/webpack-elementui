<script>
export default {
  name: 'GridItem',
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    labelWidth:{
      type: [String, Number],
      default: null
    }
  },
  computed:{
    style(){
      const obj = {}
      const {labelWidth} = this.$props
      if(labelWidth){
        obj.width = typeof labelWidth === 'number' ? `${labelWidth}px` : labelWidth
      }
      return obj
    }
  },
  render(h){
    const {label, value} = this.$props
    const defaultsSlot = this.$slots.default
    const labelSlot = this.$slots.label
    return (
      <div class="grid-layout-item">
        <div class="grid-layout-label" style={this.style}>
          { labelSlot || label }
        </div>
        <div class="grid-layout-value">
          { defaultsSlot || value }
        </div>
      </div>
    )
  }
}
</script>

<style lang="scss">
.grid-layout-item {
  display: inline-flex;
  padding-right: 24px;
  width: 25%;
  line-height: 22px;
  box-sizing: border-box;
  font-size: 14px;
  color: #484949;

  .grid-layout-label {
    flex: none;
    display: inline-flex;
    align-items: flex-start;
    justify-content: flex-end;
    text-align: right;
    padding-right: 10px;
  }

  .grid-layout-value {
    flex: 1;
    word-break: break-all;
    color: #0b0b0b;
  }
}
</style>
