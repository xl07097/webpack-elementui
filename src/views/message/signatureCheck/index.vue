<template>
  <div>
    <!-- <PdfOffice /> -->
    <el-input style="width:200px;">
      <template #append>
        <el-button type="primary">哈哈哈</el-button>
      </template>
    </el-input>
    <embed
      name="070DCB5263B13EFD6C26499FD14424FE"
      width="100%"
      height="100%"
      src="https://files.zhiqiuge.com/xiangshuye/31.pdf"
      type="application/pdf"
      internalid="070DCB5263B13EFD6C26499FD14424FE"
    >
  </div>
</template>

<script>
// import localforage from 'localforage'

import { divide } from 'mathjs'
import Decimal from 'decimal.js'

import PdfOffice from '@/components/office/pdf/PdfOffice.vue'

export default {
  name: 'SignatureCheck',
  components:{PdfOffice},
  data(){
    return {

    }
  },
  mounted(){
    // localforage.setItem('userList', [{
    //   name: 'ahhah'
    // }])
    console.log(divide(0.3, 0.2))
    console.log(new Decimal(0.3).div(new Decimal(0.1)).toNumber())
  },
  methods:{
    test(){
      
    }
  }
}
</script>
