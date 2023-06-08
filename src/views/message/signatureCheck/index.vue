<template>
  <div />
</template>

<script>
import localforage from 'localforage'
export default {
  name: 'SignatureCheck',
  data(){
    return {

    }
  },
  mounted(){
    localforage.setItem('userList', [{
      name: 'ahhah'
    }])
  },
  methods:{
    test(){
      
    }
  }
}
</script>
