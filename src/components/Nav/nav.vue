<template>
    <div class="nav-box">
        <img style="display: block;margin: 40px auto;" :src="menu_header">
        <Menu ref="menu" :theme="theme" :open-names="openNames" accordion @on-select="menuClick"
              :active-name="menuName" width="100%">
            <RenderMenu v-for="item in menus" :menuList="item" :key="item.name"/>
        </Menu>
    </div>
</template>
<script>
    import menuConf from '../../constants/menuConf';
    import RenderMenu from './RenderMenu';

    export default {
        props: ['module'],
        components: {
            RenderMenu: RenderMenu
        },
        data() {
            return {
                menuConf: menuConf,
                menus: [],
                theme: 'light',
                activeMenu: '',
                openNames: [],
                menuName: '',
                openNamesObj: {},
                temp: [],
                firstLevelMenu: '',
                menu_header: ''
            };
        },
        created() {

        },
        mounted() {
            this.menu_header = require('../../assets/menu/' + this.module + '.png');
            this.menus = this.menuConf[this.module][0].children;
            this.firstLevelMenu = this.menus[0].name;//最外层展开的菜单
            this.getOpenNames(this.menus);
            this.menuName = location.pathname.split('/').pop();
            this.openNames = this.openNamesObj[this.menuName] || [];
            this.openNames.push(this.module);//默认展开1级菜单
            this.$nextTick(() => {
                this.$refs.menu.updateOpened();
                this.$refs.menu.updateActiveName();
            });
        },
        methods: {
            close() {
                this.$emit('close');
            },
            cardClick(name) {
                this.$emit('cardClick', name);
            },
            menuClick(item) {
                this.$router.push({name: item});
                this.activeMenu = item;
            },
            getOpenNames(menu_conf) {
                let that = this;
                /**
                 * 递归生成最里层菜单对应的父级菜单的name。(选中菜单后，刷新页面自动展开改菜单之上的所有父级菜单)
                 * {
                 *    menuItem:[subMenuName]
                 * }
                 **/
                menu_conf.map((item) => {
                    if (item.children) {
                        that.temp.push(item.name);
                        that.getOpenNames(item.children);
                    } else {
                        that.openNamesObj[item.name] = [].concat(this.temp);
                    }
                });
            }
        }
    };
</script>

<style type="scss">
    .nav-box {
        position: absolute;
        width: 100%;
        top: 0;
        bottom: 0;
        float: left;
    }

    /*菜单字体颜色*/
    .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
        color: #FF7200 !important;
        background: rgba(255, 114, 0, 0.05) !important;
        /*background:rgba(195, 224, 222,0.5) !important;*/
    }

    .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):after {
        background-color: #FF7200 !important;
    }

    .ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-vertical .ivu-menu-submenu-title:hover {
        color: #FF7200 !important;
    }
</style>

