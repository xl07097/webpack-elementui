<template>
    <div class="standardizedOut">
        <div class="content-box clearfix">
            <div class="title">
                数据标准化导出
            </div>
            <!--<div class="download-group"><img  src="../../../assets/physicalFitnessTest/physicalPrepare/download.png"/><span >下载模板</span></div>-->
            <!--<div class="left">-->
            <img src="../../../assets/physicalFitnessTest/physicalPrepare/backgroundOut.png"
                 style="width: 100%;" :height="backHeight"/>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            const backHeight = document.body.clientHeight - 250;
            return {
                backHeight,

            };
        },
        methods: {},
        mounted() {
            const that = this;
            window.onresize = function temp() {
                that.backHeight = `${document.getElementsByClassName('container-background')[0].clientHeight - 130}`;
            };
        },
    };
</script>
<style lang="scss">
    .standardizedOut {

        .ivu-form {
            position: relative;
            z-index: 100;
        }

    }
</style>

