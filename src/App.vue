<template>
    <div>
        <app-header />
        <!-- <keep-alive :max="10"> -->
        <router-view></router-view>
        <!-- </keep-alive> -->
    </div>
</template>
<script>
import appHeader from '@/components/app-header';

export default {
    name: "App",
    components:{
appHeader
    },
    created() {
        window.addEventListener("beforeunload", () => {
            sessionStorage.setItem("tmpData", "909090");
        });

        console.log(sessionStorage.getItem("tmpData"));
        sessionStorage.removeItem("tmpData");
    }
};
</script>
<style lang="less">
@import "animate.css";
@import "common.less";
</style>
