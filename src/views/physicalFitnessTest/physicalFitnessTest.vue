<template>
    <div>
        <Header></Header>
        <div class="main-box">
            <Col span="3" class="nav-left">
                <Nav module="physicalFitnessTest"></Nav>
            </Col>
            <Col span="3" class="nav-background"></Col>
            <Col class="route-container">
                <router-view></router-view>
            </Col>
            <div class="container-background" v-bind:class="{ backgroundColor: bgShow }"></div>
            <div class="welcome-bgd">

            </div>
        </div>
    </div>
</template>
<script>
    import Header from '../../components/Header/header';
    import Nav from '../../components/Nav/nav';

    export default {
        name: 'physicalFitnessTest',
        components: {
            Header,
            Nav,
        },
        data() {
            return {
                bgShow: true
            };
        },
        methods: {
            routeChange() {
                let arr = this.$route.path.split('/');
                if (arr[arr.length - 1] === 'physicalFitnessTest'||arr[arr.length - 1] === '') {
                    this.bgShow = true;
                } else {
                    this.bgShow = false;
                }
            }
        },
        watch: {
            '$route': 'routeChange'

        },
        created() {
            this.routeChange();
        }
    };
</script>



<style scoped>
    .backgroundColor {
        display: none;
    }
</style>