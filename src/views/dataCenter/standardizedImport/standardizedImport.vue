<template>
    <div class="standardizedImport">
        <div class="content-box clearfix">
            <div class="title">
                数据标准化导入
            </div>
            <div class="operator">
                <div class="download-group">
                    <img  src="../../../assets/physicalFitnessTest/physicalPrepare/download.png" alt="下载图标"/>
                    <span >下载模板</span>
                </div>
                <!--<div class="download">-->
                    <!--<img  src="../../../assets/physicalFitnessTest/physicalPrepare/download.png"/>-->
                    <!--&lt;!&ndash;<img src="../../../assets/physicalFitnessTest/physicalPrepare/download.png" alt="">&ndash;&gt;-->
                    <!--<span>下载模板</span>-->
                <!--</div>-->
            </div>
            <div class="wrapper">
                <div class="inner-box">
                    <div class="lefts">
                        <h3>数据对象</h3>
                        <ul>
                            <li class="active">行政区划</li>
                            <li>中小学校</li>
                            <li>学生学籍</li>
                            <li>体检结束</li>
                        </ul>
                    </div>
                    <div class="right-info">
                        <div class="con">
                            <Form ref="obj" :model="obj" :rules="rules" inline label-position="top">
                                <FormItem label="账号" prop="school_id">
                                    <i-input  v-model="obj.school_id" style="width:300px"></i-input>
                                </FormItem>
                                <FormItem label="密码" prop="password">
                                    <i-input type="password" v-model="obj.password" style="width:300px"></i-input>
                                </FormItem>
                                <FormItem label="导入路径" prop="semester">
                                    <i-input  v-model="obj.semester" style="width:300px"></i-input>
                                </FormItem>
                                <FormItem label="导入文件" prop="grade_id">
                                    <i-input  v-model="obj.grade_id" style="width:300px"></i-input>
                                </FormItem>
                                <FormItem label="用户角色分配">
                                    <div class="checkArea">
                                        <div v-for="(item ,index) in roleList"
                                             :class="index%2 === 0?'per-item-odd':'per-item-even'">
                                            <div @change="checkboxChange(item.id)">
                                                <Checkbox class="check-box" type="checkbox" :value="item.id"
                                                          :checked="checkedList[item.id]"/>
                                                <img v-show="checkedList[item.id]" src="../../../assets/system/checked.png"/>
                                            </div>
                                            <div class="per-name">{{item.name}}</div>
                                        </div>
                                    </div>
                                </FormItem>
                            </Form>

                        </div>
                    </div>
                </div>
            </div>
            <!--<img src="../../../assets/physicalFitnessTest/physicalPrepare/backgroundin.png" width="100%" :height="backHeight"/>-->
        </div>
    </div>
</template>
<script>
    export default {
        props: [''],
        data() {
            // const backHeight = document.body.clientHeight - 220;
            return {
                // backHeight,
                obj: {
                    year: null,
                    semester: '',
                    school_id: '',
                    grade_id: '',
                    name: ''
                },
                rules: {
                    year: [{required: true,type: 'date',  message: '请选择学年'}],
                    semester: [{required: true, type: 'number', message: '请选择学期', trigger: 'change'}],
                    school_id: [{required: true, message: '请选择所属学校', trigger: 'change'}],
                    grade_id: [{required: true, message: '请选择所属年级', trigger: 'change'}],
                    name: [{required: true, message: '请输入班级名称', trigger: 'blur'}],
                },
                roleList: [
                    {name: '管理员', id: '1'},
                    {name: '眼科医生', id: '2'},
                    {name: '管理员', id: '3'},
                    {name: '管理员', id: '4'},
                    {name: '管理员', id: '5'},
                    {name: '管理员6', id: '6'}
                ],
                checkedList: {},
                schoolList: [],
                gradeList: [],
            };
        },
        methods: {
            checkboxChange(checked_id) {
                this.checkedList[checked_id] ? this.$delete(this.checkedList, checked_id) : this.$set(this.checkedList, checked_id, true);
            },
        },
        mounted() {
            const that = this;
            // window.onresize = function temp() {
            //     that.backHeight = `${document.getElementsByClassName('container-background')[0].clientHeight - 100}`;
            // };
        },
    };
</script>
<style lang="scss">
    .standardizedImport {
        height: 100%;
        .content-box {
            position: relative;
            height: 100%;
            padding: 30px 44px;

            .ivu-form {
                position: relative;
                z-index: 100;
            }
            .title {
                position: relative;
                height: 26px;
                line-height: 26px;
                color: #333333;
                font-size: 26px;
                font-weight: bold;
                z-index: 100;
            }
            .download-group {
                position: relative;
                cursor: pointer;
                margin-bottom: 30px;
                text-align: right;
                z-index: 100;
                img {
                    margin-right: 8px;
                }
                span {
                    position: relative;
                    top: -5px;
                    font-size: 18px;
                    font-family: SourceHanSansCN-Regular;
                    font-weight: 400;
                    color: rgba(0, 0, 0, 1);
                }
            }

            .wrapper{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                padding: 100px 44px 20px;
                z-index: 10;
            }
            .inner-box{
                display: flex;
                align-items: stretch;
                height: 100%;
            }
            .lefts{
                width: 250px;
                background-color: #EDF7F5;
                border: 1px solid #e9eceb;
                h3{
                    padding: 20px 0 20px 20px;
                    font-size: 20px;
                    color: #69958f;
                }
                li{
                    padding-left: 20px;
                    line-height:40px;
                    font-size: 14px;
                    color: #000;
                    cursor: pointer;
                }
                li.active{
                    background-color: #e1f0ee;
                    border-bottom: 1px solid #dfe8e6;
                    border-top: 1px solid #dfe8e6;
                    border-right: 3px solid #549892;
                }
            }
            .right-info{
                position: relative;
                flex: 1;
                padding-left: 15px;
                .con{
                    position: relative;
                    height: 100%;
                    padding-top: 30px;
                    border: 1px solid #e9eceb;
                    border-radius: 4px;
                }
                .ivu-form{
                    width: 750px;
                    padding-left: 30px;
                }
                .ivu-form .ivu-form-item-label {
                    font-size: 15px !important;
                    color: #6f6c65 !important;
                }
                h4{
                    padding-left: 30px;
                    line-height: 50px;
                    font-size: 14px;
                    font-family: '黑体',serif;
                }

                    .checkArea {
                        /*width: 526px;*/
                        /*height: 256px;*/
                        /*overflow-y: auto;*/
                        .check-box {
                            margin: 10px 0 0;
                            padding: 0;
                            width: 18px;
                            height: 18px;
                            background-color: white;
                            cursor: pointer;
                        }
                        img {
                            position: absolute;
                            top: 15px;
                            left: 34px;
                            pointer-events: none;
                        }
                        .ivu-checkbox-inner {
                            display: none;
                        }
                        .per-item {
                            position: relative;
                            width: 80px;
                            height: 73px;
                            margin-right: 9px;
                            text-align: center;
                            color: #021D21;
                            font-size: 14px;
                            margin-top: 8px;
                            display: inline-block;
                        }
                        .per-item-odd {
                            @extend .per-item;
                            background-color: #F0EFDF;
                        }
                        .per-item-even {
                            @extend .per-item;
                            background-color: #BBDFDF;
                        }
                    }

            }
        }
    }
</style>

