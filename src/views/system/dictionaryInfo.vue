<template>
    <div class="dictionaryInfoManage">
        <div class="content-box clearfix">
            <div class="title">
                字典信息管理
            </div>
            <Form ref="formInline" :model="formInline" inline style="margin-top: 34px;">
                <FormItem label="字段名称" :label-width="72">
                    <Input type="text" v-model="formInline.value"/>
                </FormItem>
                <FormItem label="禁用状态" :label-width="72">
                    <Select v-model="formInline.status" style="width:140px">
                        <Option value="-1">全部</Option>
                        <Option :value=1>启用</Option>
                        <Option :value=2>禁用</Option>
                    </Select>
                </FormItem>
                <FormItem style="float: right;">
                    <Button type="primary" class="search-btn" @click="Search()">查询</Button>
                </FormItem>
            </Form>
            <div class="divider"/>
            <div class="infoLeft">
                <div class="inner">
                    <Tree :data="leftMenu"></Tree>
                </div>
            </div>
            <div class="infoRight">
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
        </div>
        <!-- 新增修改 -->
        <Modal
                class="dicInfoAddModal"
                :title="addtitle"
                v-model="addModal"
                :mask-closable="false"
                width='644'
                :styles="{top: '20px'}"
                class-name="vertical-center-modal">
            <Form :model="addForm" label-position="top" :rules="rules" ref="addForm">
                <Row>
                    <Col span="12" class="leftFormItem">
                        <FormItem label="字典表类别名称" prop="category_id">
                            <Select v-model="addForm.category_id">
                                <Option v-for="item in dictionaryNameList" :value="item.id" :key="item.id">{{ item.name
                                    }}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="字段名称" prop="value">
                            <Input v-model="addForm.value"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12" class="rightFormItem">
                        <FormItem label="字段排序" prop="orderby">
                            <Input v-model="addForm.orderby" number></Input>
                        </FormItem>
                        <!--<FormItem style="margin-top: 48px;" id="status">-->
                        <!--<span class="formLabel" style="font-size: 14px !important;">禁用状态</span>&emsp;<Switch-->
                        <!--v-model="addForm.status"/>-->
                        <!--</FormItem>-->
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
                pageConfig: {
                    page: 1,
                    size: 10,
                    total: 0,
                    opts: [10, 20, 50, 100]
                },
                rules: {
                    value: [{required: true, message: '请输入字段名称', trigger: 'blur'}],
                    orderby: [{required: true, message: '请输入字典排序', trigger: 'blur', type: 'number'}],
                    category_id: [{required: true, message: '请选择字典表类别', trigger: 'change'}],
                },
                searchList: {
                    name: '',
                },
                addModal: false,
                rightModal: false,
                addtitle: '',
                formInline: {
                    value: '',
                    status: '-1'
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
                        title: '字典表类别名称',
                        key: 'category_id'
                    },
                    {
                        title: '字段名称',
                        key: 'value'
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
                                            this.switch(params.row.id, params.row.status, params.row.user_name);
                                        }
                                    }
                                }),
                                h('span', params.row.status === 1 ? '启用' : '禁用')
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
                                            this.editRole(params.row);
                                        }
                                    }
                                }),
                                h(
                                    'span',
                                    {
                                        style: {
                                            marginLeft: '5px',
                                            cursor: 'pointer'
                                        },
                                        on: {
                                            click: () => {
                                                this.editRole(params.row);
                                            }
                                        }
                                    },
                                    '编辑'
                                )
                            ]);
                        }
                    }
                ],
                data: [],
                dictionaryTypeList: [{name: '基础类别', id: 0}, {name: '字典类别', id: 1}],
                dictionaryNameList: [],
                filterForm: {
                    page: 1,
                    size: 10
                },
                selectionValue: [],
                addForm: {
                    category_id: '',
                    value: '',
                    orderby: ''
                },
                rightForm: {},
                leftMenu: [{
                    title: '字典表',
                    expand: true,
                    children: [
                        {
                            title: '基础代码',
                            expand: true,
                            children: [
                                {
                                    title: '学历',
                                    children: [],
                                },
                                {
                                    title: '性别'
                                },
                                {
                                    title: '年级'
                                },
                                {
                                    title: '班级'
                                },

                            ]
                        },
                        {
                            title: '财务代码',
                            expand: true,
                            children: [
                                {
                                    title: '财务'
                                },
                            ]
                        }
                    ]
                }]
            };
        },
        methods: {
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
            addRole() {
                this.addtitle = '新增字典类别';
                this.addModal = true;
                this.getDicList();
            },
            setRight() {
                this.rightModal = true;
            },
            Search() {
                this.getList();
            },
            editRole(row) {
                this.getDicList();
                this.addtitle = '编辑字典信息';
                this.addModal = true;
                this.id = row.id;
                this.addForm.value = row.value;
                this.addForm.orderby = row.orderby;
                this.$ajax({
                    url: urls.dictionary_id,
                    data: {
                        id: this.id
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.addForm.category_id = data.data.category_id;
                    } else {

                    }
                });
                // if (row.status === 1) {
                //     this.addForm.status = true;
                // }
                // document.getElementById('status').style.display = 'none';

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
                            url: urls.dictionary_edit,
                            data: {
                                id: this.id,
                                category_id: this.addForm.category_id,
                                value: this.addForm.value,
                                orderby: this.addForm.orderby,
                                // status: this.addForm.status === true ? 0 : 1
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
                            url: urls.dictionary_add,
                            data: {
                                category_id: this.addForm.category_id,
                                value: this.addForm.value,
                                orderby: this.addForm.orderby,
                                // status: this.addForm.status === true ? 0 : 1,
                            }
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
            deleteRole() {
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
                                url: urls.dictionary_status,
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
                    },
                    cancel: function () {
                        self.search();
                    }
                });
            },
            // getTree() {
            //     this.$ajax({
            //         url: urls.dic_type,
            //         data: {
            //             name: this.formInline.dictionaryName,
            //             page: this.pageConfig.page,
            //             size: this.pageConfig.size,
            //             status: this.formInline.status === '-1' ? null : this.formInline.status,
            //         }
            //     })
            //         .then(data => {
            //             if (data.code === 200) {
            //                 this.data = data.data;
            //                 this.pageConfig.total = data.totalRecords;
            //             } else {
            //                 this.data = [];
            //                 this.pageConfig.total = 0;
            //             }
            //         })
            // },
            getDicList() {
                this.$ajax({
                    url: urls.dic_all,
                    data: {}
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.dictionaryNameList = data.data;
                            this.pageConfig.total = data.totalRecords;
                        } else {
                            this.data = [];
                            this.pageConfig.total = 0;
                        }
                    })
            },
            getList() {
                this.$ajax({
                    url: urls.dictionary_info,
                    data: {
                        value: this.formInline.value,
                        page: this.pageConfig.page,
                        size: this.pageConfig.size,
                        status: this.formInline.status === '-1' ? null : this.formInline.status,
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
                            url: urls.dictionary_status,
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
            // this.getTree();
        },
    };
</script>
<style lang="scss">
    .dicInfoAddModal {
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

    .dictionaryInfoManage {
        .content-box {
            padding: 30px 44px;
            .ivu-form {
                position: relative;
                z-index: 100;
            }
            .title {
                height: 26px;
                line-height: 26px;
                color: #333333;
                font-size: 26px;
                font-weight: bold;
            }

            .infoLeft {
                /*float: left;*/
                position: absolute;
                background: transparent;
                left: 44px;
                top: 0;
                height: 100%;
                width: 240px;
                padding-top: 170px;
                padding-bottom: 29px;
                box-sizing: border-box;
                z-index: 90;
                .inner {
                    width: 100%;
                    height: 100%;
                    background-color: #F7FAFA;
                    overflow: auto;
                }
            }
            .infoRight {
                position: absolute;
                left: 300px;
                right: 50px;
            }

        }

    }
</style>
