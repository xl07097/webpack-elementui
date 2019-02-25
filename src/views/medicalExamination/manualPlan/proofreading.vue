<template>
    <div>
        <div class="content-box classes">
            <div class="title">
                学生名单校对
            </div>
            <Form v-model="filterForm" inline :label-width="72">
                <FormItem label="学校名称">
                    <Select style="width:200px" filterable v-model="filterForm.unit_id">
                        <Option v-for="item in hospital_list" :value="item.id" :key="item.id">{{item.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="学年">
                    <DatePicker type="year" v-model="filterForm.year" :options="dateOpts" placeholder="请选择"
                                style="width: 100px"></DatePicker>
                </FormItem>
                <FormItem label="学期">
                    <Select style="width:100px" v-model="filterForm.exam_type">
                        <Option value="">全部</Option>
                        <Option :value="1">健康体检</Option>
                        <Option :value="2">升学体检</Option>
                    </Select>
                </FormItem>
                <FormItem label="年级">
                    <Select style="width:100px" filterable v-model="filterForm.unit_id">
                        <Option v-for="item in hospital_list" :value="item.id" :key="item.id">{{item.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="班级" :label-width="102">
                    <Select style="width:100px" filterable v-model="filterForm.unit_id">
                        <Option v-for="item in hospital_list" :value="item.id" :key="item.id">{{item.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem style="float: right;">
                    <Button type="primary" class="search-btn" @click="getList()">查询</Button>
                </FormItem>
            </Form>
            <div class="divider"/>
            <div>
                <a href="javascript:void(0)" class="add" style="margin-right: 45px;margin-top: 24px" @click="doReview">
                    <img src="../../../assets/unit/add.png" alt="add">&nbsp;新增
                </a>
                <a class="add" style="margin-right: 45px;">
                    <img src="../../../assets/system/role/delete.png">
                    删除
                </a>
                <a href="javascript:void(0)" class="add">
                    <img src="../../../assets/unit/import.png" alt="download">&nbsp;导入
                </a>
                <a
                        href="javascript:void(0)"
                        class="add"
                        style="position: absolute;right: 50px;margin-top: 20px"
                >
                    <img src="../../../assets/unit/download.png" alt="download">&nbsp;下载模版
                </a>
            </div>
            <Table ref="selection" :columns="columns" :data="objectList"></Table>
        </div>
        <Modal
                title="学校班级人数审核"
                v-model="modal"
                :mask-closable="false"
                :styles="{top: '140px',width:'800px'}"
        >
            <Form inline :model="addFormData" label-position="top" class="modal-form">
                <FormItem label="学校名称">
                    <Select style="width:340px" v-model="addFormData.code">
                        <Option value="0">全部</Option>
                        <Option value="1">启用</Option>
                        <Option value="2">禁用</Option>
                        <Option value="3">冻结</Option>
                    </Select>
                </FormItem>
                <FormItem label="学年">
                    <DatePicker type="year" format="yyyy" style="width: 340px" placeholder="请选择"></DatePicker>
                </FormItem>
                <FormItem label="学期">
                    <Select style="width:340px" v-model="addFormData.code">
                        <Option value="0">全部</Option>
                        <Option value="1">启用</Option>
                        <Option value="2">禁用</Option>
                        <Option value="3">冻结</Option>
                    </Select>
                </FormItem>
                <FormItem label="年级">
                    <Select style="width:340px" v-model="addFormData.code">
                        <Option value="0">全部</Option>
                        <Option value="1">启用</Option>
                        <Option value="2">禁用</Option>
                        <Option value="3">冻结</Option>
                    </Select>
                </FormItem>
                <FormItem label="班级">
                    <Select style="width:340px" v-model="addFormData.code">
                        <Option value="0">全部</Option>
                        <Option value="1">启用</Option>
                        <Option value="2">禁用</Option>
                        <Option value="3">冻结</Option>
                    </Select>
                </FormItem>
                <FormItem label="学生姓名">
                    <Select style="width:340px" v-model="addFormData.code">
                        <Option value="0">全部</Option>
                        <Option value="1">启用</Option>
                        <Option value="2">禁用</Option>
                        <Option value="3">冻结</Option>
                    </Select>
                </FormItem>
                <FormItem label="性别">
                    <Select style="width:340px" v-model="addFormData.code">
                        <Option value="0">全部</Option>
                        <Option value="1">启用</Option>
                        <Option value="2">禁用</Option>
                        <Option value="3">冻结</Option>
                    </Select>
                </FormItem>
                <FormItem label="户籍">
                    <Select style="width:340px" v-model="addFormData.code">
                        <Option value="0">全部</Option>
                        <Option value="1">启用</Option>
                        <Option value="2">禁用</Option>
                        <Option value="3">冻结</Option>
                    </Select>
                </FormItem>
                <FormItem label="证件类型">
                    <Select style="width:340px" v-model="addFormData.code">
                        <Option value="0">全部</Option>
                        <Option value="1">启用</Option>
                        <Option value="2">禁用</Option>
                        <Option value="3">冻结</Option>
                    </Select>
                </FormItem>
                <FormItem label="证件号">
                    <Select style="width:340px" v-model="addFormData.code">
                        <Option value="0">全部</Option>
                        <Option value="1">启用</Option>
                        <Option value="2">禁用</Option>
                        <Option value="3">冻结</Option>
                    </Select>
                </FormItem>
                <FormItem label="是否住宿">
                    <Select style="width:340px" v-model="addFormData.code">
                        <Option value="0">全部</Option>
                        <Option value="1">启用</Option>
                        <Option value="2">禁用</Option>
                        <Option value="3">冻结</Option>
                    </Select>
                </FormItem>
            </Form>

        </Modal>
    </div>
</template>
<script>
    import Urls from '../../../service/Urls';

    export default {
        name: 'schedule',
        props: [''],
        mounted() {
            this.getList();
            this.getUnitList(3);//医院
        },
        data() {
            return {
                modal: false,
                reviewResult: false,
                Urls: Urls,
                dateOpts: {
                    //禁止选择当年之前的年份
                    disabledDate(date) {
                        let d = new Date();
                        return date && date.getFullYear() < d.getFullYear();
                    }
                },
                hospital_list: [],
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '序号',
                        width: 60,
                        align: 'center',
                        render: (h, params) => {
                            return h('span', params.index + 1);
                        }
                    }, {
                        title: '学校名称',
                        key: 'code'
                    }, {
                        title: '学年',
                        key: 'year'
                    }, {
                        title: '学期',
                        key: 'exam_type',
                        render(h, params) {
                            return h('span', {1: '健康体检', 2: '升学体检'}[params.row.exam_type]);
                        }
                    }, {
                        title: '年级',
                        key: 'hospital'
                    }, {
                        title: '班级',
                        key: 'hospital'
                    },
                    {
                        title: '学号',
                        key: 'hospital'
                    },
                    {
                        title: '学生姓名',
                        key: 'hospital'
                    }, {
                        title: '性别',
                        key: 'state',
                        render(h, params) {
                            return h('span', {1: '新建', 2: '已排程', 3: '已通过', 4: '已驳回'}[params.row.state]);
                        }
                    },
                    {
                        title: '证件类型',
                        key: 'hospital'
                    },
                    {
                        title: '身份证号',
                        key: 'hospital'
                    },
                    {
                        title: '户籍类型',
                        key: 'hospital'
                    },
                    {
                        title: '是否住宿',
                        key: 'hospital'
                    }, {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
                            return h('span', {}, [
                                h('span', {
                                    attrs: {
                                        class: 'editBtn'
                                    },
                                    on: {
                                        click: () => {
                                            this.doReview(params.row.id);
                                        }
                                    }
                                }, [
                                    h('img', {
                                        style: {
                                            marginRight: '8px'
                                        },
                                        attrs: {
                                            src: require('../../../assets/common/review.png')
                                        }
                                    }),
                                    h('span', {
                                        style: {
                                            position: 'relative',
                                            top: '-4px'
                                        }
                                    }, '编辑')
                                ])
                            ]);
                        }
                    }
                ],
                objectList: [],
                school_columns: [
                    {
                        title: '序号',
                        width: 60,
                        align: 'center',
                        render: (h, params) => {
                            return h('span', params.index + 1);
                        }
                    }, {
                        title: '学校',
                        key: 'school'
                    }, {
                        title: '年级',
                        key: 'grade'
                    }, {
                        title: '班级',
                        key: 'class',
                    }, {
                        title: '人数',
                        key: 'count',
                    }, {
                        title: '体检队伍',
                        key: 'team',
                    }, {
                        title: '体检时间',
                        key: 'time',
                    }
                ],
                school_data: [],
                filterForm: {
                    page: 1,
                    size: 10
                },
                addFormData: {
                    cost_code_id: '',
                    require_pay_date: '',
                    pay_amount: 0,
                    remark: '',
                    reviewRemark: ''
                },
            };
        },
        methods: {
            getList() {
                let filterInfo = Object.assign({}, this.filterForm);
                if (filterInfo.year) {
                    filterInfo.year = filterInfo.year.getFullYear();
                } else {
                    filterInfo.year = null;
                }
                this.$ajax({
                    url: Urls.set_objects_list,
                    data: filterInfo
                }).then((res) => {
                    if (res && res.data) {
                        this.objectList = res.data;
                    }
                });
            },
            getUnitList(type) {
                this.$ajax({
                    url: Urls.unit_opt_list,
                    data: {
                        type: type,
                        status: 1
                    }
                }).then((res) => {
                    if (res && res.data) {
                        if (type == 2) {
                            this.school_list = res.data;
                        } else if (type == 3) {
                            this.hospital_list = res.data;
                        }
                    }
                });
            },
            doReview() {
                this.modal = true;
            },
            delete() {
                this.$alert('删除~');
            },
        },
    };
</script>
<style type="scss" scoped>
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
            // font-family: SourceHanSansCN-Bold;
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
