<template>
    <Submenu v-if="menuList.children" :name="menuList.name">
        <template slot="title">
            <img v-if="menuList.icon" :src="menuList.icon" class="menu-icon"/>
            {{menuList.title}}
        </template>
        <RenderMenu v-for="item in menuList.children" :menuList="item" :key="item.name"/>
    </Submenu>
    <MenuItem v-else :name="menuList.name">
        <img v-if="menuList.icon" :src="menuList.icon" class="menu-icon"/>
        {{menuList.title}}
    </MenuItem>
</template>
<script>

    export default {
        name: 'RenderMenu',
        props: ['menuList'],
        mounted() {
        },
        data() {
            return {
                // menu: menu,
                theme: 'light'
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

<style scoped>
    .menu-icon {
        width: 22px;
        margin-bottom: -5px
    }
</style>
