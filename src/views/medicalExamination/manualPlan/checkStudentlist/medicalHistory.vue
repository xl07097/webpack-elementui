<template>
    <div>
        <div class="content-box classes">
            <div class="title">
                学生体检名单校对
            </div>
            <Form v-model="req" inline>
                <FormItem label="学校名称" :label-width="80">
                    <i-select style="width:200px" @on-change="schoolChange" v-model="req.dep_id">
                        <i-option value="-1">全部</i-option>
                        <i-option v-for="item in schoolList" :value="item.id" :key="item.id">{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="学年" :label-width="50">
                    <DatePicker type="year" v-model="req.year" @on-change="gradeChange" :options="dateOpts"
                                placeholder="请选择" style="width: 140px"></DatePicker>
                </FormItem>
                <FormItem label="学期" :label-width="50">
                    <i-select style="width:100px" v-model="req.term" @on-change="gradeChange">
                        <Option value="-1">全部</Option>
                        <Option :value="1">第一学期</Option>
                        <Option :value="2">第二学期</Option>
                    </i-select>
                </FormItem>
                <FormItem label="年级" :label-width="50">
                    <i-select v-model="req.grade_no" @on-change="gradeChange" style="width:140px; margin-right: 0!important;">
                        <i-option value="-1">全部</i-option>
                        <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.value}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="班级" :label-width="50">
                    <i-select style="width:140px" v-model="req.class_no">
                        <i-option value="-1">全部</i-option>
                        <Option v-for="item in classList" :value="item.id" :key="item.id">{{item.class_no}}</Option>
                    </i-select>
                </FormItem>
                <FormItem style="float: right;">
                    <Button type="primary" class="search-btn" @click="initSearch()">查询</Button>
                </FormItem>
            </Form>
            <Divider dashed style="margin-top: 0;"/>
            <div class="clearfix">
                <a href="javascript:void(0)" class="add" style="margin-right: 45px;margin-top: 24px" @click="add">
                    <img src="../../../../assets/unit/add.png" alt="add">&nbsp;新增
                </a>
                <a class="add" style="margin-right: 45px;" @click="trash">
                    <img src="../../../../assets/system/role/delete.png" alt="trash">&nbsp;
                    删除
                </a>
                <a href="javascript:void(0)" class="add">
                    <img src="../../../../assets/unit/import.png" alt="upload">&nbsp;导入
                </a>
                <a href="javascript:void(0)" class="add" style="position: absolute;right: 50px;margin-top: 20px">
                    <img src="../../../../assets/unit/download.png" alt="download">&nbsp;<span style="position: relative;top: -4px;">下载模版</span>
                </a>
            </div>
            <Table ref="selection" :columns="columns" @on-selection-change="selectChange" :data="tableData"></Table>
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
        </div>
        <component :title="modalTitle" :is='com' :id='id' :flag="flag" @modal-close='ModalClose'></component>
    </div>
</template>
<script>
    import urls from '../../../../service/Urls';
    import AddCheckList from './addChecklist';

    export default {
        name: 'schedule',
        data() {
            return {
                req: {
                    dep_id: '-1',
                    year: '',
                    term: '-1',
                    grade_no: '-1',
                    class_no: '-1'
                },
                dateOpts: {
                    //禁止选择当年之前的年份
                    disabledDate(date) {
                        let d = new Date();
                        return date && date.getFullYear() < d.getFullYear();
                    }
                },
                pageConfig: {
                    page: 1,
                    size: 10,
                    total: 0,
                    opts: [10, 20, 50, 100]
                },
                columns: [
                    {
                        type: 'selection',
                        align: 'center',
                        width: 60
                    },
                    {
                        title: '序号',
                        width: 60,
                        type: 'index'
                    }, {
                        title: '学校名称',
                        key: 'dep_id'
                    }, {
                        title: '学年',
                        key: 'year',
                        width: 60,
                    }, {
                        title: '学期',
                        key: 'term',
                        width: 90,
                        render(h, params) {
                            return h('span', null, params.row.term === 1 ? '第一学期' : '第二学期');
                        }
                    }, {
                        title: '年级',
                        key: 'grade_no'
                    }, {
                        title: '班级',
                        width: 80,
                        key: 'class_no'
                    },
                    {
                        title: '学号',
                        key: 'student_code'
                    },
                    {
                        title: '学生姓名',
                        width: 90,
                        key: 'student_name'
                    }, {
                        title: '性别',
                        key: 'gender',
                        width: 60,
                        render(h, params) {
                            return h('span', null, params.row.gender === 1 ? '男' : '女');
                        }
                    },
                    {
                        title: '证件类型',
                        key: 'card_type',
                        width: 80,
                        render(h, params) {
                            return h('span', null, params.row.card_type === 1 ? '身份证' : '护照');
                        }
                    },
                    {
                        title: '身份证号',
                        width: 150,
                        key: 'card_num'
                    },
                    {
                        title: '户籍类型',
                        key: 'household_type',
                        width: 80,
                        render(h, params) {
                            return h('span', null, params.row.household_type === 1 ? '城镇' : '农村');
                        }
                    },
                    {
                        title: '是否住宿',
                        key: 'is_boarding',
                        width: 80,
                        render(h, params) {
                            return h('span', null, params.row.is_boarding === 1 ? '是' : '否');
                        }
                    }, {
                        title: '操作',
                        key: 'action',
                        width: 180,
                        render: (h, params) => {
                            return h('span', {}, [
                                h('span', {
                                    attrs: {
                                        class: 'editBtn'
                                    },
                                    on: {
                                        click: () => {
                                            this.info(params.row.id);
                                        }
                                    }
                                }, [
                                    h('img', {
                                        style: {
                                            marginRight: '8px'
                                        },
                                        attrs: {
                                            src: require('../../../../assets/unit/infos.png')
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
                                            this.edit(params.row.id);
                                        }
                                    }
                                }, [
                                    h('img', {
                                        style: {
                                            marginRight: '8px'
                                        },
                                        attrs: {
                                            src: require('../../../../assets/unit/edit_cover.png')
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
                schoolList: [],
                gradeList: [],
                classList: [],
                selectValue: [],
                modalTitle: '',
                id: '',
                flag: false, // 详情时标志
                com: null,
            };
        },
        methods: {
            getSelectCondition() {
                this.$ajax({
                    // 学校
                    url: urls.dept_all_list,
                    data: {
                        type: 2,
                        status: 1
                    }
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
                this.req.class_no = '-1';
                if (!this.req.grade_no) {
                    return;
                }
                this.$ajax({
                    url: urls.class_all_lists,
                    data: {
                        dep_id: this.req.dep_id === '-1' ? null : this.req.dep_id,
                        year: this.req.year ? this.req.year.getFullYear() : null,
                        term: this.req.term === '-1' ? null : this.req.term,
                        grade_no: this.req.grade_no === '-1' ? null : this.req.grade_no,
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.classList = data.data;
                    } else {
                        this.classList = [];
                    }
                });
            },
            initSearch() {
                // 重新查询时页面置为第一页
                this.pageConfig.page = 1;
                this.search();
            },
            search() {
                this.selectValue = [];
                this.$ajax({
                    url: urls.proofreading_list,
                    data: {
                        dep_id: this.req.dep_id === '-1' ? null : this.req.dep_id,
                        year: this.req.year ? String(this.req.year.getFullYear()) : null,
                        term: this.req.term === '-1' ? null : this.req.term,
                        grade_no: this.req.grade_no === '-1' ? null : this.req.grade_no,
                        class_no: this.req.class_no === '-1' ? null : this.req.class_no,
                        page: this.pageConfig.page,
                        size: this.pageConfig.size
                    }
                }).then((res) => {
                    if (res.code === 200) {
                        this.tableData = res.data;
                        this.pageConfig.total = res.totalRecords;
                    } else {
                        this.data = [];
                        this.pageConfig.total = 0;
                    }
                });
            },
            add() {
                this.com = AddCheckList;
                this.id = '';
                this.modalTitle = '新增';
                this.flag = false;
            },
            info(id){
                this.com = AddCheckList;
                this.id = id;
                this.modalTitle = '详情';
                this.flag = true;
            },
            edit(id){
                this.com = AddCheckList;
                this.id = id;
                this.modalTitle = '编辑';
                this.flag = false;
            },
            trash(){
                if(!this.selectValue.length){
                    this.$Message.error('请选择名单');
                    return false;
                }
                let data = [];
                this.selectValue.map(item => {
                    data.push(item.id);
                });
                this.$ajax({
                    url: urls.proofreading_status,
                    data: {
                        status: 0,
                        ids: data,
                    }
                }).then((res) => {
                    if (res.code === 200) {
                        this.$Message.success('删除成功');
                        this.search();
                    } else {
                        this.$Message.error('删除失败');
                    }
                });
            },
            selectChange(value){
                this.selectValue = value;
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
<style lang="scss">
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

    .modal-form .ivu-form-item {
        margin-right: 30px !important;
    }

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
