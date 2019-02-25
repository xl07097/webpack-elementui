<template>
    <div class="user">
        <div class="content-box">
            <div class="title">
                用户管理
            </div>
            <Form ref="formInline" :model="searchList" inline style="margin-top: 34px;">
                <FormItem label="用户名" :label-width="58">
                    <Input type="text" v-model="searchList.user"/>
                </FormItem>
                <FormItem label="姓名" :label-width="42">
                    <Input v-model="searchList.password"/>
                </FormItem>
                <FormItem label="使用状态" :label-width="72">
                    <Select style="width:140px" v-model="searchList.status">
                        <Option value="0">全部</Option>
                        <Option value="1">启用</Option>
                        <Option value="2">禁用</Option>
                        <Option value="3">冻结</Option>
                    </Select>
                </FormItem>
                <FormItem style="float: right;">
                    <Button type="primary" class="search-btn">查询</Button>
                </FormItem>
            </Form>
            <div class="divider"/>
            <div class="btn-box">
                <div class="action-btn" @click="addUser">
                    <img style="margin: 8px 6px;" src="../../assets/system/role/add.png"/>
                    新增
                </div>
                <div class="action-btn" @click="resetUser">
                    <img style="margin: 8px 6px;" src="../../assets/system/reset.png"/>
                    重置密码
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
                :mask-closable="false"
                width='644'
                class="userAddModal"
                :styles="{top: '20px'}"
                class-name="vertical-center-modal">
            <Form :model="addForm" label-position="top">
                <Row>
                    <Col span="12" class="leftFormItem">
                        <FormItem label="登录名">
                            <Input v-model="addForm.accountName"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12" class="rightFormItem">
                        <FormItem label="姓名">
                            <Input v-model="addForm.userName"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <div class="checkAreaGroup">
                        <FormItem label="角色">
                            <div class="checkArea">
                                <div v-for="(item ,index) in roleList"
                                     :class="index%2 === 0?'per-item-odd':'per-item-even'">
                                    <div @change="checkboxChange(item.id)">
                                        <Checkbox class="check-box" type="checkbox" :value="item.id"
                                                  :checked="checkedList[item.id]"/>
                                        <img v-show="checkedList[item.id]" src="../../assets/system/checked.png"/>
                                    </div>
                                    <div class="per-name">{{item.name}}</div>
                                </div>
                            </div>
                        </FormItem>
                    </div>
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
                addModal: false,
                addtitle: '',
                addForm: {
                    accountName: '',
                    status: 1,
                    userName: '',
                },
                searchList: {
                    user: '',
                    password: '',
                    status: '',
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
                        title: '用户名',
                        key: 'accountName'
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '角色名称',
                        key: 'role'
                    },
                    {
                        title: '帐号生成时间',
                        key: 'createTime'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            let statusShow = params.row.status === 0 ? '禁用' : (params.row.status === -1 ? '冻结' : '启用');
                            return h('div', [
                                h('i-switch', {
                                    props: {
                                        type: 'primary',
                                        value: params.row.status === 1 || params.row.status === -1,
                                    },
                                    attrs: {
                                        disabled: params.row.status === -1
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        'on-change': () => {
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
                                h(
                                    'span',
                                    {
                                        style: {
                                            marginLeft: '5px',
                                            cursor: 'pointer'
                                        },
                                        on: {
                                            click: () => {
                                                this.editUser();
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
                        accountName: 'John Brown',
                        name: '啊啊啊',
                        role: '角色1、角色2、角色3',
                        createTime:'2019-01-22',
                        status: -1
                    },
                    {
                        accountName: 'Jim Green',
                        name: '别别别',
                        role: '角色1、角色2、角色3',
                        createTime:'2019-01-22',
                        status: 1
                    },
                    {
                        accountName: 'Joe Black',
                        name: '刺刺刺',
                        role: '角色1、角色2、角色3',
                        createTime:'2019-01-22',
                        status: 0
                    },
                ],
                checkedList: {},
                roleList: [
                    {name: '管理员', id: '1'},
                    {name: '眼科医生', id: '2'},
                    {name: '管理员', id: '3'},
                    {name: '管理员', id: '4'},
                    {name: '管理员', id: '5'},
                    {name: '管理员6', id: '6'}
                ],
                filterForm: {
                    page: 1,
                    size: 10
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
            addUser() {
                this.addtitle = '新增用户';
                this.addModal = true;
            },
            editUser() {
                this.addtitle = '修改用户';
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
            resetUser() {
                let messageWarning = '是否重置用户密码？';
                this.$confirm({
                    text: messageWarning,
                    onOk: () => {
                        alert('重置');
                    },
                    cancel: () => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    }
                });
            },
            unfreezeUser() {
                let messageWarning = '是否解冻用户？';
                this.$confirm({
                    text: messageWarning,
                    onOk: () => {
                        alert('解冻');
                    },
                    cancel: () => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    }
                });
            },
            deleteUser() {
                let messageWarning = '是否删除用户？';
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
            },
            checkboxChange(checked_id) {
                this.checkedList[checked_id] ? this.$delete(this.checkedList, checked_id) : this.$set(this.checkedList, checked_id, true);
            },
            getUserList() {
                // this.$ajax({url:urls.user_list,data:this.searchList})


            },
        },
        mounted() {
            this.getUserList();
        },
    };
</script>

<style lang="scss">

    .userAddModal {
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
            .ivu-row {
                margin-bottom: 43px;
            }

            .checkAreaGroup {
                margin-left: 62px;
                width: 526px;
                .checkArea {
                    .check-box {
                        margin: 10px 0 0;
                        padding: 0;
                        width: 18px;
                        height: 18px;
                        background-color: white;
                        cursor: pointer;
                    }
                    img {
                        position: absolute;
                        top: 15px;
                        left: 34px;
                        pointer-events: none;
                    }
                    .ivu-checkbox-inner {
                        display: none;
                    }
                    width: 526px;
                    height: 256px;
                    overflow-y: auto;
                    .per-item {
                        position: relative;
                        width: 80px;
                        height: 73px;
                        margin-right: 9px;
                        text-align: center;
                        color: #021D21;
                        font-size: 14px;
                        margin-top: 8px;
                        display: inline-block;
                    }
                    .per-item-odd {
                        @extend .per-item;
                        background-color: #F0EFDF;
                    }
                    .per-item-even {
                        @extend .per-item;
                        background-color: #BBDFDF;
                    }
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

    .user {
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
