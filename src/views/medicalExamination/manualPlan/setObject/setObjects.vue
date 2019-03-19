<template>
    <div>
        <div class="content-box">
            <div class="title">
                设定体检计划
            </div>
            <Form v-model="req" inline style="margin-top: 34px;" :label-width="72">
                <FormItem label="体检年份">
                    <DatePicker type="year" v-model="req.year" :options="dateOpts" placeholder="请选择"
                                style="width: 140px"></DatePicker>
                </FormItem>
                <FormItem label="体检类型">
                    <i-select style="width:140px" v-model="req.type">
                        <Option value="-1">全部</Option>
                        <Option :value="1">健康体检</Option>
                        <Option :value="2">升学体检</Option>
                    </i-select>
                </FormItem>
                <FormItem label="体检医院">
                    <i-select style="width:200px" filterable v-model="req.dep_id">
                        <i-option value="-1">全部</i-option>
                        <Option v-for="item in hospitalList" :value="item.id" :key="item.id">{{item.name}}</Option>
                    </i-select>
                </FormItem>
                <FormItem label="体检计划代号" :label-width="102">
                    <i-input v-model.trim="req.code"/>
                </FormItem>
                <FormItem style="float: right;">
                    <Button type="primary" class="search-btn" @click="initSearch()">查询</Button>
                </FormItem>
            </Form>
            <Divider dashed/>
            <div class="btn-box">
                <div class="action-btn" @click="add">
                    <img style="margin: 8px 6px;" src="../../../../assets/common/add.png" alt="add"/>
                    新增
                </div>
            </div>
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
        </div>
        <component :title="modalTitle" :is='com' :id='id' :flag="flag" @modal-close='ModalClose'></component>
    </div>
</template>
<script>
    import urls from '../../../../service/Urls';
    import addObject from './addObject';

    export default {
        name: 'setObjects',
        data() {
            return {
                req: {
                    year: '',
                    type: '-1',
                    dep_id: '-1',
                    code: null
                },
                tableData: [],
                dateOpts: {
                    disabledDate(date) {
                        let d = new Date();
                        return date && date.getFullYear() < d.getFullYear();
                    }
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
                                            this.switch(params.row.id, params.row.status);
                                        }
                                    }
                                }),
                                h('span', null, params.row.status === 1 ? '启用' : '禁用')
                            ]);
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
                            let span1 =  h('span', {
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
                                }, '详情')]);
                            let span2 =           h('span', {
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
                                }, '编辑')]);
                            if(params.row.status === 1 || params.row.status === 2){
                                return h('span', {}, [span1,span2]);
                            }
                            if(params.row.status === 3 || params.row.status === 4){
                                return h('span', {}, [span1]);
                            }

                        }
                    }
                ],
                hospitalList: [],
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
            initSearch() {
                // 重新查询时页面置为第一页
                this.pageConfig.page = 1;
                this.search();
            },
            search() {
                this.$ajax({
                    url: urls.media_list,
                    data: {
                        page: this.pageConfig.page,
                        size: this.pageConfig.size,
                        year: this.req.year ? String(this.req.year.getFullYear()) : null,
                        type: this.req.type === '-1' ? null : this.req.type,
                        dept_id: this.req.dep_id === '-1' ? null : this.req.dep_id,
                        code: this.req.code ? this.req.code : null,
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
            switch(id, status) {
                let data = {};
                let text = '';
                let msg1 = '', msg2 = '';
                if (status === 1) {
                    data.status = 2;
                    text = '确定禁用该体检计划？';
                    msg1 = '禁用成功';
                    msg2 = '禁用失败';
                } else {
                    data.status = 1;
                    text = '确定启用该体检计划？';
                    msg1 = '启用成功';
                    msg2 = '启用失败';
                }
                let self = this;
                this.$confirm({
                    text: text,
                    onOk: function () {
                        self.$ajax({
                            url: urls.media_status,
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
                        self.search();
                    }
                });
            },
            add() {
                this.com = addObject;
                this.id = '';
                this.flag = false;
                this.modalTitle = '新增';
            },
            edit(id) {
                this.com = addObject;
                this.id = id;
                this.flag = false;
                this.modalTitle = '编辑';
            },
            info(id) {
                this.com = addObject;
                this.id = id;
                this.flag = true;
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
                this.com = null;
                if (flag) {
                    this.search();
                }
            }
        },
        created() {
            this.getSelectCondition(3);
            this.search();
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

    .page {
        margin-top: 24px;
        text-align: center;
    }
</style>
