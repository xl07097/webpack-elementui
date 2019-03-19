<template>
    <div class="students content-box">
        <h3 class="title">学生信息管理</h3>
        <Form class="clearfix" inline label-position="left">
            <FormItem label="学生姓名" :label-width='80'>
                <i-input v-model.trim="req.name" style="width:140px" :maxlength="10"></i-input>
            </FormItem>
            <FormItem label="学号" :label-width='50'>
                <i-input v-model.trim="req.stu_num" style="width:140px" :maxlength="10"></i-input>
            </FormItem>
            <FormItem label="性别" :label-width="50">
                <i-select v-model="req.gender" style="width:100px">
                    <i-option value="-1">全部</i-option>
                    <i-option :value="1">男</i-option>
                    <i-option :value="2">女</i-option>
                </i-select>
            </FormItem>
            <FormItem label="户籍类型" :label-width="80">
                <i-select v-model="req.household_type" style="width:100px">
                    <i-option value="-1">全部</i-option>
                    <i-option :value="1">城镇</i-option>
                    <i-option :value="2">农村</i-option>
                </i-select>
            </FormItem>
            <FormItem label="是否住宿" :label-width="80">
                <i-select v-model="req.is_boarding" style="width:100px">
                    <i-option value="-1">全部</i-option>
                    <i-option :value="1">是</i-option>
                    <i-option :value='2'>否</i-option>
                </i-select>
            </FormItem>

            <div class="operator">
                <i-button class="searchBtn" size="small" type="primary" @click="initSearch">查询</i-button>
            </div>
        </Form>
        <Divider dashed style="margin-top: 0;"/>
        <div class="clearfix">
            <a href="javascript:void(0)" class="add" style="margin-right: 45px;">
                <img src="../../../assets/unit/import.png" alt="download">&nbsp;导入
            </a>
            <a href="javascript:void(0)" class="add">
                <img src="../../../assets/unit/export.png" alt="download">&nbsp;导出
            </a>
            <a href="javascript:void(0)" class="add" style="float: right;">
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
    import EditStudent from './editStudent';
    import urls from '../../../service/Urls';
    import {dateFormatFromString} from '../../../libs/dateUtils';

    export default {
        name: 'StudentList',
        data() {
            return {
                req: {
                    name: null,
                    stu_num: null,
                    household_type: '-1',
                    gender: '-1',
                    is_boarding: '-1'
                },
                columns: [
                    {
                        width: 20,
                        title: ' '
                    },
                    {
                        type: 'index',
                        width: 50,
                        title: '序号'
                    },
                    {
                        title: '学籍号',
                        key: 'code'
                    },
                    {
                        title: '学号',
                        key: 'stu_num'
                    },
                    {
                        title: '姓名',
                        width: 90,
                        key: 'name'
                    },
                    {
                        title: '性别',
                        width: 50,
                        key: 'gender',
                        render: (h, params) => {
                            return h('span', null, params.row.gender === 1 ? '男' : '女');
                        }
                    },
                    {
                        title: '民族',
                        width: 90,
                        key: 'nation'
                    },
                    {
                        title: '户籍类型',
                        key: 'household_type',
                        width: 80,
                        render: (h, params) => {
                            return h('span', null, params.row.household_type === 1 ? '城镇' : '农村');
                        }
                    },
                    {
                        title: '是否住宿',
                        key: 'is_boarding',
                        width: 80,
                        render: (h, params) => {
                            return h('span', null, params.row.is_boarding === 1 ? '是' : '否');
                        }
                    },
                    {
                        title: '证件类型',
                        width: 90,
                        key: 'card_type',
                        render: (h, params) => {
                            return h('span', null, params.row.card_type === 1 ? '身份证' : '护照');
                        }
                    },
                    {
                        title: '证件号',
                        key: 'card_num'
                    },
                    {
                        title: '出生日期',
                        key: 'birthday',
                        width: 110,
                        // render: (h, params) => {
                        //     return h('span', null, dateFormatFromString(params.row.birthday));
                        // }
                    },
                    {
                        title: '第一监护人(手机号)',
                        key: 'guardian1'
                    },
                    {
                        title: '第二监护人(手机号)',
                        key: 'guardian2'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width: 100,
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
                                            this.switch(params.row.id, params.row.status, params.row.name);
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
                        width: 180,
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
                typeList: [],
                uploadUrl: urls.import_student,
                yearList: [],
                areaList: [],
                schoolList: [],
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
                            this.schoolList = data.data.filter((item)=>{
                                return item.type === 2
                            });
                        } else {
                            this.schoolList = [];
                        }
                    })
                    .catch(err => {
                        window.console.log(err);
                    });
            },
            areaChange() {
                this.req.school_id = -1;
                this.getSchoolList();
            },
            initSearch() {
                // 重新查询时页面置为第一页
                this.pageConfig.page = 1;
                this.search();
            },
            search() {
                let json = {
                    page: this.pageConfig.page,
                    size: this.pageConfig.size,
                    name: this.req.name,
                    stu_num: this.req.stu_num,
                    household_type: this.req.household_type === '-1' ? null : this.req.household_type,
                    gender: this.req.gender === '-1' ? null : this.req.gender,
                    is_boarding: this.req.is_boarding === '-1' ? null : this.req.is_boarding,
                };
                this.$ajax({
                    url: urls.student_list,
                    data: json
                }).then(data => {
                    if (data.code === 200) {
                        this.tableData = data.data;
                        this.pageConfig.total = data.totalRecords;
                    } else {
                        // this.tableData = [];
                        this.pageConfig.total = 0;
                    }
                }).catch(() => {
                    // this.tableData = [];
                    this.pageConfig.total = 0;
                });
            },
            infos(id) {
                this.com = EditStudent;
                this.id = id;
                this.modalTitle = '详情';
                this.flag = true;
            },
            edit(id) {
                this.com = EditStudent;
                this.id = id;
                this.modalTitle = '编辑';
                this.flag = false;
            },
            switch(id, status, name) {
                let data = {};
                let text = '', msg1 = '', msg2 = '';
                if (status === 1) {
                    data.status = 2;
                    text = '确定禁用该学生？';
                    msg1 = '禁用' + name + '学生成功';
                    msg2 = '禁用' + name + '学生失败';
                } else {
                    data.status = 1;
                    text = '确定启用该学生？';
                    msg1 = '启用' + name + '学生成功';
                    msg2 = '禁用' + name + '学生失败';
                }
                let self = this;
                this.$confirm({
                    text: text,
                    onOk: function () {
                        self.$ajax({
                            url: urls.student_status,
                            data: {
                                ids: [id],
                                status: data.status
                            }
                        }).then(data => {
                            if (data.code === 200) {
                                self.$Message.success(msg1);
                                self.search();
                            } else {
                                self.$Message.error(msg2);
                                self.search();
                            }
                        }).catch(() => {
                            self.$Message.error(msg2);
                            self.search();
                        });
                    },
                    cancel: function () {
                        self.search();
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
            this.getSelectCondition();
            this.search();
        }
    };
</script>

<style lang="less">
    .students {
        min-height: 500px;
        border-radius: 8px;
        padding: 30px 44px;

        .title {
            height: 80px;
            font-size: 26px;
            line-height: 1;
            font-family: SourceHanSansCN-Bold;
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

        .add {
            margin-bottom: 10px;
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

        .disabled span {
            color: #ccc;
        }

        .ivu-select-disabled .ivu-select-selection,
        .ivu-input[disabled],
        fieldset[disabled] .ivu-input {
            color: #515a6e;
        }

        .page {
            margin-top: 24px;
            text-align: center;
        }
    }
</style>
