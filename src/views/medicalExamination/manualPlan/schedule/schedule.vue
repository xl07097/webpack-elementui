<template>
    <div class="content-box">
        <div class="title">体检排程</div>
        <Form v-model="req" inline :label-width="72">
            <FormItem label="体检年份">
                <DatePicker type="year" v-model="req.year" :options="dateOpts" placeholder="请选择"
                            style="width: 140px"></DatePicker>
            </FormItem>
            <FormItem label="体检类型">
                <Select style="width:140px" v-model="req.type">
                    <Option value="-1">全部</Option>
                    <Option :value="1">健康体检</Option>
                    <Option :value="2">升学体检</Option>
                </Select>
            </FormItem>
            <FormItem label="医疗机构名称" :label-width="102">
                <Select style="width:200px" filterable v-model="req.dep_id">
                    <Option value="-1">全部</Option>
                    <Option v-for="item in hospitalList" :value="item.id" :key="item.id">{{item.name}}</Option>
                </Select>
            </FormItem>
            <FormItem label="体检计划代号" :label-width="102">
                <Input v-model.trim="req.code" :maxlength="15"/>
            </FormItem>
            <FormItem style="float: right;">
                <Button type="primary" class="search-btn" @click="search()">查询</Button>
            </FormItem>
        </Form>
        <Divider dashed/>
        <Table :columns="columns" :data="tableData"></Table>
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
        <component :title="modalTitle" :is='com' :id='id' :flag="flag" :code="code"
                   @modal-close='ModalClose'></component>
    </div>
</template>
<script>
    import urls from '../../../../service/Urls';
    import setSchedule from './setSchedule';

    export default {
        name: 'schedule',
        data() {
            return {
                req: {
                    year: '',
                    type: '-1',
                    dep_id: '-1',
                    code: null
                },
                columns: [
                    {
                        title: '序号',
                        type: 'index',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '体检年份',
                        key: 'year'
                    },
                    {
                        title: '体检计划代号',
                        key: 'code'
                    },
                    {
                        title: '体检类型',
                        key: 'type',
                        render(h, params) {
                            return h('span', null, params.row.type === 1 ? '健康体检' : '升学体检');
                        }
                    },
                    {
                        title: '体检医院',
                        key: 'dep_id'
                    },
                    {
                        title: '体检计划状态',//1新建2已排程
                        key: 'state',
                        render(h, params) {
                            if (params.row.status === 1) {
                                return h('span', null, '新建');
                            }
                            if (params.row.status === 2) {
                                return h('span', null, '禁用');
                            }
                            if (params.row.status === 3) {
                                return h('span', null, '正在排程');
                            }
                            if (params.row.status === 4) {
                                return h('span', null, '已排程');
                            }
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
                            let span1 = h('span', {
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
                                        src: require('../../../../assets/common/detail.png')
                                    }
                                }),
                                h('span', {
                                    style: {
                                        position: 'relative',
                                        top: '-4px'
                                    }
                                }, '详情')
                            ]);
                            let span2 = h('span', {
                                attrs: {
                                    class: 'editBtn'
                                },
                                on: {
                                    click: () => {
                                        this.doSchedule(params.row.id, params.row.code);
                                    }
                                }
                            }, [
                                h('img', {
                                    style: {
                                        marginRight: '8px'
                                    },
                                    attrs: {
                                        src: require('../../../../assets/medicalExamination/schedule.png')
                                    }
                                }),
                                h('span', {
                                    style: {
                                        position: 'relative',
                                        top: '-4px'
                                    }
                                }, '排程')
                            ]);
                            if (params.row.status === 1 || params.row.status === 2) {
                                return h('div', null, [span1, span2]);
                            }
                            if (params.row.status === 3) {
                                return h('div', null, [span1, span2]);
                            }
                            if (params.row.status === 4) {
                                return h('div', null, [span1]);
                            }
                        }
                    }
                ],
                dateOpts: {
                    //禁止选择当年之前的年份
                    disabledDate(date) {
                        let d = new Date();
                        return date && date.getFullYear() < d.getFullYear();
                    }
                },
                isDetail: false,
                isSchedule: false,
                schoolDataList: [],
                tableData: [],
                modalTitle: '',
                id: '',
                flag: false, // 详情时标志
                com: null,
                code: '',
                hospitalList: [],
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
                            this.hospitalList = data.data.filter((item) => {
                                return item.type === type;
                            });
                        } else {
                            this.hospitalList = [];
                        }
                    })
                    .catch(err => {
                        window.console.log(err);
                    });
            },
            search() {
                this.$ajax({
                    url: urls.media_list,
                    data: {
                        page: this.pageConfig.page,
                        size: this.pageConfig.size,
                        year: this.req.year ? this.req.year.getFullYear() : null,
                        type: this.req.type === '-1' ? null : this.req.type,
                        dep_id: this.req.dep_id === '-1' ? null : this.req.dep_id,
                        code: this.req.code ? this.req.code : null
                    }
                }).then((json) => {
                    if (json.code === 200) {
                        this.tableData = json.data;
                        this.pageConfig.total = json.totalRecords;
                    } else {
                        this.tableData = [];
                        this.pageConfig.total = 0;
                    }
                });
            },
            doSchedule(id, code) {
                this.com = setSchedule;
                this.id = id;
                this.flag = 2;
                this.code = code;
                this.modalTitle = '体检计划排程';
            },
            info(id) {
                this.com = setSchedule;
                this.id = id;
                this.flag = 1;
                this.modalTitle = '详情';
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
                if (flag) {

                }else {
                    this.com = null;
                }
                this.search();
            }
        },
        mounted() {
            this.getSelectCondition(3);
            this.search();
        },
    };
</script>
<style lang="less">
    .modal-form-min {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .modal-form-min .ivu-form-item {
        margin-right: 0 !important;
    }
    .ivu-modal-no-mask {
        z-index: 1999 !important;
    }
</style>

