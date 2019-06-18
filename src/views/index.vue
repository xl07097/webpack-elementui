<template>
    <div class="index">
        hahah {{userCount}} {{count}}
        <Button @click="add">count</Button>
    </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex';
import { Promise } from 'q';

export default {
    name: 'Index',
    computed:{
        ...mapState(['count']),
        ...mapState({
            'userCount': state => state.user.userCount
        })
    },
    methods:{
        ...mapMutations(['add'])
    },
    mounted(){
        new Promise(() => {

        })
        let obj = {
            a:1,
            b:2
        }
        new Set([1,2,3,4,5,6,7,8,4,5]);
        console.log({...obj})
    }
}
</script>


<style lang="less">

</style>

