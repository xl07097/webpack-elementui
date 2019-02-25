<template>
    <div>
        <div class="content-box classes">
            <div class="title">
                学生体检名单校对
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
                title="学生既往病史录入"
                v-model="modal"
                :mask-closable="false"
                :styles="{top: '140px',width:'800px'}"
        >
            <Form inline :model="addFormData" label-position="top" class="modal-form">
                <FormItem label="学校名称">
                    <Select style="width:150px" v-model="addFormData.code">
                        <Option value="0">全部</Option>
                        <Option value="1">启用</Option>
                        <Option value="2">禁用</Option>
                        <Option value="3">冻结</Option>
                    </Select>
                </FormItem>
                <FormItem label="学年">
                    <DatePicker type="year" format="yyyy" style="width: 150px" placeholder="请选择"></DatePicker>
                </FormItem>
                <FormItem label="学期">
                    <Select style="width:150px" v-model="addFormData.code">
                        <Option value="0">全部</Option>
                        <Option value="1">启用</Option>
                        <Option value="2">禁用</Option>
                        <Option value="3">冻结</Option>
                    </Select>
                </FormItem>
                <FormItem label="所属年级">
                    <Select style="width:150px" v-model="addFormData.code">
                        <Option value="0">全部</Option>
                        <Option value="1">启用</Option>
                        <Option value="2">禁用</Option>
                        <Option value="3">冻结</Option>
                    </Select>
                </FormItem>
                <FormItem label="班级">
                    <Select style="width:150px" v-model="addFormData.code">
                        <Option value="0">全部</Option>
                        <Option value="1">启用</Option>
                        <Option value="2">禁用</Option>
                        <Option value="3">冻结</Option>
                    </Select>
                </FormItem>
                <FormItem label="学号">
                    <Select style="width:150px" v-model="addFormData.code">
                        <Option value="0">全部</Option>
                        <Option value="1">启用</Option>
                        <Option value="2">禁用</Option>
                        <Option value="3">冻结</Option>
                    </Select>
                </FormItem>
                <FormItem label="学生姓名">
                    <Select style="width:150px" v-model="addFormData.code">
                        <Option value="0">全部</Option>
                        <Option value="1">启用</Option>
                        <Option value="2">禁用</Option>
                        <Option value="3">冻结</Option>
                    </Select>
                </FormItem>
                <FormItem label="性别">
                    <Select style="width:150px" v-model="addFormData.code">
                        <Option value="0">全部</Option>
                        <Option value="1">启用</Option>
                        <Option value="2">禁用</Option>
                        <Option value="3">冻结</Option>
                    </Select>
                </FormItem>
                <FormItem label="户籍类型">
                    <Select style="width:150px" v-model="addFormData.code">
                        <Option value="0">全部</Option>
                        <Option value="1">启用</Option>
                        <Option value="2">禁用</Option>
                        <Option value="3">冻结</Option>
                    </Select>
                </FormItem>
                <FormItem label="是否住宿">
                    <Select style="width:150px" v-model="addFormData.code">
                        <Option value="0">全部</Option>
                        <Option value="1">启用</Option>
                        <Option value="2">禁用</Option>
                        <Option value="3">冻结</Option>
                    </Select>
                </FormItem>
                <FormItem label="证件类型">
                    <Select style="width:150px" v-model="addFormData.code">
                        <Option value="0">全部</Option>
                        <Option value="1">启用</Option>
                        <Option value="2">禁用</Option>
                        <Option value="3">冻结</Option>
                    </Select>
                </FormItem>
                <FormItem label="证件号">
                    <Select style="width:150px" v-model="addFormData.code">
                        <Option value="0">全部</Option>
                        <Option value="1">启用</Option>
                        <Option value="2">禁用</Option>
                        <Option value="3">冻结</Option>
                    </Select>
                </FormItem>

                <div class="type">既往结核病史和接触史</div>
                <div class="type-child"> 1、既往结核病史(含肺外结核)</div>
                <RadioGroup v-model="jwjhbs">
                    <Radio label="是"></Radio>
                    <Radio label="否"></Radio>
                </RadioGroup>
                <div class="type-child"> 2、家庭成员、原同班师生、原同宿舍学生有无结核患病者?</div>
                <RadioGroup v-model="jwjhbs_1">
                    <Radio label="是"></Radio>
                    <Radio label="否"></Radio>
                </RadioGroup>
                <div class="type-child" style="margin-left: 20px"> 若有，是否与患者密切接触?</div>
                <RadioGroup v-model="jwjhbs_2">
                    <Radio label="是"></Radio>
                    <Radio label="否"></Radio>
                </RadioGroup>
                <div class="type-child"> 3、肺结核可疑症状，主要症状(具有其中一项即为肺结核可疑症状者)</div>
                <CheckboxGroup v-model="jwjhbs_3">
                    <Checkbox label="咳嗽或咳痰大于2周"></Checkbox>
                    <Checkbox label="咳血或血痰"></Checkbox>
                </CheckboxGroup>
                <div class="type-child" style="margin-left: 20px"> 其他常见症状</div>
                <CheckboxGroup v-model="jwjhbs_4">
                    <Checkbox label="胸痛、胸闷及气短"></Checkbox>
                    <Checkbox label="反复低热"></Checkbox>
                    <Checkbox label="盗汗"></Checkbox>
                    <Checkbox label="消瘦或体重下降"></Checkbox>
                    <Checkbox label="乏力、拿欲减退"></Checkbox>
                </CheckboxGroup>
                <div class="type-child" style="margin-left: 20px"> 其他</div>
                <Input v-model="filterForm.code" style="margin-left: 20px;width: 700px"/>
                <div class="type-child" style="margin-left: 20px"> 确认有无卡介苗接种或卡痕</div>
                <RadioGroup v-model="jwjhbs_5">
                    <Radio label="有"></Radio>
                    <Radio label="无"></Radio>
                </RadioGroup>
                <div class="type-child" style="margin-left: 20px"> 医生意见</div>
                <RadioGroup v-model="jwjhbs_6">
                    <Radio label="是肺结核可疑症状者"></Radio>
                    <Radio label="是肺结核密切接触者"></Radio>
                </RadioGroup>

                <div class="type" style="margin: 29px 0">皮肤实验检查</div>
                <FormItem label="注射时间">
                    <Select style="width:180px" v-model="addFormData.code">
                        <Option value="0">全部</Option>
                        <Option value="1">启用</Option>
                        <Option value="2">禁用</Option>
                        <Option value="3">冻结</Option>
                    </Select>
                    <span>月/日/时</span>
                </FormItem>
                <FormItem label="注射人">
                    <Input v-model="filterForm.code" style="width:180px"/>
                </FormItem>
                <FormItem label="硬结直径（横径×纵径）">
                    <Input v-model="filterForm.code" style="width:180px"/>
                    <span>mm</span>
                </FormItem>
                <FormItem label="检验反应时间">
                    <Input v-model="filterForm.code" style="width:180px"/>
                    <span>月/日/时</span>
                </FormItem>
                <FormItem label="查验反应人员">
                    <Input v-model="filterForm.code" style="width:180px"/>
                </FormItem>
                <FormItem label="平均直径">
                    <Input v-model="filterForm.code" style="width:180px"/>
                    <span>mm</span>
                </FormItem>
                <div class="type-child" style="margin-top: 10px"> 注射后局部情况</div>
                <RadioGroup v-model="pfsy_1">
                    <Radio label="水疱"></Radio>
                    <Radio label="溃疡"></Radio>
                    <Radio label="坏死"></Radio>
                    <Radio label="淋巴管炎"></Radio>
                </RadioGroup>
                <div class="type-child" style="margin-top: 10px"> 结果判定</div>
                <RadioGroup v-model="pfsy_2">
                    <Radio label="阴性"></Radio>
                    <Radio label="一般阳性"></Radio>
                    <Radio label="中度阳性"></Radio>
                    <Radio label="强阳性"></Radio>
                </RadioGroup>

                <div class="type">既往病史</div>
                <i-table center :disabled-hover='true' size="small" :columns="columns1" :data="tableData"></i-table>
                <div class="type-child" style="margin-top: 10px"> 其他病史说明*</div>
                <Input v-model="filterForm.code"/>

                <div class="type">残疾*</div>
                <i-table center :disabled-hover='true' size="small" :columns="columns2" :data="tableData1"></i-table>
                <div class="type-child" style="margin-top: 10px"> 其他病史说明*</div>
                <Input v-model="filterForm.code"/>
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
                jwjhbs: '否',
                jwjhbs_1: '否',
                jwjhbs_2: '否',
                jwjhbs_3: ['咳嗽或咳痰大于2周'],
                jwjhbs_4: ['盗汗'],
                jwjhbs_5: '有',
                jwjhbs_6: '是肺结核可疑症状者',
                pfsy_1: '溃疡',
                pfsy_2: '阴性',
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
                        width: 200,
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
                                    }, '详情')
                                ]),
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
                columns1: [
                    {
                        title: '病症',
                        key: 'code'
                    }, {
                        title: '肝炎',
                        key: 'year'
                    }, {
                        title: '肺结核',
                        key: 'exam_type',
                        render(h, params) {
                            return h('span', {1: '健康体检', 2: '升学体检'}[params.row.exam_type]);
                        }
                    }, {
                        title: '有无肺结核密切接触史',
                        key: 'hospital'
                    }, {
                        title: '先天性心脏病',
                        key: 'hospital'
                    },
                    {
                        title: '肾炎',
                        key: 'hospital'
                    },
                    {
                        title: '风湿病',
                        key: 'hospital'
                    },
                    {
                        title: '哮喘',
                        key: 'hospital'
                    }
                ],
                columns2: [
                    {
                        title: '项目',
                        key: 'code'
                    }, {
                        title: '视力',
                        key: 'year'
                    }, {
                        title: '听力',
                        key: 'exam_type',
                        render(h, params) {
                            return h('span', {1: '健康体检', 2: '升学体检'}[params.row.exam_type]);
                        }
                    }, {
                        title: '言语',
                        key: 'hospital'
                    }, {
                        title: '肢体',
                        key: 'hospital'
                    },
                    {
                        title: '智力',
                        key: 'hospital'
                    },
                    {
                        title: '精神',
                        key: 'hospital'
                    },
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
                tableData: [],
                tableData1:[]
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
<style lang="scss" scoped>
    .type {
        font-size: 16px;
        font-weight: bold;
        margin: 19px 0;
    }

    .type-child {
        font-size: 14px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        margin-top: 29px;
    }

    .ivu-radio-group, .ivu-checkbox-group {
        margin-left: 20px;
    }

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
