<template>
  <div :id="id" class="player-div" />
</template>

<script>
import Player from 'xgplayer'
import HlsPlugin from 'xgplayer-hls'
import 'xgplayer/dist/index.min.css';
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
    // const intersectionObserver = new IntersectionObserver(
    //   (entries) => {
    //     entries.forEach((entry) => {
    //       if (entry.isIntersecting) {
    //         this.init()
    //         intersectionObserver.disconnect()
    //       }
    //     })
    //   },
    //   {
    //     rootMargin: '16px',
    //     threshold: [0],
    //   }
    // )
    // intersectionObserver.observe(document.querySelector(`#${this.id}`))
    this.$on('hook:beforeDistroy', () => {
      intersectionObserver.disconnect()
      this.player && this.player.destroy()
    })
    this.init()
  },
  methods: {
    init() {
      if (document.createElement('video').canPlayType('application/vnd.apple.mpegurl')) {
        // 原生支持 hls 播放
        this.player = new Player({
          id: this.id,
          url: 'https://files.zhiqiuge.com/xiangshuye/m3u8/lp.m3u8',
          lang: 'zh-cn',
          autoplay: true,
          playsinline: true,
          width: 600,
          height: 340,
          videoInit: true,
        })
      } else if (HlsPlugin.isSupported()) { // 第一步
        this.player = new Player({
          id: this.id,
          isLive: false,
          url: 'https://files.zhiqiuge.com/xiangshuye/m3u8/lp.m3u8', // hls 流地址
          plugins: [HlsPlugin],
          lang: 'zh-cn',
          autoplay: true,
          playsinline: true,
          width: 600,
          height: 340,
          videoInit: true, // 第二步
        })
      }
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
