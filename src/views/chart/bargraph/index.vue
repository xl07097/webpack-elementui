<template>
  <div>
    <ChartView :options="options" :width="400" :height="300" />
  </div>
</template>

<script>
import ChartView from '@/components/chart/ChartView'

export default {
  components: { ChartView },
  data(){
    return {
      options: Object.freeze({
        title: { text: 'ECharts 入门示例' },
        tooltip: {},
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
      })
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      
    },
  },
}
</script>

