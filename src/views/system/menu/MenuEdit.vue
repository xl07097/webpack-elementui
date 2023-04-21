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
      label-width="110px"
    >
      <el-form-item label="名称" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="类别" prop="nodeType">
        <el-radio-group
          v-model="form.nodeType"
          :disabled="operType === 'edit'"
          size="small"
          @change="() => {form.pid=''}"
        >
          <el-radio-button :label="1">目录</el-radio-button>
          <el-radio-button :label="2">菜单</el-radio-button>
          <el-radio-button :label="3">按钮</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="父级菜单" prop="pid">
        <el-cascader
          v-model="form.pid"
          :disabled="operType!='add'"
          :options="cascaderOption"
          :props="props"
          style="width:100%"
          clearable
        />
      </el-form-item>
      <el-form-item v-if="form.nodeType !== 3" label="路径" prop="path">
        <el-input v-model="form.path" />
      </el-form-item>
      <el-form-item
        v-if="form.nodeType !== 3"
        label="文件路径"
        prop="component"
      >
        <el-input v-model="form.component" />
      </el-form-item>
      <el-form-item
        v-if="form.nodeType === 3"
        label="按钮标志"
        prop="functionName"
      >
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
      <el-button type="primary" :loading="loading" @click="onSubmit">
        {{ loading ? '提交中 ...' : '确 定' }}
      </el-button>
    </div>
  </el-drawer>
</template>

<script>
import { post } from '@/http/request'
import { array2Tree, deepClone, tree2Array } from '@/utils/commons'
export default {
  props: {
    detail: {
      type: Object,
      default() {
        return {}
      },
    },
    operType: {
      type: String,
      validator(value) {
        return ['add', 'edit', 'see'].includes(value)
      },
      default: 'add',
    },
    visible: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      form: {
        title: '',
        nodeType: '',
        pid: '',
        path: '',
        component: '',
        functionName: '',
        sortNum: 0,
        status: 1,
      },
      rules: Object.freeze({
        title: { required: true, message: '必填', trigger: 'blur' },
        nodeType: { required: true, message: '必选', trigger: 'change' },
        path: { required: true, message: '必填', trigger: 'blur' },
        functionName: { required: true, message: '必填', trigger: 'blur' },
      }),
      drawer: false,
      loading: false,
    }
  },
  computed:{
    cascaderList(){
      const options = deepClone(this.options)
      
      return Object.freeze(tree2Array(options))
    },
    cascader1(){
      let list = this.cascaderList.filter(item => item.nodeType === 1)
      return Object.freeze(array2Tree(deepClone(list)))
    },
    cascader2(){
      let list = this.cascaderList.filter(item => item.nodeType === 1|| item.nodeType === 2)
      return Object.freeze(array2Tree(deepClone(list)))
    },
    cascaderOption(){
      const nodeType = this.form.nodeType
      // 目录
      if(nodeType === 1 || nodeType === 2){
        return this.cascader1
      }else if(nodeType === 3){
        // 菜单
        return this.cascader2
      }
      return Object.freeze([])
    },
    props(){
      return {
        checkStrictly: this.form.nodeType !== 3,
        label: 'title',
        value: 'id'
      }
    }
  },
  methods: {
    open() {
      this.form = Object.assign({}, this.detail)
    },
    onSubmit() {
      this.$refs.form.validate((isValid) => {
        if (!isValid) return
        this.loading = true
        let url = '/sysMenu/update'
        if (this.operType === 'add') {
          url = '/sysMenu/add'
        }
        let pid = this.form.pid
        if(Array.isArray(pid) || pid.at(-1)){
          pid = pid.at(-1)
        }else {
          pid = pid || '0'
        }
        post(url, {
          ...this.form, 
          pid: pid
        }).then((res) => {
          this.loading = false
          if (res.code === 200) {
            this.$message.success('操作成功')
            this.close()
            this.$emit('submit')
          }
        })
      })
    },
    close() {
      this.$emit('update:visible', false)
    },
  },
}
</script>

<style lang="scss">
.el-drawer__body:has(> .demo-drawer__footer) {
  margin-bottom: 60px;
  padding-right: 20px;
  overflow-y: auto;
  overflow-x: hidden;
}
.demo-drawer__footer {
  position: fixed;
  bottom: 0;
  /* width: 100%; */
  text-align: right;
  right: 0;
  padding: 10px 20px;
}
</style>
