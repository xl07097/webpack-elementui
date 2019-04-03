<template>
    <div class="dateManager">
        <div class="content-box clearfix">
            <div class="title">
                数据库同步计划
            </div>
            <Form ref="formInline" :model="formInline" inline style="margin-top: 34px;">
                <FormItem label="数据库代号" :label-width="100">
                    <Input  style="width: 200px"/>
                </FormItem>
                <FormItem label="数据库类型" :label-width="90">
                    <Select v-model="formInline.newDataBase" style="width:140px">
                        <Option value="0">全部</Option>
                    </Select>
                </FormItem>
                <FormItem style="float: right;">
                    <Button type="primary" class="search-btn" @click="Search()">查询</Button>
                </FormItem>
            </Form>
            <div class="divider"/>
            <div class="btn-box">
                <div class="action-btn" >
                    <img style="margin: 8px 6px;" src="../../../../assets/system/role/add.png"/>
                    新增
                </div>
                <div class="action-btn" >
                    <img style="margin: 8px 6px;" src="../../../../assets/system/role/delete.png"/>
                    删除
                </div>
            </div>
            <Table  ref="selection" :columns="columns" :data="data"></Table>
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
        <!--<Modal-->
        <!--class="dicInfoAddModal"-->
        <!--:title="addtitle"-->
        <!--v-model="addModal"-->
        <!--:mask-closable="false"-->
        <!--width='644'-->
        <!--:styles="{top: '20px'}"-->
        <!--class-name="vertical-center-modal">-->
        <!--<Form :model="addForm" label-position="top">-->
        <!--<Row>-->
        <!--<Col span="12" class="leftFormItem">-->
        <!--<FormItem label="字典表类别">-->
        <!--<Select v-model="addForm.dictionaryType">-->
        <!--<Option v-for="item in dictionaryTypeList" :value="item.id" :key="item.id">{{ item.name-->
        <!--}}-->
        <!--</Option>-->
        <!--</Select>-->
        <!--</FormItem>-->
        <!--<FormItem label="字典表类别名称">-->
        <!--<Select v-model="addForm.dictionaryName" >-->
        <!--<Option v-for="item in dictionaryNameList" :value="item.id" :key="item.id">{{ item.name-->
        <!--}}-->
        <!--</Option>-->
        <!--</Select>-->
        <!--</FormItem>-->
        <!--<FormItem>-->
        <!--<span class="formLabel">禁用状态</span>&emsp;<Switch v-model="addForm.status"/>-->
        <!--</FormItem>-->
        <!--</Col>-->
        <!--<Col span="12" class="rightFormItem">-->
        <!--<FormItem label="字段名称">-->
        <!--<Input v-model="addForm.fieldName"></Input>-->
        <!--</FormItem>-->
        <!--<FormItem label="字段排序">-->
        <!--<Input v-model="addForm.order"></Input>-->
        <!--</FormItem>-->
        <!--</Col>-->
        <!--</Row>-->
        <!--</Form>-->
        <!--<div class="footer">-->
        <!--<i-button class="close" type='default' @click='closeaddModal'>取消</i-button>-->
        <!--<i-button class="confirm" type="primary" @click='confirmaddModal'>保存</i-button>-->
        <!--</div>-->
        <!--</Modal>-->

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
                    oldDataBase:'0',
                    newDataBase: '0',
                    status: '0',
                    style:'0',
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
                        type: 'index',
                        align: 'center'
                    },
                    {
                        title: '数据库代号',
                        key: 'oldCode',
                        align: 'center'
                    },
                    {
                        title: '数据库类型',
                        key: 'oldType',
                        align: 'center'
                    },
                    {
                        title: 'IP地址',
                        key: 'oldIp',
                        align: 'center'
                    },
                    {
                        title: '帐号密码',
                        key: 'account',
                        align: 'center'
                    },

                    {
                        title: '容量预警阙值',
                        key: 'value',
                        align: 'center'
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
                                            console.log('状态');
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
                                    attrs: {src: require('../../../../assets/system/role/edit.png')},
                                    style: {
                                        display: 'inline-block',
                                        width: '20px',
                                        height: '20px',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {

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
                        oldCode: 'sdxk',
                        oldType:'9999',
                        oldIp: '192.1.6.230',
                        account: 'admin',
                        value: '0038',
                    },
                    {
                        oldCode: 'sdxk',
                        oldType:'9999',
                        oldIp: '192.1.6.230',
                        account: 'admin',
                        value: '0038',
                    },
                    {
                        oldCode: 'sdxk',
                        oldType:'9999',
                        oldIp: '192.1.6.230',
                        account: 'admin',
                        value: '0038',
                    },
                    {
                        oldCode: 'sdxk',
                        oldType:'9999',
                        oldIp: '192.1.6.230',
                        account: 'admin',
                        value: '0038',
                    },
                ],

                filterForm: {
                    page: 1,
                    size: 10
                },
                addForm: {
                    dictionaryName: '',
                    dictionaryType: '',
                    fliedName: '',
                    order: 1,
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
            addRole() {
                this.addtitle = "新增字典类别";
                this.addModal = true;
            },
            setRight() {
                this.rightModal = true;
            },
            Search() {
                alert("查询");
            },
            editRole() {
                this.addtitle = "新增字典类别";
                this.addModal = true;
            },
            closeaddModal() {
                alert("取消");
                this.addModal = false;
            },
            confirmaddModal() {
                alert("新增");
                this.addModal = false;
            },

            deleteRole() {
                let messageWarning = "是否删除该字典？";
                this.$confirm({
                    text: messageWarning,
                    onOk: () => {
                        alert("删除");
                    },
                    cancel: () => {
                        this.$message({
                            type: "info",
                            message: "已取消"
                        });
                    }
                });
            }
        }
    };
</script>
<style lang="scss">
    .dicInfoAddModal{
        .ivu-form-item-label{
            font-size:14px!important;
            font-family:SourceHanSansCN-Regular;
            font-weight:400;
            color:rgba(126,132,133,1)!important;
        }
        .ivu-modal-body{
            padding-top: 57px!important;
            .leftFormItem{
                padding-left: 62px;
                width: 262px;
                .formLabel{
                    font-size:14px!important;
                    font-family:SourceHanSansCN-Regular;
                    font-weight:400;
                    color:rgba(126,132,133,1)!important;
                }
            }
            .rightFormItem{
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

    .dateManager {
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
