<template>
  <div class="index">
    hahah {{userCount}} {{count}}
    <el-button type="primary" @click="add">count</el-button>
    <!-- <img src="/static/image/163-1.png" alt="163" width="100" /> -->
    <!-- <span style="color:red;font-size:20px;">{{"★★★★★☆☆☆☆☆".slice(5 - 2, 10 - 2)}}</span> -->
    <span class="add" v-show="show">哈哈哈</span>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Index",
  data(){
      return {
          show: true
      }
  },
  computed: {
    ...mapState(["count"]),
    ...mapState({
      userCount: state => state.user.userCount
    })
  },
  methods: {
    // ...mapMutations(["add"]),
    add(){
        this.show = !this.show;
    },
    userList(){
        fetch("http://localhost:9087/note/user/getById?id=1")
        .then(data => data.json())
        .then(data => {
            console.log(data)
        })
    }
  },
  mounted() {
    this.userList();
  }
};
</script>


<style lang="less">
.dd {
  position: absolute;
}
.add{
    display:none;
}
</style>

