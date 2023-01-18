<template>
  <div>
    <el-button @click="exportDoc">导出</el-button>
  </div>
</template>

<script>
import data from './data.json'
import { Document, Packer, Paragraph, TextRun } from 'docx'
import {saveFile} from '@/http/saveFile'
export default {
  name: 'MessageStatistics',
  mounted(){
    // console.log(data)
    this.findQuestions(data)
  },
  methods:{
    exportDoc(){
      const doc = new Document({
        sections: [{
            properties: {},
            children: [
                new Paragraph({
                    children: [
                        new TextRun("Hello World"),
                        new TextRun({
                            text: "Foo Bar",
                            bold: true,
                            color: '#FF0000',
                            size: 36
                        }),
                        new TextRun({
                            text: "\tGithub is the best",
                            bold: true,
                        }),
                    ],
                }),
            ],
        }],
      });
      Packer.toBlob(doc).then(blob => {
        console.log(blob);
        saveFile(blob, "example.docx");
      });
    },
    findQuestions(tree) {
      const list = {}
      // 模拟栈，管理结点
      const stack = tree
      while (stack.length) {
        // 栈顶节点出栈
        const node = stack.shift()
        list[node.id] = node.name
        const children = node.children || []
        if (children.length) {
          children.forEach(item => {
            item.name = `${node.name}-${item.name}`
          })
          // 将候选顶点入栈，进行下一次循环
          stack.push(...node.children)
        }
      }

      console.log(list)
      console.log(Object.keys(list).length)
    }
  }
}
</script>

<style>

</style>
