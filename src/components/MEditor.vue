<template>
  <div :id="id" :style="{'width':width+'px','height':height+'px'}"></div>
</template>
<script>
import * as echarts from "echarts";
import { debuglog } from 'util';
export default {
  name: "ChartVue",
  props: {
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {
      id: "editor" + ~~(Math.random() * 1000000),
      editor: null,
      scriptTagStatus: 0
    };
  },
  methods: {
    insertScriptTag() {
      let editorScriptTag = document.getElementById("editorScriptTag");
      let editorLinkTag = document.getElementById("editorLinkTag");

      // 如果这个tag不存在，则生成相关代码tag以加载代码
      if (editorScriptTag === null) {
        editorScriptTag = document.createElement("script");
        editorScriptTag.type = "text/javascript";
        editorScriptTag.src = "/static/editormd/editormd.min.js";
        editorScriptTag.id = "editorScriptTag";
        let s = document.getElementsByTagName("head")[0];
        s.appendChild(editorScriptTag);
      }

      if (editorLinkTag === null) {
        editorLinkTag = document.createElement("script");
        editorLinkTag.type = "text/javascript";
        editorLinkTag.src = "/static/editormd/css/editormd.min.css";
        editorLinkTag.id = "editorLinkTag";
        let s = document.getElementsByTagName("head")[0];
        s.appendChild(editorLinkTag);
      }

      // 等待代码加载完成后初始化编辑器
      if (editorScriptTag.loaded) {
        this.scriptTagStatus++;
      } else {
        editorScriptTag.addEventListener("load", () => {
          this.scriptTagStatus++;
          editorScriptTag.loaded = true;
          // this.initEditor();
        });
      }

      if (editorLinkTag.loaded) {
        this.scriptTagStatus++;
      } else {
        editorLinkTag.addEventListener("load", () => {
          this.scriptTagStatus++;
          editorLinkTag.loaded = true;
          // this.initEditor();
        });
      }

      // this.initEditor();

    },
    initEditor() {
      // scriptTagStatus 为 2 的时候，说明两个必需引入的 js 文件都已经被引入，且加载完成
      if (this.scriptTagStatus === 2 && this.instance === null) {
        // Vue 异步执行 DOM 更新，这样一来代码执行到这里的时候可能 template 里面的 script 标签还没真正创建
        // 所以，我们只能在 nextTick 里面初始化 UEditor
        this.$nextTick(() => {
            this.editor = editormd(this.id, {
                width: "90%",
                height: 640,
                tocDropdown: true,
                tocTitle: "目录 Table of Contents",
                markdown : "",
                path : '/static/editormd/lib/',
                emoji: true,
                //dialogLockScreen : false,   // 设置弹出层对话框不锁屏，全局通用，默认为 true
                //dialogShowMask : false,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为 true
                //dialogDraggable : false,    // 设置弹出层对话框不可拖动，全局通用，默认为 true
                //dialogMaskOpacity : 0.4,    // 设置透明遮罩层的透明度，全局通用，默认值为 0.1
                //dialogMaskBgColor : "#000", // 设置透明遮罩层的背景颜色，全局通用，默认为 #fff
                imageUpload : true,
                imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
                imageUploadURL : "http://192.1.6.55:3000/upload/uploadfile",
                onload: () => {
                    this.$emit("ready", this.editor);
                    // this.instance.setContent(this.defaultMsg); // 确保UE加载完成后，放入内容。
                }
            });
        });
      }
    }
  },
  mounted() {

    if (window.editormd !== undefined) {
      // 如果全局对象存在，说明编辑器代码已经初始化完成，直接加载编辑器
      this.scriptTagStatus = 2;
      // this.initEditor();
    } else {
      // 如果全局对象不存在，说明编辑器代码还没有加载完成，需要加载编辑器代码
      // this.insertScriptTag();
    }
  },
  beforeDestroy() {}
};
</script>
