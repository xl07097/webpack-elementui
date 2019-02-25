<template>
    <div class="roleManage">
        <div class="content-box">
            <div class="title">
                角色管理
            </div>
            <Form ref="formInline" :model="formInline" inline style="margin-top: 34px;">
                <FormItem label="角色名称" :label-width="72">
                    <Input type="text" v-model="formInline.roleName"/>
                </FormItem>
                <FormItem label="使用状态" :label-width="72">
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
                <div class="action-btn" @click="setRight">
                    <img style="margin: 8px 6px;" src="../../assets/system/role/jurisdiction.png"/>
                    配置权限
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
                class="roleAddModal"
                :title="addtitle"
                v-model="addModal"
                :mask-closable="false"
                width='644'
                :styles="{top: '20px'}"
                class-name="vertical-center-modal">
            <Form :model="addForm" label-position="top">
                <Row>
                    <Col span="12" class="leftFormItem">
                        <FormItem label="角色名称">
                            <Input v-model="addForm.roleName" class="roleName"/>
                        </FormItem>
                    </Col>
                    <Col span="12" class="rightFormItem">
                        <FormItem label="功能权限">
                            <Select v-model="addForm.remark">
                                <Option value="1">用户管理</Option>
                                <Option value="2">功能管理</Option>
                            </Select>
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
                    roleName: '',
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
                        title: '角色名称',
                        key: 'roleName'
                    },
                    {
                        title: '功能权限',
                        key: 'describe'
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
                                h(
                                    'span',
                                    {
                                        style: {
                                            marginRight: '5px'
                                        }
                                    },
                                    statusShow
                                )
                            ]);
                        }
                    }
                ],
                data: [
                    {
                        roleName: '甲',
                        describe: '管理员',
                        status: 1
                    },
                    {
                        roleName: '乙',
                        describe: '老师',
                        status: 0
                    },
                    {
                        roleName: '丙',
                        describe: '医生',
                        status: 1,
                        date: '2016-10-03'
                    },
                    {
                        roleName: '丁',
                        describe: '游客',
                        status: 1,
                        date: '2016-10-03'
                    }
                ],
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
                filterForm: {
                    page: 1,
                    size: 10
                },
                addForm: {
                    roleName: '',
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
                this.addtitle = '新增功能';
                this.addModal = true;
            },
            setRight() {
                // this.rightModal = true;
                this.addtitle = '权限配置';
                this.addModal = true;
            },
            Search() {
                alert('查询');
            },
            editRole() {
                this.addtitle = '修改功能';
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
            closeRightModal() {
                alert('取消权限');
                this.rightModal = false;
            },
            confirmRightModal() {
                alert('新增权限');
                console.log(this.$refs.tree.getCheckedNodes());
                this.rightModal = false;
            },
            deleteRole() {
                let messageWarning = '是否启用该功能？';
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
