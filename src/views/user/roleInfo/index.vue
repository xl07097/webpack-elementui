<template>
  <div>
    <el-button @click="getRole">获取</el-button>
    <el-tree
      ref="tree"
      :data="data"
      show-checkbox
      default-expand-all
      node-key="id"
      highlight-current
      :default-checked-keys="checkedKeys"
      :props="defaultProps"
    />
  </div>
</template>

<script>
import { get } from '@/http/request';
export default {
  name: 'RoleInfo',
  data(){
    return {
      data: [],
      defaultProps:{
        label: 'title'
      },
      checkedKeys: []
    }
  },
  mounted(){
    this.queryPrivile()
  },
  methods:{
    queryPrivile(){
      get('/sysPrivilege/getPrivilege/10000').then(res => {
        this.data = Object.freeze(res.data.menuTree)
        this.checkedKeys = res.data.privilegeList
      })
    },
    getRole(){
      console.log(this.$refs.tree.getCheckedKeys())
    }
  }
}
</script>


