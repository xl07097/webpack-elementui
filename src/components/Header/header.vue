<template>
    <div class="index-header clearfix">
        <div class="header-box">
            <div style="display: flex;cursor: pointer" @click="returnIndex">
                <span class="headerTitle">教育系统体育卫生综合管理平台</span>
                <img src="../../assets/common/home.png" class="home-img"/>
            </div>
        </div>
        <div class="login">
            <span class="pointer">
                <img src="../../assets/index/user.png">
                <span class="userName"> {{userName}}</span>
            </span>
            <span class="exit" @click="exit">
                <img src="../../assets/index/close.png">
                <span class="userName">&nbsp;退出</span>
            </span>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isLogin: true,
                userName: '请登入',
            };
        },
        created() {
            this.userName = sessionStorage.getItem('sportHealthUserName') ? sessionStorage.getItem('sportHealthUserName') : '请登入';
        },
        methods: {
            exit() {
                sessionStorage.clear();
                this.$router.push('/login');
            },
            returnIndex() {
                this.$router.push('/index');
            }
        }
    };
</script>

<style lang="scss" scoped>
    .index-header {
        background-color: #95c5c1;
        .header-box {
            height: 70px;
            line-height: 70px;
            font-size: 20px;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
            display: flex;
            .headerTitle {
                margin-left: 20px;
            }
        }
        .login {
            position: absolute;
            right: 24px;
            top: 27px;
            .pointer {
                cursor: pointer;
                .userName {
                    position: relative;
                    top: -4px;
                    height: 12px;
                    font-size: 16px;
                    font-family: SourceHanSansCN-Regular;
                    font-weight: 400;
                    color: rgba(51, 51, 51, 1);
                    line-height: 14px;
                }
            }
            .exit {
                padding-left: 55px;
                cursor: pointer;
                .userName {
                    position: relative;
                    top: -4px;
                    height: 12px;
                    font-size: 16px;
                    font-family: SourceHanSansCN-Regular;
                    font-weight: 400;
                    color: rgba(51, 51, 51, 1);
                    line-height: 14px;
                }
            }
        }
    }

    .home-img {
        width: 26px;
        height: 26px;
        margin-top: 22px;
        margin-left: 10px;
    }

</style>
