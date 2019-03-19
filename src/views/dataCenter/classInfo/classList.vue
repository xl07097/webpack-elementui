<template>
    <div class="classes content-box">
        <h3 class="title">班级信息管理</h3>
        <Form inline label-position="left">
            <FormItem label="学校名称" :label-width="80">
                <i-select v-model="req.dep_id" style="width:200px" @on-change="schoolChange" :disabled="!is_manage">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                </i-select>
            </FormItem>
            <FormItem label="学年" :label-width="50">
                <DatePicker type="year" v-model="req.year_action" style="width: 80px"></DatePicker>
                <DatePicker type="year" v-model="req.year_end"  style="width: 80px"></DatePicker>

                <!--<DatePicker type="daterange" format="yyyy" split-panels v-model="req.year" placement="bottom-end"-->
                            <!--style="width: 140px"></DatePicker>-->
            </FormItem>
            <FormItem label="学期" :label-width="50">
                <i-select v-model="req.term" style="width:120px">
                    <i-option value="-1">全部</i-option>
                    <i-option :value="1">第一学期</i-option>
                    <i-option :value="2">第二学期</i-option>
                </i-select>
            </FormItem>
            <FormItem label="年级" :label-width="50">
                <i-select v-model="req.grade_no" style="width:160px; margin-right: 0!important;">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.value}}</i-option>
                </i-select>
            </FormItem>
            <FormItem label="班级" :label-width="50">
                <i-input v-model.trim="req.class_no" :maxlength="10" style="width:120px"></i-input>
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
                <img src="../../../assets/unit/download.png" alt="download">&nbsp;<span
                    style="position: relative;top: -4px;">下载模版</span>
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
                    dep_id: '-1',
                    year: [],
                    term: '-1',
                    grade_no: '-1',
                    year_action: '',
                    year_end: '',
                    class_no: null
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
                        key: 'dep_id'
                    },
                    {
                        title: '学期',
                        key: 'term',
                        render: (h, params) => {
                            return h('span', null, params.row.term === 1 ? '第一学期' : '第二学期');
                        }
                    },
                    {
                        title: '学年',
                        key: 'year'
                    },
                    {
                        title: '年级',
                        key: 'grade_no'
                    },
                    {
                        title: '班级名称',
                        key: 'class_no'
                    },
                    {
                        title: '班主任',
                        key: 'class_teacher'
                    },
                    {
                        title: '体育老师',
                        key: 'physical_teacher'
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
                                            this.switch(params.row.id, params.row.class_no, params.row.status);
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
                this.$ajax({
                    // 学校
                    url: urls.dept_all_list,
                    data: {
                        type: type,
                        status: 1
                    }
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.schoolList = data.data.filter((item) => {
                                return item.type === type;
                            });
                        } else {
                            this.schoolList = [];
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
                if(this.req.year_action && this.req.year_end){
                    if(this.req.year_action.getTime()>this.req.year_end.getTime()){
                        this.$Message.error('开始时间不能大于结束时间');
                        return false;
                    }
                }

                this.$ajax({
                    url: urls.class_list,
                    data: {
                        page: this.pageConfig.page,
                        size: this.pageConfig.size,
                        dep_id: this.req.dep_id === '-1' ? null : this.req.dep_id,
                        year_action: this.req.year_action ? this.req.year_action.getFullYear() : null,
                        year_end: this.req.year_end ? this.req.year_end.getFullYear() : null,
                        term: this.req.term === '-1' ? null : this.req.term,
                        grade_no: this.req.grade_no === '-1' ? null : this.req.grade_no,
                        class_no: this.req.class_no ? this.req.class_no : null
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
                this.modalTitle = '新增';
            },
            imp() {

            },
            download() {

            },
            edit(id) {
                this.com = AddClass;
                this.id = id;
                this.flag = false;
                this.modalTitle = '编辑';
            },
            schoolChange(value) {
                this.req.grade_no = '-1';
                if (value === '-1') {
                    this.gradeList = [];
                    return false;
                }
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
                this.req.name = '';
                if (value === '-1') {
                    this.classList = [];
                    return false;
                }
                this.$ajax({
                    url: urls.class_all_lists,
                    data: {
                        grade_id: value,
                        school_id: this.req.school_id,
                        status: 1
                    }
                }).then(data => {
                    if (data.code === 200) {
                        let cate_id = '';
                        for (var i = 0, len = this.schoolList.length; i < len; i++) {
                            if (value === this.schoolList[i].id) {
                                cate_id = this.schoolList[i].grade;
                            }
                        }
                        this.classList = data.data.filter(function (item) {
                            return item.category_id = cate_id;
                        });
                    } else {
                        this.classList = [];
                    }
                });
            },
            switch(id, name, status) {
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
                                'ids': [id],
                                'status': data.status
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
                this.req.school_id = window.sessionStorage.getItem('dep_id');
                let type = window.localStorage.getItem('type');/// 1教育局2学校3医院4体科所
                if (type === '1') {
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
            /*font-family: SourceHanSansCN-Bold;*/
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
