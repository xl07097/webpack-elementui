<template>
  <div class="table-toolbar">
    <div class="table-toolbar-left">
      <slot name="left">
        <el-button v-for="button of buttonList" :key="button.functionName" @click="actionMethod(button.functionName)">
          {{ button.title }}
        </el-button>
      </slot>
    </div>
    <div class="table-toolbar-right">
      <slot name="right">
        <el-button type="default" size="small">default</el-button>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props:{

  },
  data(){
    return {
      routeInfo: this.$store.state.permission.shapshot
    }
  },
  computed:{
    buttonList(){
      return Object.freeze(this.routeInfo.authrity || [])
    }
  },
  methods:{
    add(prop){
      this.actionMethod(prop)
    },
    actionMethod(prop){
      this.$emit('actionMethod', prop)
    }
  }
}
</script>

<style lang="scss">
.table-toolbar{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
}
</style>