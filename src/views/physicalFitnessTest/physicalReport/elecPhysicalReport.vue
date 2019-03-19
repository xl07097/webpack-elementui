<template>
    <div class="elecPhysicalReport">
        <div class="content-box">
            <h3 class="title">电子体测报告</h3>
            <Form class="clearfix" inline label-position="left" style="margin-top: 36px">
                <FormItem label="年份" :label-width="44">
                    <DatePicker type="year" format="yyyy" v-model="req.year" style="width: 100px"></DatePicker>
                </FormItem>
                <FormItem label="所属区域" :label-width="88">
                    <i-select v-model="req.area_id" style="width:120px" clearable @on-change="areaChange">
                        <i-option v-for="item of areaList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="所属学校" :label-width="88">
                    <i-select
                            v-model="req.school_id"
                            filterable
                            @on-change="getGradeListBySchool" clearable
                    >
                        <Option v-for="item in schoolList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </i-select>
                </FormItem>
                <FormItem label="所属年级" :label-width="88">
                    <i-select v-model="req.grade_id" style="width:160px" @on-change="getClassListByGrade" clearable>
                        <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="所属班级" :label-width="88">
                    <i-select v-model="req.class_id" style="width:160px" clearable>
                        <i-option v-for="item of classList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem style="float: right;">
                    <Button type="primary" class="search-btn" @click="search()">查询</Button>
                </FormItem>
            </Form>
            <div class="divider"/>
            <div class="btn-box">
                <div class="action-btn" @click="prints">
                    <img style="margin: 8px 6px;" src="../../../assets/common/print.png"/>
                    打印
                </div>
                <div class="action-btn">
                    <img style="margin: 8px 6px;" src="../../../assets/common/export.png"/>
                    导出
                </div>
            </div>
            <Table center :disabled-hover='true' :columns="columns" :data="tableData"></Table>
            <Page style="text-align: center;margin-top: 20px;"
                  :total="pageConfig.total"
                  show-total
                  show-elevator
                  show-sizer
                  :current='pageConfig.page'
                  :page-size-opts='pageConfig.opts'
                  :page-size='pageConfig.size'
                  @on-change='pageChange'
                  @on-page-size-change='sizeChange'/>
            <Modal
                    title="分析页面"
                    v-model="modal"
                    :mask-closable="false"
                    :styles="{width:'1200px'}"
                    footer-hide
            >
                <div class="elecPhysical-analyze">
                    <div style="width: 320px;">
                        <img src="../../../assets/physicalFitnessTest/boy.png" v-if="!sex"/>
                        <img src="../../../assets/physicalFitnessTest/girl.png" v-if="sex"/>
                        <div class="report-title">{{studentName}}---电子体检报告</div>
                    </div>
                    <div style="margin-left: 80px">
                        <div style="height: 115px" v-if="analyzeHeight">
                            <img src="../../../assets/physicalFitnessTest/body.png" style="float: left"/>
                            <div class="report-value-wrapper">
                                <div class="img-title">BMI</div>
                                <div style="margin-left: 40px">
                                    <div class="report-value-content">
                                        <span class="normal">身高：</span><span class="report-value">{{heightObj.othervalue1}}<span
                                            class="value-unit">cm</span></span>
                                        <span class="normal">体重：</span><span
                                            class="report-value">{{heightObj.othervalue2}}<span
                                            class="value-unit">kg</span></span>
                                        <span class="normal">BMI：</span><span
                                            class="report-value">{{heightObj.resultvalue}}</span>
                                    </div>
                                    <div class="report-red-content">
                                        <span class="normal">得分：</span><span
                                            class="report-value">{{heightObj.score}}</span>
                                        <span class="normal">占比：</span><span
                                            class="report-value">{{heightObj.proportion}}</span>
                                        <span class="normal">加权得分：</span><span
                                            class="report-value">{{heightObj.weighted_score}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-for="item in analyzeList" style="height: 115px">
                            <img v-bind:src="item.imgsrc" style="float:left;">
                            <div class="report-value-wrapper">
                                <div class="img-title">{{item.fitness}}</div>
                                <div style="margin-left: 40px">
                                    <div class="report-value-content">
                                        <span class="normal">成绩：</span> <span
                                            class="report-value">{{item.resultvalue}}<span
                                            class="value-unit">{{item.unit}}</span></span>
                                    </div>
                                    <div class="report-red-content">
                                        <span class="normal">得分：</span><span class="report-value">{{item.score}}</span>
                                        <span class="normal">占比：</span><span
                                            class="report-value">{{item.proportion}}</span>
                                        <span class="normal">加权得分：</span><span
                                            class="report-value">{{item.weighted_score}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="report-value-wrapper" style="height: 100px">
                            <div style="height: 1px;width:100%;background-color: #E8EAEAFF">
                                <div style="font-size: 24px;color: #000000FF;text-align: right;margin-top: 20px">
                                    总分:{{analyze_count}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal
                    title="详情"
                    v-model="infomodal"
                    :mask-closable="false"
                    :footer-hide="true"
                    :styles="{width:'1200px'}"
                    footer-hide
            >
                <div class="elecPhysical-Infomodal">
                    <Form inline :model="infomodalData" :label-width="42"
                          class="modal-form">
                        <FormItem label="学校名称" :label-width="72">
                            <Input v-model="infomodalData.student_school" style="width:200px;" readonly/>
                        </FormItem>
                        <FormItem label="年级" :label-width="72">
                            <Input v-model="infomodalData.student_graden" style="width:160px;" readonly/>
                        </FormItem>
                        <FormItem label="班级">
                            <Input v-model="infomodalData.student_class" style="width:100px;" readonly/>
                        </FormItem>
                        <FormItem label="姓名">
                            <Input v-model="infomodalData.student_name" style="width:100px" readonly/>
                        </FormItem>
                        <FormItem label="性别">
                            <Input v-model="infomodalData.student_gender" style="width:100px;" readonly/>
                        </FormItem>
                        <FormItem label="民族" :label-width="72">
                            <Input style="width:200px" v-model="infomodalData.student_nation" readonly/>
                        </FormItem>
                        <FormItem label="学籍号" :label-width="72">
                            <Input style="width:200px" v-model="infomodalData.student_code" readonly/>
                        </FormItem>
                        <FormItem label="出生年月" :label-width="72">
                            <Input style="width:200px" v-model="infomodalData.student_brith" readonly/>
                        </FormItem>
                        <div style="display: inline-block;width: 550px;margin-left: 20px" v-if="infoHeight">
                            <div style="color: #000000;font-size: 20px;font-weight: 600;margin-bottom: 12px">
                                形体
                            </div>
                            <FormItem label="身高" :label-width="42">
                                <Input style="width:90px" v-model="infomodalData.body.othervalue1" readonly/>
                            </FormItem>
                            <FormItem label="体重" :label-width="42">
                                <Input style="width:90px" v-model="infomodalData.body.othervalue2" readonly/>
                            </FormItem>
                            <FormItem label="BMI" :label-width="42">
                                <Input style="width:90px" v-model="infomodalData.body.resultvalue" readonly/>
                            </FormItem>
                            <FormItem label="得分" :label-width="42">
                                <Input style="width:90px" v-model="infomodalData.body.score" readonly/>
                            </FormItem>
                            <FormItem label="权值" :label-width="42">
                                <Input style="width:90px" v-model="infomodalData.body.proportion" readonly/>
                            </FormItem>
                            <FormItem label="加权" :label-width="42">
                                <Input style="width:90px" v-model="infomodalData.body.weighted_score" readonly/>
                            </FormItem>
                        </div>
                        <li v-for="item in infomodalData.fitnessForms" style="display: inline-block">
                            <div style="display: inline-block;width: 550px;margin-left: 20px">
                                <div style="color: #000000;font-size: 20px;font-weight: 600;margin-bottom: 12px"> {{
                                    item.fitness }}
                                </div>
                                <FormItem label="成绩" :label-width="42">
                                    <Input style="width:90px" v-model="item.score" readonly/>
                                </FormItem>
                                <br>
                                <FormItem label="得分" :label-width="42">
                                    <Input style="width:90px" v-model="item.weighted_score" readonly/>
                                </FormItem>
                                <FormItem label="权值" :label-width="42">
                                    <Input style="width:90px" v-model="item.proportion" readonly/>
                                </FormItem>
                                <FormItem label="加权" :label-width="42">
                                    <Input style="width:90px" v-model="item.weighted_score" readonly/>
                                </FormItem>
                            </div>
                        </li>
                        <div style="height: 100px">
                            <div style="height: 1px;width:90%;margin:auto;background-color: #E8EAEAFF">
                                <div style="font-size: 24px;color: #000000FF;text-align: right;padding-top: 20px">
                                    总分:{{info_count}}
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </Modal>
        </div>

        <component :is='com' :id='id' @modal-close='ModalClose'></component>
    </div>
</template>

<script>
    import urls from '../../../service/Urls';
    import printPhysicalReport from './printPhysicalReport';

    export default {
        name: 'elecPhysicalReport',
        data() {
            return {
                req: {
                    year: new Date(),
                    area_id: null,
                    school_id: null,
                    grade_id: null,
                    class_id: null
                },
                studentName: {},
                classList: [],
                gradeList: [],
                isHeight: false,
                modal: false,
                modalData: {},
                analyzeList: {},
                infomodal: false,
                sex: true,
                analyzeHeight: false,
                infoHeight: false,
                analyze_count: 0,
                info_count: 0,
                infomodalData: {
                    body: {}
                },
                columns: [
                    {
                        title: ' ',
                        width: 40,
                    },
                    {
                        type: 'selection',
                        width: 100,
                    },
                    {
                        type: 'index',
                        width: 100,
                        title: '序号',
                    },
                    {
                        title: '姓名',
                        key: 'student_name',
                    },
                    {
                        title: '得分',
                        key: 'score',
                    },
                    {
                        title: '检测类型',
                        key: 'exam_type',
                        render: (h, params) => {
                            return h('span', params.row.exam_type === 1 ? '体育老师测试' : '家长测试');
                        }
                    },
                    {
                        title: '操作',
                        key: 'operator',
                        width: 180,
                        render: (h, params) => {
                            return h('div', [
                                h('span', {
                                    attrs: {
                                        class: 'editBtn'
                                    },
                                    style: {
                                        display: 'inline-block',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.infos(params.row);
                                        }
                                    }
                                }, [
                                    h('img', {
                                        style: {
                                            marginRight: '5px'
                                        },
                                        attrs: {
                                            src: require('../../../assets/unit/infos.png')
                                        }
                                    }),
                                    h('span', {
                                        style: {
                                            position: 'relative',
                                            top: '-4px'
                                        }
                                    }, '详情')
                                ]),
                                h('span', {
                                    attrs: {
                                        class: 'editBtn'
                                    },
                                    style: {
                                        display: 'inline-block',
                                        cursor: 'pointer',
                                        marginRight: '20px'
                                    },
                                    on: {
                                        click: () => {
                                            this.analyze(params.row);
                                        }
                                    }
                                }, [
                                    h('img', {
                                        style: {
                                            marginRight: '5px'
                                        },
                                        attrs: {
                                            src: require('../../../assets/physicalFitnessTest/analyze.png')
                                        }
                                    }),
                                    h('span', {
                                        style: {
                                            position: 'relative',
                                            top: '-4px'
                                        }
                                    }, '分析')
                                ])
                            ]);
                        }
                    }
                ],
                tableData: [],
                areaList: [],
                schoolList: [],
                heightObj: {},
                id: '',
                com: null,
                pageConfig: {
                    page: 1,
                    size: 10,
                    total: 0,
                    opts: [10, 20, 50, 100]
                }
            };
        },
        methods: {
            search() {
                if (!this.req.year) {
                    this.$Message.error('请选择年份');
                    return;
                }
                let req = {};
                req.page = this.pageConfig.page;
                req.size = this.pageConfig.size;
                req.year = this.req.year ? this.req.year.getFullYear() : null;
                req.area_id = this.req.area_id;
                req.school_id = this.req.school_id;
                req.grade_id = this.req.grade_id;
                req.class_id = this.req.class_id;
                req.exam_type = 1;
                this.$ajax({
                    url: urls.elecPhysicalReport_list,
                    data: req
                }).then(data => {
                    if (data.code === 200) {
                        this.tableData = data.data;
                        this.pageConfig.total = data.totalRecords;
                    } else {
                        this.$Message.error(data.error);
                        this.tableData = [];
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            infos(row) {
                let obj = {};
                this.infoHeight = false;
                this.info_count = 0;
                obj.student_code = row.student_code;
                obj.year = row.year;
                this.$ajax({ // 学校
                    url: urls.elecPhysicalReport_analyze,
                    data: obj
                }).then(data => {
                    if (data.code === 200) {
                        this.infomodalData = data.data[0];
                        let tempList = [];
                        for (let i = 0; i < this.infomodalData.fitnessForms.length; i++) {
                            if (this.infomodalData.fitnessForms[i].fitness === 'BMI') {
                                this.infoHeight = true;
                                this.info_count = this.info_count + this.infomodalData.fitnessForms[i].weighted_score;
                                this.infomodalData.body = this.infomodalData.fitnessForms[i];
                                this.infomodalData.body.othervalue1 = this.infomodalData.body.othervalue1 + 'cm';
                                this.infomodalData.body.othervalue2 = this.infomodalData.body.othervalue2 + 'kg';
                            } else {
                                this.info_count = this.info_count + this.infomodalData.fitnessForms[i].weighted_score;
                                this.infomodalData.fitnessForms[i].score = this.infomodalData.fitnessForms[i].score + this.infomodalData.fitnessForms[i].unit;
                                tempList.push(this.infomodalData.fitnessForms[i]);
                            }
                        }
                        this.infomodalData.fitnessForms = tempList;
                        this.infomodalData.student_brith = this.numToDate(this.infomodalData.student_brith);
                    } else {
                        this.$Message.error(data.error);
                    }
                }).catch(err => {
                    window.console.log(err);
                });
                this.infomodal = true;
            },
            analyze(row) {
                this.analyze_count = 0;
                let obj = {};
                this.analyzeHeight = false;
                obj.student_code = row.student_code;
                obj.year = row.year;
                this.$ajax({ // 学校
                    url: urls.elecPhysicalReport_analyze,
                    data: obj
                }).then(data => {
                    if (data.code === 200) {
                        let oldData = data.data[0].fitnessForms;
                        let tempData = [];
                        this.studentName = data.data[0].student_name;
                        this.sex = data.data[0].student_gender === '女';
                        for (let i = 0; i < oldData.length; i++) {
                            if (oldData[i].fitness === 'BMI') {
                                this.heightObj = oldData[i];
                                this.analyzeHeight = true;
                                this.analyze_count = this.analyze_count + oldData[i].weighted_score;
                            } else {
                                this.analyze_count = this.analyze_count + oldData[i].weighted_score;
                                tempData.push(oldData[i]);
                            }
                        }
                        tempData.map(item => {
                            switch (item.fitness) {
                                case '坐位体前屈':
                                    item.imgsrc = require('../../../assets/physicalFitnessTest/sitAndReach.png');
                                    break;
                                case '立定跳远':
                                    item.imgsrc = require('../../../assets/physicalFitnessTest/long_jump.png');
                                    break;
                                case '引体向上':
                                    item.imgsrc = require('../../../assets/physicalFitnessTest/pull_up.png');
                                    break;
                                case '一分钟仰卧起坐':
                                    item.imgsrc = require('../../../assets/physicalFitnessTest/sit_up.png');
                                    break;
                                case '一分钟跳绳':
                                    item.imgsrc = require('../../../assets/physicalFitnessTest/rope_skipping.png');
                                    break;
                                case '50米跑':
                                    item.imgsrc = require('../../../assets/physicalFitnessTest/50meters.png');
                                    break;
                                case '50米*8往返跑':
                                    item.imgsrc = require('../../../assets/physicalFitnessTest/400meters.png');
                                    break;
                                case '800米跑':
                                    item.imgsrc = require('../../../assets/physicalFitnessTest/800meters.png');
                                    break;
                                case '1000米跑':
                                    item.imgsrc = require('../../../assets/physicalFitnessTest/1000meters.png');
                                    break;
                                case 'BMI':
                                    this.heightObj = item;
                                    break;
                                case '肺活量':
                                    item.imgsrc = require('../../../assets/physicalFitnessTest/lung.png');
                                    break;
                            }
                        });
                        this.analyzeList = tempData;
                    } else {
                        this.$Message.error(data.error);
                    }
                }).catch(err => {
                    window.console.log(err);
                });
                this.modal = true;
            },
            getAreaSelect() {
                this.$ajax({ // 区域列表
                    url: urls.area_list,
                }).then(data => {
                    if (data.code === 200) {
                        this.areaList = data.data;
                    } else {
                        this.areaList = [];
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            areaChange(value){
                this.req.school_id  =-1;
                this.req.grade_id = -1;
                this.req.classno_id = -1;
                this.classList = [];
                this.gradeList = [];
                this.getSchoolSelect();
            },
            getSchoolSelect() {
                this.$ajax({ // 学校
                    url: urls.unit_opt_list,
                    data: {
                        type: 2,
                        status: 1,
                        area_id: this.req.area_id
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.schoolList = data.data;
                    } else {
                        this.schoolList = [];
                    }
                }).catch(err => {
                    window.console.log(err);
                    this.schoolList = [];
                });
            },
            getGradeListBySchool() {
                this.gradeList = [];
                this.req.grade_id = '';
                this.req.class_id = '';
                this.$ajax({ //
                    url: urls.grade_list,
                    data: {
                        'id': this.req.school_id
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
            getClassListByGrade() {
                this.classList = [];
                this.req.class_id = '';
                this.$ajax({
                    url: urls.class_all_list,
                    data: {
                        'school_id': this.req.school_id,
                        'status': 1,
                        'grade_id': this.req.grade_id
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.classList = data.data;
                    } else {
                        this.classList = [];
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            pageChange(page) {
                this.pageConfig.page = page;
                this.search();
            },
            sizeChange(size) {
                this.pageConfig.size = size;
                if (this.pageConfig.page === 1) {
                    this.pageChange(1);
                }
            },
            numToDate: function (value) {
                if (!value) {
                    return '';
                }
                var t = new Date(value);
                var y = t.getFullYear();
                var m = t.getMonth() + 1;
                var d = t.getDate();
                if (m < 10) {
                    m = '0' + m;
                }
                if (d < 10) {
                    d = '0' + d;
                }
                return y + '/' + m + '/' + d;
            },
            prints() {
                // 打印
                this.id = '';
                this.com = printPhysicalReport;
            },
            ModalClose(flag) {
                this.com = null;
                if (flag) {
                    this.search();
                }
            }
        },
        created() {
            this.getAreaSelect();
            this.getSchoolSelect();
            this.search();
        },
    };
</script>

<style lang="less">
    .elecPhysicalReport {
        .content-box {
            padding: 30px 44px;
        }

        .title {
            height: 26px;
            line-height: 26px;
            color: #333333;
            font-size: 26px;
            font-weight: bold;
        }
        .contents {
            position: relative;
        }

    }

    .elecPhysical-analyze-modal {
        .ivu-modal-body {
            height: 700px;
            overflow-y: auto;
        }
    }

    .elecPhysical-analyze {
        overflow: auto;
        display: flex;
        .report-title {
            margin-top: 15px;
            text-align: center;
            font-size: 20px;
            font-weight: 600;
            color: #000000;
        }
        .report-value-wrapper {
            display: flex;
            overflow: auto;
            padding-left: 20px;
            .img-title {
                padding-top: 10px;
                width: 120px;
                font-size: 24px;
                font-weight: 600;
                color: #000000;
            }
            .value-unit {
                font-weight: 600;
                margin-left: 5px;
                font-size: 14px;
            }
            .report-value-content {
                padding-top: 10px;
                color: #000000;
                font-size: 14px;
            }
            .report-red-content {
                margin-top: 5px;
                color: #ed5145;
                font-size: 14px;
            }
            .normal {
                font-weight: 600;
            }
            .report-value {
                display: inline-block;
                width: 100px;
                font-size: 20px;
            }
            .report-error {
                font-size: 16px;
                color: #ed5145;
            }
            .report-normal {
                font-size: 16px;
                color: #299E97;
            }
        }
    }

    .elecPhysical-Infomodal {
        .ivu-input {
            color: rgba(0, 0, 0, 0.87);
            background-color: rgba(233, 240, 242, 1);
            cursor: not-allowed;
        }
    }
</style>
