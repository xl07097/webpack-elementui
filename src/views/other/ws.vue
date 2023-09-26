<template>
  <div class="resize">
    <div class="outer">
      <!--    <div class="inner"></div>-->
    </div>
    <div class="flag" />
  </div>
</template>

<script>
const src = require('@/assets/unit/default.png');
const src1 = require('@/assets/mifeng.jpg');
export default {
  name: 'AppWs',
  data() {
    return {
      sa: 0,
      img: '',
    };
  },
  mounted() {

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (let entry of entries) {
          const container = entry.target;
          if (entry.intersectionRatio > 0) {
            container.src = container.dataset.src;
            intersectionObserver.unobserve(container);
          }
        }
      },
      {
        rootMargin: '0px',
        threshold: [0],
      }
    );
    this.loadItem();

    intersectionObserver.observe(document.querySelector('.flag'));
    [].forEach.call(document.querySelectorAll('.inner'), (item) => {
      intersectionObserver.observe(item);
    });
  },
  methods: {
    loadItem() {
      let co = document.createDocumentFragment();

      for (let i = 1; i < 10; i++) {
        let img = document.createElement('img');
        img.className = 'inner';
        img.src = src;
        img.dataset.src = src1;
        co.appendChild(img);
      }
      document.querySelector('.outer').appendChild(co);
    },
  },
};
</script>
<style lang="scss">
.outer {
  width: 200px;
}

.flag {
  height: 20px;
}

.inner {
  display: block;
  width: 100%;
  background: #00c1c0;
  height: 200px;
  margin-bottom: 10px;
}

.resize {
  height: 200px;
  border: 2px solid green;
}
</style>
