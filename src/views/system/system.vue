<template>
    <div>
        <Header></Header>
        <div class="main-box">
            <Col span="3" class="nav-left">
                <Nav module="system"></Nav>
            </Col>
            <Col span="3" class="nav-background"></Col>
            <Col class="route-container">
                <router-view></router-view>
            </Col>
            <div class="container-background" v-bind:class="{ backgroundColor: bgShow }"></div>
            <div class="">
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '../../components/Header/header';
    import Nav from '../../components/Nav/nav';

    export default {
        name: 'System',
        // props: ['visible', 'menuList', 'title'],
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
            close() {
                this.$emit('close');
            },
            cardClick(name) {
                this.$emit('cardClick', name);
            },
            routeChange() {
                let arr = this.$route.path.split('/');
                if (arr[arr.length - 1] === 'system'||arr[arr.length - 1] === '') {
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
    }
    ;
</script>

<style lang="scss" scoped>
    .backgroundColor {
        display: none;
    }
</style>
