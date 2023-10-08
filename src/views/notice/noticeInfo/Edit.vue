<template>
  <el-drawer
    title="编辑"
    :visible="true"
    :wrapper-closable="false"
    @open="open"
    @close="close"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="110px"
    >
      <el-form-item label="消息类别" prop="type">
        <el-radio-group
          v-model="form.type"
          size="small"
        >
          <el-radio-button label="sms">短信</el-radio-button>
          <el-radio-button label="email">邮件</el-radio-button>
          <el-radio-button label="weixin">企业微信</el-radio-button>
          <el-radio-button label="dingding">钉钉</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="接收人" prop="to">
        <el-select
          v-model="form.to"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择接收人"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      
      <el-form-item label="主题" prop="subject">
        <el-input v-model="form.subject" placeholder="主题" />
      </el-form-item>
      <el-form-item label="内容格式" prop="content.type">
        <el-radio-group
          v-model="form.content.type"
          size="small"
        >
          <el-radio-button label="txt">文本</el-radio-button>
          <el-radio-button label="html">html</el-radio-button>
          <el-radio-button label="markdown">markdown</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="内容" prop="content.value">
        <el-input
          v-model="form.content.value"
          type="textarea"
          :rows="5"
          placeholder="内容"
        />
      </el-form-item>
    </el-form>

    <div class="demo-drawer__footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="onSubmit">
        {{ loading ? '提交中 ...' : '保 存' }}
      </el-button>
    </div>
  </el-drawer>
</template>

<script>
import validate from '@/utils/validate'
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
  },
  data() {
    return {
      form: {
        'type': 'email',
        'to': [],
        'from': {
          'name': '',
          'email': ''
        },
        'subject': '接口测试',
        'content': {
          'type': 'html',
          'value': '接口测试'
        }
      },
      rules: Object.freeze({
        type: { required: true, message: '消息类别必选', trigger: 'change' },
        to: [{ required: true, type: 'array', message: '接收人必填', trigger: 'change' },
          { type: 'array', defaultField: { type: 'email' }, message: '邮箱格式', }],
        subject: { required: true, message: '主题必填', trigger: 'blur' },
        'content.type': { required: true, message: '内容格式必填', trigger: 'change' },
        'content.value': { required: true, message: '内容必填', trigger: 'blur' },
      }),
      options: [{
        label: '1058392650@qq.com',
        value:'1058392650@qq.com'
      }],
      drawer: false,
      loading: false,
    }
  },
  computed:{
    
  },
  methods: {
    open() {
      
    },
    onSubmit() {
      this.$refs.formRef.validate((isValid) => {
        if (!isValid) return
        return
        this.loading = true
        fetch('http://localhost:3003/sms/send', {
          method: 'POST',
          body: JSON.stringify({
            ...this.form,
            to: this.form.to.map(item => {
              return {
                'name': '',
                'email': item,
                'user_id': ''
              }
            })
          }),
          headers:{
            'content-type': 'application/json',
            'AuthToken': 'W88G0R46WEUP9JXKOF6H71WI'
          }
        }).then(res => res.json()).then(res => {
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
      this.$emit('close')
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
