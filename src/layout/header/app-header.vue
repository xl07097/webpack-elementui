<template>
  <div class="app-header">
    <el-tag v-for="record of menuGetter" :key="record.id" @click="push(record.path)">
      {{ record.name }}
    </el-tag>
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
      return this.$store.getters['menu/menuGetter']
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
