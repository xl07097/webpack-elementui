<template>
  <div class="mail-wrap">
    <div class="column1" style="min-height: 10px"></div>
    <div class="column2" style="min-height: 30px"></div>
    <div class="column3" style="min-height: 20px"></div>
    <div class="column4" style="min-height: 40px"></div>
  </div>
</template>

<script>
  export default {
    name: 'WaterFall',
    mounted() {
      const column1 = document.querySelector('.column1');
      const column2 = document.querySelector('.column2');
      const column3 = document.querySelector('.column3');
      const column4 = document.querySelector('.column4');
      let dom = [column1, column2, column3, column4];
      setInterval(() => {
        console.time('label');
        let att = [1, 2, 3, 4, 5, 6, 6, 6, 6, 6, 6, 6, 6];
        att.forEach(() => {
          let co = document.createDocumentFragment();
          let div = document.createElement('div');
          div.style.height = ~~(100 * Math.random()) + 'px';
          co.appendChild(div);

          const h1 = column1.getBoundingClientRect().height;
          const h2 = column2.getBoundingClientRect().height;
          const h3 = column3.getBoundingClientRect().height;
          const h4 = column4.getBoundingClientRect().height;
          // console.log(h1, h2, h3, h4)
          let arr = [h1, h2, h3, h4];
          const index = arr.indexOf(Math.min.apply(null, arr));

          dom[index].appendChild(co);
        });
        console.timeEnd('label');
      }, 5000);
    },
  };
</script>

<style lang="less">
.mail-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  //height: 1000px;
  .column1,
  .column2,
  .column3,
  .column4 {
    flex: 1;
    align-self: flex-start;
    padding: 10px;
  }
  .column1 div {
    margin-bottom: 10px;
    background: #00c1c0;
  }
  .column2 div {
    margin-bottom: 10px;
    background: #4791ff;
  }
  .column3 div {
    margin-bottom: 10px;
    background: grey;
  }
  .column4 div {
    margin-bottom: 10px;
    background: green;
  }
}
</style>
