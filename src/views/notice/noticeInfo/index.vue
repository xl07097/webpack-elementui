<template>
  <div id="hahh" ref="haha">
    <el-button @click="pl">导出</el-button>
    <img width="100" src="@/assets/editside.png" alt="163-1.png">
    哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
    哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
    哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
    哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
    哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
    哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
    哈哈哈哈哈 <span style="background-color:yellow"> 哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
      哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</span>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
  </div>
</template>

<script>
import {toPng} from 'html-to-image'
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
    },
    pl(){
      toPng(document.querySelector('#hahh')).then(function (dataUrl) {
        const img = new Image()
        img.style.width = '100%'
        img.src = dataUrl
        img.onload = function(){
          document.body.append(img)
        }
      }).catch((err) => {
        console.log(err)
      });
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
