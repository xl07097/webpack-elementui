<template>
    <div class="roleManage">
        <div class="content-box">
            <div class="title">
                角色管理
            </div>
            <Form ref="formInline" :model="searchList" inline style="margin-top: 34px;">
                <FormItem label="角色名称" :label-width="72">
                    <Input type="text" v-model="searchList.name"/>
                </FormItem>
                <FormItem label="使用状态" :label-width="72">
                    <Select v-model="searchList.status" style="width:140px">
                        <Option value="-1">全部</Option>
                        <Option :value="1">启用</Option>
                        <Option :value="2">禁用</Option>
                        <Option :value="3">冻结</Option>
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
                <!--<div class="action-btn" @click="setRight">-->
                <!--<img style="margin: 8px 6px;" src="../../assets/system/role/jurisdiction.png"/>-->
                <!--配置权限-->
                <!--</div>-->
                <div class="action-btn" @click="trash">
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
        <!-- 新增修改 -->
        <Modal
                class="roleAddModal"
                :title="addtitle"
                v-model="addModal"
                :mask-closable="false"
                width='644'
                :styles="{top: '20px'}"
                class-name="vertical-center-modal">
            <Form :model="addForm" label-position="top" ref="addForm" :rules="rules">
                <Row>
                    <Col span="12" class="leftFormItem">
                        <FormItem label="角色名称" prop="name">
                            <Input v-model="addForm.name" class="roleName"/>
                        </FormItem>
                    </Col>
                    <Col span="12" class="rightFormItem">
                        <FormItem label="功能权限描述" prop="remark">
                            <Input v-model="addForm.remark" class="roleName" type="textarea"/>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div class="footer">
                <i-button class="close" type='default' @click='closeaddModal'>取消</i-button>
                <i-button class="confirm" type="primary" @click='confirmaddModal'>保存</i-button>
            </div>
        </Modal>
        <!-- 权限配置 -->
        <Modal
                class="roleAddModal"
                :title="addtitle"
                v-model="conModal"
                :mask-closable="false"
                width='644'
                :styles="{top: '20px'}"
                class-name="vertical-center-modal">
            <Form :model="addForm" label-position="top">
                <Row>
                    <Col span="12" class="leftFormItem">
                        <FormItem label="角色名称">
                            <Input v-model="configForm.name" class="roleName"/>
                        </FormItem>
                    </Col>
                    <Col span="12" class="rightFormItem">
                        <FormItem label="功能权限">
                            <i-select v-model="configForm.authority" style="width:200px" multiple filterable>
                                <i-option v-for="item of menuList" :key="item.id" :value='item.id'>{{item.name}}
                                </i-option>
                            </i-select>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div class="footer">
                <i-button class="close" type='default' @click='closeRoleModal'>取消</i-button>
                <i-button class="confirm" type="primary" @click='confirmRoleFunction'>保存</i-button>
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
                addModal: false,
                conModal: false,
                rightModal: false,
                addtitle: '',
                configForm: {
                    name: '',
                    authority: []
                },
                rules: {
                    name: [{required: true, message: '请输入角色名称', trigger: 'blur'}],
                    remark: [{required: true, message: '请输入功能描述', trigger: 'blur'}],
                },
                menuList: [],
                formInline: {
                    roleName: '',
                    status: ''
                },
                pageConfig: {
                    page: 1,
                    size: 10,
                    total: 0,
                    opts: [10, 20, 50, 100]
                },
                searchList: {
                    status: '-1',
                    name: ''
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
                        title: '角色名称',
                        key: 'name'
                    },
                    {
                        title: '功能权限描述',
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
                                        marginRight: '5px'
                                    },
                                    on: {
                                        'on-change': () => {
                                            this.switch(params.row.id, params.row.status, params.row.name);
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
                                            this.editUser(params.row);
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
                                                this.editUser(params.row);
                                            }
                                        }
                                    },
                                    '编辑'
                                ),
                                h('img', {
                                    attrs: {src: require('../../assets/system/role/jurisdiction.png')},
                                    style: {
                                        display: 'inline-block',
                                        width: '20px',
                                        height: '20px',
                                        cursor: 'pointer',
                                        marginLeft: '15px',
                                    },
                                    on: {
                                        click: () => {
                                            this.setRight(params.row);
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
                                                this.setRight(params.row);
                                            }
                                        }
                                    },
                                    '配置权限'
                                )
                            ]);
                        }
                    }
                ],
                data: [],
                selectionValue: [],
                rigtTree: [
                    {
                        title: '系统管理',
                        expand: true,
                        children: [
                            {
                                title: '用户管理',
                                expand: true
                            },
                            {
                                title: '功能管理',
                                expand: true
                            },
                            {
                                title: '字典类别管理',
                                expand: true
                            },
                            {
                                title: '字典信息管理',
                                expand: true
                            }
                        ]
                    },
                    {
                        title: '同意体检',
                        expand: false,
                        children: [
                            {
                                title: '用户管理',
                                expand: true
                            },
                            {
                                title: '功能管理',
                                expand: true
                            },
                            {
                                title: '字典类别管理',
                                expand: true
                            },
                            {
                                title: '字典信息管理',
                                expand: true
                            }
                        ]
                    },
                    {
                        title: '健康体侧',
                        expand: false,
                        children: [
                            {
                                title: '用户管理',
                                expand: true
                            },
                            {
                                title: '功能管理',
                                expand: true
                            },
                            {
                                title: '字典类别管理',
                                expand: true
                            },
                            {
                                title: '字典信息管理',
                                expand: true
                            }
                        ]
                    }
                ],
                addForm: {
                    name: '',
                    remark: ''
                },
                rightForm: {}
            };
        },
        methods: {
            pageChange(page) {
                this.pageConfig.page = page;
                this.getRoleList();
            },
            sizeChange(size) {
                this.pageConfig.size = size;
                if (this.pageConfig.page === 1) {
                    this.pageChange(1);
                }
            },
            addRole() {
                this.addtitle = '新增功能';
                this.addModal = true;
            },
            editUser(row) {
                this.addtitle = '编辑角色';
                this.addModal = true;
                this.id = row.id;
                this.addForm.name = row.name;
                this.addForm.remark = row.remark;
            },
            setRight(row) {
                this.addtitle = '权限配置';
                this.conModal = true;
                this.configForm.name = row.name;
                this.id = row.id;
                this.$ajax({
                    url: urls.role_function,
                    data: {
                        page: 1,
                        size: 10
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.menuList = data.data;
                    } else {
                        this.menuList = [];
                    }
                })

                this.$ajax({
                    url: urls.getFunction,
                    data: {
                        role_id:this.id
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.configForm.authority = data.data.roles;
                    } else {
                    }
                })

            },
            Search() {
                this.getRoleList();
            },
            editRole() {
                this.addtitle = '修改功能';
                this.addModal = true;
            },
            closeRoleModal() {
                this.conModal = false;
            },
            closeaddModal() {
                this.addModal = false;
            },
            confirmRoleFunction() {
                var permission = [];
                this.configForm.authority.forEach(item => {
                    permission.push({role_id: this.id, function_id: item});
                })
                this.$ajax({
                    url: urls.add_role_function,
                    data: {
                        permission
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.$Message.success('权限配置成功');
                        this.conModal = false;
                        this.getRoleList();
                    } else {
                        this.$Message.error('权限配置失败');
                    }
                })
            },
            confirmaddModal() {
                this.$refs['addForm'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交！');
                        return false;
                    }
                    if (this.id) {
                        this.$ajax({
                            url: urls.role_edit,
                            data: {
                                id: this.id,
                                name: this.addForm.name,
                                remark: this.addForm.remark
                            }
                        }).then(data => {
                            if (data.code === 200) {
                                this.$Message.success('编辑角色成功');
                                this.getRoleList();
                            } else {
                                this.$Message.error('编辑角色失败');
                            }
                        }).catch(() => {
                            this.tableData = [];
                            this.$Message.error('数据查询失败');
                        });
                        this.addModal = false;
                    } else {
                        this.$ajax({
                            url: urls.role_add,
                            data: this.addForm
                        }).then(data => {
                            if (data.code === 200) {
                                this.$Message.success('新增角色成功');
                                this.getRoleList();
                            } else {
                                this.$Message.error('新增角色失败');
                            }
                        }).catch(() => {
                            this.tableData = [];
                            this.$Message.error('数据查询失败');
                        });
                        this.addModal = false;
                    }
                })

            },
            closeRightModal() {
                this.rightModal = false;
            },
            confirmRightModal() {
                console.log(this.$refs.tree.getCheckedNodes());
                this.rightModal = false;
            },
            selectionChange(value) {
                this.selectionValue = [];
                value.map(item => {
                    this.selectionValue.push(item.id);
                });
            },
            trash() {
                if (!this.selectionValue.length) {
                    this.$Message.error('请勾选要删除的角色');
                    return false;
                }
                let self = this;
                this.$confirm({
                    text: '确定删除角色？',
                    onOk: function () {
                        self
                            .$ajax({
                                url: urls.role_operation,
                                data: {
                                    ids: self.selectionValue,
                                    status: 0
                                }
                            })
                            .then(data => {
                                if (data.code === 200) {
                                    self.$Message.success('删除角色成功');
                                    self.getRoleList();
                                } else {
                                    self.$Message.error('删除角色失败');
                                }
                            })
                    },
                    cancel: function () {
                        self.search();
                    }
                });
            },
            getRoleList() {
                this.$ajax({
                    url: urls.role_list,
                    data: {
                        page: this.pageConfig.page,
                        size: this.pageConfig.size,
                        name: this.searchList.name,
                        status: this.searchList.status === '-1' ? null : this.searchList.status,
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
                    text = '确定禁用该角色？';
                    msg1 = '禁用' + name + '角色成功';
                    msg2 = '禁用' + name + '角色失败';
                } else {
                    data.status = 1;
                    text = '确定启用该角色？';
                    msg1 = '启用' + name + '角色成功';
                    msg2 = '启用' + name + '角色失败';
                }
                let self = this;
                this.$confirm({
                    text: text,
                    onOk: function () {
                        self.$ajax({
                            url: urls.role_operation,
                            data: {
                                ids: [id],
                                status: data.status
                            }
                        }).then(data => {
                            if (data.code === 200) {
                                self.$Message.success(msg1);
                                self.getRoleList();
                            } else {
                                self.$Message.error(msg2);
                            }
                        });
                    },
                    cancel: function () {
                        self.getRoleList();
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
            this.getRoleList();
        },
    };
</script>
<style lang="scss">
    .roleAddModal {
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

    .roleRightModal {
        margin-top: 16px;
        .rightForm {
            .rightFormLeft {
                float: left;
                width: 234px;
                .labelNameLeft {
                    font-size: 30px;
                    font-family: SourceHanSansCN-Medium;
                    font-weight: 500;
                    color: rgba(1, 19, 17, 1);
                }
            }
            .rightFormRight {
                float: right;
                width: 337px;
                height: 315px;
                overflow: auto;
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

    .roleManage {
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
