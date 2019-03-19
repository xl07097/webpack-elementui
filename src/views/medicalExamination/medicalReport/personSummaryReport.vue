<template>
    <div class="personSummaryReport">
        <div class="content-box">
            <h3 class="title">电子体检报告</h3>
            <Form class="clearfix" inline label-position="left">
                <FormItem label="学年" :label-width="44">
                    <DatePicker type="year" format="yyyy" v-model="req.year" style="width: 100px"></DatePicker>
                </FormItem>
                <FormItem label="所属区域" :label-width="80">
                    <Select style="width:100px">
                        <Option value="">全部</Option>
                        <Option :value="1">健康体检</Option>
                        <Option :value="2">升学体检</Option>
                    </Select>
                    <Select style="width:100px">
                        <Option value="">全部</Option>
                        <Option :value="1">健康体检</Option>
                        <Option :value="2">升学体检</Option>
                    </Select>
                </FormItem>
                <FormItem label="学校名称" :label-width="80">
                    <Select style="width:100px">
                        <Option value="">全部</Option>
                        <Option :value="1">健康体检</Option>
                        <Option :value="2">升学体检</Option>
                    </Select>
                </FormItem>
                <FormItem label="学生姓名" :label-width="80">
                    <Input style="width:170px;"/>
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
            <Table center :columns="columns" :data="tableData"
                   :row-class-name='rowClass' @on-selection-change="selectChange"></Table>
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
                <div style="display: flex">
                    <div style="width: 320px;">
                        <img src="../../../assets/medicalExamination/peoson.png"/>
                        <div class="report-title">{{student.name}}数据报告分析</div>
                    </div>
                    <div style="margin-left: 40px">
                        <div style="height: 115px;">
                            <img src="../../../assets/medicalExamination/height.png" style="float:left;"/>
                            <div class="personSummaryReport-container ">
                                <div class="report-value-content"><span class="normal">身高：</span><span
                                        class="report-value">{{analyzeInfo.sg}}CM</span>
                                    <span class="normal" style="margin-left: 20px">体重：</span><span
                                            class="report-value">{{analyzeInfo.tz}}KG</span></div>
                                <div style="margin-top:5px"><span
                                        class="report-normal">结论：bmi={{analyzeInfo.bmi}}</span>
                                </div>
                            </div>
                        </div>
                        <div style="height:115px;">
                            <img src="../../../assets/medicalExamination/blood_pressure.png" style="float:left;"/>
                            <div class="personSummaryReport-container ">
                                <div class="report-value-content">
                                    <span class="normal">收缩压：</span><span
                                        class="report-value">{{analyzeInfo.szy}}mmHg</span>
                                    <span class="normal" style="margin-left: 20px">舒张压：</span><span
                                        class="report-value">{{analyzeInfo.szy}}mmHg</span> <span class="normal"
                                                                                                  style="margin-left: 20px">脉搏：</span><span
                                        class="report-value">{{analyzeInfo.mb}}次/分</span></div>
                                <div style="margin-top:5px"><span
                                        class="report-normal">结论：{{analyzeInfo.slgnjg}}。</span></div>
                            </div>
                        </div>
                        <div style="height:115px;">
                            <img src="../../../assets/medicalExamination/eye.png" style="float:left;"/>
                            <div class="personSummaryReport-container ">
                                <div class="report-value-content"><span class="normal">右眼视力：</span><span
                                        class="report-value">{{analyzeInfo.yysl}}</span>
                                    <span class="normal" style="margin-left: 20px">左眼视力：</span><span
                                            class="report-value">{{analyzeInfo.zysl}}</span><span class="normal"
                                                                                                  style="margin-left: 20px">右眼矫正视力：</span><span
                                            class="report-value">{{analyzeInfo.zysy}}</span>
                                    <span class="normal"
                                          style="margin-left: 20px">左眼矫正视力：</span><span
                                            class="report-value">{{analyzeInfo.yysy}}</span>
                                </div>
                                <div class="report-value-content">
                                    <span class="normal">屈光：</span><span
                                        class="report-value">{{analyzeInfo.jmy}}</span>
                                    <span class="normal" style="margin-left: 20px">近视：</span><span
                                        class="report-value">{{analyzeInfo.jmy}}</span>
                                    <span class="normal" style="margin-left: 20px">沙眼：</span><span
                                        class="report-value">{{analyzeInfo.jmy}}</span>
                                    <span class="normal" style="margin-left: 20px">结膜炎：</span><span
                                        class="report-value">{{analyzeInfo.jmy}}</span>
                                    <span class="normal" style="margin-left: 20px">色觉：</span><span
                                        class="report-value">{{analyzeInfo.jmy}}</span>
                                </div>
                                <div style="margin-top:5px"><span
                                        class="report-error">结论：结膜炎(阴性)，请到综合性医院复查，并积极治疗。</span></div>
                            </div>
                        </div>
                        <div style="height:115px;">
                            <img src="../../../assets/medicalExamination/mouth_cavity.png" style="float:left;"/>
                            <div class="personSummaryReport-container ">
                                <div class="report-value-content"><span class="normal">齿列：</span><span
                                        class="report-value">{{analyzeInfo.yz}}</span><span class="normal"
                                                                                            style="margin-left: 20px">牙周：</span><span
                                        class="report-value">{{analyzeInfo.cl}}</span>
                                    <span class="normal" style="margin-left: 20px">有无龋齿：</span><span
                                            class="report-value">{{analyzeInfo.qc}}</span>
                                    <span class="normal" style="margin-left: 20px">龋患牙数：：</span><span
                                            class="report-value">{{analyzeInfo.qc}}</span>
                                    <span class="normal" style="margin-left: 20px">龋失牙数：</span><span
                                            class="report-value">{{analyzeInfo.qc}}</span>
                                    <span class="normal" style="margin-left: 20px">龋补牙数：：</span><span
                                            class="report-value">{{analyzeInfo.qc}}</span>
                                    <div style="margin-top:5px"><span
                                            class="report-error">结论：{{analyzeInfo.kqjg}}。</span></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="trisection">
                                <img src="../../../assets/medicalExamination/pifu.png" style="float:left;"/>
                                <div class="personSummaryReport-container ">
                                    <div class="report-value-content"><span class="normal">皮肤：</span><span
                                            class="report-value">{{analyzeInfo.tb}}</span>
                                        <div style="margin-top:5px"><span
                                                class="report-error">结论：异常</span></div>
                                    </div>
                                </div>
                            </div>
                            <div class="trisection">
                                <img src="../../../assets/medicalExamination/lbj.png" style="float:left;"/>
                                <div class="personSummaryReport-container ">
                                    <div class="report-value-content"><span class="normal">淋巴结：</span><span
                                            class="report-value">{{analyzeInfo.tb}}</span>
                                        <div style="margin-top:5px"><span
                                                class="report-error">结论：异常</span></div>
                                    </div>
                                </div>
                            </div>
                            <div class="trisection">
                                <img src="../../../assets/medicalExamination/head.png" style="float:left;"/>
                                <div class="personSummaryReport-container ">
                                    <div class="report-value-content"><span class="normal">头部：</span><span
                                            class="report-value">{{analyzeInfo.tb}}</span>
                                        <div style="margin-top:5px"><span
                                                class="report-error">结论：异常</span></div>
                                    </div>
                                </div>
                            </div>
                            <div class="trisection">
                                <img src="../../../assets/medicalExamination/neck.png" style="float:left;"/>
                                <div class="personSummaryReport-container ">
                                    <div class="report-value-content"><span class="normal">颈部：</span><span
                                            class="report-value">{{analyzeInfo.jb}}</span>
                                        <div style="margin-top:5px"><span
                                                class="report-normal">结论：正常</span></div>
                                    </div>
                                </div>
                            </div>
                            <div class="trisection">
                                <img src="../../../assets/medicalExamination/spine.png" style="float:left;"/>
                                <div class="personSummaryReport-container ">
                                    <div class="report-value-content"><span class="normal">脊柱：</span><span
                                            class="report-value">{{analyzeInfo.jz}}</span>
                                        <div style="margin-top:5px"><span
                                                class="report-normal">结论：正常</span></div>
                                    </div>
                                </div>
                            </div>
                            <div class="trisection">
                                <img src="../../../assets/medicalExamination/neck.png" style="float:left;"/>
                                <div class="personSummaryReport-container ">
                                    <div class="report-value-content"><span class="normal">四肢：</span><span
                                            class="report-value">{{analyzeInfo.jb}}</span>
                                        <div style="margin-top:5px"><span
                                                class="report-normal">结论：正常</span></div>
                                    </div>
                                </div>
                            </div>
                            <div class="trisection">
                                <img src="../../../assets/medicalExamination/xb.png" style="float:left;"/>
                                <div class="personSummaryReport-container ">
                                    <div class="report-value-content"><span class="normal">胸部：</span><span
                                            class="report-value">{{analyzeInfo.jb}}</span>
                                        <div style="margin-top:5px"><span
                                                class="report-normal">结论：正常</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="trisection" style="width: 100%">
                                <img src="../../../assets/medicalExamination/heart.png" style="float:left;"/>
                                <div class="personSummaryReport-container ">
                                    <div class="report-value-content">
                                        <span class="normal">心率：</span>
                                        <span class="report-value">62次/分钟</span>
                                        <span class="normal" style="margin-left: 30px">心无杂音：</span>
                                        <span class="report-value">无</span>
                                        <span class="normal" style="margin-left: 30px">心率：</span>
                                        <span class="report-value">绝对不齐</span>
                                        <div style="margin-top:5px"><span
                                                class="report-normal">结论：正常</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="trisection">
                            <img src="../../../assets/medicalExamination/lung.png" style="float:left;"/>
                            <div class="personSummaryReport-container ">
                                <div class="report-value-content"><span class="normal">肺：</span><span
                                        class="report-value">{{analyzeInfo.fei}}</span>
                                    <div style="margin-top:5px"><span
                                            class="report-normal">结论：正常</span></div>
                                </div>
                            </div>
                        </div>
                        <div class="trisection">
                            <img src="../../../assets/medicalExamination/liver.png" style="float:left;"/>
                            <div class="personSummaryReport-container ">
                                <div class="report-value-content"><span class="normal">肝：</span><span
                                        class="report-value">{{analyzeInfo.gan}}</span>
                                    <div style="margin-top:5px"><span
                                            class="report-normal">结论：正常</span></div>
                                </div>
                            </div>
                        </div>
                        <div class="trisection">
                            <img src="../../../assets/medicalExamination/spleen.png" style="float:left;"/>
                            <div class="personSummaryReport-container ">
                                <div class="report-value-content"><span class="normal">脾：</span><span
                                        class="report-value">{{analyzeInfo.pi}}</span>
                                    <div style="margin-top:5px"><span
                                            class="report-normal">结论：正常</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
        <component :title="modalTitle" :is='com' :id='id' :flag="flag" @modal-close='ModalClose'></component>
    </div>
</template>

<script>
    import urls from '../../../service/Urls';
    import physicalReportInfo from './physicalReportInfo';
    import printSummaryReport from './printSummaryReport';

    export default {
        name: 'personSummaryReport',
        data() {
            return {
                tableData: [],
                typeList: [],
                yearList: [],
                areaList: [],
                schoolList: [],
                gradeList: [],
                classList: [],
                req: {
                    year: new Date(),
                    area_id: null,
                    school_id: null,
                    grade_id: null,
                    class_id: null
                },
                student: {
                    name: ''
                },
                select: [],
                modal: false,
                columns: [
                    {
                        title: ' ',
                        width: 40
                    },
                    {
                        type: 'selection',
                        width: 100,
                    }, {
                        type: 'index',
                        width: 100,
                        title: '序号',
                    },
                    {
                        title: '姓名',
                        width: 100,
                        key: 'student_name',
                    },
                    {
                        title: '报告总结',
                        key: 'value',
                    },
                    {
                        title: '状态',
                        key: 'value',
                        render(h, params) {
                            return h('span', {1: '正常', 2: '异常'}[params.row.state]);
                        }
                    },
                    {
                        title: '操作',
                        key: 'operator',
                        // align: 'center',
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
                                            this.infos(params.row.id);
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
                                            this.edit(params.row);
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
                modalTitle: '',
                addModal: false,
                flag: false,
                itemShow: {
                    'yysl': false,
                    'zysl': false,
                    'yz': false,
                    'slgnjg': false,
                    'tz': false,
                    'cl': false,
                    'kqyz': false,
                    'qc': false,
                    'szy': false,
                    'sg': false,
                    'mb': false,
                    'jmy': false,
                    'ykjg': false,
                    'ssy': false,
                    'zysy': false,
                    'yysy': false,
                    'tb': false,
                    'jz': false,
                    'jb': false,
                    'xin': false,
                    'gan': false,
                    'fei': false,
                    'pi': false
                },
                analyzeInfo: {
                    'yysl': '',
                    'zysl': '',
                    'yz': '',
                    'slgnjg': '',
                    'tz': '',
                    'cl': '',
                    'kqyz': '',
                    'qc': '',
                    'szy': '',
                    'sg': '',
                    'mb': '',
                    'jmy': '',
                    'ykjg': '',
                    'ssy': '',
                    'zysy': '',
                    'yysy': '',
                    'tb': '',
                    'jz': '',
                    'jb': '',
                    'xin': '',
                    'gan': '',
                    'fei': '',
                    'pi': ''
                },
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
            getSelectCondition() {
                /// ===========获取下拉列表查询条件
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
                this.$ajax({
                    url: urls.unit_all_list,
                    data: {
                        status: 1,
                        type: 2
                    }
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.schoolList = data.data;
                        } else {
                            this.schoolList = [];
                        }
                    })
                    .catch(err => {
                        window.console.log(err);
                    });
            },
            getSchoolListByarea() {
                this.$ajax({
                    url: urls.unit_opt_list,
                    data: {
                        type: 2,
                        status: 1
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
            search() {
                this.$ajax({
                    url: urls.set_objects_list,
                    data: {
                        page: this.pageConfig.page,
                        size: this.pageConfig.size,
                        year: this.req.year ? this.req.year.getFullYear() : null
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.tableData = data.data;
                        this.pageConfig.total = data.totalRecords;
                    } else {
                        this.tableData = [];
                    }
                }).catch(err => {
                    window.console.log(err);
                    this.tableData = [];
                });
            },
            getGradeListBySchool() {
                this.gradeList = [];
                this.req.grade_id = '';
                this.req.class_id = '';
                personSummaryReport
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
                this.$ajax({ //
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
            selectChange(value) {
                console.log(value);
                this.select = value;
            },
            prints() {
                if (this.select.length === 1) {
                    this.com = printSummaryReport;
                    this.id = this.select[0].id;
                    this.modalTitle = '打印';
                } else {
                    this.$Message.error('请选择一个');
                }
            },
            infos(id) {
                this.com = physicalReportInfo;
                this.id = id;
                this.flag = true;
                this.modalTitle = '详情页';
            },
            edit(row) {
                this.analyzeInfo = {};
                let obj = {};
                obj.studentInfo = {
                    'gender': row.gender,
                    'id': row.student_id,
                    'birthdate_long': row.birthdate_long
                };
                obj.courseInfo = {
                    'plan_id': row.plan_id
                };
                this.$ajax({
                    url: urls.examination_personsummary_analyze,
                    data: obj
                }).then(data => {
                    if (data.code === 200) {
                        this.analyzeInfo = data.data;
                    } else {
                        this.analyzeInfo = {};
                    }
                }).catch(err => {
                    window.console.log(err);
                    this.analyzeInfo = {};
                });
                this.student.name = row.student_name;
                this.modal = true;
            },
            rowClass(row) {
                return row.status === 0 ? 'disabled' : '';
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
            ModalClose(flag) {
                this.com = null;
                if (flag) {
                    this.search();
                }
            }
        },
        created() {
            this.getSelectCondition();
            this.search();
        }
    };
</script>
<style lang="less">
    .personSummaryReport {
        .content-box {
            padding: 30px 44px;
        }
        .title {
            height: 80px;
            line-height: 1;
            color: #333333;
            font-size: 26px;
            font-weight: bold;
        }
    }

    .trisection {
        display: inline-block;
        height: 115px;
        width: 250px;
    }

    .report-title {
        margin-top: 35px;
        text-align: center;
        font-size: 20px;
        font-weight: 600;
        color: #000000;
    }

    .personSummaryReport-container {
        overflow: auto;
        padding-left: 20px;

        .report-value-content {
            padding-top: 10px;
            color: #000000;
            font-size: 14px;
        }

        .normal {
            font-weight: 600;
        }
        .report-value {
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

    .btn-box {
        margin: 19px 0 0px !important;
    }

</style>
