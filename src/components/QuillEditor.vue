<template>
  <div :id="id" class="quill-editor"></div>
</template>

<script>
import Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  name: 'QullEditor',
  props: {
    value: {
      type: String,
      default: '',
    },
    theme: {
      type: String,
      default: 'snow',
    },
    toolbar: {
      type: Array,
      default() {
        return [
          ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
          ['blockquote', 'code-block'], // 引用  代码块
          [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
          [{ indent: '-1' }, { indent: '+1' }], // 缩进
          [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
          [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
          [{ align: [] }], // 对齐方式
          ['clean'], // 清除文本格式
          ['link', 'image'], // 链接、图片、视频
        ]
      },
    },
    placeholder: {
      type: String,
      default: '请输入内容',
    },
  },
  data() {
    return {
      id: 'edit_' + ~~(Math.random() * 10000),
      quill: null,
      options: {
        theme: 'snow',
        bounds: document.body,
        debug: 'warn',
        modules: {
          // 工具栏配置
          // toolbar: ,
        },
        placeholder: '请输入内容',
      },
    }
  },
  mounted() {
    const options = {
      theme: this.theme,
      modules: {
        toolbar: this.toolbar,
      },
      placeholder: this.placeholder,
    }
    const quill = new Quill(document.getElementById(this.id), options)
    this.quill = Object.freeze(quill)
  },
  beforeDestroy() {
    this.quill = null
  },
}
</script>

<style lang="scss" scoped>
.quill-editor {
  height: 400px;
}
</style>
