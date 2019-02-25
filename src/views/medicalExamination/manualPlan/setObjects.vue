<template>
    <div>
        <div class="content-box">
            <div class="title">
                设定体检对象
            </div>
            <Form v-model="filterForm" inline style="margin-top: 34px;" :label-width="72">
                <FormItem label="体检年份">
                    <DatePicker type="year" v-model="filterForm.year" :options="dateOpts" placeholder="请选择"
                                style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem label="体检类型">
                    <Select style="width:140px" v-model="filterForm.exam_type">
                        <Option value="">全部</Option>
                        <Option :value="1">健康体检</Option>
                        <Option :value="2">升学体检</Option>
                    </Select>
                </FormItem>
                <FormItem label="体检医院">
                    <Select style="width:280px" filterable v-model="filterForm.unit_id">
                        <Option v-for="item in hospital_list" :value="item.id" :key="item.id">{{item.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="体检计划代号" :label-width="102">
                    <Input v-model="filterForm.code"/>
                </FormItem>
                <FormItem style="float: right;">
                    <Button type="primary" class="search-btn" @click="getList()">查询</Button>
                </FormItem>
            </Form>
            <div class="divider"/>
            <div class="btn-box">
                <div class="action-btn" @click="addObject">
                    <img style="margin: 8px 6px;" src="../../../assets/common/add.png"/>
                    新增
                </div>
            </div>
            <Table :columns="columns" :data="objectList"></Table>
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
        <Modal
                :title="addFormTitle"
                v-model="addFormVisible"
                :loading="loading"
                :mask-closable="false"
                :styles="{top: '140px',width:'800px'}"
                ok-text="保存"
                :footer-hide="footer_hide"
                @on-cancel="addFormClose"
                @on-ok="addFormSubmit"
        >
            <Form inline :model="addFormData" label-position="top" class="modal-form" ref="add_form"
                  :rules="addFormRuleValidate">
                <FormItem label="体检年份" prop="year" style="margin-right: 26px !important;">
                    <DatePicker v-model="addFormData.year" type="year" placeholder="请选择" :disabled="isDetail"
                                style="width: 140px" :options="dateOpts"></DatePicker>
                </FormItem>
                <FormItem label="体检类型" style="margin-right: 90px!important;" prop="exam_type">
                    <Select v-model="addFormData.exam_type" style="width:140px;" :disabled="isDetail">
                        <Option :value="1" :key="1">健康体检</Option>
                        <Option :value="2" :key="2">升学体检</Option>
                    </Select>
                </FormItem>
                <FormItem label="体检医院" style="margin-right: 0 !important;" prop="unit_id">
                    <Select v-model="addFormData.unit_id" style="width:310px" :disabled="isDetail" filterable>
                        <Option v-for="item in hospital_list" :value="item.id" :key="item.id">{{item.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="体检计划代号" prop="code">
                    <Input style="width:310px" v-model="addFormData.code" :disabled="isDetail"/>
                </FormItem>
            </Form>
            <div class="btn-box" style="margin: 6px">
                <div class="action-btn" @click="addSchool" v-if="!this.isDetail">
                    <img style="margin: 8px 6px;" src="../../../assets/common/add.png"/>
                    新增
                </div>
            </div>
            <Table :columns="school_columns" :data="schoolDataList" size="small" height="300"
                   style="margin-bottom: 40px;"></Table>
        </Modal>
        <div class="transparent-mask" v-show="addSchoolModal"></div>
        <Modal
                title="新增"
                :loading="addSchoolLoading"
                :mask="false"
                v-model="addSchoolModal"
                :styles="{top: '300px',width:'562px'}"
                @on-ok="addSchoolDataToTable"
        >
            <Form inline ref="add_school_form" :model="addSchoolData" label-position="top" class="modal-form-min">
                <FormItem label="体检学校" prop="school_id">
                    <Select style="width:200px" @on-change="schoolSelected" v-model="addSchoolData.school_id"
                            filterable label-in-value>
                        <Option v-for="item in school_list" :value="item.id" :key="item.id">{{item.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="体检年级" prop="grade_id">
                    <Select style="width:200px" @on-change="gradeSelected" v-model="addSchoolData.grade_id"
                            label-in-value>>
                        <Option v-for="item in grade_list" :value="item.id" :key="item.id">{{item.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="体检班级" prop="class_id">
                    <Select style="width:200px" @on-change="classSelected" v-model="addSchoolData.class_id"
                            label-in-value>>
                        <Option v-for="item in class_list" :value="item.id" :key="item.id">{{item.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="体检人数" prop="population">
                    <Input style="width:200px" v-model="addSchoolData.population" disabled/>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
    import Urls from '../../../service/Urls';

    export default {
        name: 'setObjects',
        props: [''],
        data() {
            return {
                Urls: Urls,
                addFormVisible: false,
                loading: true,
                addSchoolModal: false,
                addSchoolLoading: true,
                addFormTitle: '',
                dateOpts: {
                    //禁止选择当年之前的年份
                    disabledDate(date) {
                        let d = new Date();
                        return date && date.getFullYear() < d.getFullYear();
                    }
                },
                totalRecords: 0,
                columns: [
                    {
                        title: '序号',
                        width: 60,
                        align: 'center',
                        render: (h, params) => {
                            return h('span', params.index + 1);
                        }
                    }, {
                        title: '体检年份',
                        key: 'year'
                    }, {
                        title: '体检计划代号',
                        key: 'code'
                    }, {
                        title: '体检类型',
                        key: 'exam_type',
                        render(h, params) {
                            return h('span', {1: '健康体检', 2: '升学体检'}[params.row.exam_type]);
                        }
                    }, {
                        title: '体检医院',
                        key: 'hospital'
                    }, {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            return h('div', [
                                h('i-switch', {
                                    props: {
                                        type: 'primary',
                                        value: params.row.status === 1
                                    },
                                    style: {
                                        marginRight: '8px'
                                    },
                                    on: {
                                        'on-change': () => {
                                            this.objectOpera(params.row.id, params.row.status);
                                        }
                                    }
                                }),
                                h('span', params.row.status === 1 ? '启用' : '禁用')
                            ]);
                        }
                    }, {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
                            return h('span', {}, [
                                h('span', {
                                    attrs: {
                                        class: 'editBtn'
                                    },
                                    on: {
                                        click: () => {
                                            this.showDetail(params.row.id);
                                        }
                                    }
                                }, [
                                    h('img', {
                                        style: {
                                            marginRight: '8px'
                                        },
                                        attrs: {
                                            src: require('../../../assets/common/detail.png')
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
                                    on: {
                                        click: () => {
                                            this.editObject(params.row.id);
                                        }
                                    }
                                }, [
                                    h('img', {
                                        style: {
                                            marginRight: '8px'
                                        },
                                        attrs: {
                                            src: require('../../../assets/unit/edit_cover.png')
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
                objectList: [],
                school_columns: [
                    {
                        title: '序号',
                        width: 60,
                        align: 'center',
                        render: (h, params) => {
                            return h('span', params.index + 1);
                        }
                    }, {
                        title: '学校',
                        key: 'school_name'
                    }, {
                        title: '年级',
                        key: 'grade_name'
                    }, {
                        title: '班级',
                        key: 'class_name'
                    }, {
                        title: '人数',
                        key: 'population'
                    }, {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
                            let delBtn = h('span', {
                                attrs: {
                                    class: 'editBtn'
                                },
                                style: {
                                    display: 'inline-block',
                                    cursor: 'pointer',
                                    color: '#FF7200'
                                },
                                on: {
                                    click: () => {
                                        this.deleteSchool(params.row.id, params);
                                    }
                                }
                            }, [
                                h('span', {
                                    style: {
                                        position: 'relative',
                                        top: '-4px'
                                    }
                                }, '删除')
                            ]);

                            let editBtn = h('span', {
                                attrs: {
                                    class: 'editBtn'
                                },
                                on: {
                                    click: () => {
                                        this.editSchoolInfo(params.row);
                                    }
                                }
                            }, [
                                h('span', {
                                    style: {
                                        position: 'relative',
                                        top: '-4px'
                                    }
                                }, '编辑')
                            ]);

                            let btnArr = [];
                            if (this.isEdit) {
                                btnArr = [delBtn];
                            } else {
                                btnArr = [delBtn];
                            }
                            return h('span', {}, btnArr);
                        }
                    }
                ],
                filterForm: {
                    page: 1,
                    size: 10
                },
                addFormData: {
                    year: null,
                    exam_type: 0,
                    unit_id: 0,
                    code: ''
                },
                addSchoolData: {
                    class_id: '',
                    population: '',
                    school_id: '',
                    grade_id: ''
                },
                isDetail: false,
                id: '',
                isEdit: false,
                school_list: [],
                hospital_list: [],
                grade_list: [],
                class_list: [],
                schoolDataList: [],
                addFormRuleValidate: {
                    year: [
                        {required: true, message: '请选择体检年份', type: 'date', trigger: 'change'}
                    ],
                    exam_type: [
                        {required: true, type: 'number', message: '请选择体检类型', trigger: 'change'}
                    ],
                    unit_id: [
                        {required: true, message: '请选择体检医院', trigger: 'change'}
                    ],
                    code: [
                        {required: true, message: '请选择体检计划代号', trigger: 'blur'}
                    ],
                },
                footer_hide: false,
                actionEle: {}//备份详情中操作项，关闭详情后恢复
            };
        },
        mounted() {
            this.getList();
            this.getUnitList(3);//医院
        },
        methods: {
            getList() {
                let filterInfo = Object.assign({}, this.filterForm);
                if(filterInfo.year){
                    filterInfo.year = filterInfo.year.getFullYear();
                }else {
                    filterInfo.year = null;
                }
                this.$ajax({
                    url: Urls.set_objects_list,
                    data: filterInfo
                }).then((res) => {
                    if (res && res.data) {
                        this.objectList = res.data;
                    }
                });
            },
            getDetail(id) {
                this.$ajax({
                    url: Urls.object_detail,
                    data: {
                        id: id
                    }
                }).then((res) => {
                    if (res && res.data) {
                        this.id = res.data.id;
                        for (let k in this.addFormData) {
                            this.addFormData[k] = res.data[k];
                        }
                        this.schoolDataList = res.data.children;
                    }
                });
            },
            getUnitList(type) {
                this.$ajax({
                    url: Urls.unit_opt_list,
                    data: {
                        type: type,
                        status: 1
                    }
                }).then((res) => {
                    if (res && res.data) {
                        if (type == 2) {
                            this.school_list = res.data;
                        } else if (type == 3) {
                            this.hospital_list = res.data;
                        }
                    }
                });
            },
            pageChange(page) {
                this.filterForm.page = page;
                this.getList();
            },
            sizeChange(size) {
                this.filterForm.size = size;
                if (this.filterForm.page === 1) {
                    this.pageChange(1);
                }
            },
            addObject() {
                this.id = '';
                this.addFormTitle = '体检计划新增';
                this.addFormVisible = true;
                this.getUnitList(2);//学校
                // this.getUnitList(3);//医院
            },
            editObject(id) {
                this.isEdit = true;
                this.addObject();
                this.addFormTitle = '体检计划编辑';
                this.getDetail(id);
            },
            showDetail(id) {
                this.addFormTitle = '体检计划详情';
                this.actionEle = this.school_columns.pop();//去掉操作项
                this.footer_hide = true;
                this.addFormVisible = true;
                this.isDetail = true;
                this.getDetail(id);
            },
            deleteSchool(id) {
                this.schoolDataList.forEach((item, index) => {
                    if (item.id == id) {
                        this.schoolDataList.splice(index, 1);
                    }
                });
            },
            addSchool() {
                this.addSchoolModal = true;
            },
            addFormClose() {
                if (this.isDetail) {
                    this.isDetail = false;
                    this.footer_hide = false;
                    this.school_columns.push(this.actionEle);//恢复操作项
                }
                this.isEdit = false;
                this.addFormVisible = false;
                this.schoolDataList = [];
                this.$refs.add_form.resetFields();
            },
            //选择学校后，请求该学校的年级列表
            schoolSelected(opt) {
                if (!opt) {
                    return;
                }
                this.addSchoolData.school_name = opt.label;//保存学校名，table中显示
                //清空已选的年级和班级
                this.addSchoolData.grade_id = '';
                this.addSchoolData.class_id = '';
                this.$ajax({
                    url: Urls.grade_list,
                    data: {
                        id: opt.value
                    }
                }).then((res) => {
                    if (res && res.data) {
                        this.grade_list = res.data;
                    }
                });
            },
            //选择年级后，请求该学校的班级列表
            gradeSelected(opt) {
                if (!opt) {
                    return;
                }
                this.addSchoolData.grade_name = opt.label;//保存年级名，table中显示
                //清空已选的班级
                this.addSchoolData.class_id = '';
                this.$ajax({
                    url: Urls.class_all_list,
                    data: {
                        grade_id: opt.value,
                        school_id: this.addSchoolData.school_id,
                        status: 1
                    }
                }).then((res) => {
                    if (res && res.data) {
                        this.class_list = res.data;
                    }
                });
            },
            //选择班级后，获取该班级人数
            classSelected(opt) {
                if (!opt) {
                    return;
                }
                this.addSchoolData.class_name = opt.label;//保存班级名，table中显示
                let that = this;
                this.$ajax({
                    url: Urls.get_student_count,
                    data: {
                        class_id: opt.value,
                    }
                }).then((res) => {
                    that.addSchoolData.population = res.count;
                });
            },
            addSchoolDataToTable() {
                let s_data = Object.assign({}, this.addSchoolData);//备份表单数据
                this.schoolDataList.push(s_data);
                this.addSchoolModal = false;
                this.addSchoolLoading = false;
                this.$nextTick(() => {
                    this.addSchoolLoading = true;
                });
                this.$refs.add_school_form.resetFields();
            },
            //添加，表单提交
            addFormSubmit() {
                this.loading = false;
                this.$nextTick(() => {
                    this.loading = true;
                });
                this.$refs.add_form.validate((valid) => {
                    if (valid) {
                        this.schoolDataList.forEach((item) => {
                            //删除多余字段
                            delete item.school_name;
                            delete item.grade_name;
                            delete item.class_name;
                        });

                        let planInfo = Object.assign({}, this.addFormData);
                        if(this.id){
                            planInfo.id = this.id;
                        }
                        planInfo.year = planInfo.year.getFullYear();
                        let url = Urls.add_object;
                        if (this.isEdit) {
                            url = Urls.edit_object;
                        }
                        this.$ajax({
                            url: url,
                            data: {
                                planInfo: planInfo,
                                objectInfoList: this.schoolDataList
                            }
                        }).then(() => {
                            if(this.id){
                                this.$Message.success('编辑成功');
                            }else {
                                this.$Message.success('添加成功');
                            }

                            this.addFormVisible = false;
                            this.loading = false;
                            this.$nextTick(() => {
                                this.loading = true;
                            });
                            this.getList();
                        });
                    }
                });
            },
            objectOpera(id, val) {
                val = val === 2 ? 1 : 2;
                this.$ajax({
                    url: Urls.object_opera,
                    data: {
                        id: id,
                        status: val
                    }
                }).then(() => {
                    this.$Message.success('操作成功');
                    this.getList();
                });
            },
            //编辑体检配置相关的学校信息
            editSchoolInfo(row) {
                this.addSchoolModal = true;
                for (let key in  this.addSchoolData) {
                    this.addSchoolData[key] = row[key];
                }
            }
        },
    };
</script>
<style type="scss" scoped>

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

    .modal-form-min {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .modal-form-min .ivu-form-item {
        margin-right: 0 !important;
    }
</style>
