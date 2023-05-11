<template>
  <div>
    <div id="lineChart" />
  </div>
</template>

<script>
import * as echarts from 'echarts/core';
import { GridComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition, TitleComponent, TooltipComponent]);

export default {
  mounted() {
    this.init()
  },
  methods: {
    init() {
      var chartDom = document.getElementById('lineChart');
      var myChart = echarts.init(chartDom, null, {
        width: 400,
        height: 300
      });
      var option;

      option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        tooltip: {},
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      };

      option && myChart.setOption(option);
    },
  },
}
</script>

<style></style>
