<template>
    <div class="index">
        hahah
    </div>
</template>
<script>
export default {
    name: 'Index',
    mounted(){
        let obj = {
            a:1,
            b:2
        }
        console.log({...obj})
    }
}
</script>


<style lang="less" scoped>

</style>

