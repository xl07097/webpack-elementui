<template>
  <div :id="id" class="player-div"></div>
</template>

<script>
// import Player from 'xgplayer'
import 'xgplayer'
import HlsPlayer from 'xgplayer-hls'
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
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.init()
            intersectionObserver.disconnect()
          }
        })
      },
      {
        rootMargin: '16px',
        threshold: [0],
      }
    )
    intersectionObserver.observe(document.querySelector(`#${this.id}`))
    this.$on('hook:beforeDistroy', () => {
      intersectionObserver.disconnect()
      this.player && this.player.destroy()
    })
    // this.init()
  },
  methods: {
    init() {
      this.player = new HlsPlayer({
        id: this.id,
        url: 'https://files.zhiqiuge.com/xiangshuye/m3u8/lp.m3u8 ',
        lang: 'zh-cn',
        width: 600,
        height: 340,
        videoInit: true,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.player-div {
  margin-bottom: 16px;
  min-height: 140px;
}
</style>
