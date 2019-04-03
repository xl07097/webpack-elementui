<template>
    <div id="index" style="height: 100%">
        <img class="sys-name" src="../assets/login/left-name.png">
        <div class="index-header clearfix">
            <div class="login">
            <span class="pointer">
                <img src="../assets/index/user.png">
                <span class="userName"> {{userName}}</span>
            </span>
                <span class="exit" @click="exit">
                <img src="../assets/index/close.png">
                <span class="userName">&nbsp;退出</span>
            </span>
            </div>
        </div>
        <div class="menu-container">
            <img src="../assets/index/system.png" class="system" @click="goto('system')">
            <img src="../assets/index/ladder_right.png" class="ladder_right">
            <img src="../assets/index/dataCenter.png" class="dataCenter" @click="goto('dataCenter')">
            <img src="../assets/index/ladder_up.png" class="ladder_up">
            <img src="../assets/index/monitor.png" class="monitor">
            <img src="../assets/index/ladder_down.png" class="ladder_down">
            <img src="../assets/index/health_review.png" class="health_review" @click="goto('medicalExamination')">
            <img src="../assets/index/ladder.png" class="ladder">
            <img src="../assets/index/health_test.png" class="health_test" @click="goto('physicalFitnessTest')">
        </div>
        <div class="notice">

        </div>
        <!--<img class="notice" src="../assets/index/notice.png">-->
    </div>
</template>

<script>
    import Urls from '../service/Urls';

    export default {
        name: 'Index',
        props: [],
        components: {},
        data() {
            return {
                gifStyle: {
                    width: '',
                    height: ''
                },
                noticeStyle: {
                    width: '',
                    height: ''
                },
                scheduleStyle: {
                    width: '',
                    height: ''
                },
            };
        },
        methods: {
            goto(module) {
                this.$router.push('/' + module);
            },
            getMenu() {
                if (!sessionStorage.getItem('permission')) {
                    this.$ajax({
                        url: Urls.getMenuPermision,
                        data: {}
                    }).then((data) => {
                        if (data.code === 200) {
                            sessionStorage.setItem('permission', JSON.stringify(data.data))
                        }
                    });
                }
            },
            exit() {
                sessionStorage.clear();
                this.$router.push('/login');
            },
        },
        created() {
            this.getMenu();
            this.userName = sessionStorage.getItem('sportHealthUserName') ? sessionStorage.getItem('sportHealthUserName') : '请登入';
        }
    };
</script>
<style lang="scss" scoped>
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
        width: 55.75rem;
        height: 50.875px;

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
    }

    .notice {
        position: absolute;
        top: 80px;
        left: 1100px;
        width: 650px;
    }

    .schedule {
        position: absolute;
        top: 500px;
        height: 440px;
        left: 1100px;
        width: 650px;
    }
</style>
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
