<template>
    <div class="index animated fadeInRight">
        hahah {{ userCount }} {{ count }} {{test}} {{lp}}
        <el-button type="primary" @click="add">count</el-button>
        <el-button type="primary" @click="visible">visible</el-button>
        <span class="add" v-show="show">哈哈哈</span>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { EventEmitter } from "events";
let em = "";
export default {
    name: "Index",
    data() {
        return {
            show: true,
            com: null,
            test: 1,
            dialogVisible: false
        };
    },
    computed: {
        ...mapState(["count"]),
        ...mapState({
            userCount: state => state.user.userCount
        }),
        lp(){
            console.log(80);
            return this.test;
        }
    },
    beforeUpdate(){
        console.log('变更');
    },
    methods: {
        ...mapMutations(["add"]),
        visible() {
            this.$router.push("/index");
            this.dialogVisible = !this.dialogVisible;
        }
    },
    mounted() {
        em.emit("show", "haha");
        setTimeout(() => {
            this.test = 90
        }, 2000)
    },
    beforeMount(){
        // console.log(this.$el);
    },
    created() {
        // console.log(this.$data.show);
        // console.log(this.$el);
        em = new EventEmitter();
        em.on("show", data => {
            console.log(data);
        });
    },
    destroyed(){
        // console.log('destroyed')
    },
    beforeDestroy() {
        // console.log('beforeDestroy')
        if (em) {
            em.off("show", () => {});
            em = null;
        }
    },
    activated (){
        // console.log('进入')
    },
    deactivated (){
        // console.log("离开");
    }
};
</script>

<style lang="less">
.dd {
    position: absolute;
}
.add {
    display: none;
}
</style>
