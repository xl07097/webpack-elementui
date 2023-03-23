<template>
  <div class="grid-layout-wrap">
    <slot>
      <GridItem
        v-for="item of fields"
        :key="item.label"
        :label="item.label"
        :value="value[item.prop]"
      />
    </slot>
  </div>
</template>

<script>
import GridItem from './GridItem.vue'
export default {
  name: 'GridLayout',
  components: { GridItem },
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
  },
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
