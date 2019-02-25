<template>
    <div class="print">
        <Modal
                title="打印"
                :value="true"
                :mask-closable="false"
                :width="700"
                footer-hide
                @on-cancel="close"
        >
            <div class="warapper">
                <div class="btn-div">
                    <img src="../../../assets/medicalExamination/print.png" alt="" style="cursor: pointer">
                    <div class="img-page">
                        <span class="left" @click="left"></span>
                        <span>页码</span>
                        <span>{{show}}</span>/
                        <span>3</span>
                        <span class="right" @click="right"></span>
                    </div>
                </div>
                <div class="img-area">
                    <img src="../../../assets/physicalFitnessTest/electonic1.png" v-show="show===1" alt="electonic1">
                    <img src="../../../assets/physicalFitnessTest/electonic2.png" v-show="show===2" alt="electonic1">
                    <img src="../../../assets/physicalFitnessTest/electonic3.png" v-show="show===3" alt="electonic1">
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: 'printSummaryReport',
        props: ['id', 'title', 'flag'],
        data(){
            return {
                show: 1,
            }
        },
        methods:{
            left(){
                if(this.show === 1){

                }else if(this.show === 2){
                    this.show = 1;
                }else if(this.show === 3){
                    this.show = 2;
                }
            },
            right(){
                if(this.show === 1){
                    this.show = 2;
                }else if(this.show === 2){
                    this.show = 3;
                }else if(this.show === 3){

                }
            },
            close() {
                this.$emit('modal-close');
            },
        }
    };
</script>
<style scoped lang="less">
    .warapper{
        display: flex;
        align-items: stretch;
        /*height: 320px;*/
        .btn-div{
            width: 80px;
            position: relative;
            .img-page{
                position: absolute;
                bottom: 0;
                width: 100%;
                text-align: center;
                .left{
                    position: relative;
                    top: 3px;
                    float: left;
                    display: inline-block;
                    width: 0;
                    height: 0;
                    border-top: 6px solid transparent;
                    border-right: 10px solid #AFB0B3;
                    border-bottom: 6px solid transparent;
                    border-left: 0 solid transparent;
                    cursor: pointer;
                }
                .right{
                    position: relative;
                    top: 3px;
                    float: right;
                    display: inline-block;
                    width: 0;
                    height: 0;
                    border-top: 6px solid transparent;
                    border-left: 10px solid #AFB0B3;
                    border-bottom: 6px solid transparent;
                    border-right: 0 solid transparent;
                    cursor: pointer;
                }
            }
        }
        .img-area{
            flex: 1;
            padding-left: 40px;
            img{
                display: block;
                width: 100%;
            }
        }
    }
</style>

