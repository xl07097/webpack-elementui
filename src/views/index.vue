<template>
    <div id="index" style="height: 100%">
        <img class="sys-name" src="../assets/login/left-name.png" alt="sys-name">
        <div class="index-header clearfix">
            <div class="login">
                <span class="pointer">
                    <img src="../assets/index/user.png" alt="user">
                    <span class="userName"> {{userName}}</span>
                </span>
                <span class="exit password" @click="updatePwd">
                <img src="../assets/index/editpsw.png" alt="password">
                <span class="userName">&nbsp;修改密码</span>
            </span>
                <span class="exit" @click="exit">
                    <img src="../assets/index/close.png" alt="close">
                    <span class="userName">&nbsp;注销</span>
                </span>
            </div>
        </div>
        <div class="menu-container">
            <div class="system">
                <div class="hover" @mouseleave="switchImgs(1)" @mouseenter="switchImg(1)" @click="goto('system')" style="position: absolute;width: 100%;height: 100%;transform: rotate(-55deg) rotateX(43deg) rotateY(32deg) translate(1px,22px);"></div>
                <!--<img src="../assets/index/system.png" @click="goto('system')" alt="system">-->
                <img :src="systemImg1" alt="system">
                <!--<img src="../assets/gif/system2.gif" @click="goto('system')" alt="system">-->
            </div>
            <div  class="ladder_right">
                <!--<img src="../assets/index/ladder_right.png" alt="ladder_right">-->
                <!--<img src="../assets/gif/ladder_right3.png"  alt="system">-->
                <!--<img src="../assets/gif/ladder_right2.gif"  alt="system">-->
            </div>
            <div class="dataCenter">
                <div class="hover" @mouseleave="switchImgs(2)" @mouseenter="switchImg(2)" @click="goto('dataCenter')" style="position: absolute;width: 100%;height: 100%;transform:rotate(-58deg) rotateX(22deg) rotateY(53deg) translate(-24px,21px);"></div>
                <!--<img src="../assets/index/dataCenter.png"  @click="goto('dataCenter')" alt="dataCenter">-->
                <img :src="dataImg1" alt="dataCenter">
                <!--<img src="../assets/gif/dataCenter2.gif" @click="goto('dataCenter')" alt="dataCenter">-->
            </div>
            <div class="ladder_up">
                <!--<img src="../assets/index/ladder_up.png" alt="ladder_up">-->
                <!--<img src="../assets/gif/ladder_up3.png" alt="system">-->
                <!--<img src="../assets/gif/ladder_up2.gif" alt="system">-->
            </div>
            <div class="monitor">
                <div class="hover" @mouseleave="switchImgs(3)" @mouseenter="switchImg(3)" @click="goto('monitor')" style="position: absolute;width: 70%;height: 100%;transform: rotate(-57deg) rotateX(57deg) rotateY(29deg) translate(-65px, 94px);"></div>
                <!--<img src="../assets/index/monitor.png" @click="goto('monitor')" alt="monitor">-->
                <img :src="monitorImg1" alt="monitor">
                <!--<img src="../assets/gif/monitor2.gif" @click="goto('monitor')" alt="monitor">-->
            </div>
            <div class="ladder_down">
                <!--<img src="../assets/index/ladder_down.png" alt="ladder_down">-->
                <!--<img src="../assets/gif/ladder_down3.png"  alt="ladder_down">-->
                <!--<img src="../assets/gif/ladder_down2.gif"  alt="ladder_down">-->
            </div>

            <div class="health_review">
                <div class="hover" @mouseleave="switchImgs(4)" @mouseenter="switchImg(4)" @click="goto('medicalExamination')" style="position: absolute;width: 100%;height: 100%;transform: rotate(-57deg) rotateX(44deg) rotateY(34deg) translate(-4px, 40px);"></div>
                <!--<img src="../assets/index/health_review.png" @click="goto('medicalExamination')" alt="health_review">-->
                <img :src="reviewImg1" alt="health_review">
                <!--<img src="../assets/gif/health_review2.gif" @click="goto('medicalExamination')" alt="health_review">-->
            </div>
            <div class="ladder">
                <!--<img src="../assets/index/ladder.png" alt="ladder">-->
                <!--<img src="../assets/gif/ladder3.png" alt="system">-->
                <!--<img src="../assets/gif/ladder2.gif" alt="system">-->
            </div>
            <div class="health_test">
                <div class="hover" @mouseleave="switchImgs(5)" @mouseenter="switchImg(5)" @click="goto('physicalFitnessTest')" style="position: absolute;width: 100%;height: 100%;transform:rotate(55deg) rotateX(-29deg) rotateY(40deg) translate(12px, -10px);"></div>
                <!--<img src="../assets/index/health_test.png" @click="goto('physicalFitnessTest')" alt="health_test">-->
                <img :src="testImg1" alt="health_test">
                <!--<img src="../assets/gif/health_test2.gif" @click="goto('physicalFitnessTest')" alt="health_review">-->
            </div>
        </div>
        <div class="notice">
            <div class="noticeContent">
                <div class="item" v-for="item in noticeList" :key="item.id">
                    <div class="date">
                        <span>{{item.start_time.split('/')[1]}}月{{item.start_time.split('/')[2].split(' ')[0]}}</span>
                        <span class="year">{{item.send_date.split('/')[0]}}</span>
                    </div>
                    <div class="text">
                        {{item.content}}
                    </div>

                </div>

            </div>
            <span class="gotoNotice" @click="gotoNotice"></span>
        </div>
        <Footer></Footer>

        <Modal
                :title="addtitle"
                v-model="addModal"
                :footer-hide="true"
                :mask-closable="false"
                width="500"
                class="AppletUserAddModal"
                :styles="{top: '20px'}"
                class-name="vertical-center-modal"
        >
            <Form :model="addForm" label-position="left" :rules="rules" ref="addForm" :label-width="80">
                <Row style="margin-bottom: 0;">
                    <i-col class="leftFormItem" style="padding-left: 70px">
                        <FormItem label="旧密码" prop="oldPwd">
                            <i-input v-model="addForm.oldPwd" type="password" style="width: 250px;"></i-input>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col class="leftFormItem" style="padding-left: 70px">
                        <FormItem label="新密码" prop="newPwd">
                            <i-input v-model="addForm.newPwd" type="password"  style="width: 250px;"></i-input>
                        </FormItem>
                    </i-col>
                </Row>
            </Form>
            <div class="footer" style="text-align: right">
                <i-button class="close" type="default" @click="closeaddModal" style="padding: 0">取消
                </i-button>
                <i-button class="confirm" type="primary" @click="confirmEditModal">确定</i-button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import Urls from '../service/Urls';
    import Footer from '@/components/Footer'

    export default {
        name: 'Index',
        components: {
            Footer
        },
        data() {
            return {
                userName: '',
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
                pageConfig: {
                    page: 1,
                    size: 8
                },
                searchList: {
                    send_date: null
                },
                noticeList: [],
                addModal: false,
                addtitle: '修改密码',
                addForm: {
                    oldPwd: '',
                    newPwd: ''
                },
                rules: {
                    oldPwd: [{required: true, message: "请输入旧密码", trigger: "blur"}],
                    newPwd: [{required: true, message: "请确认新密码", trigger: "blur"}]
                },
                systemImg1: require('@/assets/gif/system3.png'),
                dataImg1: require('@/assets/gif/dataCenter3.png'),
                monitorImg1: require('@/assets/gif/monitor3.png'),
                reviewImg1: require('@/assets/gif/health_review3.png'),
                testImg1: require('@/assets/gif/health_test3.png'),
                systemImg2: require('@/assets/gif/system2.gif'),
                dataImg2: require('@/assets/gif/dataCenter2.gif'),
                monitorImg2: require('@/assets/gif/monitor2.gif'),
                reviewImg2: require('@/assets/gif/health_review2.gif'),
                testImg2: require('@/assets/gif/health_test2.gif')
            };
        },
        methods: {
            switchImgs(type){
                if(type === 1){
                    this.systemImg1 = require('@/assets/gif/system3.png')
                }else if(type === 2){
                    this.dataImg1 = require('@/assets/gif/dataCenter3.png')
                }else if(type === 3){
                    this.monitorImg1 = require('@/assets/gif/monitor3.png')
                }else if(type === 4){
                    this.reviewImg1 = require('@/assets/gif/health_review3.png')
                }else if(type === 5){
                    this.testImg1 = require('@/assets/gif/health_test3.png')
                }
            },
            switchImg(type){
                if(type === 1){
                    this.systemImg1 = require('@/assets/gif/system2.gif')
                }else if(type === 2){
                    this.dataImg1 = require('@/assets/gif/dataCenter2.gif')
                }else if(type === 3){
                    this.monitorImg1 = require('@/assets/gif/monitor2.gif')
                }else if(type === 4){
                    this.reviewImg1 = require('@/assets/gif/health_review2.gif')
                }else if(type === 5){
                    this.testImg1 = require('@/assets/gif/health_test2.gif')
                }
            },
            goto(module) {
                this.$router.push('/' + module);
            },
            updatePwd() {
                this.addForm = {
                    oldPwd: '',
                    newPwd: ''
                };
                this.$refs['addForm'].resetFields();
                this.addModal = true;
            },
            closeaddModal() {
                this.addModal = false;
            },
            confirmEditModal() {

                this.$refs["addForm"].validate(valid => {
                    if (!valid) {
                        this.$Message.error("还有必填项字段未填，请确认后再提交！");
                        return false;
                    }
                    let datas = {
                        user_name: sessionStorage.getItem('user_name'),
                        oldpassword: this.addForm.oldPwd,
                        newpassword: this.addForm.newPwd
                    }
                    this.$ajax({
                        url: Urls.ChangePassword,
                        data: datas
                    }).then(data => {
                        if (data.code === 200) {
                            this.$Message.success("密码修改成功");
                            this.addForm = {};
                            this.addModal = false;
                        } else {

                        }
                    });
                });
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
            gotoNotice() {
                this.$router.push({name: 'notice'})
            },
            getNotice() {
                this.$ajax({
                    url: Urls.task_list_index,
                    data: {
                        page: this.pageConfig.page,
                        size: this.pageConfig.size,
                    }
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.noticeList = data.data;
                        } else {
                            this.noticeList = [];
                        }
                    })

            }
        },
        created() {
            this.getMenu();
            this.getNotice();
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
    .hover{
        position: relative;
        cursor: pointer;
        z-index: 999;
    }
    /*.hover:hover{*/
        /*background: #ccc;*/
    /*}*/

    .menu-container {
        position: relative;
        left: 110px;
        top: 80px;
        width: 55.75rem;
        height: 50.875rem;
        img{
            width: 100%;
            height: 100%;
        }

        .system {
            position: absolute;
            /*width: 390px;*/
            /*height: 340px;*/
            width: 382px;
            height: 325px;
            left: 160px;
            /*cursor: pointer;*/
            /*pointer-events:none;*/
            /*z-index: 10;*/
        }

        .dataCenter {
            position: absolute;
            /*width: 382px;*/
            /*height: 287px;*/
            width: 382px;
            height: 347px;
            left: 12px;
            /*top: 282px;*/
            top: 206px;
            /*cursor: pointer;*/
            /*pointer-events:none;*/
            /*z-index: 11;*/
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
            /*top: 522px;*/
            top: 382px;
            /*width: 383px;*/
            /*height: 294px;*/
            width: 526px;
            height: 420px;
            /*cursor: pointer;*/
            /*pointer-events:none;*/
            z-index: 11;
        }

        .ladder {
            position: absolute;
            left: 400px;
            top: 383px;
            z-index: 2;
        }

        .health_review {
            position: absolute;
            /*width: 383px;*/
            /*height: 298px;*/
            width: 382px;
            height: 349px;
            left: 510px;
            /*top: 470px;*/
            top: 404px;
            /*cursor: pointer;*/
            /*pointer-events:none;*/
            /*z-index: 13;*/
        }

        .health_test {
            position: absolute;
            /*width: 383px;*/
            /*height: 327px;*/
            width: 382px;
            height: 313px;
            left: 417px;
            top: 170px;
            /*cursor: pointer;*/
            /*pointer-events:none;*/
            /*z-index: 11;*/
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
        // width: 595px;
        // max-height: 782px;
        width: 30%;
        height: 80%;
        z-index: 10;
        margin: auto;
        top: 0;
        bottom: 0;
        right: 2%;
        background: url("../assets/index/notice.png") no-repeat;
        background-size: 100% 100%;
        &::before {
            display: block;
            content: '';
            position: absolute;
            left: 6%;
            width: 4%;
            height: 18%;
            z-index: 10;
            top: 8%;
            background: url("../assets/index/noticeText.png") no-repeat;
            background-size: 100% 100%;
        }
        &::after {
            display: block;
            content: '';
            position: absolute;
            left: 7%;
            width: 2%;
            height: 45%;
            z-index: 10;
            top: 30%;
            background: url("../assets/index/noticeLog.png") no-repeat;
            background-size: 100% 100%;
        }
        .gotoNotice {
            position: absolute;
            right: 8%;
            bottom: 4%;
            width: 58px;
            height: 15px;
            cursor: pointer;
            background: url("../assets/index/goNotice.png") no-repeat;
            background-size: 100% 100%;
        }
        .noticeContent {
            position: absolute;
            left: 20%;
            top: 11%;
            right: 24%;
            font-size: 16px;

            color: #000;
            .item {
                margin-bottom: 15%;
                height: 22px;
                margin-top: 0px;
                .date {
                    position: absolute;
                    left: 0;
                    color: #FF7B10;
                    width: 74px;
                    height: 20px;
                    // top: 0;
                    font-size: 18px;
                    .year {
                        font-family: 'SourceHanSansCN-Regular';
                        font-size: 12px;
                        position: absolute;
                        top: 23px;
                        left: 0;
                    }
                }
                .text {
                    position: absolute;
                    left: 37%;
                    width: 90%;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    -o-text-overflow: ellipsis;
                    overflow: hidden;
                }

            }

        }
    }

    .schedule {
        position: absolute;
        top: 500px;
        height: 440px;
        left: 1100px;
        width: 650px;
    }

    .index-header {
        background-color: #95c5c1;
        /*.header-box {*/
            /*height: 70px;*/
            /*line-height: 70px;*/
            /*font-size: 20px;*/
            /*font-weight: bold;*/
            /*color: rgba(51, 51, 51, 1);*/
            /*display: flex;*/
            /*.headerTitle {*/
                /*margin-left: 20px;*/
            /*}*/
        /*}*/
        .login {
            position: absolute;
            right: 24px;
            top: 24px;
            .pointer {
                cursor: pointer;
                .userName {
                    position: relative;
                    top: -4px;
                    height: 12px;
                    font-size: 14px;
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
                    font-size: 14px;
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


    @media screen and (max-width: 1440px) and (min-width: 1367px){
        /*.menu-container {
            position: relative;
            left: 110px;
            top: 60px !important;
            width: 55.75rem;
            height: 50.875px;

            .system {
                width: 340px !important;
                height: 290px !important;
                left: 154px !important;
                top: -5px;
                cursor: pointer;
            }

            .dataCenter {
                position: absolute;
                width: 332px !important;
                height: 237px !important;
                left: 12px;
                top: 258px !important;
                cursor: pointer;
            }

            .ladder_right {
                position: absolute;
                width: 43px;
                height: 141px;
                left: 196px !important;
                top: 174px !important;
                z-index: 2;
            }

            .ladder_up {
                position: absolute;
                left: 282px !important;
                top: 382px !important;
                width: 28px;
                height: 124px;
            }

            .monitor {
                position: absolute;
                left: 117px;
                top: 474px !important;
                width: 333px !important;
                height: 244px !important;
                cursor: pointer;
            }

            .ladder {
                position: absolute;
                width: 188px;
                height: 240px;
                left: 370px !important;
                top: 326px !important;
                z-index: 2;
            }

            .health_review {
                position: absolute;
                width: 333px !important;
                height: 248px !important;
                left: 464px !important;
                top: 410px !important;
                cursor: pointer;
            }

            .health_test {
                position: absolute;
                width: 333px !important;
                height: 277px !important;
                left: 375px !important;
                top: 142px !important;
                cursor: pointer;
            }

            .ladder_down {
                position: absolute;
                left: 572px !important;
                top: 336px !important;
                height: 140px;
                width: 36px;
                z-index: 2;
            }
        }*/
    }

    @media screen and (max-width: 1700px){
        .menu-container{
            transform: scale(0.82);
            top: 20px;
            left: 20px;
        }
    }


    @media screen and (max-width: 1600px){
        .menu-container{
            transform: scale(0.76);
            top: 20px;
            left: 20px;
        }
    }

    @media screen and (max-width: 1440px){
        .menu-container{
            transform: scale(0.75);
            top: 20px;
            left: 20px;
        }
    }

    @media screen and (max-width: 1367px) {
        .login-form {
            right: 30px;
        }

        .login-form input {
            font-size: 16px;
            margin: 0 0 6px 15px;
        }

        .text-warper img {
            width: 18px;
            height: 24px;
            vertical-align: middle;
        }

        .login-title {
            top: 60px;
        }

        .form-container {
            top: 160px;
        }

        .btn-login {
            width: 110px;
            height: 40px;
            font-size: 22px;
        }

        .forget {
            font-size: 16px;
        }

        .menu-container{
            transform: scale(0.75);
            top: 20px;
            left: 20px;
        }

       /* .menu-container {
            position: relative;
            left: 110px;
            top: 60px !important;
            width: 55.75rem;
            height: 50.875px;

            .system {
                width: 240px !important;
                height: 190px !important;
                left: 154px !important;
                top: -5px;
                cursor: pointer;
            }

            .dataCenter {
                position: absolute;
                width: 232px !important;
                height: 137px !important;
                left: 52px !important;
                top: 210px !important;
                cursor: pointer;
            }

            .ladder_right {
                position: absolute;
                width: 43px;
                height: 141px;
                left: 168px !important;
                top: 102px !important;
                z-index: 2;
            }

            .ladder_up {
                position: absolute;
                left: 228px !important;
                top: 286px !important;
                width: 28px;
                height: 124px;
            }

            .monitor {
                position: absolute;
                left: 126px !important;
                top: 388px !important;
                width: 233px !important;
                height: 144px !important;
                cursor: pointer;
            }

            .ladder {
                position: absolute;
                width: 164px;
                height: 232px;
                left: 302px !important;
                top: 211px !important;
                z-index: 2;
            }

            .health_review {
                position: absolute;
                width: 233px !important;
                height: 148px !important;
                left: 400px !important;
                top: 328px !important;
                cursor: pointer;
            }

            .health_test {
                position: absolute;
                width: 233px !important;
                height: 177px !important;
                left: 330px !important;
                top: 110px !important;
                cursor: pointer;
            }

            .ladder_down {
                position: absolute;
                left: 472px !important;
                top: 228px !important;
                height: 140px;
                width: 36px;
                z-index: 2;
            }
        }
        */

    }
</style>

