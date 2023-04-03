<template>
  <div>
    <el-button @click="add">新建</el-button>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :header-cell-style="headerRowStyle"
    >
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="name" label="角色名称" :min-width="180" />
      <el-table-column prop="description" label="角色描述" :min-width="180" />
      <el-table-column prop="createUserName" label="创建人" width="120" />
      <el-table-column prop="createTime" label="创建时间" width="150" />
      <el-table-column
        prop="action"
        label="操作"
        width="120"
        fixed="right"
      >
        <template #default="{ row }">
          <el-button @click="auth(row)">授权</el-button>
        </template>
      </el-table-column>
    </el-table>

    <AuthVue
      :id="id"
      :visible.sync="editVisible"
      @submit="getData"
    />
  </div>
</template>

<script>
import {get} from '@/http/request'

import AuthVue from './Auth.vue'
export default {
  name: 'MenuConfig',
  components: { AuthVue },
  data() {
    return {
      tableData: [],
      id: '',
      editVisible: false,
      operType: 'add',
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const res = await get('/sysRole/list')
      if(res.code === 200){
        this.tableData = res.data.records
      }
    },
    add(){
      this.detail = { }
      this.editVisible = true
    },
    auth(row) {
      this.id = row.id
      this.editVisible = true
    },
    headerRowStyle(){
      return 'background-color: rgb(209, 231, 255);'
    }
  },
}
</script>
