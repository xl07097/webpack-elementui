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
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.init()
            intersectionObserver.disconnect();
          }
        })
      },
      {
        rootMargin: '16px',
        threshold: [0],
      },
    );
    intersectionObserver.observe(document.querySelector(`#${this.id}`));
    this.$on('hook:beforeDistroy', () => {
      intersectionObserver.disconnect();
    });
    // this.init()
  },
  methods: {
    init() {
      this.player = new Player({
        id: this.id,
        url: 'https://files.zhiqiuge.com/123.mkv',
        lang: 'zh-cn',
        width: 200,
        height: 140,
        videoInit: true
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.player-div{
  margin-bottom: 16px;
  min-height: 140px;
}
</style>