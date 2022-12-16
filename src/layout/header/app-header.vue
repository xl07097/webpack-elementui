<template>
  <div class="app-header">
    <el-scrollbar>
      <el-tag v-for="record of menuGetter" :key="record.id" @click="push(record.path)">
        {{ record.name }}
      </el-tag>
    </el-scrollbar>
  </div>
</template>

<script>

export default {
  name: 'AppHeader',
  data() {
    return {
      records: [],
    }
  },
  computed:{
    menuGetter(){
      return this.$store.getters['permission/menuGetter']
    }
  },
  mounted() {
    console.log(this.$store)
  },
  methods: {
    push(path) {
      this.$router.push(`${path}`)
      window.console.log(path)
    },
  },
}
</script>

<style lang="scss" scoped>
.app-header {
  // width: 400px;
  height: 60px;
  display: flex;
  align-items: center;
  background: #eaeaea;
  overflow: hidden;
  overflow-x: auto;
  .el-tag {
    cursor: pointer;
    margin-right: 10px;
  }
}
</style>
