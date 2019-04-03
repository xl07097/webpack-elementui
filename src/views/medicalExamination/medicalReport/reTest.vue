<template>
    <div>
        <div class="content-box retest">
            <div class="title">
                校医复测
            </div>
            <Form v-model="req" inline :label-width="50">
                <FormItem label="学校">
                    <i-select style="width:180px" v-model="req.dep_id" @on-change="schoolChange">
                        <i-option value="-1">全部</i-option>
                        <Option v-for="item in schoolList" :value="item.id" :key="item.id">{{item.name}}</Option>
                    </i-select>
                </FormItem>
                <FormItem label="年级">
                    <i-select style="width:140px" v-model="req.grade_no" @on-change="gradeChange">
                        <i-option value="-1">全部</i-option>
                        <Option v-for="item in gradeList" :value="item.id" :key="item.id">{{item.value}}</Option>
                    </i-select>
                </FormItem>
                <FormItem label="班级">
                    <i-select style="width:120px" v-model="req.class_no" @on-change="classChange">
                        <i-option value="-1">全部</i-option>
                        <Option v-for="item in classList" :value="item.id" :key="item.id">{{item.class_no}}</Option>
                    </i-select>
                </FormItem>
                <FormItem label="学生姓名" :label-width="80">
                    <i-select style="width:120px" v-model="req.student_name">
                        <i-option value="-1">全部</i-option>
                        <Option v-for="item in studentList" :value="item.id" :key="item.id">{{item.name}}</Option>
                    </i-select>
                </FormItem>
                <FormItem style="float: right;">
                    <Button type="primary" class="search-btn" @click="initSearch()">查询</Button>
                </FormItem>
            </Form>
            <Divider dashed/>
            <Table ref="selection" :columns="columns" :data="tableData"></Table>
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
        </div>
        <component :title="modalTitle" :is='com' :id='id' :flag="flag" @modal-close='ModalClose'></component>
        <Modal
                title="学校班级人数审核"
                v-model="modal"
                :mask-closable="false"
                :width="800"
        >
            <Form inline :model="addFormData" label-position="top" class="modal-form">
                <FormItem label="学校名称">
                    <Input style="width:340px" v-model="addFormData.code" disabled/>
                </FormItem>
                <FormItem label="学年">
                    <Input style="width:340px" v-model="addFormData.code" disabled/>
                </FormItem>
                <FormItem label="学期">
                    <Input style="width:340px" v-model="addFormData.code" disabled/>
                </FormItem>
                <FormItem label="年级">
                    <Input style="width:340px" v-model="addFormData.code" disabled/>
                </FormItem>
                <FormItem label="班级">
                    <Input style="width:340px" v-model="addFormData.code" disabled/>
                </FormItem>
                <FormItem label="人数">
                    <Input style="width:340px" v-model="addFormData.code" disabled/>
                </FormItem>
                <FormItem label="">
                    <div>
                        <span style="display:inline-block;color: #666666;font-size:14px;font-weight:bold;margin-right: 28px">体检计划状态</span>
                        <RadioGroup>
                            <Radio label="1" checked>通过</Radio>
                            <Radio label="2">驳回</Radio>
                        </RadioGroup>
                    </div>
                </FormItem>
                <FormItem label="驳回理由" style="width:96%;margin-top: 10px">
                    <Input type="textarea" :rows="4" v-model="addFormData.reason" style="height: 98px!important;"/>
                </FormItem>
            </Form>

        </Modal>
    </div>
</template>
<script>
    import urls from '../../../service/Urls';
    import physicalReportInfo from './physicalReportInfo';

    export default {
        name: 'reTest',
        data() {
            return {
                req: {
                    page: 1,
                    size: 10,
                    student_name: '-1'
                },
                tableData: [],
                columns: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 60,
                        align: 'center'
                    }, {
                        title: '年级',
                        key: 'grade_no'
                    }, {
                        title: '班级',
                        key: 'class_no'
                    }, {
                        title: '学生姓名',
                        key: 'student_name'
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    },
                    {
                        title: '操作',
                        key: 'action',
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
                                            this.infos(params.row);
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
                                    }, '编辑')
                                ])
                            ]);
                        }
                    }
                ],
                modal: false,
                addFormData: {
                    cost_code_id: '',
                    require_pay_date: '',
                    pay_amount: 0,
                    remark: '',
                    reviewRemark: ''
                },
                id: '',
                com: null,
                modalTitle: '',
                flag: false,
                schoolList: [],
                gradeList: [],
                classList: [],
                studentList: [],
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
            classChange(value) {

            },
            initSearch() {
                this.pageConfig.page = 1;
                this.search();
            },
            search() {
                this.$ajax({
                    url: urls.set_objects_list,
                    data: {}
                }).then((res) => {
                    if (res && res.data) {
                        this.tableData = res.data;
                    }
                });
            },
            doReview() {
                this.modal = true;
            },
            delete() {
                this.$alert('删除~');
            },
            infos(id) {
                this.com = physicalReportInfo;
                this.id = id;
                this.flag = true;
                this.modalTitle = '详情页';
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
            // this.search();
        }
    };
</script>
<style lang="less">
    .retest {
        min-height: 500px;
        .ivu-form .ivu-form-item {
            margin-right: 30px !important;
        }

        .modal-form .ivu-form-item {
            margin-right: 30px !important;
        }

        .ivu-select-disabled .ivu-select-selection,
        .ivu-input[disabled],
        fieldset[disabled] .ivu-input {
            color: #515a6e;
        }

        .ivu-divider {
            margin: 0 0 24px 0;
        }

        .disabled span {
            color: #999999;
        }

        .editBtn:hover {
            opacity: 0.8;
        }

        .page {
            margin-top: 24px;
            text-align: center;
        }
    }
</style>
