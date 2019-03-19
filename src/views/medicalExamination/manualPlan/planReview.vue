<template>
    <div>
        <div class="content-box classes">
            <div class="title">学校班级人数审核</div>
            <Form v-model="req" inline>
                <FormItem label="学校名称" :label-width="80">
                    <i-select style="width:200px" v-model="req.dep_id" @on-change="schoolChange">
                        <i-option value="-1">全部</i-option>
                        <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="学年" :label-width="50">
                    <DatePicker type="year" v-model="req.year" @on-change="gradeChange" :options="dateOpts"
                                placeholder="请选择"
                                style="width: 140px"></DatePicker>
                </FormItem>
                <FormItem label="学期" :label-width="50">
                    <i-select style="width:140px" v-model="req.term" @on-change="gradeChange">
                        <Option value="-1">全部</Option>
                        <Option :value="1">第一学期</Option>
                        <Option :value="2">第二学期</Option>
                    </i-select>
                </FormItem>
                <FormItem label="年级" :label-width="50">
                    <i-select style="width:140px" v-model="req.grade_no" @on-change="gradeChange">
                        <i-option value="-1">全部</i-option>
                        <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.value}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="班级" :label-width="50">
                    <i-select style="width:140px" v-model="req.class_no">
                        <i-option value="-1">全部</i-option>
                        <i-option v-for="item of classList" :key="item.id" :value='item.id'>{{item.class_no}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem style="float: right;">
                    <Button type="primary" class="search-btn" @click="initSearch()">查询</Button>
                </FormItem>
            </Form>
            <Divider dashed/>
            <div>
                <a href="javascript:void(0)" class="add" style="margin-right: 45px;margin-top: 24px" @click="doReview">
                    <img src="../../../assets/unit/import.png" alt="add">&nbsp;上报
                </a>
            </div>
            <Table @on-selection-change="selectChange" :columns="columns" :data="tableData"></Table>
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
        <!--<Modal-->
        <!--title="学校班级人数审核"-->
        <!--v-model="modal"-->
        <!--:mask-closable="false"-->
        <!--:styles="{top: '140px',width:'800px'}"-->
        <!--&gt;-->
        <!--<Form inline :model="addFormData" label-position="top" class="modal-form">-->
        <!--<FormItem label="学校名称">-->
        <!--<Input style="width:340px" v-model="addFormData.code" disabled/>-->
        <!--</FormItem>-->
        <!--<FormItem label="学年">-->
        <!--<Input style="width:340px" v-model="addFormData.code" disabled/>-->
        <!--</FormItem>-->
        <!--<FormItem label="学期">-->
        <!--<Input style="width:340px" v-model="addFormData.code" disabled/>-->
        <!--</FormItem>-->
        <!--<FormItem label="年级">-->
        <!--<Input style="width:340px" v-model="addFormData.code" disabled/>-->
        <!--</FormItem>-->
        <!--<FormItem label="班级">-->
        <!--<Input style="width:340px" v-model="addFormData.code" disabled/>-->
        <!--</FormItem>-->
        <!--<FormItem label="人数">-->
        <!--<Input style="width:340px" v-model="addFormData.code" disabled/>-->
        <!--</FormItem>-->
        <!--<FormItem label="">-->
        <!--<div>-->
        <!--<span style="display:inline-block;color: #666666;font-size:14px;font-weight:bold;margin-right: 28px">体检计划状态</span>-->
        <!--<RadioGroup>-->
        <!--<Radio label="1" checked>通过</Radio>-->
        <!--<Radio label="2">驳回</Radio>-->
        <!--</RadioGroup>-->
        <!--</div>-->
        <!--</FormItem>-->
        <!--<FormItem label="驳回理由" style="width:96%;margin-top: 10px">-->
        <!--<Input type="textarea" :rows="4" v-model="addFormData.reason" style="height: 98px!important;"/>-->
        <!--</FormItem>-->
        <!--</Form>-->

        <!--</Modal>-->
    </div>
</template>
<script>
    import urls from '../../../service/Urls';

    export default {
        name: 'schedule',
        data() {
            return {
                req: {
                    dep_id: '-1',
                    year: null,
                    term: '-1',
                    grade_no: '-1',
                    class_no: '-1'
                },
                modal: false,
                reviewResult: false,
                dateOpts: {
                    //禁止选择当年之前的年份
                    disabledDate(date) {
                        let d = new Date();
                        return date && date.getFullYear() < d.getFullYear();
                    }
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
                        width: 60
                    },
                    {
                        title: '学校名称',
                        key: 'school_name'
                    },
                    {
                        title: '学年',
                        key: 'year'
                    },
                    {
                        title: '学期',
                        key: 'term',
                        render(h, params) {
                            return h('span', null, params.row.term === 1 ? '第一学期' : '第二学期');
                        }
                    },
                    {
                        title: '年级',
                        key: 'grade_name'
                    },
                    {
                        title: '班级',
                        key: 'class_name'
                    },
                    {
                        title: '人数',
                        key: 'count_num'
                    }
                ],
                tableData: [],
                selectValue: [],
                pageConfig: {
                    page: 1,
                    size: 10,
                    total: 0,
                    opts: [10, 20, 50, 100]
                },
                schoolList: [],
                gradeList: [],
                classList: []
            };
        },
        methods: {
            getSelectCondition(type) {
                /// ===========获取下拉列表查询条件
                this.$ajax({
                    // 医院
                    url: urls.dept_all_list,
                    data: {
                        type: type,
                        status: 1
                    }
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.schoolList = data.data.filter((item) => {
                                return item.type === type;
                            });
                        } else {
                            this.schoolList = [];
                        }
                    })
                    .catch(err => {
                        window.console.log(err);
                    });
            },
            schoolChange(value) {
                this.req.grade_no = '-1';
                this.req.class_no = '-1';
                this.classList = [];
                if (value === '-1') {
                    this.gradeList = [];
                    return false;
                }
                this.$ajax({
                    url: urls.dictm_all_list,
                    data: {
                        'category_id': '82649A1FDF4DEA7EE050007F01001901',
                        'status': 1
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.gradeList = data.data;
                    } else {
                        this.gradeList = [];
                    }
                }).catch(err => {
                    this.gradeList = [];
                });
            },
            gradeChange(value) {
                this.req.class_no = '-1';
                if (value === '-1') {
                    this.classList = [];
                    return false;
                }
                this.$ajax({
                    url: urls.class_all_lists,
                    data: {
                        grade_no: this.req.grade_no === '-1' ? null : this.req.grade_no,
                        year: this.req.year ? this.req.year.getFullYear() : null,
                        dep_id: this.req.dep_id === '-1' ? null : this.req.dep_id,
                        term: this.req.term === '-1' ? null : this.req.term
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.classList = data.data;
                    } else {
                        this.classList = [];
                    }
                });
            },
            selectChange(value) {
                this.selectValue = value;
            },
            initSearch() {
                // 重新查询时页面置为第一页
                this.pageConfig.page = 1;
                this.search();
            },
            search() {
                this.$ajax({
                    url: urls.student_bao_list,
                    data: {
                        page: this.pageConfig.page,
                        size: this.pageConfig.size,
                        dep_id: this.req.dep_id === '-1' ? null : this.req.dep_id,
                        year: this.req.year ? this.req.year.getFullYear() : null,
                        term: this.req.term === '-1' ? null : this.req.term,
                        grade_no: this.req.grade_no === '-1' ? null : this.req.grade_no,
                        class_no: this.req.class_no === '-1' ? null : this.req.class_no
                    }
                }).then((data) => {
                    if (data && data.data) {
                        this.tableData = data.data;
                        this.pageConfig.total = data.totalRecords;
                    } else {
                        this.tableData = [];
                        this.pageConfig.total = 0;
                    }
                });
            },
            doReview() {
                if (this.selectValue.length) {
                    let data = this.selectValue.map(item => {
                        return {
                            'class_no': item.class_no,
                            'count': item.count_num,
                            'dep_id': item.dep_id,
                            'grade_no': item.grade_no,
                            'task_id': item.task_id,
                            'term': item.term,
                            'year': item.year,
                        };
                    });
                    this.$ajax({
                        url: urls.student_bao_add,
                        data: data
                    }).then(json => {
                        if (json.code === 200) {
                            this.$Message.success('上报成功');
                            this.search();
                        }
                    });
                } else {
                    this.$Message.error('请选择数据');
                }
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
            },
        },
        created() {
            this.getSelectCondition(2);//医院
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
