<template>
  <div>
    <el-button @click="toggle">toggle</el-button>
    <el-button v-auth="tab">按钮1</el-button>
    <el-button v-auth="tab">按钮2</el-button>
    <el-input placeholder="kakak">
      lp
    </el-input>
    <el-input v-model="num" @change="change" @blur="blur" @input="input"></el-input>
  </div>
</template>

<script>
export default {
  name: 'Department',
  data(){
    return {
      tab: 1,
      num: 0,
      lp: ''
    }
  },
  methods:{
    toggle(){
      this.tab = this.tab == 1?2:1
    },
    blur(e){
      console.log(e.target.value)
    },
    change(currentValue, oldValue){
      console.log(currentValue, oldValue)
    },
    input(v){
      console.log("v:",v)

    }
  }

}
</script>

<style>
[pseudo="-webkit-input-placeholder"]{
  display: none;
}
</style>
