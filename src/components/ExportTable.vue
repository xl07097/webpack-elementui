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
    <div v-if="button.length === 0">
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
    </div>
    <template v-else>
      <ElButton
        v-for="item of buttons"
        :key="item.name"
        :loading="loading"
        :type="item.type"
        :disabled="
          item.selectDisable ? (selectIds.length===0) : false
        "
        @click="custom(item)"
      >
        {{ item.name }}
      </ElButton>
    </template>
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
    buttons: {
      type: Array,
      default() {
        return []
      },
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
        req[item.selectName || this.selectName] = this.selectIds
      }
      this.loading = true
      // 文件流下载
      if (item.stream) {
        http[item.method](item.url, req)
          .then(({ code }) => {
            this.loading = false
            if (code === 0) {
              this.close()
            }
          })
          .catch(() => {
            this.loading = false
          })
        return
      }
      // 文件路径
      http
        .post(item.url, req)
        .then(({ code, data }) => {
          if (code === 0) {
            http.downloadData('open/file/download', data)
            this.close()
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    close() {
      this.$emit('update:visible', false)
    },
  },
}
</script>
