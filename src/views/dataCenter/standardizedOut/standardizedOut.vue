<template>
    <div class="standardizedOut">
        <div class="content-box clearfix">
            <div class="title">
                数据标准化导出
            </div>
            <!--<div class="download-group"><img  src="../../../assets/physicalFitnessTest/physicalPrepare/download.png"/><span >下载模板</span></div>-->
            <!--<div class="left">-->
            <img src="../../../assets/physicalFitnessTest/physicalPrepare/backgroundOut.png" width="100%"  style="margin-top: 30px" :height=backHeight />
        </div>
    </div>


</template>
<script>
    export default {
        props: [''],
        data() {
            const backHeight = document.body.clientHeight - 250;
            return {
                backHeight,

            };
        },
        methods: {},
        mounted() {
            const that = this
            window.onresize = function temp() {
                that.backHeight = `${document.getElementsByClassName('container-background')[0].clientHeight - 130}`
            };
        },
    };
</script>
<style lang="scss">
    .standardizedOut {
        .content-box {
            padding: 30px 44px;
            .ivu-form {
                position: relative;
                z-index: 100;
            }
            .title {
                height: 26px;
                line-height: 26px;
                color: #333333;
                font-size: 26px;
                font-weight: bold;
            }
            .download-group {
                cursor: pointer;
                margin-bottom: 30px;
                text-align: right;
                img {
                    margin-right: 8px;
                }
                span {
                    position: relative;
                    top: -5px;
                    font-size: 18px;
                    font-family: SourceHanSansCN-Regular;
                    font-weight: 400;
                    color: rgba(0, 0, 0, 1);
                }
            }
            .imgContent {
                max-height: 750px;
                min-height: 650px;
            }
            .infoLeft {
                /*float: left;*/
                position: absolute;
                background: transparent;
                left: 44px;
                top: 0;
                height: 100%;
                width: 240px;
                padding-top: 170px;
                padding-bottom: 29px;
                box-sizing: border-box;
                z-index: 90;
                .inner {
                    width: 100%;
                    height: 100%;
                    background-color: #F7FAFA;
                    overflow: auto;
                }
            }
            .infoRight {
                position: absolute;
                left: 300px;
                right: 50px;
            }

        }

    }
</style>

