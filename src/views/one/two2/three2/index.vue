<template>
  <div style="position: relative">
    lp
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    }
  },
  created() {
    console.time('laa')
  },
  mounted() {
    this.$nextTick(() => {
      console.timeEnd('laa')
    })
  },
}
</script>

<style>
.llp-label {
  position: absolute;
  left: 10px;
  top: 6px;
  line-height: 20px;
  pointer-events: none;
  background: #fff;
}
.llp {
  height: 32px;
}
.llp:focus {
  border-color: red;
}
.llp:focus + .llp-label {
  color: red;
  transition: all 0.1s;
  transform: translateY(-10px);
}
</style>
