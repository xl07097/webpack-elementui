<template>
    <div>
        <Header></Header>
        <div class="main-box">
            <Col span="3" class="nav-left">
                <Nav module="medicalExamination"></Nav>
            </Col>
            <Col span="3" class="nav-background"></Col>
            <Col class="route-container">
                <router-view>
                </router-view>
            </Col>
            <div class="container-background"></div>
            <div class="welcome-bgd">

            </div>
        </div>
    </div>
</template>
<script>
    import Header from '../../components/Header/header';
    import Nav from '../../components/Nav/nav';

    export default {
        name: 'MedicalExamination',
        // props: ['visible', 'menuList', 'title'],
        components: {
            Header,
            Nav,
        },
        data() {
            return {
            };
        },
        methods: {
            close() {
                this.$emit('close');
            },
            cardClick(name) {
                this.$emit('cardClick', name);
            }
        }
    };
</script>

<style lang="scss" scoped>


</style>
