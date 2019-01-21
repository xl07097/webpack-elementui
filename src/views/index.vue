<template>
    <div class="index">
        <h1>标题一</h1>
        <h2>标题二</h2>
        <h3>标题三</h3>
        <h4>标题四</h4>
        <h5>标题五</h5>
        <h6>标题六</h6>
        <!-- <img src="static/image/163-1.png" alt="ai" width="100"> -->
        <!-- <ChartVue :width='600' :height='400'></ChartVue> -->
    </div>
</template>

<script>
    // import ChartVue from '@/components/ChartVue'
    export default {
        name: "index",
        inject: ['msg'],
        components:{
            // ChartVue
        },
        mounted(){
            console.log(this.msg)
        }
    }
</script>

<style scoped lang="less">
    .index {
        h1 {
            color: rgb(255, 8, 1);
        }
    }
</style>
