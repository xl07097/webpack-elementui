<template>
    <div class="physicalData">
        <div class="content-box clearfix">
            <div class="title">
                县市学校体测数据
            </div>
            <div class="download-group">
                <img src="../../../assets/physicalFitnessTest/physicalPrepare/download.png"/><span>下载模板</span></div>
            <Divider dashed/>
            <div class="middle-content">
                <Form ref="centerContent" :model="req" :label-width="110" style="width: 860px;z-index: 111" inline
                      label-position="left">
                    <FormItem label="导入负责人">
                        <span class="leader">admin</span>
                    </FormItem>
                    <FormItem label="待导入学校">
                        <i-select style="width:226px;" v-model="req.school_id" @on-change="schoolChange">
                            <Option value="-1">全部</Option>
                            <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}
                            </i-option>
                        </i-select>
                    </FormItem>
                </Form>
                <Form ref="centerContent" :model="req" :label-width="110" style="width: 860px;z-index: 99" inline
                      label-position="left">
                    <FormItem label="年级-班级">
                        <i-select v-model="req.grade_id" style="width:100px" @on-change="gradeChange">
                            <i-option value="-1">全部</i-option>
                            <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                        </i-select>
                        <i-select v-model="req.classno_id" style="width:100px">
                            <i-option value="-1">全部</i-option>
                            <i-option v-for="item of classList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                        </i-select>
                    </FormItem>
                    <FormItem label="体测时间">
                        <DatePicker type="date" v-model="req.time" style="width: 226px;z-index: 10"></DatePicker>
                    </FormItem>
                </Form>
                <Upload action="//jsonplaceholder.typicode.com/posts/"
                        style="width: 730px;text-align: right;margin: auto">
                    <Button type="primary" class="search-btn">导入数据</Button>
                </Upload>
            </div>
        </div>
    </div>
</template>
<script>
    import urls from '../../../service/Urls';

    export default {
        props: [''],
        data() {
            return {
                req: {
                    school_id: '-1',
                    grade_id: '-1',
                    classno_id: '-1',
                    time: null
                },
                schoolList: [],
                gradeList: [],
                classList: []
            };
        },
        methods: {
            getSchoolList() {
                /// ===========获取下拉列表查询条件
                this.$ajax({ // 学校列表
                    url: urls.unit_opt_list,
                    data: {
                        type: 2,
                        status: 1,
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.schoolList = data.data;
                    } else {
                        this.schoolList = [];
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            schoolChange(value) {
                if (value === '-1') {
                    this.gradeList = [];
                    this.req.grade_id = '-1';
                    return false;
                }
                this.getGradeList(value);
            },
            getGradeList(value) {
                this.$ajax({ // 年级列表
                    url: urls.grade_list,
                    data: {
                        status: 1,
                        id: value,
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.gradeList = data.data;
                    } else {
                        this.gradeList = [];
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            gradeChange(value) {
                this.req.classno_id = '-1';
                if (value === '-1') {
                    this.classList = [];
                    return false;
                }
                this.$ajax({
                    url: urls.class_all_list,
                    data: {
                        school_id: this.req.school_id,
                        status: 1,
                        grade_id: value
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.classList = data.data;
                    } else {
                        this.classList = [];
                    }
                });
            },
        },
        created() {
            this.getSchoolList();
        }
    };
</script>
<style lang="scss">
    .physicalData {
        .content-box {
            padding: 30px 44px;

            .ivu-form {
                position: relative;
                z-index: 100;
            }

            .title {
                height: 26px;
                line-height: 26px;
                color: #333333;
                font-size: 26px;
                font-weight: bold;
            }

            .ivu-divider {
                margin: 13px 0 0;
            }

            .download-group {
                cursor: pointer;
                text-align: right;

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

            .middle-content {
                margin: 112px 0 97px 0;

                .ivu-form {
                    margin: auto;

                    .ivu-form-item-label {
                        position: relative !important;
                        top: -2px !important;
                        font-size: 16px !important;
                        font-family: SourceHanSansCN-Medium !important;
                        font-weight: 500 !important;
                        color: rgba(153, 153, 153, 1) !important;
                    }

                    .ivu-form-item-content {
                        width: 248px !important;
                    }

                    .ivu-select-selected-value,
                    .leader,
                    .ivu-input {
                        font-size: 16px !important;
                        font-family: SourceHanSansCN-Medium !important;
                        font-weight: 500 !important;
                        color: rgba(0, 0, 0, 1) !important;
                    }
                }

                .search-btn {
                    width: 100px;
                    margin-top: 60px;
                }

            }
        }
    }
</style>
