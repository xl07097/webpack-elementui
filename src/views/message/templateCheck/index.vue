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
        <span class="lplp-item" :class="{ active: index == active }">
          {{ item }}<i class="close-app-tab el-icon-close" @click.stop="close(index)" />
        </span>
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
  .wrap::after{
    content: '';
    position: absolute;
    right: 0;
    width: 1px;
    top: 22%;
    height: 56%;
    background: rgba(4, 91, 98, 0.8);
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
    transition: background-color 0.1s linear;
  }
  .lplp-item:not(.active):hover{
    border-radius: 10px 10px 0 0;
    background: rgba(4, 91, 98, 0.4);
  }

  .lplp-item.active {
    background: rgb(4, 91, 98);
    border-radius: 10px 10px 0 0;
    &::before {
      content: '';
      position: absolute;
      left: -10px;
      bottom: 0;
      width: 10px;
      height: 10px;
      background-image: radial-gradient(circle at left top, transparent 72%, #045b62 72%);
      z-index: 1;
    }
    &::after {
      content: '';
      position: absolute;
      right: -10px;
      bottom: 0;
      width: 10px;
      height: 10px;
      background-image: radial-gradient(circle at right top, transparent 72%, #045b62 72%);
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
