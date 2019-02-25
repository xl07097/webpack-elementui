<template>
    <div>
        <Header></Header>
        <div class="main-box">
            <Col span="3" class="nav-left">
                <Nav module="dataCenter"></Nav>
            </Col>
            <Col span="3" class="nav-background"></Col>
            <Col class="route-container">
                <router-view></router-view>
            </Col>
            <div class="container-background" v-if="!flag"></div>
            <div class="welcome-bgd">

            </div>
        </div>
    </div>
</template>
<script>
    import Header from '../../components/Header/header';
    import Nav from '../../components/Nav/nav';

    export default {
        name: 'DataContent',
        // props: ['visible', 'menuList', 'title'],
        components: {
            Header,
            Nav,
        },
        data() {
            return {
                flag: false
            };
        },
        methods: {
            close() {
                this.$emit('close');
            },
            cardClick(name) {
                this.$emit('cardClick', name);
            }
        },
        watch:{
            $route: {
                handler: function(val, oldVal){
                    if(this.$route.meta.title === "基础数据首页"){
                        // this.flag = true;
                    }else{
                        this.flag = false;
                    }
                },
                // 深度观察监听
                deep: true
            }
        },
        created(){

        }
    };
</script>

<style type="scss" scoped>
    /*@import "../../common.scss";*/

    .header-box {
        height: 70px;
        /*background-color: #C3E0DE;*/
    }

</style>
