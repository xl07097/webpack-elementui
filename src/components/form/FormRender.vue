<template>
  <el-form
    ref="formRender"
    class="search-form"
    :model="currentData"
    :rules="rules"
    :label-width="labelWidth"
    inline
  >
    <el-form-item
      v-for="field of fields"
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

    <el-form-item class="search-form-item">
      <el-button type="primary">查询</el-button>
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
    labelWidth: {
      type: String,
      default: '80px',
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

<style lang="scss">
.search-form{
  display: inline-flex;
  flex-wrap: wrap;
  .search-form-item{
    margin-left: auto;
  }
}
</style>