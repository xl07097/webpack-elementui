<script>
import GridItem from './GridItem.vue'
export default {
  name: 'GridLayout',
  props: {
    fields: {
      type: Array,
      default() {
        return []
      },
    },
    value: {
      type: Object,
      default() {
        return {}
      },
    },
    labelWidth:{
      type: [String, Number],
      default: null
    }
  },
  render(h){
    const defaults = this.$slots.default
    const {fields, value, labelWidth} = this.$props

    return (<div class="grid-layout-wrap">
      {
        defaults ? defaults: 
          fields.map(item => {
            return <GridItem props={{
              labelWidth: labelWidth,
              label: item.label,
              value: value[item.prop],
            }} />
          })
      }
    </div>)
  }
}
</script>

<style lang="scss">
.grid-layout-wrap {
	display: flex;
	align-items: flex-start;
	flex-wrap: wrap;
	gap: 16px 0;
}
@media screen and (max-width: 600px) {
	.grid-layout-wrap .grid-layout-item {
		width: 100%;
	}
}
@media screen and (min-width: 600px) {
	.grid-layout-wrap .grid-layout-item {
		width: 50%;
	}
}
@media screen and (min-width: 900px) {
	.grid-layout-wrap .grid-layout-item {
		width: 33.33%;
	}
}
@media screen and (min-width: 1200px) {
	.grid-layout-wrap .grid-layout-item {
		width: 25%;
	}
}
</style>
