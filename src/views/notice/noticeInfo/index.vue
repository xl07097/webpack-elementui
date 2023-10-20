<template>
  <div id="hahh" ref="haha">
    <el-button @click="edit">消息发送</el-button>
    <Edit :visible.sync="visible" @close="close" />
  </div>
</template>

<script>
// import {toPng} from 'html-to-image'
import Edit from './Edit.vue';
export default {
  name: 'NoticeInfo',
  components: { Edit },
  data(){
    return {
      openType: null,
      visible: false
    }
  },
  methods:{
    edit(){
      this.visible = true
    },
    close(){
      this.visible = false
    },
    pl(){
      // toPng(document.querySelector('#hahh')).then(function (dataUrl) {
      //   const img = new Image()
      //   img.style.width = '100%'
      //   img.src = dataUrl
      //   img.onload = function(){
      //     document.body.append(img)
      //   }
      // }).catch((err) => {
      //   console.log(err)
      // });
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
