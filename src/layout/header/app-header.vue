<template>
  <div>
    <div class="app-header">
      <el-scrollbar
        ref="scrollContainer"
        class="scroll-container "
        :vertical="false"
        @wheel.native.prevent="handleScroll"
      >
        <el-tag v-for="record of filterMenu" :key="record.id" @click="push(record.path)">
          {{ record.name }}
        </el-tag>
      </el-scrollbar>
    </div>
    <!-- <TagsView /> -->
  </div>
</template>

<script>
// import TagsView from '../tagsView/Index.vue'
export default {
  name: 'AppHeader',
  // components:{TagsView},
  data() {
    return {
      records: [],
    }
  },
  computed:{
    menuGetter(){
      return this.$store.getters['permission/menuGetter']
    },
    scrollWrapper(){
      return this.$refs.scrollContainer.$refs.wrap
    },
    filterMenu(){
      return this.menuGetter.filter(item => item.nodeType === 2)
    }
  },
  methods: {
    push(path) {
      this.$router.push(`${path}`)
    },
    
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 40
      const $scrollWrapper = this.scrollWrapper
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
    },
  },
}
</script>

<style lang="scss" scoped>
.app-header {
  display: flex;
  align-items: center;
  background: #eaeaea;
  overflow: hidden;
  overflow-x: auto;
  .scroll-container {
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    padding: 2px 0;
    width: 100%;
  }
  .el-tag {
    cursor: pointer;
    margin-right: 10px;
  }
}
</style>
