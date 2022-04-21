<template>
  <el-form
    ref="formRender"
    :model="currentData"
    :label-width="labelWidth"
    inline
  >
    <el-form-item
      v-for="field in fields"
      :key="field.prop"
      :label="field.label"
      :label-width="field.labelWidth"
      :prop="field.prop"
    >
      <item-render
        v-model="currentData[field.prop]"
        :tag="field.type"
        :field="field.field"
        :label="field.label"
        :config="field.config"
      />
    </el-form-item>
  </el-form>
</template>
<script>
import ItemRender from './ItemRender';

export default {
  name: 'FormRender',
  components: { ItemRender },
  props: {
    value: {
      type: Object,
      default() {
        return {};
      },
    },
    fields: {
      type: Array,
      default() {
        return [];
      },
    },
    labelWidth: {
      type: String,
      default: '100px',
    },
  },
  data() {
    return {};
  },
  computed: {
    currentData: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
};
</script>
