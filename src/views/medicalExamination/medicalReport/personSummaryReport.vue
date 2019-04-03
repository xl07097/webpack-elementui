<template>
    <div class="personSummaryReport">
        <div class="content-box">
            <h3 class="title">电子体检报告</h3>
            <Form class="clearfix" inline label-position="left">
                <FormItem label="学年" :label-width="44">
                    <i-select style="width:120px" v-model="req.year">
                        <Option value="-1">全部</Option>
                        <i-option v-for="item in yearList" :value="item.value" :key="item.value">{{item.name}}
                        </i-option>
                    </i-select>
                    <!--<DatePicker type="year" format="yyyy" v-model="req.year" style="width: 100px"></DatePicker>-->
                </FormItem>
                <FormItem label="所属区域" :label-width="80">
                    <i-select v-model="req.area_id1" style="width:150px;" @on-change="areaChange">
                        <i-option value="-1">全部</i-option>
                        <i-option v-for="item of areaList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                    <i-select v-model="req.area_id2" style="width:150px;">
                        <i-option value="-1">全部</i-option>
                        <i-option v-for="item of areaList1" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="学校名称" :label-width="80">
                    <Select v-model="req.dep_id" style="width:150px" @on-change="schoolChange">
                        <Option value="-1">全部</Option>
                        <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </Select>
                    <Select v-model="req.grade_no" style="width:100px" @on-change="gradeChange">
                        <Option value="-1">全部</Option>
                        <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.value}}</i-option>
                    </Select>
                    <Select v-model="req.class_no" style="width:100px">
                        <Option value="-1">全部</Option>
                        <i-option v-for="item of classList" :key="item.id" :value='item.id'>{{item.class_no}}</i-option>
                    </Select>
                </FormItem>
                <FormItem label="学生姓名" :label-width="80">
                    <Input v-model="req.student_name" style="width:120px;"/>
                </FormItem>
                <FormItem style="float: right;">
                    <Button type="primary" class="search-btn" @click="initSearch()">查询</Button>
                </FormItem>
            </Form>
            <Divider dashed/>
            <div class="btn-box">
                <div class="action-btn" @click="prints">
                    <img style="margin: 8px 6px;" alt="print" src="../../../assets/common/print.png"/>
                    打印
                </div>
                <div class="action-btn">
                    <img style="margin: 8px 6px;" alt="export" src="../../../assets/common/export.png"/>
                    导出
                </div>
            </div>
            <Table center :columns="columns" :data="tableData" @on-selection-change="selectChange"></Table>
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
                    :width="1200"
                    footer-hide
            >
                <div style="display: flex">
                    <div style="width: 320px;">
                        <img src="../../../assets/medicalExamination/peoson.png"/>
                        <div class="report-title">{{analyzeInfo.name}}数据报告分析</div>
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
                req: {
                    year_star: '',
                    year_end: '',
                    year: '-1',
                    area_id1: '-1',
                    area_id2: '-1',
                    dep_id: '-1',
                    grade_no: '-1',
                    class_no: '-1',
                    student_name: ''
                },
                tableData: [],
                select: [],
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
                        width: 70,
                        title: '序号',
                    },
                    {
                        title: '姓名',
                        width: 100,
                        key: 'student_name',
                    },
                    {
                        title: '报告总结',
                        key: 'health_guide',
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render(h, params) {
                            return h('span', {1: '正常', 2: '异常'}[params.row.state]);
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
                yearList: [],
                areaList1: [],
                areaList: [],
                schoolList: [],
                gradeList: [],
                classList: [],
                modalTitle: '',
                flag: false,
                id: '',
                modal: false,
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
                let start = 2018;
                let today = new Date().getFullYear();
                let m = today - start;
                let temp = [];
                for (let i = 0; i <= m; i++) {
                    temp.push({
                        value: start+i,
                        name: `${start + i}-${start + i + 1}`
                    });
                }
                this.yearList = temp.reverse();

                /// ===========获取下拉列表查询条件
                this.$ajax({ // 区域列表
                    url: urls.area_all_list,
                    data: {}
                }).then(data => {
                    if (data.code === 200) {
                        this.areaList = data.data.filter((item) => {
                            return item.type === 2;
                        });
                    } else {
                        this.areaList = [];
                    }
                }).catch(err => {
                    this.areaList = [];
                });

                this.$ajax({
                    // 学校
                    url: urls.dept_all_list,
                    data: {}
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.schoolList = data.data.filter((item) => {
                                return item.type === 2;
                            });
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
            schoolChange(value) {
                this.req.grade_no = '-1';
                this.req.class_no = '-1';
                this.classList = [];
                if (value === '-1') {
                    this.gradeList = [];
                    return;
                }
                /// =========== 所属年级
                this.$ajax({
                    url: urls.dictm_all_list,
                    data: {
                        'category_id': '82649A1FDF4DEA7EE050007F01001901',
                        'status': 1
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.gradeList = data.data;
                    } else {
                        this.gradeList = [];
                    }
                }).catch(err => {
                    this.gradeList = [];
                });
            },
            gradeChange(value) {
                this.req.class_no = '-1';
                if (value === '-1') {
                    this.classList = [];
                    return false;
                }
                this.$ajax({
                    url: urls.class_all_lists,
                    data: {
                        dep_id: this.req.dep_id,
                        year: this.req.year === '-1' ? null : this.req.year,
                        grade_no: this.req.grade_no ? this.req.grade_no : null
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.classList = data.data;
                    } else {
                        this.classList = [];
                    }
                });
            },
            initSearch(){
                this.pageConfig.page = 1;
                this.search();
            },
            search() {
                this.$ajax({
                    url: urls.elec_list,
                    data: {
                        page: this.pageConfig.page,
                        size: this.pageConfig.size,
                        year_star: this.req.year ? this.req.year : null,
                        year_end: this.req.year ? this.req.year + 1 : null,
                        area_id1: this.req.area_id1 === '-1' ? null : this.req.area_id1,
                        area_id2: this.req.area_id2 === '-1' ? null : this.req.area_id1,
                        dep_id: this.req.dep_id === '-1' ? null : this.req.dep_id,
                        student_name: this.req.student_name ? this.req.student_name : null,
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
            selectChange(value) {
                this.select = value;
            },
            areaChange(value) {
                this.req.area_id2 = '-1';
                this.$ajax({ // 区
                    url: urls.area_all_list,
                    data: {}
                }).then(data => {
                    if (data.code === 200) {
                        this.areaList1 = data.data.filter(function (item) {
                            return item.type === 3 && item.pid === value;
                        });
                    } else {
                        this.areaList1 = [];
                    }
                }).catch(err => {
                    this.areaList1 = [];
                });
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
                this.modal = true;
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
