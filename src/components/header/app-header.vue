<template>
  <div class="app-header">
    <el-tag
      v-for="record of records"
      :key="record.id"
      @click="push(record.path)"
    >
      {{ record.name }}
    </el-tag>
  </div>
</template>

<script>
import config, { tree } from './config';
import router from '@/router/index';
export default {
  name: 'AppHeader',
  data() {
    return {
      records: [],
    };
  },
  mounted() {
    console.log(router);
    this.records = config.records.map((item) => {
      if (item.pid !== '0') {
        const parent = config.records.find((record) => item.pid === record.id);
        return {
          ...item,
          path: `${parent.path}/${item.path}`,
        };
      }
      return {
        ...item,
      };
    });
    setTimeout(() => {
      // this.records.forEach(({path, name, pid, id}) => {
      // })
    }, 1000);

    console.log(this.findQuestions(tree.data));

    console.log(router.getRoutes());
  },
  methods: {
    push(path) {
      this.$router.push(`/${path}`);
      window.console.log(path);
    },
    add({ path, name, pid, id }) {
      if (pid === '0') {
        router.addRoute({
          path: `/${path}`,
          component: () => import('@/components/MiddlePage.vue'),
          name: name, // 命名路由
          // components?: { [name: string]: Component }, // 命名视图组件
        });
      } else {
        const parent = config.records.find((item) => pid === item.id);

        console.log(path);
        router.addRoute(parent.name, {
          path: `/${parent.path}/${path}`,
          component: () => import('@/views/file.vue'),
          name: name, // 命名路由
          // components?: { [name: string]: Component }, // 命名视图组件
        });
      }
    },
    findQuestions(tree) {
      console.time('label');
      // 模拟栈，管理结点
      let list = [];
      let stack = tree;
      while (stack.length) {
        // 栈顶节点出栈
        let node = stack.shift();
        list.push({
          ...node,
          children: [],
        });
        this.add({
          ...node,
          children: [],
        });
        // 查找到目标，退出
        // if (node.value === target) {
        //   return target
        // }
        if (node.children && node.children.length) {
          // 将候选顶点入栈，进行下一次循环
          stack.push(...node.children);
        }
      }

      console.timeEnd('label');
      return list;
    },
  },
};
</script>

<style lang="less" scoped>
.app-header {
  height: 60px;
  display: flex;
  align-items: center;
  background: #eaeaea;
}
</style>
