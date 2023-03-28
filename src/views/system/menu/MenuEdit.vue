<template>
  <el-drawer
    title="编辑"
    :visible="visible"
    :wrapper-closable="false"
    @open="open"
    @close="close"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="名称" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="类别" prop="nodeType">
        <el-radio-group v-model="form.nodeType" :disabled="operType==='edit'" size="small">
          <el-radio-button :label="1">菜单</el-radio-button>
          <el-radio-button :label="2">目录</el-radio-button>
          <el-radio-button :label="3">按钮</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.nodeType!==3" label="路径" prop="path">
        <el-input v-model="form.path" />
      </el-form-item>
      <el-form-item v-if="form.nodeType!==3" label="文件路径" prop="component">
        <el-input v-model="form.component" />
      </el-form-item>
      <el-form-item v-if="form.nodeType===3" label="按钮标志" prop="functionName">
        <el-input v-model="form.functionName" />
      </el-form-item>
      <el-form-item label="排序" prop="sortNum">
        <el-input-number
          v-model="form.sortNum"
          :min="-99"
          :max="99"
          :precision="0"
          :step="1"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <div class="demo-drawer__footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="onSubmit">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
    </div>
  </el-drawer>
</template>

<script>
import { post } from '@/http/request'
export default {
  props:{
    row:{
      type: Object,
      default(){
        return {}
      }
    },
    operType:{
      type: String,
      validator(value){
        return ['add', 'edit', 'see'].includes(value)
      },
      default: 'add'
    },
    visible:{
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      form:{},
      rules: Object.freeze({
        title: {required: true, message: '必填', trigger: 'blur'},
        nodeType: {required: true, message: '必选', trigger: 'change'},
        path: {required: true, message: '必填', trigger: 'blur'},
        functionName: {required: true, message: '必填', trigger: 'blur'},
      }),
      drawer: false,
      loading: false
    }
  },
  methods:{
    open(){
      this.form = Object.assign({}, this.row)
    },
    onSubmit(){
      this.$refs.form.validate(isValid => {
        if (!isValid) return
        this.loading = true
        let url = '/sysMenu/update'
        if(this.operType === 'add'){
          url = '/sysMenu/add'
        }
        post(url, this.form).then(res => {
          this.loading = false
          if (res.code === 200) {
            this.$message.success('操作成功')
            this.close()
            this.$emit('submit')
          }
        })
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