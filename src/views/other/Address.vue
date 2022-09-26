<template>
  <div>
    <div v-for="(item, index) of value" :key="index">
      <el-form-item :prop="`address.${index}.provice`" :rules="rules.provice"><el-input v-model="item.provice"></el-input></el-form-item>
      <el-form-item :prop="`address.${index}.city`"  :rules="rules.city"><el-input v-model="item.city"></el-input></el-form-item>
    </div>
    <el-button @click="add">add</el-button> 
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data(){
    return {
      rules: {
        provice: [{ required: true }],
        city: [{ required: true }],
      }
    }
  },
  methods:{
    add(){
      this.value.push({
        provice: '',
        city: ''
      })
    }
  }
}
</script>

<style></style>
