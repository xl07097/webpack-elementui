<template>
    <div>
        <router-link to="/">index</router-link>
        <router-link to="/ws">ws</router-link>
        <router-link to="/slot">slot</router-link>
        <keep-alive :max="10">
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>
export default {
    name: "App",
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
