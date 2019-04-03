<template>
    <div>
        <div class="content-box classes">
            <div class="title">体检结果通知</div>
            <Form v-model="req" inline :label-width="72">
                <FormItem label="学校名称">
                    <i-select style="width:200px" filterable v-model="req.dep_id">
                        <i-option value="-1">全部</i-option>
                        <Option v-for="item in schoolList" :value="item.id" :key="item.id">{{item.name}}</Option>
                    </i-select>
                </FormItem>
                <FormItem label="通知状态">
                    <i-select style="width:100px" v-model="req.type">
                        <i-option value="-1">全部</i-option>
                    </i-select>
                </FormItem>
                <FormItem style="float: right;">
                    <Button type="primary" class="search-btn" @click="search">查询</Button>
                </FormItem>
            </Form>
            <Divider dashed/>
            <div>
                <a href="javascript:void(0)" class="add" style="margin-right: 45px;margin-top: 24px" @click="doReview">
                    <img src="../../../assets/unit/phone.png" alt="add">&nbsp;应用
                </a>
                <a href="javascript:void(0)" class="add" style="margin-right: 45px;margin-top: 24px" @click="doReview">
                    <img src="../../../assets/unit/message.png" alt="add">&nbsp;短信
                </a>
            </div>
            <Table ref="selection" :columns="columns" :data="tableData" @on-selection-change="selectChange"></Table>
            <div class="page">
                <Page
                        :total="pageConfig.total"
                        show-total
                        show-elevator
                        show-sizer
                        :current='pageConfig.page'
                        :page-size-opts='pageConfig.opts'
                        :page-size='pageConfig.size'
                        @on-change='pageChange'
                        @on-page-size-change='sizeChange'/>
            </div>
        </div>
        <Modal
                title="学校班级人数审核"
                v-model="modal"
                :mask-closable="false"
                :styles="{top: '140px',width:'800px'}"
        >
            <Form inline :model="addFormData" label-position="top" class="modal-form">
                <FormItem label="学校名称">
                    <Input style="width:340px" v-model="addFormData.code" disabled/>
                </FormItem>
                <FormItem label="学年">
                    <Input style="width:340px" v-model="addFormData.code" disabled/>
                </FormItem>
                <FormItem label="学期">
                    <Input style="width:340px" v-model="addFormData.code" disabled/>
                </FormItem>
                <FormItem label="年级">
                    <Input style="width:340px" v-model="addFormData.code" disabled/>
                </FormItem>
                <FormItem label="班级">
                    <Input style="width:340px" v-model="addFormData.code" disabled/>
                </FormItem>
                <FormItem label="人数">
                    <Input style="width:340px" v-model="addFormData.code" disabled/>
                </FormItem>
                <FormItem label="">
                    <div>
                        <span style="display:inline-block;color: #666666;font-size:14px;font-weight:bold;margin-right: 28px">体检计划状态</span>
                        <RadioGroup>
                            <Radio label="1" checked>通过</Radio>
                            <Radio label="2">驳回</Radio>
                        </RadioGroup>
                    </div>
                </FormItem>
                <FormItem label="驳回理由" style="width:96%;margin-top: 10px">
                    <Input type="textarea" :rows="4" v-model="addFormData.reason" style="height: 98px!important;"/>
                </FormItem>
            </Form>

        </Modal>
    </div>
</template>
<script>
    import urls from '../../../service/Urls';

    export default {
        name: 'schedule',
        data() {
            return {
                req: {
                    type: '-1',
                    dep_id: '-1'
                },
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '序号',
                        type: 'index',
                        width: 70,
                        align: 'center'
                    },
                    {
                        title: '学校名称',
                        key: 'school_no'
                    },
                    {
                        title: '年级',
                        key: 'term',
                        render: (h,params) =>{
                            return params.row.term === 1?'第一学期': '第二学期'
                        }
                    },
                    {
                        title: '班级',
                        key: 'class_no'
                    },
                    {
                        title: '人数',
                        key: 'count'
                    },
                    {
                        title: '体检日期',
                        key: 'time'
                    },
                    {
                        title: '通知状态',
                        key: 'status',
                        render: (h,params) =>{
                            return params.row.status === 1?'第一学期': '第二学期'
                        }
                    }
                ],
                tableData: [],
                addFormData: {
                    cost_code_id: '',
                    require_pay_date: '',
                    pay_amount: 0,
                    remark: '',
                    reviewRemark: ''
                },
                schoolList: [],
                pageConfig: {
                    page: 1,
                    size: 10,
                    total: 0,
                    opts: [10, 20, 50, 100]
                },
                modal: false
            };
        },
        methods: {
            getSelectCondition(type) {
                /// ===========获取下拉列表查询条件
                this.$ajax({
                    // 学校
                    url: urls.dept_all_list,
                    data: {
                        type: type,
                        status: 1
                    }
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.schoolList = data.data.filter((item) => {
                                return item.type === 2;
                            });
                        } else {
                            this.schoolList = [];
                        }
                    })
                    .catch(err => {
                        window.console.log(err);
                    });
            },
            search() {
                // this.$ajax({
                //     url: urls.set_objects_list,
                //     data: filterInfo
                // }).then((res) => {
                //     if (res && res.data) {
                //         this.tableData = res.data;
                //     }
                // });
            },
            selectChange(value){

            },
            doReview() {
                this.modal = true;
            },
            pageChange(page) {
                this.pageConfig.page = page;
                this.search();
            },
            sizeChange(size) {
                this.pageConfig.size = size;
                if (this.pageConfig.page === 1) {
                    this.pageChange(1);
                }
            }
        },
        created() {
            this.getSelectCondition();
            this.search();
        }
    };
</script>
<style lang="scss" scoped>

    .content-box {
        padding: 30px 44px;
    }

    .title {
        height: 26px;
        line-height: 26px;
        color: #333333;
        font-size: 26px;
        font-weight: bold;
    }

    .modal-form .ivu-form-item {
        margin-right: 30px !important;
    }

    .classes {
        padding: 30px 44px;
        min-height: 500px;
        border-radius: 8px;

        .ivu-form .ivu-form-item {
            margin-right: 30px !important;
        }

        .ivu-select-disabled .ivu-select-selection,
        .ivu-input[disabled],
        fieldset[disabled] .ivu-input {
            color: #515a6e;
        }

        .title {
            height: 80px;
            font-size: 26px;
            line-height: 1;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
        }

        .operator {
            float: right;
            margin-bottom: 15px;
            text-align: right;
        }

        .searchBtn {
            width: 80px;
            height: 34px;
            line-height: 1;
            font-size: 14px;
            font-family: SourceHanSansCN-Medium;
            font-weight: 500;
            color: rgba(254, 254, 254, 1);
            background: rgba(255, 123, 16, 1);
            border-radius: 3px;
            border: none;
        }

        .searchBtn:hover {
            opacity: 0.8;
        }

        .ivu-divider {
            margin: 0 0 24px 0;
        }

        .add {
            margin-bottom: 12px;
            display: inline-block;
            font-size: 16px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(39, 55, 60, 1);

            &:hover {
                opacity: 0.8;
            }

            img {
                position: relative;
                top: 4px;
            }
        }

        .addBtn {
            margin-right: 40px;
        }

        .disabled span {
            color: #999999;
        }

        .editBtn:hover {
            opacity: 0.8;
        }

        .page {
            margin-top: 24px;
            text-align: center;
        }
    }
</style>
