<template>
    <div style="height: 100%;background-color:#c3e0de">
        <div class="main">
            <div class="mark"></div>
            <div class="title"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'medicalIndex'
    };
</script>
<style scoped>

    .main {
        width: 94.5%;
        height: 95%;
        margin: 0 auto;
        background: url("../../assets/medicalExamination/cloud.png");
    }
    .mark {
        position: absolute;
        top: 44px;
        right: 168px;
        width: 765px;
        height: 727px;
        background: url("../../assets/medicalExamination/mark.png");
    }
    .title {
        position: absolute;
        left: 20px;
        bottom: 80px;
        width: 383px;
        height: 162px;
        background: url("../../assets/medicalExamination/title.png");
    }
</style>