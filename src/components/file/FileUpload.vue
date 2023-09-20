<template>
  <div>
    <ElUpload
      v-if="operType=='add'"
      ref="uploadRef"
      :action="action"
      :show-file-list="false"
      with-credentials
      name="file"
      :before-upload="beforeUpload"
      :accept="accept"
      :on-success="upSuccess"
      :on-error="upError"
      :disabled="isUploading || list.length>=limits"
    >
      <ElButton
        type="primary"
        plain
        icon="el-icon-plus"
        size="mini"
        :disabled="list.length>=limits"
        :loading="isUploading"
      >
        点击上传
      </ElButton>
      <div slot="tip" class="el-upload__tip">
        {{ `最多可添加 ${ limits } 个附件，单个附件大小不可超过 ${ limits }M，
        支持${ accept }格式文件` }}
      </div>
    </ElUpload>
    <FileList :file-list.sync="list" :oper-type="operType" />
  </div>
</template>

<script>
import { isOutLimit } from '@/utils/validate'
import FileList from './FileList.vue'
import { regExpMatch } from '@/utils/common'
export default {
  components: { FileList },
  props: {
    operType: {
      type: String,
      default: 'add',
    },
    fileList: {
      type: Array,
      default() {
        return []
      },
    },
    limits: {
      type: Number,
      default: 10,
    },
    action: {
      type: String,
      default: '/hriceErp/file/OSSUpload/empSettle',
    },
    accept:{
      type: String,
      default: '.docx,.doc,.xls,.xlsx,.ppt,.pptx,.pdf,.jpg,.jpeg,.png,.zip,.rar',
    }
  },
  data() {
    return {
      isUploading: false,
    }
  },
  computed: {
    list: {
      get() {
        return this.fileList
      },
      set(val) {
        this.$emit('update:fileList', val)
      },
    },
  },
  methods: {
    beforeUpload(file) {
      if (!file) {
        return
      }
      if (!regExpMatch(new RegExp('(' + this.accept.replace(/,/g, '|') + ')$'), file.name)) {
        this.$Info.warning('文件格式错误，请检查')
        return false
      }
      if (isOutLimit(file.size, this.limits)) {
        this.$Info.warning(`文件大小超出 ${this.limits}M 限制！`)
        return false
      }
      this.isUploading = true
      return true
    },
    upSuccess(res) {
      this.isUploading = false
      if (res.code === 0) {
        let data = res.data || {}
        this.list.push({
          name: data.name,
          url: data.url,
        })
      } else {
        this.$Info.info(res.message)
      }
    },
    upError() {
      this.isUploading = false
    },
  },
}
</script>
