<template>
  <div class="resize">
    <div class="outer">
      <!--    <div class="inner"></div>-->
    </div>
    <div class="flag"></div>
  </div>
</template>

<script>
const src = require('../assets/unit/default.png');
const src1 = require('../assets/mifeng.jpg');
export default {
  name: 'ws',
  data() {
    return {
      sa: 0,
      img: '',
    };
  },
  methods: {
    loadItem() {
      let co = document.createDocumentFragment();

      for (let i = 1; i < 10; i++) {
        let img = document.createElement('img');
        img.className = 'inner';
        img.src = src.default;
        img.dataset.src = src1.default;
        co.appendChild(img);
      }
      document.querySelector('.outer').appendChild(co);
    },
  },
  mounted() {
    console.log(src);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        this.loadItem();
        for (let entry of entries) {
          // console.log(entry)
          const container = entry.target;
          if (entry.intersectionRatio > 0) {
            container.src = container.dataset.src;
            intersectionObserver.unobserve(container);
          }
        }
      },
      {
        // root: document.querySelector('body'),
        rootMargin: '0px',
        threshold: [0],
      },
    );
    let co = document.createDocumentFragment();

    for (let i = 1; i < 10; i++) {
      let img = document.createElement('img');
      img.className = 'inner';
      img.src = src.default;
      img.dataset.src = src1.default;
      co.appendChild(img);
    }
    document.querySelector('.outer').appendChild(co);

    // intersectionObserver.observe(document.querySelector('.flag'));
    [].forEach.call(document.querySelectorAll('.inner'), (item) => {
      intersectionObserver.observe(item);
    });

    // const resizeObserver = new ResizeObserver(entries => {
    //   for (let entry of entries) {
    //     const height = entry.target.getBoundingClientRect().height
    //     console.log(height)
    //     window.requestAnimationFrame(() => {
    //       document.querySelector('.resize').style.width = height+ 'px';
    //
    //     })
    //     // entry.target.style.height = Math.random()*200 + 'px';
    //   }
    // });
    // resizeObserver.observe(document.querySelector('body'));
  },
};
</script>
<style lang="less">
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
