<template>
  <div>
    <ChartView :options="options" :width="700" :height="500" />
  </div>
</template>

<script>
import ChartView from '@/components/chart/ChartView'

export default {
  components: { ChartView },
  data() {
    return {
      options: Object.freeze({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        tooltip: {},
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line',
          },
        ],
      }),
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {},
  },
}
</script>
