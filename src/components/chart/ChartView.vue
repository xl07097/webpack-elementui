<template>
  <div :id="id" :style="{ width: width + 'px', height: height + 'px' }" />
</template>
<script>
import * as echarts from 'echarts';
let chartInstance = null
export default {
  name: 'ChartView',
  props: {
    options: {
      type: Object,
      default: function () {
        return {
          title: {
            text: 'ECharts 入门示例',
          },
          tooltip: {},
          legend: {
            data: ['销量'],
          },
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
          },
          yAxis: {},
          series: [
            {
              name: '销量',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20],
            },
          ],
        };
      },
    },
    width: {
      type: Number,
      default: 200,
    },
    height: {
      type: Number,
      default: 200,
    },
  },
  data() {
    return {
      id: 'echart' + ~~(Math.random() * 1000000),
      chart: null,
    };
  },
  watch: {
    options(){
      this.drawChart();
    }
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    if (chartInstance) {
      chartInstance.dispose();
      chartInstance = null;
    }
  },
  methods: {
    init() {
      if (!chartInstance) {
        chartInstance = echarts.init(document.getElementById(this.id));
      }
      this.drawChart();
    },
    drawChart() {
      chartInstance.setOption(this.options);
    },
  },
};
</script>
