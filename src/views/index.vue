<template>
  <div class="index">
    hahah {{userCount}} {{count}}
    <i-button type="primary" @click="add">count</i-button>
    <!-- <img src="/static/image/163-1.png" alt="163" width="100" /> -->
    <span
      v-drag
      style="display:inline-block;width:40px;height:40px;background:blue;position:absolute;"
    ></span>

  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Index",
  computed: {
    ...mapState(["count"]),
    ...mapState({
      userCount: state => state.user.userCount
    })
  },
  directives: {
    drag: {
      // 指令的定义
      inserted: function(el) {
        console.log(el);
        el.addEventListener("mousedown", function(e) {
          el.onmousemove = function(e) {
            el.style.left = e.clientX - 15 + "px";
            el.style.top = e.clientY - 15 + "px";
          };
        });

        el.addEventListener("mouseup", function(e) {
          console.log(90);
          el.onmousemove = null;
        });
      }
    }
  },
  methods: {
    ...mapMutations(["add"])
  },
  mounted() {
    let obj = {
      a: 1,
      b: 2
    };
    console.log({ ...obj });
  }
};
</script>


<style lang="less">
.dd {
  position: absolute;
}
</style>

