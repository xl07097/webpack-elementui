<template>
  <div>
    <div v-for="(item, index) of _list" :key="index">
      <el-form-item label="省" :prop="`address.${index}.provice`" :rules="rules.provice"><el-input v-model="item.provice"></el-input></el-form-item>
      <el-form-item label="市" :prop="`address.${index}.city`"  :rules="rules.city"><el-input v-model="item.city"></el-input></el-form-item>
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
  computed:{
    _list: {
      get(){
        return this.value
      },
      set(val){
        this.$emit('input', val)
      }
    }
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
      this._list.push({
        provice: '',
        city: ''
      })
    }
  }
}
</script>

<style></style>
