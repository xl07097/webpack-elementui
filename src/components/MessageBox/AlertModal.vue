<template>
  <div
    v-if="show"
    v-show="show"
    id="alertContent"
    class="modal"
  >
    <div class="alert-modal">
      <div class="modal-header">
        <img
          :src="require('@/assets/alertModal/info.png').default"
          alt="info"
        >
        <span>{{ title }}</span>
      </div>
      <div class="modal-body">
        {{ text }}
      </div>
      <div class="modal-footer">
        <div
          class="confirm"
          style="margin-left: 46px"
          @click="close"
        >
          确定
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Alert',
  data() {
    return {
      show: true,
    };
  },
  methods: {
    close() {
      this.show = false;
      this.onOk && this.onOk();
    },
  },
};
</script>

<style scoped lang="scss">
@import 'msgBoxCommon';
</style>
