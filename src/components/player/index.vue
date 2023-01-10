<template>
  <div :id="id" class="player-div"></div>
</template>

<script>
import Player from 'xgplayer'
export default {
  props: {
    src: {
      type: String,
      default: '',
      required: true,
    },
  },
  data() {
    return {
      id: `player_${~~(Math.random() * 1000000)}`,
      player: null,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.player = new Player({
        id: this.id,
        url: 'https://files.zhiqiuge.com/123.mkv',
        lang: 'zh-cn',
        videoInit: true
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.player-div{
  width: 100%;
  height: 600px;
}
</style>