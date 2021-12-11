<template>
  <div class="wrap">hahahah</div>
</template>

<script>
export default {
  name: 'File',
  data() {
    return {
      dateList: [],
      active: 0,
    };
  },
  mounted() {
    Promise.allSettled([]).then(() => {
      console.log(90);
    });
  },
};
</script>

<style lang="less">
.wrap {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0 2px;
}
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 53px;
  height: 45px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #333c4f;
  span:nth-child(1) {
    display: flex;
    height: 33.33%;
    line-height: 1;
  }
}
.active {
  background: #00c1c0;
  border-radius: 5px;
}
</style>
