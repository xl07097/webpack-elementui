<template>
  <div v-loading="loading" class="sh-container">
    <ShHeader :title="title" @back="close" />
    <slot />

    <slot name="footer">
      <ShBottom
        :save-visible="bottomConfig.saveVisible"
        :loading="loading"
        @submit="submit"
        @back="close"
      />
    </slot>
  </div>
</template>

<script>
export default {
  name: 'ShContainer',
  props: {
    title: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    bottomConfig: {
      type: Object,
      default() {
        return {
          saveVisible: true,
        }
      },
    },
  },
  methods: {
    submit() {
      this.$emit('submit')
    },
    close() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
.sh-container {
  position: relative;
  padding-bottom: 70px;
}
</style>
