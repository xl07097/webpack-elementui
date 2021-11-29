<template>
  <el-form ref="formRender" :model="currentData" :rules="rules" inline>
    <el-form-item
      v-for="field in fields"
      :key="field.key"
      :label="field.label"
      :label-width="field.labelWidth || labelWidth"
      :prop="field.key"
    >
      <item-render
        :tag="field.type"
        v-model="currentData[field.key]"
        :field="field.key"
        :label="field.label"
        :config="field.config"
      >
      </item-render>
    </el-form-item>
  </el-form>
</template>
<script>
import ItemRender from './ItemRender';

export default {
  components: { ItemRender },
  props: {
    value: {
      type: Object,
      default() {
        return {};
      },
    },
    // 规则
    rules: {
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
  data() {
    return {
      labelWidth: '100px',
    };
  },
};
</script>
