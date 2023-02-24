<template>
  <div>
    <div class="lplp">
      <span
        v-for="(item, index) of 10"
        :key="index"
        class="wrap"
        :class="{ active: index == active }"
        @click="set(index)"
      >
        <i class="left" />
        <span class="lplp-item" :class="{ active: index == active }">
          {{ item }}<i class="close-app-tab el-icon-close" @click.stop="close(index)" />
        </span>
        <i class="right" /> 
      </span>
    </div>
    <ElTree
      ref="tree"
      show-checkbox
      node-key="id"
      :data="datas"
      default-expand-all
      :props="{
        label: 'title',
      }"
      @current-change="chkTree"
    >
      <template #default="{ node, data }">
        <span @click="lpl(node)">lplpl{{ data.title }} </span>
      </template>
    </ElTree>
  </div>
</template>

<script>
import { getPrivilegeMenu } from '@/apis/menu'
export default {
  name: 'TemplateCheck',
  data() {
    return {
      datas: [],
      active: 1,
      arr: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // getPrivilegeMenu().then(res => {
      //   this.datas = res.data || []
      // })
    },
    chkTree() {},
    lpl(node) {
      console.log(node)
    },
    set(index) {
      this.active = index
    },
    close(index) {
      // this.active = index
    },
  },
}
</script>

<style lang="scss">
.lplp {
  display: flex;
  background: rgb(2, 57, 63);
  color: #fff;
  padding: 8px 12px 0;
  border-bottom: 5px solid #045b62;

  .wrap{
    position: relative;
  }
  .wrap.active{
    .left {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-bottom: 12px solid rgb(2, 57, 63);
      border-right: 12px solid rgb(2, 57, 63);
      left: -12px;
      bottom: 0;
      border-bottom-right-radius: 12px;
      z-index: 2;
    }
    .right {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-bottom: 12px solid rgb(2, 57, 63);
      border-left: 12px solid rgb(2, 57, 63);
      right: -12px;
      bottom: 0;
      border-bottom-left-radius: 12px;
      z-index: 2;
    }
  }
  .lplp-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 100px;
    padding: 6px 10px;
    text-align: center;
    box-sizing: border-box;
  }

  .lplp-item.active {
    background: rgb(4, 91, 98);
    border-radius: 10px 10px 0 0;
    &::before {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-bottom: 12px solid #045b62;
      border-right: 12px solid #045b62;
      left: -12px;
      bottom: 0;
      z-index: 1;
    }
    &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-bottom: 12px solid #045b62;
      border-left: 12px solid #045b62;
      right: -12px;
      bottom: 0;
      z-index: 1;
    }
  }
  .close-app-tab {
    border-radius: 50%;
    font-size: 13px;
    padding: 2px;
    &:hover {
      background: rgb(44, 102, 108);
    }
  }
}
</style>
