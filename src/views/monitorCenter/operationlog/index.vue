<template>
  <div><div id="app1"></div></div>
</template>

<script>
import { loadMicroApp } from 'qiankun';
export default {
  name: 'OperationLog',
  data(){
    return {
    }
  },
  mounted(){
    const app = loadMicroApp({ 
      name: 'lp-app', 
      entry: 'http://localhost:8081/app1/',
      container: '#app1', 
    });
    this.$on('hook:beforeDestroy', function(){
      app.mountPromise.then(() => app.unmount())
    })
  },
  methods:{
    
  },
}
</script>

<style>

</style>
