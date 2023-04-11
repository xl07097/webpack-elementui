<template>
  <div class="sh-tab">
    <input
      id="upfile"
      type="file"
      multiple
      @change="change"
    >
  </div>
</template>

<script>
import { uploadFiles } from '@/utils/ponyfill'
export default {
  name: 'NoticeInfo',
  data(){
    return {
    }
  },
  methods:{
    change(e) {
      const files = e.target.files;
      console.log(files)
      uploadFiles(files, {}).then(res => {
        console.log(res)
      })

    },
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
