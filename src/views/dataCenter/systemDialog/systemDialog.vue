<template>

    <div class="systemDialog content-box clearfix">
        <div class="title">系统日志</div>
        <Form ref="formInline" :model="req" inline>
            <FormItem label="关键词" :label-width="70">
                <i-input v-model.trim="req.content" :maxlength="20" style="width: 200px"/>
            </FormItem>
            <FormItem label="日记类型" :label-width="80">
                <i-select v-model="req.tpye" style="width:140px">
                    <Option value="-1">全部</Option>
                </i-select>
            </FormItem>
            <FormItem label="时间" :label-width="60">
                <DatePicker type="datetimerange" format="yyyy/MM/dd hh:MM" v-model="req.time" :split-panels="true"
                            style="width: 260px"></DatePicker>
            </FormItem>
            <FormItem label="操作人" :label-width="85">
                <i-input v-model.trim="req.name" :maxlength="20" style="width: 100px"/>
            </FormItem>
            <FormItem style="float: right;">
                <Button type="primary" class="search-btn" @click="search()">查询</Button>
            </FormItem>
        </Form>
        <Divider dashed/>

        <Table :columns="columns" center :data="tableData"></Table>
        <Page style="text-align: center;margin-top: 20px;" :total="pageConfig.total"
              show-total
              show-elevator
              show-sizer
              :current="pageConfig.page"
              :page-size-opts="pageConfig.opts"
              :page-size="pageConfig.size"
              @on-change="pageChange"
              @on-page-size-change="sizeChange"/>
        <component :title="modalTitle" :is='com' :id='id' :flag="flag" @modal-close='ModalClose'></component>
    </div>
</template>
<script>
    import urls from '../../../service/Urls';
    import {datetimeformatFromString} from '../../../libs/dateUtils';
    import systemInfo from './systemInfo';

    export default {
        data() {
            return {
                addModal: false,
                req: {
                    'content': '',
                    'type': '-1',
                    time: [],
                    'startcreatetime': 1531190960000,
                    'endcreatetime': 1531190960000,
                    name: ''
                },
                columns: [
                    {
                        title: ' ',
                        width: 60,
                    },
                    {
                        title: '序号',
                        type: 'index',
                        width: 100,
                    },
                    {
                        title: '时间',
                        key: 'create_time_long',
                        render: (h, params) => {
                            return h('span', null, datetimeformatFromString(params.row.create_time_long));
                        }
                    },
                    {
                        title: '日记类型',
                        key: 'type'
                    },
                    {
                        title: '日记摘要',
                        key: 'content'
                    },
                    {
                        title: '操作人',
                        key: 'create_by'
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        width: 150,
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
                                        this.info(params.row.id);
                                    }
                                }
                            }, [
                                h('img', {
                                    attrs: {src: require('../../../assets/system/role/info.png')},
                                    style: {
                                        marginRight: '5px'
                                    },
                                }),
                                h('span', {
                                    style: {
                                        position: 'relative',
                                        top: '-4px'
                                    }
                                }, '详情')
                            ]);
                        }
                    }
                ],
                tableData: [
                    {
                        time: '2018-12-13',
                        type: '类型1',
                        info: '摘要1',
                        people: '操作人1',
                    },
                    {
                        time: '2018-12-11',
                        type: '类型2',
                        info: '摘要12',
                        people: '操作人2',
                    },

                ],
                modalTitle: '详情',
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
            initSearch() {
                this.pageConfig.page = 1;
                this.search();
            },
            search() {
                let data = {
                    content: this.req.content ? this.req.content : null,
                    type: this.req.type === '-1' ? null : this.req.type,
                    startcreatetime: this.req.time[0] ? new Date(this.req.time[0]).getTime() : null,
                    endcreatetime: this.req.time[1] ? new Date(this.req.time[1]).getTime() : null,
                    page: this.pageConfig.page,
                    size: this.pageConfig.size,
                };
                this.$ajax({
                    url: urls.system_log,
                    data: data
                }).then(data => {
                    if (data.code === 200) {
                        this.tableData = data.data;
                        this.pageConfig.total = data.totalRecords;
                    } else {
                        this.tableData = [];
                        this.pageConfig.total = 0;
                    }
                });
            },
            info(id) {
                this.addModal = true;
                this.com = systemInfo;
                this.id = id;
            },
            pageChange(page) {
                this.pageConfig.page = page;
            },
            sizeChange(size) {
                this.pageConfig.size = size;
                if (this.pageConfig.page === 1) {
                    this.pageChange(1);
                }
            },
            ModalClose() {
                this.com = null;
            }
        },
        created() {
            this.search();
        }
    };
</script>
<style lang="less">
    .systemDialog {
        .ivu-form {
            position: relative;
            z-index: 100;
        }
    }
</style>
