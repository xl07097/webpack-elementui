<template>
  <div class="sh-tab">
    lp
  </div>
</template>

<script>
export default {
  name: 'NoticeInfo',
  data(){
    return {
      request: null
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    init(){
      this.request = window.indexedDB.open('mydatabase');
      console.log(this.request)
      this.request.onsucess = event => {
      // do something
        const db = event.target.result;
        console.log(db)
      }     
    }
  }
}
</script>

<style lang="scss">
.sh-tab{
  display: flex;
  align-items: center;
  .sh-tab-item{
    padding: 8px 20px;
  }
  background: linear-gradient(to right, #f2f2f2 0%, #f2f2f2 100%) left bottom/ 100% 2px no-repeat;

}
</style>
