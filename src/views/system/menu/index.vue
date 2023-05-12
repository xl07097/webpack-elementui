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
      <el-table-column prop="title" label="名称" width="180" />
      <el-table-column prop="nodeType" label="类别" width="120">
        <template #default="{ row }">
          <el-tag v-if="row.nodeType === 1" type="success">目录</el-tag>
          <el-tag v-else-if="row.nodeType === 2" type="info">菜单</el-tag>
          <el-tag v-else-if="row.nodeType === 3" type="warning">按钮</el-tag>
          <el-tag v-else>未知</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="path" label="路径" />
      <el-table-column prop="component" label="文件路径" />
      <el-table-column prop="functionName" label="按钮标志" width="120" />
      <el-table-column prop="sortNum" label="排序" width="120" />
      <el-table-column prop="status" label="状态" width="120">
        <template #default="{ row }">
          <el-tag v-if="row.status === 1" type="success">启用</el-tag>
          <el-tag v-else-if="row.status === 2" type="info">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createUserName" label="创建人" width="120" />
      <el-table-column prop="createTime" label="创建时间" width="150" />
      <el-table-column
        prop="action"
        label="操作"
        width="160"
        fixed="right"
      >
        <template #default="{ row }">
          <el-link
            type="primary"
            icon="el-icon-edit"
            :underline="false"
            style="font-size:13px;"
            @click="edit(row)"
          >
            编辑
          </el-link>&emsp;
          <el-link 
            type="danger"
            :underline="false"
            icon="el-icon-delete"
            style="font-size:13px;"
            @click="trash(row)"
          >
            删除
          </el-link>
        </template>
      </el-table-column>
    </el-table>

    <MenuEdit
      :detail="detail"
      :options="tableData"
      :visible.sync="editVisible"
      :oper-type="operType"
      @submit="getData"
    />
  </div>
</template>

<script>
import { getMenu, trashMenu } from '@/apis/menu' // 从api中引入getMenu方法，用于获取菜单列表数据

import MenuEdit from './MenuEdit.vue'

export default {
  name: 'MenuConfig',
  components: { MenuEdit },
  data() {
    return {
      tableData: [],
      detail: {},
      editVisible: false,
      operType: 'add',
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const data = await getMenu()
      this.tableData = data.data
    },
    add(){
      this.detail = { }
      this.operType = 'add'
      this.editVisible = true
    },
    edit(row) {
      this.detail = { ...row, children: null }
      this.operType = 'edit'
      this.editVisible = true
    },
    trash(row){
      this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await trashMenu(row.id)
        if(res.code === 200){
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getData()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    headerRowStyle(){
      return 'background-color: rgb(209, 231, 255);'
    }
  },
}
</script>
