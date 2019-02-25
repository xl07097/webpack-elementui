<template>
    <div>
        <div class="content-box">
            <div class="title">
                体检排程
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
                <FormItem label="医疗机构名称" :label-width="102">
                    <Select style="width:200px" filterable v-model="filterForm.unit_id">
                        <Option value="">全部</Option>
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
            <div class="btn-box" style="margin: 6px"></div>
            <Table :columns="columns" :data="scheduleList"></Table>
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
                :transfer="false"
                :styles="{top: '140px',width:'800px'}"
                ok-text="保存"
                :footer-hide="footer_hide"
                @on-cancel="addFormClose"
                @on-ok="addFormSubmit"
        >
            <Form inline :model="scheduleFormData" label-position="top" class="modal-form" ref="add_form">
                <FormItem label="体检年份" prop="year" style="margin-right: 26px !important;">
                    <DatePicker v-model="scheduleFormData.year" type="year" placeholder="请选择"
                                disabled
                                style="width: 140px" :options="dateOpts"></DatePicker>
                </FormItem>
                <FormItem label="体检类型" style="margin-right: 90px!important;" prop="exam_type">
                    <Select v-model="scheduleFormData.exam_type" style="width:140px;"
                            disabled>
                        <Option :value="1" :key="1">健康体检</Option>
                        <Option :value="2" :key="2">升学体检</Option>
                    </Select>
                </FormItem>
                <FormItem label="医疗机构名称" style="margin-right: 0 !important;" prop="unit_id">
                    <Input style="width:310px" v-model="scheduleFormData.hospital" disabled/>
                </FormItem>
                <FormItem label="体检计划代号" prop="code">
                    <Input style="width:310px" v-model="scheduleFormData.code" disabled/>
                </FormItem>
            </Form>
            <Table :columns="school_columns" :data="schoolDataList" size="small" height="300"
                   style="margin-bottom: 40px;"></Table>
        </Modal>
        <div class="transparent-mask" v-show="addSchoolModal"></div>
        <Modal
                title="排程"
                :loading="addSchoolLoading"
                :mask="false"
                :transfer="false"
                v-model="addSchoolModal"
                :styles="{top: '300px',width:'562px',zIndex:2000}"
                @on-ok="planInfoToTable"
                @on-cancel="addSchoolClose"
        >
            <Form inline ref="plan_info_form" :model="planInfo" label-position="top" class="modal-form-min"
                  :rules="scheduleFormRuleValidate">
                <FormItem label="体检学校" prop="school_id">
                    <Input style="width:200px" v-model="planInfo.school_name" disabled/>
                </FormItem>
                <FormItem label="体检年级" prop="grade_id">
                    <Input style="width:200px" v-model="planInfo.grade_name" disabled/>
                </FormItem>
                <FormItem label="体检班级" prop="class_id">
                    <Input style="width:200px" v-model="planInfo.class_name" disabled/>
                </FormItem>
                <FormItem label="体检人数" prop="population">
                    <Input style="width:200px" v-model="planInfo.population" disabled/>
                </FormItem>
                <FormItem label="体检时间" prop="exam_time" style="width:89%">
                    <DatePicker type="datetimerange" placement="bottom-end" v-model="planInfo.exam_time"
                                style="width: 280px">
                    </DatePicker>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
    import Urls from '../../../service/Urls';

    export default {
        name: 'schedule',
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
                        title: '体检计划代号',
                        key: 'code'
                    }, {
                        title: '体检年份',
                        key: 'year'
                    }, {
                        title: '体检类型',
                        key: 'exam_type',
                        render(h, params) {
                            return h('span', {1: '健康体检', 2: '升学体检'}[params.row.exam_type]);
                        }
                    }, {
                        title: '医疗机构名称',
                        key: 'hospital'
                    }, {
                        title: '体检计划状态',//1新建2已排程
                        key: 'state',
                        render(h, params) {
                            return h('span', {1: '新建', 2: '已排程'}[params.row.state]);
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
                                            this.doSchedule(params.row.id);
                                        }
                                    }
                                }, [
                                    h('img', {
                                        style: {
                                            marginRight: '8px'
                                        },
                                        attrs: {
                                            src: require('../../../assets/medicalExamination/schedule.png')
                                        }
                                    }),
                                    h('span', {
                                        style: {
                                            position: 'relative',
                                            top: '-4px'
                                        }
                                    }, '排程')
                                ])
                            ]);
                        }
                    }
                ],
                scheduleList: [],
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
                        key: 'school_name',
                        width: 120
                    }, {
                        title: '年级',
                        key: 'grade_name'
                    }, {
                        title: '班级',
                        key: 'class_name',
                        width: 50
                    }, {
                        title: '人数',
                        key: 'population',
                        width: 40
                    }, {
                        title: '体检时间',
                        key: 'exam_time',
                        width: 140,
                        render: (h, params) => {
                            if(params.row.exam_time){
                                let dateRange = params.row.exam_time.split('-');
                                return h('div', {}, [
                                    h('div', {}, this.util.formatDateTime(dateRange[0])),
                                    h('div', {
                                        style: {
                                            textAlign: 'center',
                                            height: '5px',
                                            lineHeight: '2px'
                                        }
                                    }, '-'),
                                    h('div', {}, this.util.formatDateTime(dateRange[1])),
                                ]);
                            }else{
                                return h('span', {}, '');
                            }
                        }
                    }, {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
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
                            return h('span', {}, [editBtn]);
                        }
                    }
                ],
                filterForm: {
                    page: 1,
                    size: 10
                },
                scheduleFormData: {
                    id: '',
                    year: null,
                    exam_type: 0,
                    unit_id: 0,
                    code: '',
                    hospital: ''
                },
                planInfo: {
                    id: '',
                    class_id: '',
                    class_name: '',
                    population: '',
                    school_id: '',
                    school_name: '',
                    grade_id: '',
                    grade_name: '',
                    team_id: '',
                    exam_time: [],
                },
                isDetail: false,
                isSchedule: false,
                school_list: [],
                hospital_list: [],
                team_list: [],
                schoolDataList: [],
                scheduleFormRuleValidate: {
                    team_id: [
                        {required: true, message: '请选择体体检队伍', trigger: 'change'}
                    ],
                    exam_time: [
                        {required: true, message: '请选择体检时间', type: 'array', trigger: 'change'}
                    ]
                },
                footer_hide: false,
                actionEle: {},//备份详情中操作项，关闭详情后恢复
                row_index: -1,
            };
        },
        mounted() {
            this.getList();
            this.getUnitList();//医院
        },
        methods: {
            getList() {
                let filterInfo = Object.assign({}, this.filterForm);
                if (filterInfo.year) {
                    filterInfo.year = filterInfo.year.getFullYear();
                }else {
                    filterInfo.year = null;
                }
                this.$ajax({
                    url: Urls.schedule_list,
                    data: filterInfo
                }).then((res) => {
                    if (res && res.data) {
                        this.scheduleList = res.data;
                    }
                });
            },
            getDetail(id) {
                this.$ajax({
                    url: Urls.schedule_detail,
                    data: {
                        id: id
                    }
                }).then((res) => {
                    if (res && res.data) {
                        for (let k in this.scheduleFormData) {
                            this.scheduleFormData[k] = res.data[k];
                        }
                        this.schoolDataList = res.data.children;
                    }
                });
            },
            getUnitList() {
                this.$ajax({
                    url: Urls.unit_opt_list,
                    data: {
                        type: 3,
                        status: 1
                    }
                }).then((res) => {
                    if (res && res.data) {
                        this.hospital_list = res.data;
                    }
                });
            },
            getTeamList() {
                this.$ajax({
                    url: Urls.examination_team_list,
                    data: {
                        page: 1,
                        size: 999
                    }
                }).then((res) => {
                    if (res && res.data) {
                        this.team_list = res.data;
                    }
                });
            },
            teamSelected(opt) {
                if (!opt) {
                    return;
                }
                this.planInfo.team_id = opt.value;
                this.planInfo.team_name = opt.label;
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
            doSchedule(id) {
                this.addFormTitle = '体检计划排程';
                this.addFormVisible = true;
                this.isSchedule = true;
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
                        return;
                    }
                });
            },
            addFormClose() {
                if (this.isDetail) {
                    this.isDetail = false;
                    this.footer_hide = false;
                    this.school_columns.push(this.actionEle);//恢复操作项
                }
                this.isSchedule = false;
                this.addFormVisible = false;
                this.schoolDataList = [];
                this.$refs.add_form.resetFields();
            },
            planInfoToTable() {
                this.addSchoolLoading = false;
                this.$nextTick(() => {
                    this.addSchoolLoading = true;
                });
                let that = this;
                this.$refs.plan_info_form.validate((valid) => {
                    if (valid) {
                        let s_data = Object.assign({}, this.planInfo);//备份表单数据
                        s_data.exam_time = s_data.exam_time[0].valueOf() + '-' + s_data.exam_time[1].valueOf();
                        that.$set(that.schoolDataList, this.row_index, s_data);
                        that.$forceUpdate();
                        that.addSchoolModal = false;
                        that.addSchoolLoading = false;
                        that.$nextTick(() => {
                            this.addSchoolLoading = true;
                        });
                        that.$refs.plan_info_form.resetFields();
                    }
                });
            },
            addSchoolClose() {
                this.row_index = -1;
                this.$refs.plan_info_form.resetFields();
            },
            //添加，表单提交
            addFormSubmit() {
                this.loading = false;
                this.$nextTick(() => {
                    this.loading = true;
                });
                let objectInfoList = this.schoolDataList.map((item) => {
                    return {
                        'id': item.id,//体检对象id
                        'exam_time': item.exam_time,//体检开始时间-体检结束时间
                        'team_id': item.team_id//体检队伍
                    };
                });

                this.$ajax({
                    url: Urls.schedule_req,
                    data: {
                        'planInfo': {
                            'id': this.scheduleFormData.id//体检计划id
                        },
                        'objectInfoList': objectInfoList
                    }
                }).then(() => {
                    this.$Message.success('添加成功');
                    this.addFormVisible = false;
                    this.loading = false;
                    this.$nextTick(() => {
                        this.loading = true;
                    });
                    this.getList();
                });
            },
            //编辑体检配置相关的学校信息
            editSchoolInfo(row) {
                this.row_index = row._index;//保存编辑的行
                this.addSchoolModal = true;
                this.getTeamList();
                for (let key in  this.planInfo) {
                    this.planInfo[key] = row[key];
                }
                if(this.planInfo.exam_time){
                    let dateRange = this.planInfo.exam_time.split('-');
                    this.planInfo.exam_time = [new Date(parseInt(dateRange[0])), new Date(parseInt(dateRange[1]))];
                }
            }
        }
    };
</script>
<style lang="scss" scoped>

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
<style>
    .ivu-modal-no-mask {
        z-index: 1999 !important;
    }
</style>
