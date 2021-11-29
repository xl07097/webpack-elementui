<template>
  <div class="wrap">
    <div
      class="item"
      v-for="(item, index) of dateList"
      :key="index"
      :class="{'active': active==index}"
      @click="activeClick"
    >
      <span></span>
      <span>{{ item.day }}</span>
      <span>--</span>
      
    </div>
  </div>
</template>

<script>
  import { dateFormatFromString } from '../utils/dateUtils';
  export default {
    name: 'File',
    data() {
      return {
        dateList: [],
        active: 0,
      };
    },
    methods: {
      generatorArr(startTime, endTime) {
        let arr = [];
        let month2 = endTime.substring(5, 7);
        let date1 = startTime.substring(8, 10);
        let date2 = endTime.substring(8, 10);
        // debugger

        for (let i = Number(date1); i <= Number(date2); i++) {
          arr.push(this.generatorItem(month2, i));
        }
        console.log(arr);
        return arr;
      },
      generatorItem(month, day) {
        return {
          month: month,
          day: day,
        };
      },
    },

    mounted() {
      let nowDate = new Date();
      let startDate = `${nowDate.getFullYear()}-0${nowDate.getMonth() + 1}-01`;
      let firstDate = new Date(startDate);
      let last = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 0);
      // console.log(typeof last)
      let lastDate = `${last.getFullYear()}-0${last.getMonth() + 1}-${last.getDate()}`;
      this.dateList = this.generatorArr(startDate, lastDate);
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
  span:nth-child(1){
    display: flex;
    height: 33.33%;
    line-height: 1;
  }
}
.active{
background: #00c1c0;
border-radius: 5px;
}
</style>
