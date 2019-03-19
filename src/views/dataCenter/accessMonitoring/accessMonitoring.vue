<template>
    <div class="accessMonitoring">
        <div class="content-box clearfix">
            <div class="title">
                系统日志
            </div>
            <Form ref="formInline" :model="formInline" inline style="margin-top: 34px;">

                <FormItem label="在线状态" :label-width="90">
                    <Select v-model="formInline.tpye" style="width:140px">
                        <Option value="0">全部</Option>
                    </Select>
                </FormItem>
                <FormItem label="接入编码" :label-width="85">
                    <Input v-model="formInline.name" style="width: 280px"/>
                </FormItem>

            </Form>
            <div class="divider"/>

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
                    name: '',
                    tpye: '0',
                    keyword: '',
                },
                totalRecords: 0,
                columns: [
                    {
                        title: '序号',
                        type: 'index',
                        align: 'center'
                    },
                    {
                        title: '接入编码',
                        key: 'code',
                        align: 'center'
                    },
                    {
                        title: '在线状态',
                        key: 'status',
                        align: 'center'
                    },
                    {
                        title: '接入点位置',
                        key: 'local',
                        align: 'center'
                    },
                    {
                        title: 'IP地址',
                        key: 'IP',
                        align: 'center'
                    },
                    {
                        title: 'MAC地址',
                        key: 'MAC',
                        align: 'center'
                    },
                    {
                        title: '负责人',
                        key: 'leader',
                        align: 'center'
                    },
                    {
                        title: '联系方式',
                        key: 'tel',
                        align: 'center'
                    },
                    {
                        title: '接入点类型',
                        key: 'type',
                        align: 'center'
                    },
                ],
                data: [
                    {
                        code: '01 00 00 00000',
                        status: '在线',
                        local: '苏州市姑苏区立新小学',
                        IP: '122.193.27.194',
                        MAC:'9C:2E:35:48:2C:5E',
                        leader:'张凡',
                        tel:'13041420878',
                        type:'双向收发'
                    },
                    {
                        code: '01 00 00 00000',
                        status: '离线',
                        local: '苏州市姑苏区立新小学',
                        IP: '122.193.27.194',
                        MAC:'9C:2E:35:48:2C:5E',
                        leader:'张凡',
                        tel:'13041420878',
                        type:'仅接受'
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
    .accessMonitoring {
        .content-box {
            padding: 30px 44px;
            .ivu-form {
                position: relative;
                z-index: 100;
            }
            .divider {
                margin-bottom: 20px;
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
