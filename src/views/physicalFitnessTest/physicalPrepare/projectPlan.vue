<template>
    <div class="projectPlanManage">
        <div class="content-box clearfix">
            <div class="title">
                体测项目规划
            </div>
            <Form ref="formInline" :model="formInline" inline style="margin-top: 34px;">
                <FormItem label="年级" :label-width="72">
                    <Select v-model="formInline.grade_id" style="width:140px">
                        <Option value="1">初一</Option>
                        <Option value="2">初二</Option>
                        <Option value="3">初三</Option>
                    </Select>
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
                <div class="action-btn" @click="addRole">
                    <img style="margin: 8px 6px;" src="../../../assets/system/role/add.png"/>
                    新增
                </div>
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
        <!-- 新增修改 -->
        <Modal
                class="dicInfoAddModal"
                :title="addtitle"
                v-model="addModal"
                :mask-closable="false"
                width='562'
                :styles="{top: '20px'}"
                @on-cancel="closeaddModal"
                class-name="vertical-center-modal">
            <Form ref="addFormValidate" :model="addForm" label-position="top" :rules="addFormValidate">
                <Row>
                    <Col span="12" class="leftFormItem">
                        <FormItem label="年级" prop="grade">
                            <Select multiple v-model="addForm.grade">
                                <Option v-for="item in gradeList" :value="item.id" :key="item.id">{{ item.name
                                    }}
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12" class="rightFormItem">
                        <FormItem label="性别" prop="sex">
                            <Select v-model="addForm.sex">
                                <Option v-for="item in sexTypeList" :value="item.id" :key="item.id">{{ item.name
                                    }}
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12" class="leftFormItem">
                        <FormItem label="项目" prop="projectName">
                            <Select v-model="addForm.projectName">
                                <Option v-for="item in projectList" :value="item.id" :key="item.id">{{ item.name
                                    }}
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12" class="rightFormItem">
                        <FormItem label="分值" prop="point">
                            <InputNumber v-model="addForm.point"></InputNumber>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div class="footer">
                <i-button class="close" type='default' @click='closeaddModal'>取消</i-button>
                <i-button class="confirm" type="primary" @click='confirmaddModal'>保存</i-button>
            </div>
        </Modal>

    </div>
</template>
<script>
    export default {
        props: [''],
        data() {
            return {
                addModal: false,
                rightModal: false,
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
                        key: 'sex'
                    },
                    {
                        title: '分值',
                        key: 'point'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            let statusShow = params.row.status === 0 ? '禁用' : '启用';
                            return h('div', [
                                h('i-switch', {
                                    props: {
                                        type: 'primary',
                                        value: params.row.status === 1
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        'on-change': value => {
                                            alert('状态');
                                        }
                                    }
                                }),
                                h(
                                    'span',
                                    {
                                        style: {
                                            marginRight: '5px'
                                        }
                                    },
                                    statusShow
                                )
                            ]);
                        }
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {src: require('../../../assets/system/role/edit.png')},
                                    style: {
                                        display: 'inline-block',
                                        width: '20px',
                                        height: '20px',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.editRole();
                                        }
                                    }
                                }),
                                h(
                                    'span',
                                    {
                                        style: {
                                            position: 'relative',
                                            top: '-3px',
                                            left: '5px',
                                            cursor: 'pointer',
                                        },
                                        on: {
                                            click: () => {
                                                this.editRole();
                                            }
                                        }
                                    },
                                    '编辑'
                                )
                            ]);
                        }
                    }
                ],
                tableData: [
                    {
                        grade: '一年级、二年级',
                        sex: '男',
                        remark: '项目1',
                        point: 95,
                        status: 1
                    },
                    {
                        grade: '一年级、二年级',
                        sex: '男',
                        remark: '项目1',
                        point: 95,
                        status: 1
                    },
                    {
                        grade: '一年级、二年级',
                        sex: '男',
                        remark: '项目1',
                        point: 95,
                        status: 2
                    },
                    {
                        grade: '一年级、二年级、三年级',
                        sex: '女',
                        remark: '项目2',
                        point: 90,
                        status: 2
                    },
                ],
                gradeList: [{name: '类别1', id: '1'}, {name: '类别2', id: '2'}, {name: '类别3', id: '3'}],
                projectList: [{name: '项目1', id: '1'}, {name: '项目2', id: '2'}, {name: '项目333', id: '3'}],
                sexTypeList: [{name: '男', id: '1'}, {name: '女', id: '2'}],
                filterForm: {
                    page: 1,
                    size: 10
                },
                addForm: {
                    projectName: '',
                    grade: '',
                    sex: '',
                    point: null,
                },
                addFormValidate: {
                    grade: [
                        {required: true, type: 'array', message: '请选择年级', trigger: 'change'}
                    ],
                    sex: [
                        {required: true, message: '请选择性别', trigger: 'change'},
                    ],
                    projectName: [
                        {required: true, message: '请选择项目', trigger: 'change'}
                    ],
                    point: [
                        {required: true, type: 'number', message: '请输入分数', trigger: 'blur'},

                    ],
                },
            };
        },
        methods: {
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
            addRole() {
                this.addtitle = '新增';
                this.addModal = true;
            },
            setRight() {
                this.rightModal = true;
            },
            Search() {
                alert('查询');
            },
            editRole() {
                this.addtitle = '修改';
                this.addModal = true;
            },
            closeaddModal() {
                this.$refs['addFormValidate'].resetFields();
                this.addModal = false;
            },
            confirmaddModal() {
                this.$refs['addFormValidate'].validate((valid) => {
                    if (valid) {
                        this.$Message.success('操作成功!');
                        this.addModal = false;
                    } else {
                        return;
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
        }
    };
</script>
<style lang="scss">
    .dicInfoAddModal {
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

    .projectPlanManage {
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
