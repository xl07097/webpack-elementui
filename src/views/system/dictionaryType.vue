<template>
    <div class="dictionaryTypeManage">
        <div class="content-box">
            <div class="title">
                字典表类别管理
            </div>
            <Form ref="formInline" :model="formInline" inline style="margin-top: 34px;">
                <FormItem label="类别名称" :label-width="72">
                    <Input type="text" v-model="searchList.name"/>
                </FormItem>
                <FormItem label="类别分类" :label-width="72">
                    <Select v-model="searchList.type" style="width:140px">
                        <Option value="-1">全部</Option>
                        <Option :value=0>基础类别</Option>
                        <Option :value=1>字典类别</Option>
                    </Select>
                </FormItem>
                <FormItem style="float: right;">
                    <Button type="primary" class="search-btn" @click="Search()">查询</Button>
                </FormItem>
            </Form>
            <div class="divider"/>
            <div class="btn-box">
                <div class="action-btn" @click="add">
                    <img style="margin: 8px 6px;" src="../../assets/system/role/add.png"/>
                    新增
                </div>
                <!--<div class="action-btn" @click="trash">-->
                    <!--<img style="margin: 8px 6px;" src="../../assets/system/role/delete.png"/>-->
                    <!--删除-->
                <!--</div>-->
            </div>
            <Table ref="selection" :columns="columns" :data="data" @on-selection-change="selectionChange"></Table>
            <Page style="text-align: center;margin-top: 20px;"
                  :total="pageConfig.total"
                  show-total
                  show-elevator
                  show-sizer
                  :current="pageConfig.page"
                  :page-size-opts="pageConfig.opts"
                  :page-size="pageConfig.size"
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
            <Form :model="addForm" label-position="top" :rules="rules" ref="addForm">
                <Row>
                    <Col span="12" class="leftFormItem">
                        <FormItem label="类别名称" prop="name">
                            <Input v-model="addForm.name"></Input>
                        </FormItem>
                        <FormItem label="类别分类" prop="type">
                            <Select v-model="addForm.type">
                                <Option value="0">基础类别</Option>
                                <Option value="1">字典类别</Option>
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
    import urls from '../../service/Urls';

    export default {
        props: [''],
        data() {
            return {
                selectionValue: [],
                pageConfig: {
                    page: 1,
                    size: 10,
                    total: 0,
                    opts: [10, 20, 50, 100]
                },
                rules: {
                    name: [{required: true, message: '请输入类别名称', trigger: 'blur'}],
                    type: [{required: true, message: '请选择类别分类', trigger: 'change'}],
                },
                searchList: {
                    // user_name:'',
                    // real_name:'',
                    type: '-1',
                    // phone:'',
                    name: '',
                },
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
                        key: 'name'
                    },
                    {
                        title: '类别分类',
                        key: 'type',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.type === 1 ? '字典类别' : '基础类别')
                            ]);
                        }
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    },
                    // {
                    //     title: '状态',
                    //     key: 'status',
                    //     render: (h, params) => {
                    //         return h('div', [
                    //             h('i-switch', {
                    //                 props: {
                    //                     type: 'primary',
                    //                     value: params.row.status === 1
                    //                 },
                    //                 style: {
                    //                     marginRight: '5px'
                    //                 },
                    //                 on: {
                    //                     'on-change': () => {
                    //                         this.switch(params.row.id, params.row.status, params.row.user_name);
                    //                     }
                    //                 }
                    //             }),
                    //             h('span', params.row.status === 1 ? '启用' : '禁用')
                    //         ]);
                    //     }
                    // },
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
                                            this.edit(params.row);
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
                                            this.edit(params.row);
                                        }
                                    }
                                }, '编辑')
                            ]);
                        }
                    }
                ],
                data: [],
                dictionaryTypeList: [{name: '基础类别', id: 0}, {name: '字典类别', id: 1}],
                filterForm: {
                    page: 1,
                    size: 10
                },
                addForm: {
                    name: '',
                    type: '',
                    remark: ''
                },
                rightForm: {}
            };
        },
        methods: {
            getVendorId(val) {
                this.addForm.type = val.label.trim();//获取label
                this.addForm.code = val.value;//获取value
            },
            pageChange(page) {
                this.pageConfig.page = page;
                this.getList();
            },
            sizeChange(size) {
                this.pageConfig.size = size;
                if (this.pageConfig.page === 1) {
                    this.pageChange(1);
                }
            },
            add() {
                this.addtitle = '新增字典类别';
                this.addModal = true;
                this.addForm = {};
                this.id = '';
            },
            setRight() {
                this.rightModal = true;
            },
            Search() {
                this.pageConfig.page = 1;
                this.getList();
            },
            edit(row) {
                this.addtitle = '编辑字典类别';
                this.addModal = true;
                this.id = row.id;
                this.addForm.name = row.name;
                this.addForm.type = row.type.toString();
                this.addForm.code = row.code;
                this.addForm.remark = row.remark;
                this.getList();
            },
            closeaddModal() {
                this.addModal = false;
            },
            confirmaddModal() {
                this.$refs['addForm'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交！');
                        return false;
                    }
                    if (this.id) {
                        this.$ajax({
                            url: urls.dic_update,
                            data: {
                                id: this.id,
                                name: this.addForm.name,
                                type: this.addForm.type,
                                // code: this.addForm.code,
                                remark: this.addForm.remark
                            }
                        }).then(data => {
                            if (data.code === 200) {
                                this.$Message.success('编辑成功');
                                this.$emit('modal-close', true);
                                // this.data = data.data;
                                // this.pageConfig.total = data.totalRecords;
                                this.getList();
                                this.addForm = {};
                            } else {
                                this.data = [];
                                this.pageConfig.total = 0;
                            }
                        }).catch(err => {

                        });
                        this.addModal = false;
                    } else {
                        this.$ajax({
                            url: urls.dic_add,
                            data: this.addForm
                        }).then(data => {
                            if (data.code === 200) {
                                this.$Message.success('新增成功');
                                this.$emit('modal-close', true);
                                // this.data = data.data;
                                // this.pageConfig.total = data.totalRecords;
                                this.getList();
                                this.addForm = {};
                            } else {
                                this.data = [];
                                this.pageConfig.total = 0;
                            }
                        }).catch(err => {

                        });
                        this.addModal = false;
                    }
                })
            },
            selectionChange(value) {
                this.selectionValue = [];
                value.map(item => {
                    this.selectionValue.push(item.id);
                });
            },
            trash() {
                if (!this.selectionValue.length) {
                    this.$Message.error('请勾选要删除的信息');
                    return false;
                }
                let self = this;
                this.$confirm({
                    text: '确定删除信息？',
                    onOk: function () {
                        self
                            .$ajax({
                                url: urls.dic_status,
                                data: {
                                    ids: self.selectionValue,
                                    status: 0
                                }
                            })
                            .then(data => {
                                if (data.code === 200) {
                                    self.$Message.success('删除信息成功');
                                    self.getList();
                                } else {
                                    self.$Message.error('删除信息失败');
                                }
                            })
                    }
                });
            },
            getList() {
                this.selectionValue = [];
                this.$ajax({
                    url: urls.dic_type,
                    data: {
                        name: this.searchList.name,
                        page: this.pageConfig.page,
                        size: this.pageConfig.size,
                        type: this.searchList.type === '-1' ? null : this.searchList.type,
                    }
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.data = data.data;
                            this.pageConfig.total = data.totalRecords;
                        } else {
                            this.data = [];
                            this.pageConfig.total = 0;
                        }
                    })
            },
            switch(id, status, name) {
                let data = {};
                let text = '', msg1 = '', msg2 = '';
                if (status === 1) {
                    data.status = 2;
                    text = '确定禁用该信息？';
                    msg1 = '禁用成功';
                    msg2 = '禁用失败';
                } else {
                    data.status = 1;
                    text = '确定启用该信息？';
                    msg1 = '启用成功';
                    msg2 = '启用失败';
                }
                let self = this;
                this.$confirm({
                    text: text,
                    onOk: function () {
                        self.$ajax({
                            url: urls.dic_status,
                            data: {
                                ids: [id],
                                status: data.status
                            }
                        }).then(data => {
                            if (data.code === 200) {
                                self.$Message.success(msg1);
                                self.getList();
                            } else {
                                self.$Message.error(msg2);
                            }
                        });
                    },
                    cancel: function () {
                        self.getList();
                    }
                });
            },
        },
        watch: {//处理表单验证提示信息
            addModal(newValue) {
                if (!newValue) {
                    this.$refs['addForm'].resetFields();
                    this.addForm = {};
                }
            }
        },
        mounted() {
            this.getList();
        },
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
