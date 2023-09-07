<template>
  <div class="xsy-title">
    <slot>
      {{ title }}
    </slot>
  </div>
</template>

<script>
export default {
  name: 'XsyTitle',
  props:{
    title:{
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.xsy-title{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
  margin-bottom: 10px;
  background-image: linear-gradient(90deg, green, green);
  background-size: 3px 76%;
  background-repeat: no-repeat;
  background-position: 0 center;
}
</style>