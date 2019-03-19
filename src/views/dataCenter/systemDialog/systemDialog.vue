<template>
    <div class="systemDialog">
        <div class="content-box clearfix">
            <div class="title">
                系统日志
            </div>
            <Form ref="formInline" :model="req" inline style="margin-top: 34px;">
                <FormItem label="关键词" :label-width="85">
                    <i-input v-model.trim="req.keyword" style="width: 200px"/>
                </FormItem>
                <FormItem label="日记类型" :label-width="90">
                    <i-select v-model="req.tpye" style="width:130px">
                        <Option value="0">全部</Option>
                    </i-select>
                </FormItem>
                <FormItem label="时间" :label-width="85">
                    <DatePicker type="date" v-model="req.date" style="width: 110px"></DatePicker>
                </FormItem>
                <FormItem label="操作人" :label-width="85">
                    <i-input v-model.trim="req.name" style="width: 100px"/>
                </FormItem>
                <FormItem style="float: right;">
                    <Button type="primary" class="search-btn" @click="search()">查询</Button>
                </FormItem>
            </Form>
            <Divider dashed/>

            <Table :columns="columns" :data="tableData"></Table>
            <Page style="text-align: center;margin-top: 20px;" :total="pageConfig.total"
                  show-total
                  show-elevator
                  show-sizer
                  :current="pageConfig.page"
                  :page-size-opts="pageConfig.opts"
                  :page-size="pageConfig.size"
                  @on-change="pageChange"
                  @on-page-size-change="sizeChange"/>
        </div>
        <Modal
                class="dicInfoAddModal"
                title="详情"
                v-model="addModal"
                :mask-closable="false"
                width='644'
                :styles="{top: '20px'}"
                class-name="vertical-center-modal">
            <Form :model="addForm" label-position="top" inline>
                <FormItem label="时间" style="width:200px;margin-right: 66px!important;">
                    <i-input v-model="addForm.fieldName" disabled/>
                </FormItem>
                <FormItem label="日志类型" style="width:105px;margin-right: 2px!important;">
                    <i-input v-model="addForm.fieldName" disabled/>
                </FormItem>
                <FormItem label="操作人" style="width:105px;margin-right: 0!important;">
                    <i-input v-model="addForm.fieldName" disabled/>
                </FormItem>
                <FormItem label="日志摘要" style="width:100%;margin-right: 0!important;">
                    <i-input type="textarea" v-model="addForm.order" disabled/>
                </FormItem>
            </Form>
        </Modal>

    </div>
</template>
<script>
    export default {
        props: [''],
        data() {
            return {
                addModal: false,
                req: {
                    name: '',
                    tpye: '0',
                    keyword: '',
                },
                columns: [
                    {
                        title: '序号',
                        type: 'index',
                        align: 'center'
                    },
                    {
                        title: '时间',
                        key: 'time',
                        align: 'center'
                    },
                    {
                        title: '日记类型',
                        key: 'type',
                        align: 'center'
                    },
                    {
                        title: '日记摘要',
                        key: 'info',
                        align: 'center'
                    },
                    {
                        title: '操作人',
                        key: 'people',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        align: 'center',
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
                            },[
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
                                },'详情')
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
                addForm: {
                    dictionaryName: '',
                    dictionaryType: '',
                    fliedName: '',
                    order: 1,
                },
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
                    page: this.pageConfig.page,
                    size: this.pageConfig.size,
                };
                this.$ajax({
                    url: '',
                    data: data
                }).then(data => {
                    if (data.code === 200) {
                        this.tableData = data.data;
                    }
                });
            },
            info(id) {
                this.addModal = true;
            },
            pageChange(page) {
                this.pageConfig.page = page;
                // this.getList();
            },
            sizeChange(size) {
                this.pageConfig.size = size;
                if (this.pageConfig.page === 1) {
                    this.pageChange(1);
                }
            }
        },
        created() {

        }
    };
</script>
<style lang="scss">
    .systemDialog {
        .content-box {
            padding: 30px 44px;

            .ivu-form {
                position: relative;
                z-index: 100;
            }
            .divider {
                margin-bottom: 20px;
            }
            .title {
                height: 26px;
                line-height: 26px;
                color: #333333;
                font-size: 26px;
                font-weight: bold;
            }
            .editBtn:hover{
                opacity: 0.7;
            }

        }
    }

    .dicInfoAddModal {
        .ivu-form-item-label {
            font-size: 14px !important;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(126, 132, 133, 1) !important;
        }
        .ivu-modal-body {
            padding-left: 78px !important;
            padding-right: 78px !important;
        }
        .ivu-modal-footer {
            display: none;
        }
    }
</style>
