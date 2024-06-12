<template>
  <ElDialog
    title="导出"
    :modal-append-to-body="true"
    :append-to-body="true"
    top="100px"
    width="600px"
    :visible="visible"
    @close="close"
  >
    <ElButton :loading="loading" type="primary" @click="exportData(1)">
      导出所有数据
    </ElButton>
      &emsp;
    <ElButton
      :loading="loading"
      :disabled="selectIds.length == 0"
      @click="exportData(2)"
    >
      导出表格所选数据
    </ElButton>

    <slot name="extend" />
  </ElDialog>
</template>
<script>
import * as http from '@/http/request'

export default {
  name: 'ExportTable',
  props: {
    // 导出地址
    url: {
      type: String,
      default: '',
    },
    // 导出全部数据请求参数
    data: {
      type: Object,
      default() {
        return {}
      },
    },
    // 导出选择数据参数
    selectIds: {
      type: [Array, String],
      default() {
        return []
      },
    },
    // 选择导出参数名
    selectName: {
      type: String,
      default: 'idList',
    },
    visible: {
      type: Boolean,
      default: false,
    },
    // 导出数据是否为文件流
    stream: {
      type: Boolean,
      default: true,
    },
    // 导出请求方法
    method: {
      type: String,
      default: 'downloadPost',
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    exportData(flag) {
      this.custom({
        url: this.url,
        method: this.method,
        stream: this.stream,
        selectName: this.selectName,
        flag: flag
      })
    },
    custom(item) {
      // flag 1 全部数据    2.选择数据
      let req = {
        ...this.data,
      }
      if (item.flag === 2) {
        req[item.selectName] = this.selectIds
      }
      this.loading = true
      http[item.method](item.url, req)
        .then(({ code, data }) => {
          if (code === 0) {
            // 返回的是文件路径，不是文件流
            if (!item.stream) {
              http.downloadData('open/file/download', data)
            }
            this.close()
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    close() {
      this.$emit('update:visible', false)
    },
  },
}
</script>
