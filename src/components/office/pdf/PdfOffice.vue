<template>
  <vue-office-pdf 
    :src="pdf"
    @rendered="renderedHandler"
    @error="errorHandler"
  />
</template>

<script>
//引入VueOfficePdf组件
import VueOfficePdf from '@vue-office/pdf'

export default {
  components: {
    VueOfficePdf
  },
  data() {
    return {
      pdf: 'https://files.zhiqiuge.com/xiangshuye/31.pdf' //设置文档地址
    }
  },
  methods: {
    renderedHandler() {
      console.log('渲染完成')
    },
    errorHandler() {
      console.log('渲染失败')
    }
  }
}
</script>