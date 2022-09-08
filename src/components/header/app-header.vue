<template>
  <div class="app-header">
    <el-tag v-for="record of records" :key="record.id" @click="push(record.path)">
      {{ record.name }}
    </el-tag>
  </div>
</template>

<script>
import config, { tree } from './config'
export default {
  name: 'AppHeader',
  data() {
    return {
      records: [],
    }
  },
  mounted() {
    this.records = config.records.map((item) => {
      if (item.pid !== '0') {
        const parent = config.records.find((record) => item.pid === record.id)
        return {
          ...item,
          path: `${parent.path}/${item.path}`,
        }
      }
      return {
        ...item,
      }
    })
  },
  methods: {
    push(path) {
      this.$router.push(`/${path}`)
      window.console.log(path)
    },
  },
}
</script>

<style lang="less" scoped>
.app-header {
  height: 60px;
  display: flex;
  align-items: center;
  background: #eaeaea;
  .el-tag {
    cursor: pointer;
    margin-right: 10px;
  }
}
</style>
