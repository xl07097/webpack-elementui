<template>
    <div class="scoringStandardsManage">
        <div class="content-box clearfix">
            <div class="title">
                体测项目评分标准设置
            </div>
            <Form ref="formInline" :model="formInline" inline style="margin-top: 34px;">
                <FormItem label="项目" :label-width="72">
                    <i-select v-model="formInline.project_id" style="width:160px">
                        <i-option :value="-1">全部</i-option>
                        <i-option v-for="item of projectList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="年级" :label-width="72">
                    <i-select v-model="formInline.grade_id" style="width:160px">
                        <i-option :value="-1">全部</i-option>
                        <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="性别" :label-width="72">
                    <Select v-model="formInline.gender" style="width:140px">
                        <Option :value="1">男</Option>
                        <Option :value="0">女</Option>
                    </Select>
                </FormItem>
                <FormItem style="float: right;">
                    <Button type="primary" class="search-btn" @click="Search()">查询</Button>
                </FormItem>
            </Form>
            <div class="divider"/>
            <div class="btn-box">
            </div>
            <Table ref="selection" :columns="columns" :data="tableData"></Table>
            <Page style="text-align: center;margin-top: 20px;"
                  :total="totalRecords"
                  :current="filterForm.page"
                  show-total
                  show-elevator
                  show-sizer
                  :page-size-opts="[10,20,50,100]"
                  @on-change="pageChange"
                  @on-page-size-change="sizeChange"
            />
        </div>
        <!-- 得分标准 -->
        <Modal
                class="goalModal"
                title="设置得分标准"
                v-model="goalModal"
                :mask-closable="false"
                width='800'
        >
            <Form :model="goalForm" label-position="top" inline>
                <FormItem label="项目" style="margin-right: 90px!important;">
                    <Input v-model="goalForm.projectName" disabled style="width:310px"/>
                </FormItem>
                <FormItem label="年级" style="margin-right: 30px!important;">
                    <Input v-model="goalForm.grade" disabled style="width:140px"/>
                </FormItem>
                <FormItem label="性别" style="margin-right: 0!important;">
                    <Input v-model="goalForm.sex" disabled style="width:140px"/>
                </FormItem>
            </Form>
            <div class="action-btn" @click="addGoal">
                <img style="margin: 8px 6px;" src="../../../assets/system/role/add.png"/>
                <span style="position: relative;top:8px">新增</span>
            </div>
            <Table width="726px" :columns="goalcolumns" :data="goalForm.tableList"></Table>

            <div class="footer">
                <i-button class="close" type='default' @click='closeAddModal'>取消</i-button>
                <i-button class="confirm" type="primary" @click='confirmAddModal'>保存</i-button>
            </div>
        </Modal>
        <!-- 新增修改得分标准 -->
        <Modal
                class="addGoalModal"
                :title="addGoalTitle"
                v-model="addGoalModal"
                :mask-closable="false"
                width='562'
                @on-cancel="closeAddGoalModal"
        >
            <Form ref="addGoalFormValidate" :model="addGoalForm" label-position="top" :rules="addGoalFormValidate">
                <Row>
                    <Col span="12" class="leftFormItem">
                        <FormItem label="下限" prop="floor">
                            <InputNumber v-model="addGoalForm.floor"></InputNumber>
                        </FormItem>
                    </Col>
                    <Col span="12" class="rightFormItem">
                        <FormItem label="上限" prop="upper">
                            <InputNumber v-model="addGoalForm.upper"></InputNumber>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12" class="leftFormItem">
                        <FormItem label="得分" prop="goal">
                            <InputNumber v-model="addGoalForm.goal"></InputNumber>
                        </FormItem>
                    </Col>

                </Row>
            </Form>
            <div class="footer">
                <i-button class="close" type='default' @click='closeAddGoalModal'>取消</i-button>
                <i-button class="confirm" type="primary" @click='confirmAddGoalModal'>确定</i-button>
            </div>
        </Modal>
        <!-- 加分标准 -->
        <Modal
                class="goalModal"
                title="设置得分标准"
                v-model="awardedModal"
                :mask-closable="false"
                width='800'
        >
            <Form :model="awardedForm" label-position="top" inline>
                <FormItem label="项目" style="margin-right: 90px!important;">
                    <Input v-model="awardedForm.projectName" disabled style="width:310px"/>
                </FormItem>
                <FormItem label="年级" style="margin-right: 30px!important;">
                    <Input v-model="awardedForm.grade" disabled style="width:140px"/>
                </FormItem>
                <FormItem label="性别" style="margin-right: 0!important;">
                    <Input v-model="awardedForm.sex" disabled style="width:140px"/>
                </FormItem>
            </Form>
            <div class="action-btn" @click="addAwarded">
                <img style="margin: 8px 6px;" src="../../../assets/system/role/add.png"/>
                <span style="position: relative;top:8px">新增</span>
            </div>
            <Table width="726px" :columns="awardedcolumns" :data="awardedForm.tableList"></Table>

            <div class="footer">
                <i-button class="close" type='default' @click='closeAwardedModal'>取消</i-button>
                <i-button class="confirm" type="primary" @click='confirmAwardedModal'>保存</i-button>
            </div>
        </Modal>
        <!-- 新增修改加分标准 -->
        <Modal
                class="addGoalModal"
                :title="addAwardedTitle"
                v-model="addAwardedModal"
                :mask-closable="false"
                width='562'
                @on-cancel="closeAddAwardedModal"
        >
            <Form ref="addAwardedFormValidate" :model="addAwardedForm" label-position="top"
                  :rules="addAwardedFormValidate">
                <Row>
                    <Col span="12" class="leftFormItem">
                        <FormItem label="加分" prop="awarded">
                            <InputNumber v-model="addAwardedForm.awarded"></InputNumber>
                        </FormItem>
                    </Col>
                    <Col span="12" class="rightFormItem">
                        <FormItem label="数值" prop="value">
                            <InputNumber v-model="addAwardedForm.value"></InputNumber>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div class="footer">
                <i-button class="close" type='default' @click='closeAddAwardedModal'>取消</i-button>
                <i-button class="confirm" type="primary" @click='confirmAddAwardedModal'>确定</i-button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import urls from '../../../service/Urls';

    export default {
        props: [''],
        data() {
            return {
                goalModal: false,
                addGoalModal: false,
                awardedModal: false,
                addAwardedModal: false,
                addGoalTitle: '新增',
                addAwardedTitle: '新增',
                addNum: 0,
                addtitle: '',
                formInline: {
                    dictionaryName: '',
                    status: ''
                },
                totalRecords: 0,
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '序号',
                        type: 'index'
                    },
                    {
                        title: '年级',
                        key: 'grade'
                    },
                    {
                        title: '性别',
                        key: 'gender',
                        render: (h,params) => {
                            return h('span',params.row.gender === 1?'男':'女')
                        }
                    },
                    {
                        title: '分值',
                        key: 'point'
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {src: require('../../../assets/physicalFitnessTest/physicalPrepare/goal.png')},
                                    style: {
                                        display: 'inline-block',
                                        width: '20px',
                                        height: '20px',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.setGoal();
                                        }
                                    }
                                }),
                                h(
                                    'span',
                                    {
                                        style: {
                                            position: 'relative',
                                            top: '-4px',
                                            left: '5px',
                                            cursor: 'pointer',

                                        },
                                        on: {
                                            click: () => {
                                                this.setGoal();
                                            }
                                        }
                                    },
                                    '设置得分标准'
                                ),
                                h('img', {
                                    attrs: {src: require('../../../assets/physicalFitnessTest/physicalPrepare/awarded_marks.png')},
                                    style: {
                                        display: 'inline-block',
                                        width: '20px',
                                        height: '20px',
                                        cursor: 'pointer',
                                        marginLeft: '60px'
                                    },
                                    on: {
                                        click: () => {
                                            this.setAwarded();
                                        }
                                    }
                                }),
                                h(
                                    'span',
                                    {
                                        style: {
                                            position: 'relative',
                                            top: '-4px',
                                            left: '5px',
                                            cursor: 'pointer',
                                        },
                                        on: {
                                            click: () => {
                                                this.setAwarded();
                                            }
                                        }
                                    },
                                    '设置加分标准'
                                ),
                            ]);
                        }
                    }
                ],
                tableData: [
                    {
                        grade: '一年级、二年级',
                        gender: 1,
                        remark: '项目1',
                        point: 95,
                    },
                    {
                        grade: '一年级、二年级',
                        gender: 1,
                        remark: '项目1',
                        point: 95,
                    },
                    {
                        grade: '一年级、二年级',
                        gender: 1,
                        remark: '项目1',
                        point: 95,
                    },
                    {
                        grade: '一年级、二年级、三年级',
                        gender: 0,
                        remark: '项目2',
                        point: 90,
                    },
                ],
                gradeList: [],
                projectList: [],
                goalcolumns: [{
                    title: '序号',
                    type: 'index'
                }, {
                    title: '得分',
                    key: 'goal'
                }, {
                    title: '下限',
                    key: 'floor'
                }, {
                    title: '上限',
                    key: 'upper'
                }, {
                    title: '操作',
                    key: 'operation',
                    render: (h, params) => {
                        return h('div', [
                            h(
                                'span',
                                {
                                    style: {
                                        cursor: 'pointer',
                                        color: '#518783',
                                    },
                                    on: {
                                        click: () => {
                                            this.editGoal(params.index);
                                        }
                                    }
                                },
                                '编辑'
                            ),
                            h(
                                'span',
                                {
                                    style: {
                                        cursor: 'pointer',
                                        color: '#FF7200',
                                        marginLeft: '37px',
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteGoal(params.index);
                                        }
                                    }
                                },
                                '删除'
                            )
                        ]);
                    }
                }
                ],
                awardedcolumns: [{
                    title: '序号',
                    type: 'index'
                }, {
                    title: '加分',
                    key: 'awarded'
                }, {
                    title: '数值',
                    key: 'value'
                }, {
                    title: '操作',
                    key: 'operation',
                    render: (h, params) => {
                        return h('div', [
                            h(
                                'span',
                                {
                                    style: {
                                        cursor: 'pointer',
                                        color: '#518783',
                                    },
                                    on: {
                                        click: () => {
                                            this.editAwarded(params.index);
                                        }
                                    }
                                },
                                '编辑'
                            ),
                            h(
                                'span',
                                {
                                    style: {
                                        cursor: 'pointer',
                                        color: '#FF7200',
                                        marginLeft: '37px',
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteAwarded(params.index);
                                        }
                                    }
                                },
                                '删除'
                            )
                        ]);
                    }
                }
                ],
                addGoalForm: {floor: null, upper: null, goal: null},
                addAwardedForm: {awarded: null, value: null},
                filterForm: {
                    page: 1,
                    size: 10
                },
                goalForm: {
                    projectName: '项目',
                    grade: '一年级',
                    sex: '男',
                    tableList: [{goal: 100, floor: 20, upper: 30}, {goal: 80, floor: 20, upper: 100}],
                },
                awardedForm: {
                    projectName: '项目',
                    grade: '二年级',
                    sex: '女',
                    tableList: [{awarded: 10, value: 40}, {awarded: 40, value: 60}],
                },
                addGoalFormValidate: {
                    floor: [
                        {required: true, type: 'number', message: '请输入下限', trigger: 'blur'},
                    ],
                    upper: [
                        {required: true, type: 'number', message: '请输入上限', trigger: 'blur'}
                    ],
                    goal: [
                        {required: true, type: 'number', message: '请输入得分', trigger: 'blur'},
                    ],
                },
                addAwardedFormValidate: {
                    awarded: [
                        {required: true, type: 'number', message: '请输入加分', trigger: 'blur'},
                    ],
                    value: [
                        {required: true, type: 'number', message: '请输入数值', trigger: 'blur'}
                    ],
                },
            };
        },
        methods: {
            getSelectCondition() {
                this.$ajax({ // 项目列表
                    url: urls.project_list,
                    data: {
                        'name': null
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.projectList = data.data;
                    } else {
                        this.projectList = [];
                    }
                }).catch(err => {
                    window.console.log(err);
                });

                this.$ajax({ // 年级列表
                    url: urls.grade_all_list,
                    data: {
                        id: '7B887312F9CCE3FEE050007F01001BDF'
                    }
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.gradeList = data.data;
                        } else {
                            this.gradeList = [];
                        }
                    })
                    .catch(err => {
                        window.console.log(err);
                    });
            },
            pageChange(page) {
                this.filterForm.page = page;
                // this.getList();
            },
            sizeChange(size) {
                this.filterForm.size = size;
                if (this.filterForm.page === 1) {
                    this.pageChange(1);
                }
            },

            Search() {
                alert('查询');
            },
            setGoal() {
                this.goalModal = true;
            },
            setAwarded() {
                this.awardedModal = true;
            },
            closeAddModal() {
                window.console.log('取消');
                this.goalModal = false;
            },
            closeAwardedModal() {
                window.console.log('取消');
                this.awardedModal = false;
            },
            confirmAwardedModal() {
                window.console.log('新增');
                this.awardedModal = false;
            },
            confirmAddGoalModal() {
                this.$refs['addGoalFormValidate'].validate((valid) => {
                    if (valid) {
                        let obj = {};
                        obj.floor = this.addGoalForm.floor;
                        obj.goal = this.addGoalForm.goal;
                        obj.upper = this.addGoalForm.upper;
                        if (this.addGoalTitle == '新增') {
                            this.goalForm.tableList.push(obj);
                        } else {
                            this.goalForm.tableList[this.addNum].floor = obj.floor;
                            this.goalForm.tableList[this.addNum].goal = obj.goal;
                            this.goalForm.tableList[this.addNum].upper = obj.upper;
                        }
                        this.$Message.success('Success!');
                        this.addGoalModal = false;
                    } else {
                        this.$Message.error('Fail!');
                        return;
                    }
                });

            },
            closeAddGoalModal() {
                this.$refs['addGoalFormValidate'].resetFields();
                this.addGoalModal = false;
            },
            confirmAddAwardedModal() {
                this.$refs['addAwardedFormValidate'].validate((valid) => {
                    if (valid) {
                        let obj = {};
                        obj.value = this.addAwardedForm.value;
                        obj.awarded = this.addAwardedForm.awarded;
                        if (this.addAwardedTitle == '新增') {
                            this.awardedForm.tableList.push(obj);
                        } else {
                            this.awardedForm.tableList[this.addNum].value = obj.value;
                            this.awardedForm.tableList[this.addNum].awarded = obj.awarded;
                        }
                        this.$Message.success('Success!');
                        this.addAwardedModal = false;
                    } else {
                        this.$Message.error('Fail!');
                        return;
                    }
                });

            },
            closeAddAwardedModal() {
                this.$refs['addAwardedFormValidate'].resetFields();
                this.addAwardedModal = false;
            },
            confirmAddModal() {
                window.console.log('新增');
                this.goalModal = false;
            },
            addGoal() {
                this.addGoalTitle = '新增';
                this.addGoalForm = {floor: null, upper: null, goal: null};
                this.addGoalModal = true;
            },
            addAwarded() {
                this.addAwardedTitle = '新增';
                this.addAwardedForm = {awarded: null, value: null};
                this.addAwardedModal = true;
            },
            editGoal(num) {
                this.addGoalTitle = '修改';
                this.addNum = num;
                let obj = this.goalForm.tableList[num];
                this.addGoalForm.floor = obj.floor;
                this.addGoalForm.goal = obj.goal;
                this.addGoalForm.upper = obj.upper;
                this.addGoalModal = true;
            },
            editAwarded(num) {
                this.addAwardedTitle = '修改';
                this.addNum = num;
                let obj = this.awardedForm.tableList[num];
                this.addAwardedForm.value = obj.value;
                this.addAwardedForm.awarded = obj.awarded;
                this.addAwardedModal = true;
            },
            deleteGoal(num) {
                let messageWarning = '是否删除该得分标准？';
                this.$confirm({
                    text: messageWarning,
                    onOk: () => {
                        this.goalForm.tableList.splice(num, 1);
                    },
                    cancel: () => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    }
                });
            },
            deleteAwarded(num) {
                let messageWarning = '是否删除该得分标准？';
                this.$confirm({
                    text: messageWarning,
                    onOk: () => {
                        this.awardedForm.tableList.splice(num, 1);
                    },
                    cancel: () => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    }
                });
            },
            deleteRole() {
                let messageWarning = '是否删除该字典？';
                this.$confirm({
                    text: messageWarning,
                    onOk: () => {
                        alert('删除');
                    },
                    cancel: () => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    }
                });
            }
        },
        created() {
            this.getSelectCondition();
        }
    };
</script>
<style lang="scss">
    .goalModal {
        .ivu-form-item-label {
            font-size: 14px !important;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(126, 132, 133, 1) !important;
        }
        .ivu-modal-body {
            padding-top: 31px !important;
            height: 500px;
            overflow-y: auto;

            .ivu-table-wrapper {
                height: auto !important;
                width: 726px !important;
                .ivu-table-body {
                    height: auto !important;
                }
            }
        }
        .ivu-btn-primary {
            span {
                position: relative;
                top: -5px;
            }
        }
        .footer {
            margin: 139px 38px 22px 0;
            text-align: right;
            .confirm {
                width: 70px;
                height: 30px;
            }
            .close {
                width: 70px;
                height: 30px;
                margin-right: 28px;
            }
        }
        .ivu-modal-footer {
            display: none;
        }
    }

    .addGoalModal {
        .ivu-input-number,
        .ivu-input-number-input-wrap {
            width: 200px;
        }
        .ivu-form-item-label {
            font-size: 14px !important;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(126, 132, 133, 1) !important;
        }
        .ivu-modal-body {
            padding-top: 31px !important;
            .leftFormItem {
                padding-left: 16px;
                width: 216px;
                .formLabel {
                    font-size: 14px !important;
                    font-family: SourceHanSansCN-Regular;
                    font-weight: 400;
                    color: rgba(126, 132, 133, 1) !important;
                }
            }
            .rightFormItem {
                padding-left: 66px;
                width: 266px;
                .ivu-input-number,
                .ivu-input-number-input-wrap {
                    width: 200px;
                }
            }
        }
        .ivu-btn-primary {
            span {
                position: relative;
                top: -5px;
            }
        }
        .footer {
            margin: 112px 36px 22px 0;
            text-align: right;
            .confirm {
                width: 70px;
                height: 30px;
            }
            .close {
                width: 70px;
                height: 30px;
                margin-right: 28px;
            }
        }
        .ivu-modal-footer {
            display: none;
        }
    }

    .scoringStandardsManage {
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

        }

    }
</style>
