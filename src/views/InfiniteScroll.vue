<template>
  <div class="infiniteScroll">
    <img class="inner" v-for="(item, index) of imgList" :key="index" :src="item" alt="img" />
    <div class="bottomFlag">{{ lplp }}</div>
  </div>
</template>

<script>
const src = require('../assets/unit/default.png');
const src1 = require('../assets/mifeng.jpg');
export default {
  name: 'InfiniteScroll',
  data() {
    return {
      imgList: [],
    };
  },
  computed: {
    lplp() {
      return this.hhah(0);
    },
  },
  methods: {
    hhah(index) {
      console.log(90);
      return this.imgList[index];
    },
    loadItem() {
      let tmpList = Array.from({ length: 10 }).fill(src.default);
      this.imgList = this.imgList.concat(tmpList);
    },
  },
  mounted() {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (let entry of entries) {
          if (entry.intersectionRatio > 0) {
            this.loadItem();
          }
        }
      },
      {
        rootMargin: '0px',
        threshold: [0],
      },
    );
    intersectionObserver.observe(document.querySelector('.bottomFlag'));
    this.$on('hook:beforeDistroy', () => {
      intersectionObserver.disconnect();
    });
  },
};
</script>
<style lang="less">
.infiniteScroll {
  .outer {
    width: 200px;
  }

  .bottomFlag {
    height: 20px;
  }

  .inner {
    display: block;
    // width: 100%;
    background: #00c1c0;
    height: 200px;
    margin-bottom: 10px;
  }
}
</style>
