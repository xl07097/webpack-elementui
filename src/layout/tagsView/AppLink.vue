<template>
  <div
    :class="isActive(tag) ? 'active' : ''"
    class="tags-view-item"
    :style="activeStyle(tag)"
    @click="push"
    @click.middle="!isAffix ? closeSelectedTag : ''"
    @contextmenu.prevent="openMenu(tag, $event)"
  >
    {{ tag.title }}
    <span
      v-if="!isAffix"
      class="el-icon-close"
      role="link"
      @click.prevent.stop="closeSelectedTag"
    />
  </div>
</template>

<script>
export default {
  props: {
    tag: {
      type: Object,
      default() {
        return {}
      },
    },
    to: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed:{
    isAffix(){
      const tag = this.tag
      return tag.meta && tag.meta.affix
    }
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path
    },
    closeSelectedTag() {
      const view = this.tag
      this.$tab.closePage(view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view)
        }
      })
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView.fullPath)
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === 'Dashboard') {
          // to reload home page
          this.$router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    },
    activeStyle(tag) {
      if (!this.isActive(tag)) return {}
      return {
        'background-color': this.theme,
        'border-color': this.theme,
      }
    },
    openMenu(tag, e) {
      this.$emit('openMenu', tag, e)
    },
    push() {
      this.$emit('push', this.tag)
    },
  },
}
</script>

<style lang="scss">
.tags-view-item {
  .el-icon-close {
    width: 16px;
    height: 16px;
    vertical-align: 2px;
    border-radius: 50%;
    text-align: center;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transform-origin: 100% 50%;
    &:before {
      display: inline-block;
      vertical-align: -3px;
    }
    &:hover {
      background-color: #b4bccc;
      color: #fff;
    }
  }
}
</style>
