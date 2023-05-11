<template>
  <div>
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
  </div>
</template>

<script>
export default {
  data(){
    return {
      data:[
        {
          id: 1,
          dictName: '系统字典',
          parentId: 0,
          children: [
            {
              id: 3,
              dictName: '性别',
              parentId: 1
            }
          ]
        },
        {
          id: 2,
          dictName: '业务字典',
          parentId: 0,
          children: []
        }
      ],
      defaultProps: {
        label: 'dictName',

      }
    }
  },
  methods:{
    handleNodeClick(){
    
    }
  }
}
</script>

<style>

</style>