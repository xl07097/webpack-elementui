<template>
    <div class="index">
        haah
        <span>123</span>
        <!-- <img src="static/image/163-1.png" alt="ai" width="100"> -->
        <!-- <ChartVue :width='600' :height='400'></ChartVue> -->
        <img src="@/assets/editside.png" alt="side">
    </div>
</template>

<script>
    import ChartVue from '@/components/ChartVue'
    export default {
        name: "index",
        inject: ['msg'],
        components:{
            ChartVue
        },
        mounted(){
            console.log(this.msg)
        }
    }
</script>

<style scoped lang="less">
    .index {
        span {
            color: red;
        }
    }
</style>
