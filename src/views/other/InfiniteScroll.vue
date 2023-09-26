<template>
  <div class="infiniteScroll">
    <img
      v-for="(item, index) of imgList"
      :key="index"
      class="inner"
      :src="item"
      alt="img"
    >
    <div class="bottomFlag">
      {{ lplp }}
    </div>
  </div>
</template>

<script>
const src = require('@/assets/unit/default.png');
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
  mounted() {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (let entry of entries) {
          if (entry.isIntersecting) {
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
  methods: {
    hhah(index) {
      return this.imgList[index];
    },
    loadItem() {
      console.log(src)
      let tmpList = Array.from({ length: 10 }).fill(src);
      this.imgList = this.imgList.concat(tmpList);
    },
  },
};
</script>
<style lang="scss">
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
