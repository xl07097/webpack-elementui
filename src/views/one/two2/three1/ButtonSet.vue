<template>
  <div>
    <el-button v-for="button of preList" :key="button.functionName" @click="action(row.functionName)">
      {{ button.title }}
    </el-button>
    <el-dropdown v-if="leftButton.length>0" trigger="click" @command="handleClick">
      <el-button type="primary">
        更多<i class="el-icon-arrow-down el-icon--right" />
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="button of leftButton" :key="button.functionName" :command="button.functionName"> {{ button.title }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data(){
    return {
      routeInfo: this.$store.state.permission.shapshot
    }
  },
  computed:{
    buttonList(){
      return Object.freeze(this.routeInfo.authrity || [])
    },
    preList(){
      const buttonList = this.buttonList
      if(buttonList.length>3){
        return Object.freeze(this.buttonList.slice(0, 2))
      }
      return buttonList
    },
    leftButton(){
      const buttonList = this.buttonList
      if(buttonList.length<=3){
        return [] 
      }
      return Object.freeze(this.buttonList.slice(2))
    }
  },
  methods:{
    action(method){
      this.$emit('action', method)
    },
    handleClick(command){
      console.log(command)
    }
  }
}
</script>

<style>

</style>