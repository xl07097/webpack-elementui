<template>
    <div>
        <img class="sys-name" src="../assets/login/left-name.png" alt="sys-name">
        <div class="menu-container">
            <img src="../assets/index/system.png" class="system">
            <img src="../assets/index/ladder_right.png" class="ladder_right">
            <img src="../assets/index/dataCenter.png" class="dataCenter">
            <img src="../assets/index/ladder_up.png" class="ladder_up">
            <img src="../assets/index/monitor.png" class="monitor">
            <img src="../assets/index/ladder_down.png" class="ladder_down">
            <img src="../assets/index/health_review.png" class="health_review">
            <img src="../assets/index/ladder.png" class="ladder">
            <img src="../assets/index/health_test.png" class="health_test">
        </div>
        <div class="dev-sign-main" v-on:keyup.13="login">
            <div class="login-form" v-bind:style="logFormStyle">
                <div class="login-title"></div>
                <p class="error">{{ login_error }}</p>
                <div class="form-container">
                    <div class="text-warper">
                        <img src="../assets/login/login_account.png" class="img-account" v-if="accountactive"/>
                        <img src="../assets/login/login_activeaccount.png" class="img-account" v-if="accountnormal"/>
                        <input type="text" v-model.trim="obj.user_name" placeholder="请输入账号"
                               @focus="AccountFocus" v-bind:class="account_animalte">
                        <div class="line"></div>
                    </div>
                    <div style="margin-top: 52px" class="text-warper">
                        <img src="../assets/login/login_pwd.png" class="img-pwd" v-if="pwdactive"/>
                        <img src="../assets/login/login_Activepwd.png" class="img-pwd" v-if="pwdnormal"/>
                        <input type="password" v-model.trim="obj.password" placeholder="请输入密码" autocomplete="off"
                               @focus="PwdFocus"/>
                        <div class="line"></div>
                    </div>
                    <div class="btn_wraper">
                        <span class="forget">忘记密码？</span>
                        <button type="button" @click="login" class="btn-login">登录</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Urls from '../service/Urls';

    export default {
        data() {
            return {
                obj: {
                    user_name: '',
                    password: '',
                },
                login_error: '',
                accoutiserrshow: true,
                pwdiserrshow: true,
                accountactive: true,
                accountnormal: false,
                pwdactive: true,
                pwdnormal: false,
                gifStyle: {
                    width: '',
                    height: ''
                },
                logFormStyle: {
                    width: '',
                    height: ''
                },
                account_animalte: {},
                fullHeight: '',
                fullWeight: '',
                flag:false
            };
        },
        methods: {
            login() {
                if (!this.obj.user_name) {
                    this.login_error = '用户名不能为空';
                    return false;
                }
                if (!this.obj.password) {
                    this.login_error = '密码不能为空';
                    return false;
                }
                if (this.obj.password && this.obj.user_name) {
                    this.login_error = '';
                }
                this.$ajax({
                    url: Urls.login,
                    data: {
                        user_name: this.obj.user_name,
                        password: this.obj.password
                    }
                }).then((data) => {
                    if (data.code === 200) {
                        this.$Message.success('登录成功');
                        sessionStorage.setItem('token', data.data.token);
                        sessionStorage.setItem('sportHealthUserName', data.data.loginuser.real_name);
                        this.$router.push('/index');
                    } else {
                        this.$Message.error('登录失败，请重试');
                    }
                }).catch(() => {
                    this.$Message.error('登录失败，请重试');
                });
            },
            AccountFocus() {
                this.accountactive = false;
                this.accountnormal = !this.accountactive;
                this.pwdactive = true;
                this.pwdnormal = false;
            },
            PwdFocus() {
                this.accountactive = true;
                this.accountnormal = !this.accountactive;
                this.pwdactive = false;
                this.pwdnormal = true;
            },
            setImage(width, height) {
                this.width = width;
                this.height = height;
            }
        },
        beforeMount() {
            const that = this;
            window.fullWidth = document.body.scrollWidth;
            that.gifStyle.width = (window.fullWidth) * 0.465 + 'px';
            that.gifStyle.height = (window.fullWidth) * 0.465 * 0.912 + 'px';
            that.logFormStyle.width = (window.fullWidth) * 0.31 + 'px';
            that.logFormStyle.height = (window.fullWidth) * 0.31 * 1.29 + 'px';
        },
        mounted() {

            if (!this.timer) {
                this.timer = true;
                let that = this;
                setTimeout(function () {
                    that.timer = false;
                    window.onresize = () => {
                        return (() => {
                            window.fullWidth = document.body.scrollWidth;
                            that.gifStyle.width = (window.fullWidth) * 0.465 + 'px';
                            that.gifStyle.height = (window.fullWidth) * 0.465 * 0.912 + 'px';
                            that.logFormStyle.width = (window.fullWidth) * 0.31 + 'px';
                            that.logFormStyle.height = (window.fullWidth) * 0.31 * 1.29 + 'px';
                        })();
                    };
                }, 400);
            }
        },
    };
</script>
<style scoped>
    .sys-name {
        position: absolute;
        top: 26px;
        left: 30px;
        width: 50px;
        height: 200px;
    }

    .menu-container {
        position: relative;
        left: 110px;
        top: 80px;
        width: 892px;
        height: 814px;
    }

    .system {
        position: absolute;
        width: 390px;
        height: 340px;
        left: 160px;
        cursor: pointer;
    }

    .dataCenter {
        position: absolute;
        width: 382px;
        height: 287px;
        left: 12px;
        top: 282px;
        cursor: pointer;
    }

    .ladder_right {
        position: absolute;
        width: 43px;
        height: 141px;
        left: 220px;
        top: 207px;
        z-index: 2;
    }

    .ladder_up {
        position: absolute;
        left: 313px;
        top: 438px;
        width: 28px;
        height: 124px;
    }

    .monitor {
        position: absolute;
        left: 117px;
        top: 522px;
        width: 383px;
        height: 294px;
        cursor: pointer;
    }

    .ladder {
        position: absolute;
        left: 400px;
        top: 383px;
        z-index: 2;
    }

    .health_review {
        position: absolute;
        width: 383px;
        height: 298px;
        left: 510px;
        top: 470px;
        cursor: pointer;
    }

    .health_test {
        position: absolute;
        width: 383px;
        height: 327px;
        left: 417px;
        top: 170px;
        cursor: pointer;
    }

    .ladder_down {
        position: absolute;
        left: 650px;
        top: 400px;
        height: 140px;
        width: 36px;
        z-index: 2;
    }

    .dev-sign-main {
        height: 100%;
        float: right;
    }

    .login-form {
        position: absolute;
        margin: auto;
        top: 0;
        bottom: 0;
        right: 80px;
        background: url("../assets/login/login-bg.png") no-repeat 100% 100%;
        z-index: 10;
    }

    .login-title {
        position: absolute;
        top: 150px;
        left: 90px;
        width: 192px;
        height: 56px;
        background: url("../assets/login/login-title.png") no-repeat 100% 100%;
        z-index: 11;
    }

    .form-container {
        position: relative;
        top: 300px;
        padding: 0 90px
    }

    .line {
        position: relative;
        left: 50%;
        display: block;
        width: 100%;
        height: 1px;
        background-color: #596968;
        z-index: 1;
        transform: translate(-50%);
    }

    .text-warper:hover .line {
        animation: ad_width 0.2s linear forwards;
        z-index: 2;
        height: 1px;
        background-color: #FF7B10;
    }

    @keyframes ad_width {
        from {
            width: 0
        }
        to {
            width: 100%
        }
    }

    .btn_wraper {
        position: relative;
        top: 60px;
    }

    .forget {
        width: 89px;
        height: 19px;
        font-size: 20px;
        font-weight: 400;
        color: #B1B1B1;
        line-height: 58px;
        cursor: pointer;
    }

    .btn-login {
        float: right;
        width: 160px;
        height: 60px;
        font-size: 30px;
        color: #FFFFFF;
        border-radius: 6px;
        background-color: #FF7B10;
        border-color: #FF7B10;
        border: none;
        cursor: pointer;
    }

    .error {
        position: relative;
        top: 290px;
        height: 38px;
        padding: 0 90px;
        font-size: 22px;
        color: #f00;
    }

    input {
        width: 80%;
        margin: 0 0 10px 15px;
        background: none;
        background-color: white;
        border: none;
        line-height: 27px;
        outline: none;
        font-size: 22px
    }

    input::-webkit-input-placeholder {
        color: #5D787A;
    }

    input::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #5D787A;
    }

    input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #5D787A;
    }

    input:-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #5D787A;
    }
</style>
