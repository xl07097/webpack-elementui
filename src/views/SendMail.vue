<template>
  <div class="wrap">
    <div class="inner"></div>
  </div>
</template>

<script>
// import ExcelJS from 'exceljs';

  export default {
    name: 'SendMail',
    props: {
      id: {
        type: String,
        default: '',
      },
    },
    data() {
      return {};
    },
    methods: {
      send() {},
    },
    mounted() {
      console.log('window窗口高度：%s', window.innerHeight);
      console.log('html元素高度：%s', document.querySelector('html').clientHeight);
      console.log('html元素offset高度：%s', document.querySelector('html').offsetHeight);
      console.log('html元素offset高度：%s', document.querySelector('html').offsetTop);
    },
  };
</script>

<style lang="less">
.wrap {
  // height: 200px;
  background: green;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid #ccc;
  .inner {
    height: 1000px;
    background: #00c1c0;
  }
}
</style>
