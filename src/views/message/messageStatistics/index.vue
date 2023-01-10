<template>
  <div>
    messageStatistics
  </div>
</template>

<script>
import data from './data.json'
export default {
  name: 'MessageStatistics',
  mounted(){
    // console.log(data)
    this.findQuestions(data)
  },
  methods:{
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
