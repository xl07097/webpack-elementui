<template>
    <div class="index">
        <div class="inner">
            <img src="../../assets/unit/dataindex.png" alt="数据中心">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DataIndex',
    };
</script>
<style lang="less" scoped>
    .index {
        width: 100%;
        height: 100%;
        /*padding-top: 80px;*/
        background-color: #C3E0DE;
        box-sizing: border-box;
        .inner{
            width: 100%;
            height: 100%;
            background-color: #A9DEE3;
        }
        img{
            display: block;
            /*width: 100%;*/
            height: 100%;
        }
    }
</style>
