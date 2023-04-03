<template>
  <el-drawer
    title="编辑"
    :visible="visible"
    :wrapper-closable="false"
    @open="open"
    @close="close"
  >
    <el-tree
      ref="treeRef"
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :default-checked-keys="checkedKeys"
      :props="defaultProps"
    />
    <div class="demo-drawer__footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="onSubmit">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
    </div>
  </el-drawer>
</template>

<script>
import { get, post } from '@/http/request'
export default {
  props:{
    id:{
      type: [String, Number],
      default: 0
    },
    detail:{
      type: Object,
      default(){
        return {}
      }
    },
    visible:{
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      checkedKeys: [],
      loading: false
    }
  },
  methods:{
    async open(){
      this.loading = true
      const res = await get(`/sysPrivilege/getPrivilege/${this.id}`)
      this.loading = false
      if(res.code === 200){
        this.data = res.data.menuTree || []
        this.checkedKeys = res.data.privilegeList
      }
    },
    onSubmit(){
      const checkedKeys = this.$refs.treeRef.getCheckedKeys()
      this.loading = true
      post('/sysPrivilege/update', {
        roleId: this.id,
        menuList: checkedKeys
      }).then(res => {
        this.loading = false
        if(res.code === 200){
          this.close()
        }
      })
    },
    close(){
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss">
.el-drawer__body:has(>.demo-drawer__footer){
  margin-bottom: 60px;
  overflow-y: auto;
}
.demo-drawer__footer{
    position: fixed;
    bottom: 0;
    /* width: 100%; */
    text-align: right;
    right: 0;
    padding: 10px 20px;
}
</style>