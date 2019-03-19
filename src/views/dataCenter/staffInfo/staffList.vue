<template>
    <div class="staff content-box">
        <h3 class="title">工作人员管理</h3>
        <Form inline label-position="left" :label-width="80">
            <FormItem label="所属单位">
                <i-select
                        style="width:240px"
                        v-model="req.unit_id"
                        filterable
                        remote
                        @on-query-change="handleSearch"
                        @on-change="unitchange"
                >
                    <i-option value="-1">全部</i-option>
                    <Option v-for="item in unitList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </i-select>
            </FormItem>
            <FormItem label="所属年级" v-if="schoolflag">
                <i-select v-model="req.grade_id" style="width:160px" @on-change="gradeChange">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                </i-select>
            </FormItem>
            <FormItem label="所属班级" v-if="schoolflag">
                <i-select v-model="req.classno_id" style="width:160px">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of classList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                </i-select>
            </FormItem>
            <FormItem label="所属科室" v-if="hospitalflag">
                <i-select v-model="req.hdep_id" style="width:160px">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of sectionList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                </i-select>
            </FormItem>
            <div class="operator">
                <i-button class="searchBtn" type="primary" @click="initSearch">查询</i-button>
            </div>
        </Form>
        <Divider dashed/>
        <div>
            <a href="javascript:void(0)" class="add" @click="add">
                <img src="../../../assets/unit/add.png" alt="add">&nbsp;新增
            </a>
        </div>
        <Table center :disabled-hover='true' :columns="columns" :data="tableData"
               :row-class-name='rowClass'></Table>
        <div class="page">
            <Page
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
    </div>
</template>

<script>
    /* eslint-disable no-undef */

    import AddStaff from './addStaff';
    import urls from '../../../service/Urls';

    export default {
        name: 'StaffList',
        data() {
            return {
                schoolflag: false,
                hospitalflag: false,
                req: {
                    unit_id: '-1', // 为学校时，显示年级，班级，，，，为医院时，显示科室
                    grade_id: '-1',
                    classno_id: '-1',
                    hdep_id: '-1'
                },
                columns: [
                    {
                        title: ' ',
                        width: 40
                    },
                    {
                        type: 'index',
                        title: '序号',
                        width: 120
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '工作人员代号',
                        key: 'code'
                    },
                    {
                        title: '性别',
                        key: 'gender',
                        render: (h, params) => {
                            return h('span', null, params.row.gender === 1 ? '男' : '女');
                        }
                    },
                    {
                        title: '所属单位',
                        key: 'unit_name'
                    },
                    {
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
                                        marginRight: '5px'
                                    },
                                    on: {
                                        'on-change': () => {
                                            this.switch(params.row.id, params.row.status,params.row.name);
                                        }
                                    }
                                }),
                                h('span', null, params.row.status === 1 ? '启用' : '禁用')
                            ]);
                        }
                    },
                    {
                        title: '操作',
                        key: 'operator',
                        width: 170,
                        render: (h, params) => {
                            return h('div', [
                                h('span', {
                                    attrs: {
                                        class: 'editBtn'
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
                                        marginRight: '20px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.row.id);
                                        }
                                    }
                                }, [
                                    h('img', {
                                        style: {
                                            marginRight: '5px'
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
                tableData: [],
                unitList: [],
                gradeList: [],
                classList: [],
                sectionList: [],
                modalTitle: '',
                flag: false,
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

            },
            handleSearch(value){
                /// ===========获取下拉列表查询条件
                this.$ajax({  //所有单位
                    url: urls.unit_all_list,
                    data: {
                        status: 1,
                        name:value
                    }
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.unitList = data.data;
                        } else {
                            this.unitList = [];
                        }
                    })
                    .catch(err => {
                        window.console.log(err);
                    });
            },
            initSearch() {
                // 重新查询时页面置为第一页
                this.pageConfig.page = 1;
                this.search();
            },
            search() {
                let data = {};
                if (this.schoolflag) {
                    data = {
                        page: this.pageConfig.page,
                        size: this.pageConfig.size,
                        unit_id: this.req.unit_id === '-1' ? null : this.req.unit_id,
                        grade_id: this.req.grade_id === '-1' ? null : this.req.grade_id,
                        classno_id: this.req.classno_id === '-1' ? null : this.req.classno_id
                    };
                } else if (this.hospitalflag) {
                    data = {
                        page: this.pageConfig.page,
                        size: this.pageConfig.size,
                        unit_id: this.req.unit_id === '-1' ? null : this.req.unit_id,
                        hdep_id: this.req.hdep_id === '-1' ? null : this.req.hdep_id
                    };
                } else {
                    data = {
                        page: this.pageConfig.page,
                        size: this.pageConfig.size,
                        unit_id: this.req.unit_id === '-1' ? null : this.req.unit_id,
                    };
                }
                this.$ajax({
                    url: urls.staff_list,
                    data: data
                }).then(data => {
                    if (data.code === 200) {
                        this.tableData = data.data;
                        this.pageConfig.total = data.totalRecords;
                    } else {
                        this.tableData = [];
                        this.pageConfig.total = 0;
                    }
                }).catch(() => {
                    // this.tableData = [];
                    // this.$Message.error('数据查询失败');
                });
            },
            add() {
                this.com = AddStaff;
                this.id = '';
                this.modalTitle = '新增页面';
                this.flag = false;
            },
            infos(id) {
                this.com = AddStaff;
                this.id = id;
                this.modalTitle = '详情页面';
                this.flag = true;
            },
            edit(id) {
                this.com = AddStaff;
                this.id = id;
                this.modalTitle = '编辑页面';
                this.flag = false;
            },
            switch(id, status,name) {
                let data = {};
                let text = '',msg1 = '',msg2 = '';
                if (status === 1) {
                    data.status = 2;
                    text = '确定禁用该工作人员？';
                    msg1 = '禁用'+name+'工作人员成功';
                    msg2 = '禁用'+name+'工作人员失败';
                } else {
                    data.status = 1;
                    text = '确定启用工作人员？';
                    msg1 = '启用'+name+'工作人员成功';
                    msg2 = '启用'+name+'工作人员失败';
                }
                let self = this;
                this.$confirm({
                    text: text,
                    onOk: function () {
                        self.$ajax({
                            url: urls.staff_status,
                            data: {
                                id: id,
                                status: data.status
                            }
                        }).then(data => {
                            if (data.code === 200) {
                                self.$Message.success(msg1);
                                self.search();
                            } else {
                                self.$Message.error(msg2);
                            }
                        }).catch(() => {
                            self.$Message.error(msg2);
                        });
                    },
                    cancel:function () {
                        self.search();
                    }
                });
            },
            unitchange(value) { // 选择所属单位时
                if (value === '-1') {
                    this.schoolflag = false;
                    this.hospitalflag = false;
                    return false;
                }

                let type = null;
                for (let index = 0; index < this.unitList.length; index++) {
                    if (this.unitList[index].id === value) {
                        type = this.unitList[index].type;
                        break;
                    }
                }
                if (type === 2) { // 学校
                    this.schoolflag = true;
                    this.hospitalflag = false;
                    this.req.classno_id = '';
                    this.req.grade_id = '';
                    this.schoolChange(value);
                } else if (type === 3) { // 医院
                    this.schoolflag = false;
                    this.hospitalflag = true;
                    this.req.hdep_id = '';
                    this.sectionChange(value);
                } else { // 其他
                    this.schoolflag = false;
                    this.hospitalflag = false;
                }
            },
            schoolChange(value) {
                this.req.grade_id = '-1';
                this.req.classno_id = '-1';
                this.classList = [];
                if (value === '-1') {
                    this.gradeList = [];
                    return false;
                }
                this.$ajax({
                    url: urls.grade_list,
                    data: {
                        id: value,
                        status: 1
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.gradeList = data.data;
                    } else {
                        this.gradeList = [];
                    }
                });
            },
            sectionChange(value){
                this.req.hdep_id = '-1';
                this.$ajax({
                    url: urls.section_all_list,
                    data: {
                        status: 1,
                        unit_id: value
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.sectionList = data.data;
                    } else {
                        this.sectionList = [];
                    }
                });
            },
            gradeChange(value) { // 获取班级
                this.req.classno_id = '-1';
                if (value === '-1') {
                    this.classList = [];
                    return false;
                }
                this.$ajax({
                    url: urls.class_all_list,
                    data: {
                        school_id: this.req.unit_id,
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
            this.handleSearch(null);
            this.search();
        }
    };
</script>

<style lang="less">
    .staff {
        min-height: 500px;
        padding: 30px 44px;
        border-radius: 8px;
        .title {
            height: 80px;
            font-size: 26px;
            line-height: 1;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
        }
        .operator {
            float: right;
            margin-bottom: 15px;
            text-align: right;
        }
        .searchBtn {
            width: 80px;
            height: 34px;
            line-height: 1;
            font-size: 14px;
            font-family: SourceHanSansCN-Medium;
            font-weight: 500;
            color: rgba(254, 254, 254, 1);
            background: rgba(255, 123, 16, 1);
            border-radius: 3px;
            border: none;
        }
        .searchBtn:hover {
            opacity: 0.8;
        }
        .ivu-divider {
            margin: 0 0 24px 0;
        }
        .contents {
            position: relative;
        }
        .ivu-select-disabled .ivu-select-selection,
        .ivu-input[disabled],
        fieldset[disabled] .ivu-input {
            color: #515a6e;
        }
        .add {
            margin-bottom: 12px;
            display: inline-block;
            font-size: 16px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(39, 55, 60, 1);
            &:hover {
                opacity: 0.8;
            }
            img {
                position: relative;
                top: 4px;
            }
        }
        .addBtn {
            display: inline-block;
            margin-right: 40px;
            cursor: pointer;
        }
        .disabled span {
            color: #ccc;
        }
        .page {
            margin-top: 24px;
            text-align: center;
        }
    }
</style>
