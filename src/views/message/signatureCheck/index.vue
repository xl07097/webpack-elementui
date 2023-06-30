<template>
  <div />
</template>

<script>
// import localforage from 'localforage'

import { divide } from 'mathjs'
import Decimal from 'decimal.js'


export default {
  name: 'SignatureCheck',
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
