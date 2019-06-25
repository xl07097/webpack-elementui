<template>
    <div class="index">
        hahah {{userCount}} {{count}}
        <Button @click="add">count</Button>
        <MEditor></MEditor>
    </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex';
import { Promise } from 'q';
import MEditor from '@/components/MEditor.vue'

export default {
    name: 'Index',
    components:{
        // MEditor
    },
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
        let obj = {
            a:1,
            b:2
        }
        console.log({...obj})
    }
}
</script>


<style lang="less">

</style>

