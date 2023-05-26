<template>
  <div>
    <el-tree
      :data="data"
      :props="defaultProps"
      :expand-on-click-node="false"
      node-key="id"
      @node-click="handleNodeClick"
    />
  </div>
</template>

<script>
import { get } from '@/http/request'
import { array2Tree } from '@/utils/commons'
export default {
  data(){
    return {
      data:[],
      defaultProps: {
        label: 'dictName',

      }
    }
  },
  created(){
    this.init()
  },
  methods:{
    async init(){
      const res = await get('/dict/tree')
      this.data = Object.freeze(array2Tree(res.data, {parentKey: 'parentId'}))
    },
    handleNodeClick(){
    
    }
  }
}
</script>

<style>

</style>