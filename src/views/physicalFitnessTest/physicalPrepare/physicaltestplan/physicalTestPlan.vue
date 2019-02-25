<template>
    <div class="phyPlan content-box">
        <h3 class="title">体测计划规划（手动）<span class="arrow"></span><span class="sub">设定体测对象</span></h3>
        <Form inline>
            <FormItem label="体测年份" :label-width="80">
                <DatePicker type="year" format="yyyy" v-model="req.year" style="width: 140px"></DatePicker>
            </FormItem>
            <FormItem label="体测计划代号" :label-width="120">
                <i-input v-model="req.code" :maxlength="15" placeholder="关键词筛选" style="width: 300px"></i-input>
            </FormItem>
            <div class="operator">
                <i-button class="searchBtn" size="small" type="primary" @click="initSearch">查询</i-button>
            </div>
        </Form>
        <Divider dashed/>
        <div>
            <a href="javascript:void(0)" class="add" @click="add">
                <img src="../../../../assets/unit/add.png" alt="add">&nbsp;新增
            </a>
        </div>
        <Table center :disabled-hover='true' :columns="columns" :data="tableData"></Table>
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

    import AddSection from './addTestPlan';
    import urls from '../../../../service/Urls';

    export default {
        name: 'physicalTestPlan',
        data() {
            return {
                req: {
                    code: '',
                    year: null
                },
                columns: [
                    {
                        title: ' ',
                        width: 40
                    },
                    {
                        type: 'index',
                        title: '序号',
                        width: 100
                    },
                    {
                        title: '体测年份',
                        key: 'year'
                    },
                    {
                        title: '体测计划代号',
                        key: 'code'
                    },
                    {
                        title: '学校',
                        key: 'school'
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
                                            this.switch(params.row.id, params.row.status, params.row.code);
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
                        width: 200,
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
                                            src: require('../../../../assets/common/detail.png')
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
                                        display: params.row.state === 1 ? 'inline-block' : 'none',
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
                                            marginRight: '5px'
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
                hospitalList: [],
                modalTitle: '',
                flag: false, // true详情
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
            initSearch() {
                // 重新查询时页面置为第一页
                this.pageConfig.page = 1;
                this.search();
            },
            search() {
                this.$ajax({
                    url: urls.get_physical_object_list,
                    data: {
                        page: this.pageConfig.page,
                        size: this.pageConfig.size,
                        code: this.req.code ? this.req.code : null,
                        year: this.req.year ? this.req.year.getFullYear() : null,
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.tableData = data.data;
                        this.pageConfig.total = data.totalRecords;
                        // this.$Message.success('数据查询成功');
                    } else {
                        this.tableData = [];
                        this.pageConfig.total = 0;
                        // this.$Message.error('数据查询失败');
                    }
                }).catch(() => {
                    this.tableData = [];
                    this.$Message.error('数据查询失败');
                });
            },
            add() {
                this.com = AddSection;
                this.id = '';
                this.flag = false;
                this.modalTitle = '体测计划新增';
            },
            infos(id) {
                this.com = AddSection;
                this.id = id;
                this.flag = true;
                this.modalTitle = '体测计划规划详情';
            },
            edit(id) {
                this.com = AddSection;
                this.id = id;
                this.flag = false;
                this.modalTitle = '体测计划编辑';
            },
            switch(id, status, code) {
                let data = {};
                let text = '', msg1 = '', msg2 = '';
                if (status === 1) {
                    data.status = 2;
                    text = '确定禁用该体测计划？';
                    msg1 = '禁用' + code + '体测计划成功';
                    msg2 = '禁用' + code + '体测计划失败';
                } else {
                    data.status = 1;
                    text = '确定启用该体测计划？';
                    msg1 = '启用' + code + '体测计划成功';
                    msg2 = '启用' + code + '体测计划失败';
                }
                let self = this;
                this.$confirm({
                    text: text,
                    onOk: function () {
                        self.$ajax({
                            url: urls.status_physical_object,
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
                        self.search();
                    }
                });
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
            this.search();
        }
    };
</script>

<style lang="less">
    .phyPlan {
        min-height: 500px;
        padding: 30px 44px;
        border-radius: 8px;
        .title {
            height: 80px;
            font-size: 26px;
            line-height: 1;
            /*// font-family: SourceHanSansCN-Bold;*/
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
        }
        .arrow {
            position: relative;
            top: -3px;
            display: inline-block;
            width: 10px;
            height: 10px;
            margin-right: 20px;
            border: 2px solid rgba(255, 123, 16, 1);
            border-left: 0;
            border-bottom: 0;
            background: transparent;
            transform: rotate(45deg);
        }
        .sub {
            font-size: 26px;
            font-family: SourceHanSansCN-Bold;
            font-weight: bold;
            color: rgba(255, 123, 16, 1);
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
        .ivu-select-disabled .ivu-select-selection,
        .ivu-input[disabled],
        fieldset[disabled] .ivu-input {
            color: #515a6e;
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

