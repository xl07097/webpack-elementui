<template>
    <div class="encoding">
        <div class="content-box">
            <div class="title">
                接入编码管理
            </div>
            <Form ref="formInline" :model="formInline" inline style="margin-top: 34px;">
            </Form>
            <div class="divider"/>
            <div class="btn-box">
                <div class="action-btn" @click="addEncoding">
                    <img style="margin: 8px 6px;" src="../../../../assets/system/role/add.png"/>
                    新增
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
                class="encodingAddModal"
                :title="addtitle"
                v-model="addModal"
                :mask-closable="false"
                width='644'
                :styles="{top: '20px'}"
                class-name="vertical-center-modal"
                @on-cancel="closeaddModal">
            <Form ref="addFormValidate" :model="addForm" label-position="top" :rules="addFormValidate">
                <Row>
                    <Col span="12" class="leftFormItem">
                        <FormItem label="前缀" prop="prefix">
                            <Input v-model.trim="addForm.prefix" class="prefix"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12" class="rightFormItem">
                        <FormItem label="备注">
                            <Input v-model.trim="addForm.remark" type="textarea"/>
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
                addtitle: '',
                editRowIndex: '',
                formInline: {},
                totalRecords: 2,
                columns: [
                    {
                        title: '序号',
                        type: 'index',
                        align: 'center'
                    },
                    {
                        title: '前缀',
                        key: 'prefix'
                    },
                    {
                        title: '起始',
                        key: 'startNum'
                    },
                    {
                        title: '结束',
                        key: 'endNum'
                    },
                    {
                        title: '当前',
                        key: 'currentNum'
                    },
                    {
                        title: '备注',
                        key: 'remark'
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
                                            this.changeStatus(params.row.id, params.row.status, params.index);
                                        }
                                    }
                                }),
                                h('span',params.row.status === 1 ? '启用' : '禁用')
                            ])
                        }
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {src: require('../../../../assets/system/role/edit.png')},
                                    style: {
                                        display: 'inline-block',
                                        width: '20px',
                                        height: '20px',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.editEncoding(params.row);
                                        }
                                    }
                                }),
                                h(
                                    'span',
                                    {
                                        style: {
                                            position: 'relative',
                                            left: '5px',
                                            top: '-3px',
                                            cursor: 'pointer'
                                        },
                                        on: {
                                            click: () => {
                                                this.editEncoding(params.row);
                                            }
                                        }
                                    },
                                    '编辑'
                                )
                            ]);
                        }
                    }
                ],

                data: [
                    {
                        prefix: 'test1',
                        startNum: '0001',
                        endNum: '9999',
                        currentNum: '0011',
                        remark: '测试1',
                        status: 1
                    },
                    {
                        prefix: 'test2',
                        startNum: '0001',
                        endNum: '9999',
                        currentNum: '0021',
                        remark: '测试2',
                        status: 1
                    },
                ],
                addFormValidate: {
                    prefix: [
                        {required: true, message: '请输入前缀', trigger: 'blur'},
                    ],
                },
                filterForm: {
                    page: 1,
                    size: 10
                },
                addForm: {
                    prefix: '',
                    remark: ''
                },
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
            addEncoding() {
                this.$refs['addFormValidate'].resetFields();
                this.addForm = {
                    prefix: '',
                    remark: ''
                }
                this.addtitle = '新增接入编码';
                this.addModal = true;
            },
            Search() {
                this.$Message.success('查询');
            },
            editEncoding(row) {
                this.editRowIndex = row._index;
                this.addtitle = '修改接入编码';
                this.addForm.prefix = row.prefix;
                this.addForm.remark = row.remark;
                this.addModal = true;
            },
            changeStatus(id, status, index) {
                if (status === 1) {
                    this.$set(this.data[index], 'status', 2);
                    this.$Message.success('禁用成功');
                } else {
                    this.$set(this.data[index], 'status', 1);
                    this.$Message.success('启用成功');
                }
            },
            closeaddModal() {
                this.$refs['addFormValidate'].resetFields();
                this.addModal = false;
            },
            confirmaddModal() {
                this.$refs['addFormValidate'].validate((valid) => {
                    if (valid) {
                        if (this.addtitle == '新增接入编码') {
                            this.data.push({
                                prefix: this.addForm.prefix,
                                startNum: '1',
                                endNum: '9999',
                                currentNum: '0001',
                                remark: this.addForm.remark,
                                status: 1
                            });
                        } else {
                            this.data[this.editRowIndex].prefix = this.addForm.prefix;
                            this.data[this.editRowIndex].remark = this.addForm.remark;
                        }
                        this.$Message.success('操作成功!');
                        this.addModal = false;
                    } else {
                        return;
                    }
                });
            },
        }
    };
</script>
<style lang="scss">
    .encodingAddModal {
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
            .ivu-btn-primary {
                span {
                    position: relative;
                    top: -5px;
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

    .encoding {
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
