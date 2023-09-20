<template>
  <ul class="sh-upload-wrap">
    <li v-for="(item, index) of list" :key="index" class="sh-upload-filelist">
      <FileLink
        class="sh-file-name"
        :url="`${item.url}`"
        :name="item.name"
      />
      &emsp;&emsp;
      <ElLink
        v-if="operType != 'see'"
        icon="el-icon-delete"
        type="danger"
        :underline="false"
        @click="dels(index)"
      />
    </li>
  </ul>
</template>

<script>
import FileLink from './FileLink.vue'
export default {
  name: 'FileList',
  components: { FileLink },
  props: {
    fileList: {
      type: Array,
      default() {
        return []
      },
    },
    operType: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'client', // serve 服务端删除
    },
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
    dels(index) {
      if (this.type === 'client') {
        const item = this.list.splice(index, 1)
        this.$emit('trash', {
          item,
        })
      } else {
        this.$emit('trash', {
          index,
        })
      }
    },
  },
}
</script>

<style lang="scss">
.sh-upload-wrap {
  flex: 1;
  .sh-upload-filelist {
    display: flex;
    align-items: center;
    line-height: 28px;
    margin-top: 4px;
    margin-bottom: 4px;
    .sh-file-name {
      line-height: 1;
      word-break: break-all;
    }
  }
  .el-link {
    flex: none;
  }
}
</style>
