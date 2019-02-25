<template>
    <div>
        <div class="content-box">
            <div class="title">
                设定体检计划
            </div>
            <Form ref="formInline" :model="req" inline style="margin-top: 34px;" :label-width="72">
                <FormItem label="体检年份">
                    <DatePicker type="year" placeholder="请选择" clearable v-model="req.year"
                                style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem label="体检类型">
                    <Select style="width:140px" clearable v-model="req.exam_type">
                        <Option value="1">健康体检</Option>
                        <Option value="2">升学体检</Option>
                    </Select>
                </FormItem>
                <FormItem label="医疗机构名称" :label-width="102">
                    <Select style="width:200px" filterable clearable v-model="req.unit_id">
                        <Option v-for="item in hospitalList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="体检计划代号" :label-width="102">
                    <Input style="width:200px" v-model="req.name"/>
                </FormItem>
                <FormItem style="float: right;">
                    <Button type="primary" class="search-btn" @click="getList()">查询</Button>
                </FormItem>
            </Form>
            <div class="divider"/>
            <div class="btn-box">
                <div class="action-btn" @click="addTeam">
                    <img style="margin: 8px 6px;" src="../../../assets/system/role/add.png"/>
                    新增
                </div>
            </div>
            <Table :highlight-row="true" :columns="columns" :data="objectList"
                   @on-selection-change="selectTable"></Table>
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
                :title="modalTitle"
                v-model="modal"
                :loading="loading"
                :mask-closable="false"
                :styles="{top: '140px',width:'800px'}"
                @on-cancel="addFormClose"
        >
            <Form inline :model="addFormData" label-position="top" class="modal-form" ref="addFormData"
                  :rules="addFormRule">
                <FormItem label="体检计划代号" prop="name">
                    <Input style="width:310px" v-model.trim="addFormData.name" :disabled="isdisabled"/>
                </FormItem>
                <FormItem label="体检机构名称" style="margin-right: 0 !important;" prop="unit_id">
                    <Select v-model="addFormData.unit_id" style="width:310px" filterable :disabled="isdisabled">
                        <Option v-for="item in hospitalList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="体检年份" prop="year" style="margin-right: 26px !important;">
                    <DatePicker v-model="addFormData.year" type="year" placeholder="请选择"
                                style="width: 140px" :options="dateOpts" :disabled="isdisabled"></DatePicker>
                </FormItem>
                <FormItem label="体检类型" prop="exam_type">
                    <Select v-model="addFormData.exam_type" style="width:140px;" @on-change="exam_typeChange"
                            :disabled="isdisabled">
                        <Option :value="1">健康体检</Option>
                        <Option :value="2">升学体检</Option>
                    </Select>
                </FormItem>
            </Form>
            <div id="btn-boxs" style="margin: 0">
                <div class="action-btn" @click="bindDoctor">
                    <img style="margin: 8px 6px;" src="../../../assets/system/role/add.png"/>
                    新增
                </div>
            </div>
            <Table ref="selection1" :columns="project_col" :data="project_data" size="small" height="300"
                   style="margin-bottom: 40px;"></Table>
            <div slot="footer" :style="footShow">
                <button type="button" class="ivu-btn ivu-btn-text ivu-btn-large" @click='addFormClose'>取消</button>
                <button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large" @click='addTeamConfig'>保存</button>
            </div>
        </Modal>
        <div class="transparent-mask" v-show="addDoctorModal"></div>
        <Modal
                title="新增"
                :mask="false"
                :loading="addDoctorLoading"
                v-model="addDoctorModal"
                :styles="{top: '300px',width:'562px'}"
                @on-cancel="teamClose"
                @on-ok="addDoctor"
        >
            <Form inline :model="team" ref="team" label-position="top" :rules="teamRule" class="modal-form-min">
                <FormItem label="体检学校">
                    <Select style="width:200px" v-model="team.doctor" filterable multiple :label-in-value="true"
                            @on-change="v=>{ setOption(v)}">
                        <Option v-for="item in doctorList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="体检班级" prop="doctor">
                    <Select style="width:200px" v-model="team.doctor" filterable multiple :label-in-value="true"
                            @on-change="v=>{ setOption(v)}">
                        <Option v-for="item in doctorList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="体检班级">
                    <Select style="width:200px" v-model="team.doctor" filterable multiple :label-in-value="true"
                            @on-change="v=>{ setOption(v)}">
                        <Option v-for="item in doctorList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="体检人数" prop="doctor">
                    <Input style="width:200px" v-model.trim="team.name" disabled/>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
    import Urls from '../../../service/Urls';

    export default {
        name: 'examinationTeamConfig',
        props: [''],
        data() {
            return {
                disablecolor: {'color': '#515a6e'},
                footShow: 'display:block',
                loading: true,
                addDoctorLoading: true,
                hospitalList: [],
                doctorList: [],
                modal: false,
                isdisabled: false,
                selectDoctorName: '',
                addDoctorModal: false,
                dateOpts: {
                    //禁止选择当年之前的年份
                    disabledDate(date) {
                        let d = new Date();
                        return date && date.getFullYear() < d.getFullYear();
                    }
                },
                team: {
                    k_id: '',
                    name: '',
                    doctor: [],
                },
                deteData: [],
                modalTitle: '',
                req: {
                    page: 1,
                    size: 10,
                    year: '',
                    exam_type: null,
                    unit_id: null,
                    name: null
                },
                totalRecords: 0,
                columns: [{
                    type: 'selection',
                    width: 60,
                    align: 'center'
                }, {
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
                    key: 'name'
                }, {
                    title: '体检类型',
                    key: 'exam_type',
                    render(h, params) {
                        return h('span', {1: '健康体检', 2: '升学体检'}[params.row.exam_type]);
                    }
                }, {
                    title: '体检医院',
                    key: 'unit_name'
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
                                        this.switch(params.row.id, params.row.name, params.row.status);
                                    }
                                }
                            }),
                            h('span', params.row.status === 1 ? '启用' : '禁用')
                        ]);
                    }
                }, {
                    title: '操作',
                    width: 200,
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
                project_col: [
                    {
                        title: '序号',
                        width: 60,
                        align: 'center',
                        render: (h, params) => {
                            return h('span', params.index + 1);
                        }
                    }, {
                        title: '学校',
                        key: 'k_name'
                    }, {
                        title: '年级',
                        key: 'doctor_names'
                    }, {
                        title: '班级',
                        key: 'doctor_names'
                    },
                    {
                        title: '人数',
                        key: 'doctor_names'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
                            return h('span', {
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
                                        this.bindDoctor(params.row);
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
                        }
                    }
                ],
                project_data: [],
                filterForm: {
                    page: 1,
                    size: 10
                },
                addFormData: {
                    year: null,
                    exam_type: null,
                    unit_id: null,
                    name: null
                },
                //添加验证
                addFormRule: {
                    year: [{required: true, type: 'date', message: '请选择体检年份', trigger: 'change'}],
                    exam_type: [{required: true, type: 'number', message: '请选择体检类型', trigger: 'change'}],
                    unit_id: [{required: true, message: '请选择体检医院', trigger: 'change'}],
                    name: [{required: true, message: '请填写体检队伍名称', trigger: 'blur'}],
                },
                teamRule: {
                    doctor: [{type: 'array', required: true, message: '请选择体检医生'}],
                },
            };
        },
        mounted() {
            this.getHospital();
            this.getList();
        },
        methods: {
            //新增
            addTeam() {
                this.isdisabled = false;
                this.footShow = 'display:block';
                this.modalTitle = '体检队伍新增';
                this.project_data = [];
                document.getElementById('btn-boxs').style.display = 'none';
                this.project_col = [
                    {
                        title: '序号',
                        width: 60,
                        align: 'center',
                        render: (h, params) => {
                            return h('span', params.index + 1);
                        }
                    }, {
                        title: '学校',
                        key: 'k_name'
                    }, {
                        title: '年级',
                        key: 'doctor_names'
                    }, {
                        title: '班级',
                        key: 'doctor_names'
                    },
                    {
                        title: '人数',
                        key: 'doctor_names'
                    }, {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
                            return h('span', {
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
                                        this.bindDoctor(params.row);
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
                        }
                    }
                ];
                this.modal = true;
            },
            //删除用
            selectTable(value) {
                this.deteData = value;
            },
            //设置选中的医生和医生ID
            setOption(item) {
                if (item) {
                    this.selectDoctorName = (item.map((i => {
                        return i.label;
                    }))).toString();
                }
            },
            //添加医生的按钮
            addDoctor() {
                this.addDoctorLoading = false;
                this.$nextTick(() => {
                    this.addDoctorLoading = true;
                });
                this.$refs['team'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交!');
                        return false;
                    }
                    let tempList = [];
                    //编辑
                    if (this.addFormData.id) {
                        for (let i = 0; i < this.project_data.length; i++) {
                            let obj = {};
                            if (this.project_data[i].k_id == this.team.k_id) {
                                obj.doctorId = this.team.doctor;
                                obj.doctor_names = this.selectDoctorName;
                                obj.k_name = this.project_data[i].k_name;
                                obj.k_id = this.project_data[i].k_id;
                                obj.id = this.project_data[i].id;
                                obj.team_id = this.project_data[i].team_id;
                                tempList.push(obj);
                            }
                            else {
                                obj.doctorId = this.project_data[i].doctorId;
                                obj.doctor_names = this.project_data[i].doctor_names;
                                obj.k_id = this.project_data[i].k_id;
                                obj.k_name = this.project_data[i].k_name;
                                obj.id = this.project_data[i].id;
                                obj.team_id = this.project_data[i].team_id;
                                tempList.push(obj);
                            }
                        }
                    }
                    //新增
                    else {
                        for (let i = 0; i < this.project_data.length; i++) {
                            let obj = {};
                            if (this.project_data[i].k_id == this.team.k_id) {
                                obj.doctorId = this.team.doctor;
                                obj.doctor_names = this.selectDoctorName;
                                obj.k_name = this.project_data[i].k_name;
                                obj.k_id = this.project_data[i].k_id;
                                tempList.push(obj);
                            } else {
                                obj.doctorId = this.project_data[i].doctorId;
                                obj.doctor_names = this.project_data[i].doctor_names;
                                obj.k_id = this.project_data[i].k_id;
                                obj.k_name = this.project_data[i].k_name;
                                tempList.push(obj);
                            }
                        }
                    }
                    this.project_data = [];
                    this.project_data = tempList;
                    this.addDoctorModal = false;
                    this.$refs.team.resetFields();
                });
            },
            //列表
            getList() {
                this.addFormData.id = null;
                let obj = {};
                obj.page = this.filterForm.page;
                obj.size = this.filterForm.size;
                obj.exam_type = parseInt(this.req.exam_type);
                obj.unit_id = this.req.unit_id;
                obj.name = this.req.name;
                obj.year = this.req.year == '' ? null : this.req.year.getFullYear();
                this.$ajax({
                    url: Urls.examination_team_list,
                    data: obj
                }).then((res) => {
                    if (res && res.data) {
                        this.objectList = res.data;
                        this.totalRecords = res.totalRecords;
                    }
                });
            },
            //绑定下拉框显示选择医生modal
            bindDoctor(row) {
                if (this.addFormData.unit_id) {
                    this.$ajax({
                        url: Urls.teacher_list,
                        data: {
                            type: 3,
                            unit_id: this.addFormData.unit_id,
                        }
                    }).then((res) => {
                        if (res.code == 200) {
                            this.doctorList = res.data;
                        } else {
                            this.$Message.error('获取医生下拉列表失败，请重试');
                        }
                    });
                    this.team.k_id = row.k_id;
                    this.team.name = row.k_name;
                    if (row.doctorId) {
                        this.team.doctor = row.doctorId;
                    } else {
                        this.$refs.team.resetFields();
                    }
                    this.addDoctorModal = true;
                }
                else {
                    this.$Message.error('请选择医院');
                }
            },
            //保存
            addTeamConfig() {
                this.loading = false;
                this.$nextTick(() => {
                    this.loading = true;
                });
                this.$refs['addFormData'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交!');
                        return;
                    }
                    for (let i = 0; i < this.project_data.length; i++) {
                        if (this.project_data[i].doctorId == undefined) {
                            this.$Message.error('请为' + this.project_data[i].k_name + '科室配置体检医生');
                            return;
                        }
                    }
                    let submitObj = {};
                    let teamInfoList = [];
                    if (this.addFormData.id) {
                        this.project_data.map((item) => {
                            let tempObj = {};
                            tempObj.id = item.id;
                            tempObj.team_id = item.team_id;
                            tempObj.set_id = item.k_id;
                            tempObj.doctor_id = item.doctorId.toString();
                            teamInfoList.push(tempObj);
                        });
                    } else {
                        this.project_data.map((item) => {
                            let tempObj = {};
                            tempObj.set_id = item.k_id;
                            tempObj.doctor_id = item.doctorId.toString();
                            teamInfoList.push(tempObj);
                        });
                    }
                    let addobj = {};
                    addobj.year = this.addFormData.year.getFullYear();
                    addobj.name = this.addFormData.name;
                    addobj.unit_id = this.addFormData.unit_id;
                    addobj.exam_type = this.addFormData.exam_type;
                    submitObj.physicalTeamInfo = addobj;
                    submitObj.teamInfoList = teamInfoList;
                    if (this.addFormData.id) {
                        addobj.id = this.addFormData.id;
                        this.$ajax({
                            url: Urls.examination_team_edit,
                            data: submitObj
                        }).then((res) => {
                            if (res.code == 200) {
                                this.$Message.success('修改体检队伍成功');
                                this.modal = false;
                                this.$refs.addFormData.resetFields();
                                this.getList();
                            } else {
                                this.$Message.error(res.error);
                            }
                        }).catch((err) => {
                            window.console.log(err);
                        });
                    } else {
                        this.$ajax({
                            url: Urls.examination_team_add,
                            data: submitObj
                        }).then((res) => {
                            if (res.code == 200) {
                                this.$Message.success('新增体检队伍成功');
                                this.modal = false;
                                this.$refs.addFormData.resetFields();
                                this.getList();
                            } else {
                                this.$Message.error(res.error);
                            }
                        }).catch((err) => {
                            window.console.log(err);
                        });
                    }
                });
            },
            //编辑
            editObject(id) {
                this.isdisabled = false;
                this.footShow = 'display:block';
                this.modalTitle = '体检队伍编辑';
                this.modal = true;
                document.getElementById('btn-boxs').style.display = 'block';
                this.project_col = [
                    {
                        title: '序号',
                        width: 60,
                        align: 'center',
                        render: (h, params) => {
                            return h('span', params.index + 1);
                        }
                    }, {
                        title: '学校',
                        key: 'k_name'
                    }, {
                        title: '年级',
                        key: 'doctor_names'
                    }, {
                        title: '班级',
                        key: 'doctor_names'
                    },
                    {
                        title: '人数',
                        key: 'doctor_names'
                    }, {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
                            return h('span', {
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
                                        this.bindDoctor(params.row);
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
                        }
                    }
                ];
                this.getDetail(id);
            },
            //详情
            showDetail(id) {
                this.isdisabled = true;
                this.footShow = 'display:none';
                this.modalTitle = '体检队伍详情';
                this.modal = true;
                this.project_col = [
                    {
                        title: '序号',
                        width: 60,
                        align: 'center',
                        render: (h, params) => {
                            return h('span', params.index + 1);
                        }
                    },
                    {
                        title: '学校',
                        key: 'k_name'
                    }, {
                        title: '年级',
                        key: 'doctor_names'
                    }, {
                        title: '班级',
                        key: 'doctor_names'
                    },
                    {
                        title: '人数',
                        key: 'doctor_names'
                    }
                ];
                this.getDetail(id);
            },
            //下拉框改变
            exam_typeChange(type) {
                if (type) {
                    this.$ajax({
                        url: Urls.examination_itembytype,
                        data: {'type': type}
                    }).then((res) => {
                        if (res.code == 200) {
                            this.project_data = [];
                            this.project_data = res.data;
                        } else {
                            this.project_data = [];
                            this.$Message.error('获取检测项目失败，请重试');
                        }
                    }).catch(() => {
                        this.$Message.error('获取检测项目失败，请重试');
                    });
                }
            },
            //医院下拉框
            getHospital() {
                this.$ajax({
                    url: Urls.unit_opt_list,
                    data: {
                        type: 3,
                        status: 1,
                        name: '',
                    }
                }).then((res) => {
                    if (res.code == 200) {
                        this.hospitalList = res.data;
                    } else {
                        this.$Message.error('获取医院下拉列表失败，请重试');
                    }
                });
            },
            //删除
            deleteTeam() {
                if (this.deteData.length == 0) {
                    this.$Message.error('请勾选要删除的内容');
                    return;
                }
                let that = this;
                that.$confirm({
                    text: '确认要删除吗',
                    onOk: function () {
                        let deleteIDs = that.deteData.map((item) => {
                            return item.id;
                        });
                        that.$ajax({
                            url: Urls.examination_team_status,
                            data: {
                                ids: deleteIDs,
                                status: 0
                            }
                        }).then(data => {
                            if (data.code === 200) {
                                that.$Message.success('删除成功');
                                that.getList();
                            } else {
                                that.$Message.error('删除失败，请重试');
                            }
                        }).catch(() => {
                            that.$Message.error('删除失败，请重试');
                        });
                    },
                });
            },
            //启用禁用
            switch(id, name, status) {
                let data = {};
                let text = '';
                let msg = '';
                if (status === 1) {
                    data.status = 2;
                    text = '确定禁用该队伍？';
                    msg = '禁用' + name + '成功';
                } else {
                    data.status = 1;
                    text = '确定启用该队伍？';
                    msg = '启用' + name + '成功';
                }
                let self = this;
                this.$confirm({
                    text: text,
                    onOk: function () {
                        self.$ajax({
                            url: Urls.examination_team_status,
                            data: {
                                id: id,
                                status: data.status
                            }
                        }).then(data => {
                            if (data.code === 200) {
                                self.$Message.success(msg);
                                self.getList();
                            } else {
                                self.$Message.error('队伍状态修改失败');
                            }
                        }).catch(() => {
                            self.$Message.error('队伍状态修改失败');
                        });
                    },
                    cancel: function () {
                        self.getList();
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
            //获取详情
            getDetail(id) {
                this.$ajax({
                    url: Urls.examination_team_info,
                    data: {'id': id}
                }).then((res) => {
                    if (res.code == 200) {
                        this.addFormData = res.data;
                        this.$ajax({
                            url: Urls.examination_itembytype,
                            data: {'type': res.data.exam_type}
                        }).then((res_pro) => {
                            if (res_pro.code == 200) {
                                this.project_data = [];
                                this.project_data = res_pro.data;
                                for (let i = 0; i < this.project_data.length; i++) {
                                    let pro = this.project_data[i];
                                    for (let r = 0; r < res.data.childrens.length; r++) {
                                        let resData = res.data.childrens[r];
                                        if (pro.k_id == resData.set_id) {
                                            this.project_data[i].team_id = resData.team_id;
                                            this.project_data[i].id = resData.id;
                                            this.project_data[i].doctorId = resData.doctor_id.split(',');
                                            this.project_data[i].doctor_names = resData.doctor_names;
                                        }
                                    }
                                }
                            } else {
                                this.project_data = [];
                                this.$Message.error('获取检测项目失败，请重试');
                            }
                        });
                    }
                });
            },
            //最大的模态框关闭
            addFormClose() {
                this.modal = false;
                this.addFormData.id = null;
                this.$refs.addFormData.resetFields();
            },
            //医生模态框关闭
            teamClose() {
                this.addDoctorModal = false;
                this.doctorList = [];
                this.selectDoctorName = '';
                this.$refs.team.resetFields();
            }
        },
    };
</script>
<style lang="scss" scoped>
    .content-box {
        padding: 30px 44px;
    }

    #btn-boxs {
        margin: 0;
        display: none;
        text-align: left;
        height: 42px;
        line-height: 42px;
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
