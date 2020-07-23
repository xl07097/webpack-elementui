<template>
    <Company :a="scope.a3">
        <template v-slot:header="scopes">
            <header>[header]hahahaha {{ scopes.a3 }}</header>
        </template>
        <!-- 使用简写 # ，default 不能省略 -->
        <template #default="{ sc }">
            <section>
                <aside>content</aside>
                <article>
                    {{ sc.lpl }}
                </article>
                <button type="button" @click="sett">ddd</button>
            </section>
        </template>

        <template #footer>
            <footer>[footer] {{scope.a3}}</footer>
        </template>
    </Company>
</template>

<script>
import Company from "./Company";

export default {
    name: "SlotTest",
    components: {
        Company
    },
    data() {
        return {
            scope: {
                a1: 10,
                a2: 20,
                a3: 30
            }
        };
    },
    methods:{
        sett(){
            console.log(90)
            this.scope.a3 = 90;
        }
    },
    beforeCreate(){
        console.log('beforeCreate')
    },
    created(){
        console.log('created');
    },
    beforeMount(){
        console.log('beforeMount');
    },
    mounted(){
        console.log('mounted');
    },
    beforeUpdate(){
        console.log('beforeUpdate');
    },
    updated(){
        console.log('updated');
    },
    beforeDestroy(){
        console.log('beforeDestroy');
    },
    destroyed(){
        console.log('destroyed');
    },
    activated(){
        console.log('activated');
    },
    deactivated(){
        console.log('deactivated');
    },
    beforeRouteEnter(to, from, next){
        console.log('beforeRouteEnter');
        next();
    },
    beforeRouteUpdate(to, from, next){
        console.log('beforeRouteUpdate');
        next();
    },
    beforeRouteLeave(to, from, next){
        console.log('beforeRouteLeave');
        next();
    }
};
</script>

<style></style>
