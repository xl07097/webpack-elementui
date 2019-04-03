<template>
    <div class="functionalManage">
        <div class="content-box">
            <div class="title">
                通知
            </div>
            <Form ref="formInline" :model="formInline" inline style="margin-top: 34px;">
                <FormItem label="日期" :label-width="50">
                    <DatePicker type="date" style="width: 180px" placeholder="请选择"
                                v-model="searchList.send_date"></DatePicker>
                </FormItem>
                <FormItem style="float: right;">
                    <Button type="primary" class="search-btn" @click="Search()">查询</Button>
                </FormItem>
            </Form>
            <div class="divider" style="margin-bottom:40px"/>
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
                        <FormItem label="标题">
                            <Input v-model="addForm.title" class="functionalName" style="width: 564px" disabled/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12" class="leftFormItem" style="margin-right:40px">
                        <FormItem label="开始时间">
                            <DatePicker type="date" placeholder="Select date" style="width: 200px"
                                        v-model="addForm.start_time" disabled></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="12" class="leftFormItem">
                        <FormItem label="结束时间">
                            <DatePicker type="date" placeholder="Select date" style="width: 200px"
                                        v-model="addForm.end_time" disabled></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12" class="leftFormItem">
                        <FormItem label="内容">
                            <Input type="textarea" v-model="addForm.content" class="functionalName"
                                   style="width: 590px" disabled/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12" class="leftFormItem">
                        <a :href=addForm.accessorys>
                            <div style="margin: 10px 0 60px 0;font-size: 14px;color: #29726D"
                                 v-text="addForm.accessorysName">
                            </div>
                        </a>
                    </Col>
                </Row>
            </Form>
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
                rightModal: false,
                searchList: {
                    send_date: null
                },
                addtitle: '',
                formInline: {
                    functionalName: '',
                    status: ''
                },
                pageConfig: {
                    page: 1,
                    size: 10,
                    total: 0,
                    opts: [10, 20, 50, 100]
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
                        key: 'send_date'
                    },
                    {
                        title: '标题',
                        key: 'title'
                    },
                    {
                        title: '通知内容',
                        key: 'content'
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
                                            this.info(params.row);
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
                                                this.info(params.row);
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
                    received_by: '',
                    title: '',
                    start_time: '',
                    end_time: '',
                    content: '',
                    accessorys: '',
                    accessorysName: ''
                },
                rightForm: {}
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
            addfunctional() {
                this.addtitle = '新增功能';
                this.addModal = true;
            },
            setRight() {
                // this.rightModal = true;
                this.addtitle = '权限配置';
                this.addModal = true;
            },
            info(row) {
                this.addtitle = '详情';
                this.addModal = true;
                this.addForm.title = row.title;
                this.addForm.accessorysName = this.getNameFromUrl(row.accessorys);
                this.addForm.accessorys = row.accessorys;
                this.addForm.content = row.content;
                this.addForm.start_time = row.start_time;
                this.addForm.end_time = row.end_time;
            },
            Search() {
                this.getList();
            },
            editfunctional() {
                this.addtitle = '通知';
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
            },
            getList() {
                this.$ajax({
                    url: urls.task_list,
                    data: {
                        page: this.pageConfig.page,
                        size: this.pageConfig.size,
                        send_date: new Date(this.searchList.send_date).getTime()
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
            getNameFromUrl(url) {
                if (url) {
                    var strArray = url.split('/');
                    var ensourceNameArr = strArray[strArray.length - 1].split('.');
                    var type = ensourceNameArr[ensourceNameArr.length - 1];
                    var ensourceName = strArray[strArray.length - 1].replace('.' + type, '')
                    var name = ensourceName.substring(0, ensourceName.length - 14);
                    return name + '.' + type;
                } else {
                    return "暂无附件";
                }
            }
        },
        mounted() {
            this.getList();
        },
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
