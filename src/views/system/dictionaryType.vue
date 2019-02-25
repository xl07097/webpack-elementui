<template>
    <div class="dictionaryTypeManage">
        <div class="content-box">
            <div class="title">
                字典表类别管理
            </div>
            <Form ref="formInline" :model="formInline" inline style="margin-top: 34px;">
                <FormItem label="类别名称" :label-width="72">
                    <Input type="text" v-model="formInline.dictionaryName"/>
                </FormItem>
                <FormItem label="类别分类" :label-width="72">
                    <Select v-model="formInline.status" style="width:140px">
                        <Option value="1">启用</Option>
                        <Option value="2">禁用</Option>
                        <Option value="3">冻结</Option>
                    </Select>
                </FormItem>
                <FormItem style="float: right;">
                    <Button type="primary" class="search-btn" @click="Search()">查询</Button>
                </FormItem>
            </Form>
            <div class="divider"/>
            <div class="btn-box">
                <div class="action-btn" @click="addRole">
                    <img style="margin: 8px 6px;" src="../../assets/system/role/add.png"/>
                    新增
                </div>
                <div class="action-btn" @click="deleteRole">
                    <img style="margin: 8px 6px;" src="../../assets/system/role/delete.png"/>
                    删除
                </div>
            </div>
            <Table ref="selection" :columns="columns" :data="data"></Table>
            <Page style="text-align: center;margin-top: 20px;"
                  :total="totalRecords"
                  :current="filterForm.page"
                  show-total
                  show-elevator
                  show-sizer
                  :page-size-opts="[10,20,50,100]"
                  @on-change="pageChange"
                  @on-page-size-change="sizeChange"
            />
        </div>
        <!-- 新增修改 -->
        <Modal
                :title="addtitle"
                v-model="addModal"
                class="dicTypeAddModal"
                width='644'
                :styles="{top: '20px'}"
                class-name="vertical-center-modal">
            <Form :model="addForm" label-position="top">
                <Row>
                    <Col span="12" class="leftFormItem">
                        <FormItem label="类别名称">
                            <Input v-model="addForm.dictionaryName"></Input>
                        </FormItem>
                        <FormItem label="类别分类">
                            <Select v-model="addForm.dictionaryType">
                                <Option v-for="item in dictionaryTypeList" :value="item.id" :key="item.id">
                                    {{ item.name }}
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12" class="rightFormItem">
                        <FormItem label="备注">
                            <Input v-model="addForm.remark" type="textarea"/>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div class="footer">
                <i-button class="close" type='default' @click='closeaddModal'>取消</i-button>
                <i-button class="confirm" type="primary" @click='confirmaddModal'>保存</i-button>
            </div>
        </Modal>

    </div>
</template>
<script>
    export default {
        props: [''],
        data() {
            return {
                addModal: false,
                rightModal: false,
                addtitle: '',
                formInline: {
                    dictionaryName: '',
                    status: ''
                },
                totalRecords: 0,
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '序号',
                        type: 'index'
                    },
                    {
                        title: '类别名称',
                        key: 'dictionaryName'
                    },
                    {
                        title: '类别分类',
                        key: 'dictionaryType'
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            let statusShow = params.row.status === 0 ? '禁用' : '启用';
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
                                        'on-change': value => {
                                            alert('状态');
                                        }
                                    }
                                }),
                                h('span', {
                                    style: {
                                        marginRight: '5px'
                                    }
                                 }, statusShow)
                            ]);
                        }
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {src: require('../../assets/system/role/edit.png')},
                                    style: {
                                        display: 'inline-block',
                                        width: '20px',
                                        height: '20px',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.editRole();
                                        }
                                    }
                                }),
                                h('span', {
                                    style: {
                                        marginLeft: '5px',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.editRole();
                                        }
                                    }
                                }, '编辑')
                            ]);
                        }
                    }
                ],
                data: [
                    {
                        dictionaryName: '类别名称12',
                        dictionaryType: '类型1',
                        remark: '备注12',
                        status: 1
                    },
                    {
                        dictionaryName: '类别名称121',
                        dictionaryType: '类型121',
                        remark: '备注121',
                        status: 1
                    },
                    {
                        dictionaryName: '类别名称122',
                        dictionaryType: '类型122',
                        remark: '备注122',
                        status: 0
                    },
                    {
                        dictionaryName: '类别名称123',
                        dictionaryType: '类型123',
                        remark: '备注123',
                        status: 1
                    },
                ],
                dictionaryTypeList: [{name: '类别1', id: 1}, {name: '类别2', id: 2}, {name: '类别3', id: 3}],
                filterForm: {
                    page: 1,
                    size: 10
                },
                addForm: {
                    dictionaryName: '',
                    dictionaryType: '',
                    status: false,
                    remark: ''
                },
                rightForm: {}
            };
        },
        methods: {
            pageChange(page) {
                this.filterForm.page = page;
                // this.getList();
            },
            sizeChange(size) {
                this.filterForm.size = size;
                if (this.filterForm.page === 1) {
                    this.pageChange(1);
                }
            },
            addRole() {
                this.addtitle = '新增字典类别';
                this.addModal = true;
            },
            setRight() {
                this.rightModal = true;
            },
            Search() {
                alert('查询');
            },
            editRole() {
                this.addtitle = '新增字典类别';
                this.addModal = true;
            },
            closeaddModal() {
                alert('取消');
                this.addModal = false;
            },
            confirmaddModal() {
                alert('新增');

                this.addModal = false;
            },

            deleteRole() {
                let messageWarning = '是否启用该字典？';
                this.$confirm({
                    text: messageWarning,
                    onOk: () => {
                        alert('删除');
                    },
                    cancel: () => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    }
                });
            }
        }
    };
</script>
<style lang="scss">
    .dicTypeAddModal {
        .ivu-form-item-label {
            font-size: 14px !important;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(126, 132, 133, 1) !important;
        }
        .ivu-modal-body {
            padding-top: 57px !important;
            .leftFormItem {
                padding-left: 62px;
                width: 262px;
                .formLabel {
                    font-size: 14px !important;
                    font-family: SourceHanSansCN-Regular;
                    font-weight: 400;
                    color: rgba(126, 132, 133, 1) !important;
                }
            }
            .rightFormItem {
                padding-left: 66px;
                width: 266px;
                .ivu-input {
                    width: 200px;
                    height: 114px !important;
                }
            }
        }
        .footer {
            margin: 139px 38px 22px 0;
            text-align: right;
            .confirm {
                width: 70px;
                height: 30px;
            }
            .close {
                width: 70px;
                height: 30px;
                margin-right: 28px;
            }
        }
        .ivu-modal-footer {
            display: none;
        }
    }

    .dictionaryTypeManage {
        .content-box {
            padding: 30px 44px;
            .title {
                height: 26px;
                line-height: 26px;
                color: #333333;
                font-size: 26px;
                font-weight: bold;
            }
        }

    }
</style>
