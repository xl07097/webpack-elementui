<template>
    <div class="ageSummaryReport content-box">
        <h3 class="title">年龄汇总报告单</h3>
        <Form class="clearfix" inline label-position="left">
            <FormItem label="年龄" :label-width="44">
                <i-input v-model="req.age" style="width:140px"></i-input>
            </FormItem>
            <div class="operator">
                <i-button class="searchBtn" size="small" type="primary" @click="initSearch">查询</i-button>
            </div>
        </Form>
        <Divider dashed/>
        <Table center :disabled-hover='true' border :columns="columns" :data="tableData"></Table>
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
</template>

<script>
    import urls from '../../../service/Urls';

    export default {
        name: 'ageSummaryReport',
        data() {
            return {
                req: {
                    age: null,
                },
                columns: [
                    {
                        width: 100,
                        fixed: 'left',
                        title: '年龄',
                        key: 'age',
                        align: 'center',
                    },
                    {
                        title: '性别',
                        width: 70,
                        fixed: 'left',
                        key: 'gender',
                        align: 'center',
                        render: (h, params) => {
                            return h('span', params.row.gender === 1 ? '男' : '女');
                        }
                    },
                    {
                        title: '学生人数',
                        key: 'allcount',
                        width: 80,
                        fixed: 'left',
                        align: 'center'
                    },
                    {
                        title: '实检人数',
                        width: 90,
                        key: 'real_numme',
                        fixed: 'left',
                        align: 'center'
                    },
                    {
                        title: '视力低下',
                        align: 'center',
                        children: [{
                            title: '人数',
                            width: 90,
                            key: 'eye_num',
                            align: 'center'
                        }, {
                            title: '占受检%',
                            width: 90,
                            key: 'eye_per',
                            align: 'center'
                        }]
                    },
                    {
                        title: '沙眼',
                        align: 'center',
                        children: [{
                            title: '人数',
                            width: 90,
                            key: 'trachoma_num',
                            align: 'center'
                        }, {
                            title: '占受检%',
                            width: 90,
                            key: 'trachoma_per',
                            align: 'center'
                        }]
                    },
                    {
                        title: '乳牙',
                        align: 'center',
                        children: [{
                            title: '人数',
                            width: 90,
                            key: 'deciduous_num',
                            align: 'center'
                        }, {
                            title: '乳牙龋患率%',
                            width: 90,
                            key: 'deciduous_per1',
                            align: 'center'
                        }, {
                            title: '乳牙龋率%',
                            width: 90,
                            key: 'deciduous_per2',
                            align: 'center'
                        }, {
                            title: '乳牙龋失率%',
                            width: 90,
                            key: 'deciduous_per3',
                            align: 'center'
                        }, {
                            title: '乳牙龋补率%',
                            width: 90,
                            key: 'deciduous_per4',
                            align: 'center'
                        }, {
                            title: '乳牙龋均',
                            width: 90,
                            key: 'deciduous_per5',
                            align: 'center'
                        }, {
                            title: '乳牙龋齿充填率％',
                            width: 90,
                            key: 'deciduous_per6',
                            align: 'center'
                        }]
                    },
                    {
                        title: '恒牙',
                        align: 'center',
                        children: [{
                            title: '人数',
                            width: 90,
                            key: 'permanent_num',
                            align: 'center'
                        }, {
                            title: '恒牙龋患率%',
                            width: 90,
                            key: 'permanent_per1',
                            align: 'center'
                        }, {
                            title: '恒牙龋率%',
                            width: 90,
                            key: 'permanent_per2',
                            align: 'center'
                        }, {
                            title: '恒牙龋失率%',
                            width: 90,
                            key: 'permanent_per3',
                            align: 'center'
                        }, {
                            title: '恒牙龋补率%',
                            width: 90,
                            key: 'permanent_per4',
                            align: 'center'
                        }, {
                            title: '恒牙龋均',
                            width: 90,
                            key: 'permanent_per5',
                            align: 'center'
                        }, {
                            title: '恒牙龋齿充填率％',
                            width: 90,
                            key: 'permanent_per6',
                            align: 'center'
                        }]
                    },
                    {
                        title: '营养不良',
                        align: 'center',
                        children: [{
                            title: '人数',
                            width: 90,
                            key: 'malnutrition_num',
                            align: 'center'
                        }, {
                            title: '占受检%',
                            width: 90,
                            key: 'malnutrition_per',
                            align: 'center'
                        }]
                    },
                    {
                        title: '超重',
                        align: 'center',
                        children: [{
                            title: '人数',
                            width: 90,
                            key: 'overweight_num',
                            align: 'center'
                        }, {
                            title: '占受检%',
                            width: 90,
                            key: 'overweight_per',
                            align: 'center'
                        }]
                    },
                    {
                        title: '肥胖',
                        align: 'center',
                        children: [{
                            title: '人数',
                            width: 90,
                            key: 'fat_num',
                            align: 'center'
                        }, {
                            title: '占受检%',
                            width: 90,
                            key: 'fat_per',
                            align: 'center'
                        }]
                    },
                    {
                        title: '血压偏高',
                        align: 'center',
                        children: [{
                            title: '人数',
                            width: 90,
                            key: 'High_blood_num',
                            align: 'center'
                        }, {
                            title: '占受检%',
                            width: 90,
                            key: 'High_blood_per',
                            align: 'center'
                        }]
                    }
                ],
                tableData: [
                    {
                        age: '8',
                        id: "1",
                        gender: 1,
                        allcount: 1,
                        real_numme: 1,
                        eye_num: 1,
                        eye_per: '100%',
                        trachoma_num: 0,
                        trachoma_per: '0%',
                        deciduous_num: '0',
                        deciduous_per1: '0%',
                        deciduous_per2: '0%',
                        deciduous_per3: '0%',
                        deciduous_per4: '0%',
                        deciduous_per5: '0%',
                        deciduous_per6: '0%',
                        permanent_num: '0',
                        permanent_per1: '0%',
                        permanent_per2: '0%',
                        permanent_per3: '0%',
                        permanent_per4: '0%',
                        permanent_per5: '0%',
                        permanent_per6: '0%',
                        malnutrition_num: '0',
                        malnutrition_per: '0%',
                        overweight_num: '1',
                        overweight_per: '0%',
                        fat_num: '0',
                        fat_per: '0%',
                        High_blood_num: '0',
                        High_blood_per: '0%'
                    }
                ],
                areaList: [],
                schoolList: [],
                gradeList: [],
                classList: [],
                pageConfig: {
                    page: 1,
                    size: 10,
                    total: 0,
                    opts: [10, 20, 50, 100]
                }
            };
        },
        methods: {
            initSearch() {
                // 重新查询时页面置为第一页
                this.pageConfig.page = 1;
                // this.search();
            },
            search() {
                let json = {
                    page: this.pageConfig.page,
                    size: this.pageConfig.size,
                    age: this.req.age ? this.req.age : null,
                };
                this.$ajax({
                    url: urls.student_list,
                    data: json
                }).then(data => {
                    if (data.code === 200) {
                        this.tableData = data.data;
                        this.pageConfig.total = data.totalRecords;
                        // this.$Message.success('数据查询成功');
                    } else {
                        this.tableData = [];
                        this.pageConfig.total = 0;
                        // this.$Message.error('数据查询失败');
                    }
                }).catch(() => {
                    this.tableData = [];
                    this.pageConfig.total = 0;
                    // this.$Message.error('数据查询失败');
                });
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
            // this.search();
        }
    };
</script>

<style lang="less">
    .ageSummaryReport {
        min-height: 500px;
        border-radius: 8px;
        padding: 30px 44px;

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
            margin: 0 0 40px 0;
        }
        .disabled span {
            color: #ccc;
        }
        .page {
            margin-top: 24px;
            text-align: center;
        }
    }
</style>





