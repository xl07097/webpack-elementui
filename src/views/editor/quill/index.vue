<template>
  <div class="quill-demo1">
    <QuillEditor />
  </div>
</template>

<script>
import QuillEditor from '@/components/QuillEditor.vue';
export default {
  components:{ QuillEditor },
  data(){
    return {

    }
  },
  mounted(){

  }
}
</script>

<style lang="scss" scoped>
.quill-demo1{
  width: 1000px;
}
</style>