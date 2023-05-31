<template>
  <div class="css-template css-template1">
    <span class="css-template-span" />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.css-template {
  display: inline-flex;
}
.css-template1 {
  .css-template-span {
    position: relative;
    display: inline-block;
    width: 12px;
    height: 12px;
    border: 1px solid #ba4747;
    border-radius: 50px;
    &::before {
      position: absolute;
      left: 0;
      top: 0;
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      background: #ba4747;
      border-radius: 50px;
    }
  }
}
</style>
