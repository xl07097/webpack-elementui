<template>
    <div class="functionalManage">
        <div class="content-box">
            <div class="title">
                通知管理
            </div>
            <Form ref="formInline" :model="formInline" inline style="margin-top: 34px;">
                <FormItem label="日期" :label-width="50">
                    <DatePicker type="year" format="yyyy" style="width: 180px" placeholder="请选择"></DatePicker>
                </FormItem>
                <FormItem label="关键字" :label-width="72">
                    <Input type="text" v-model="formInline.functionalName" style="width: 180px"/>
                </FormItem>
                <FormItem style="float: right;">
                    <Button type="primary" class="search-btn" @click="Search()">查询</Button>
                </FormItem>
            </Form>
            <div class="divider"/>
            <div class="btn-box">
                <div class="action-btn" @click="addfunctional">
                    <img style="margin: 8px 6px;" src="../../assets/system/role/add.png"/>
                    新建文件
                </div>
                <div class="action-btn" @click="deletefunctional">
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
                class="functionalAddModal"
                :title="addtitle"
                v-model="addModal"
                :mask-closable="false"
                width='644'
                :styles="{top: '20px'}"
                class-name="vertical-center-modal">
            <Form :model="addForm" label-position="top">
                <Row>
                    <Col span="12" class="leftFormItem">
                        <FormItem label="收件人">
                            <Input v-model="addForm.functionalName" class="functionalName" style="width: 564px"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12" class="leftFormItem">
                        <FormItem label="标题">
                            <Input v-model="addForm.functionalName" class="functionalName" style="width: 564px" placeholder="格式：2018-2019 第一学期 体检"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12" class="leftFormItem">
                        <FormItem label="内容">
                            <Input type="textarea" v-model="addForm.functionalName" class="functionalName"
                                   style="width: 564px;"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Upload action="//jsonplaceholder.typicode.com/posts/" :max-size="10240">
                            <Button icon="ios-cloud-upload-outline">上传文件</Button>
                            <span style="margin-left: 9px">支持<span style="color: #D81717;">jpg、doc、docx、xls、xlsx、ppt、pptx、rar、zip</span>文件不得超过<span
                                    style="color: #D81717;">10M</span></span>
                        </Upload>
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
                    functionalName: '',
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
                        title: '日期',
                        key: 'functionalName'
                    },
                    {
                        title: '标题',
                        key: 'functionalName'
                    },
                    {
                        title: '发布内容',
                        key: 'functionalName'
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
                                            this.editfunctional();
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
                                                this.editfunctional();
                                            }
                                        }
                                    },
                                    '详情'
                                )
                            ]);
                        }
                    }
                ],
                data: [
                    {
                        functionalName: '甲',
                        describe: '管理员',
                        status: 1
                    },
                    {
                        functionalName: '乙',
                        describe: '老师',
                        status: 0
                    },
                    {
                        functionalName: '丙',
                        describe: '医生',
                        status: 1,
                        date: '2016-10-03'
                    },
                    {
                        functionalName: '丁',
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
                    functionalName: '',
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
            addfunctional() {
                this.addtitle = '新建文件';
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
            editfunctional() {
                this.addtitle = '详情';
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
            deletefunctional() {
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
    .functionalAddModal {
        .ivu-form-item-label {
            font-size: 14px !important;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(126, 132, 133, 1) !important;
        }
        .ivu-modal-body {
            .leftFormItem {
                width: 262px;
                .formLabel {
                    font-size: 14px !important;
                    font-family: SourceHanSansCN-Regular;
                    font-weight: 400;
                    color: rgba(126, 132, 133, 1) !important;
                }
            }
            .rightFormItem {
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

    .functionalRightModal {
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

    .functionalManage {
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
