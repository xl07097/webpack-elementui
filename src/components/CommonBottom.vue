<template>
  <div class="erp-form-submit-defined">
    <slot>
      <ElButton
        v-if="saveVisible"
        size="small"
        type="primary"
        :loading="loading"
        plain
        style="min-width: 90px"
        @click="submit"
      >
        {{ saveText }}
      </ElButton>
      <ElButton
        size="small"
        style="min-width: 90px"
        :loading="loading"
        @click="back"
      >
        {{ backText }}
      </ElButton>
    </slot>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  name: 'CommonBottom',
  props: {
    saveVisible: {
      type: Boolean,
      default: true,
    },
    saveText: {
      type: String,
      default: '保存',
    },
    backText: {
      type: String,
      default: '返回',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    // ...mapState({
    //   collapse: state => state.menu.collapse,
    // }),
  },
  methods: {
    submit() {
      this.$emit('submit')
    },
    back() {
      this.$emit('back')
    },
  },
}
</script>

<style lang="scss" scoped>
.erp-form-submit-defined {
  position: fixed;
  right: 0;
  bottom: 0;
  width: calc(100% - var(--erp-sider-width));
  z-index: 100;
  padding: 12px 24px;
  text-align: right;
  background: #fff;
  border-top: 1px solid #e8e8e8;
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.03);
  &.collapse{
    width: calc(100% - var(--erp-sider-collapse-width));
  }
}
</style>
