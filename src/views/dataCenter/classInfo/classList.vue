<template>
    <div class="classes content-box">
        <h3 class="title">班级信息管理</h3>
        <Form inline label-position="left">
            <FormItem label="学校名称" :label-width="80">
                <i-select v-model="req.school_id" style="width:200px" @on-change="schoolChange" :disabled="!is_manage">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                </i-select>
            </FormItem>
            <FormItem label="学年" :label-width="50">
                <DatePicker type="year" format="yyyy" v-model="req.year" style="width: 120px"></DatePicker>
            </FormItem>
            <FormItem label="学期" :label-width="50">
                <i-select v-model="req.semester" style="width:120px">
                    <i-option value="-1">全部</i-option>
                    <i-option :value="1">第一学期</i-option>
                    <i-option :value="2">第二学期</i-option>
                </i-select>
            </FormItem>
            <FormItem label="年级" :label-width="50">
                <i-select v-model="req.grade_id" style="width:160px; margin-right: 0!important;">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                </i-select>
            </FormItem>
            <FormItem label="班级" :label-width="50">
                <i-input v-model.trim="req.name" style="width:120px"></i-input>
            </FormItem>
            <div class="operator">
                <i-button class="searchBtn" type="primary" @click="initSearch">查询</i-button>
            </div>
        </Form>
        <Divider dashed/>
        <div>
            <a href="javascript:void(0)" class="add" @click="add" style="margin-right: 45px;">
                <img src="../../../assets/unit/add.png" alt="add">&nbsp;新增
            </a>
            <a href="javascript:void(0)" class="add" @click="imp">
                <img src="../../../assets/unit/import.png" alt="download">&nbsp;导入
            </a>
            <a href="javascript:void(0)" class="add" @click="download" style="position: absolute;right: 50px">
                <img src="../../../assets/unit/download.png" alt="download">&nbsp;<span style="position: relative;top: -4px;">下载模版</span>
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

    import AddClass from './addClass';
    import urls from '../../../service/Urls';

    export default {
        name: 'ClassList',
        data() {
            return {
                req: {
                    year: '',
                    semester: '-1',
                    school_id: '-1',
                    grade_id: '-1',
                    name: ''
                },
                columns: [
                    {
                        title: ' ',
                        width: 40
                    },
                    {
                        type: 'index',
                        title: '序号',
                        width: 70
                    },
                    {
                        title: '学校名称',
                        key: 'school'
                    },
                    {
                        title: '学期',
                        key: 'semester',
                        render: (h, params) => {
                            return h('span', params.row.semester === 1 ? '第一学期' : '第二学期');
                        }
                    },
                    {
                        title: '学年',
                        key: 'year'
                    },
                    {
                        title: '年级',
                        key: 'grade'
                    },
                    {
                        title: '班级名称',
                        key: 'name'
                    },
                    {
                        title: '班主任',
                        key: 'headmaster'
                    },
                    {
                        title: '体育老师',
                        key: 'sportsTeacher'
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
                                        marginRight: '8px'
                                    },
                                    on: {
                                        'on-change': () => {
                                            this.switch(params.row.id, params.row.name, params.row.status, params.index);
                                        }
                                    }
                                }),
                                h('span', params.row.status === 1 ? '启用' : '禁用')
                            ]);
                        }
                    },
                    {
                        title: '操作',
                        key: 'operator',
                        width: 120,
                        render: (h, params) => {
                            return h('span', {
                                attrs: {
                                    class: 'editBtn'
                                },
                                style: {
                                    display: 'inline-block',
                                    cursor: 'pointer'
                                },
                                on: {
                                    click: () => {
                                        this.edit(params.row.id);
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
                            ]);
                        }
                    }
                ],
                tableData: [],
                schoolList: [],
                gradeList: [],
                classList: [],
                is_manage: true, // 登陆人是否是管理员
                modalTitle: '',
                id: '',
                flag: false, // 详情时标志
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
            getSelectCondition(type) {
                /// ===========获取下拉列表查询条件
                this.$ajax({ // 学校
                    url: urls.unit_opt_list,
                    data: {
                        type: type,
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
                });
            },
            initSearch() {
                // 重新查询时页面置为第一页
                this.pageConfig.page = 1;
                this.search();
            },
            search() {
                this.$ajax({
                    url: urls.class_list,
                    data: {
                        page: this.pageConfig.page,
                        size: this.pageConfig.size,
                        school_id: this.req.school_id === '-1' ? null : this.req.school_id,
                        year: this.req.year ? this.req.year.getFullYear() : null,
                        semester: this.req.semester === '-1' ? null : this.req.semester,
                        grade_id: this.req.grade_id === '-1' ? null : this.req.grade_id,
                        name: this.req.name
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.tableData = data.data;
                        this.pageConfig.total = data.totalRecords;
                    } else {
                        this.tableData = [];
                        this.pageConfig.total = 0;
                    }
                }).catch(() => {
                    this.tableData = [];
                });
            },
            add() {
                this.com = AddClass;
                this.id = '';
                this.flag = false;
                this.modalTitle = '新增页面';
            },
            imp() {

            },
            download() {

            },
            edit(id) {
                this.com = AddClass;
                this.id = id;
                this.flag = false;
                this.modalTitle = '编辑页面';
            },
            schoolChange(value) {
                this.req.grade_id = '-1';
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
            gradeChange(value){
                this.req.name = '';
                if (value === '-1') {
                    this.classList = [];
                    return false;
                }
                this.$ajax({
                    url: urls.class_all_list,
                    data: {
                        grade_id: value,
                        school_id: this.req.school_id,
                        status: 1
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.classList = data.data;
                    } else {
                        this.classList = [];
                    }
                });
            },
            switch(id, name, status, index) {
                let data = {};
                let text = '';
                let msg1 = '', msg2 = '';
                if (status === 1) {
                    data.status = 2;
                    text = '确定禁用该班级？';
                    msg1 = '禁用' + name + '班级成功';
                    msg2 = '禁用' + name + '班级失败';
                } else {
                    data.status = 1;
                    text = '确定启用该班级？';
                    msg1 = '启用' + name + '班级成功';
                    msg2 = '启用' + name + '班级失败';
                }
                let self = this;
                this.$confirm({
                    text: text,
                    onOk: function () {
                        self.$ajax({
                            url: urls.class_status,
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
                    cancel: function () {
                        // self.tableData[index].status = status;
                        self.search();
                    }
                });
            },
            rowClass(row) {
                return row.status === 2 ? 'disabled' : '';
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
            if (window.localStorage.getItem('is_roles')) {
                this.is_manage = false;
                this.req.school_id = window.sessionStorage.getItem('unit_id');
                let type = window.localStorage.getItem('type');/// 1教育局2学校3医院4体科所
                if (type === "1") {
                    this.getSelectCondition(1);
                } else if (type === '2') {
                    this.getSelectCondition(2);
                } else if (type === '3') {
                    this.getSelectCondition(3);
                } else if (type === '4') {
                    this.getSelectCondition(4);
                } else {
                    this.getSelectCondition(2);
                }
            } else {
                this.getSelectCondition(2);
            }

            this.search();
        }
    };
</script>

<style lang="less">
    .classes {
        padding: 30px 44px;
        min-height: 500px;
        border-radius: 8px;
        .ivu-form .ivu-form-item {
            margin-right: 30px !important;
        }
        .ivu-select-disabled .ivu-select-selection,
        .ivu-input[disabled],
        fieldset[disabled] .ivu-input {
            color: #515a6e;
        }
        .title {
            height: 80px;
            font-size: 26px;
            line-height: 1;
            // font-family: SourceHanSansCN-Bold;
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
            margin-right: 40px;
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
