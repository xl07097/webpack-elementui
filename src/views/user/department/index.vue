<template>
  <div>
    <el-button @click="toggle">toggle</el-button>
    <el-button v-auth="tab">按钮1</el-button>
    <el-button v-auth="tab">按钮2</el-button>
  </div>
</template>

<script>
export default {
  name: 'Department',
  data(){
    return {
      tab: 1
    }
  },
  methods:{
    toggle(){
      this.tab = this.tab == 1?2:1
    }
  }

}
</script>

<style>

</style>
