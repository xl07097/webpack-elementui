<template>
    <div class="summaryreport content-box">
        <h3 class="title">学校汇总报告单</h3>
        <Form class="clearfix" inline label-position="left">
            <div>
                <FormItem label="体检类型" :label-width="80">
                    <i-select v-model="req.type" style="width:160px">
                        <i-option :value="-1">全部</i-option>
                        <i-option  :value='1'>健康体检</i-option>
                        <i-option  :value='2'>升学体检</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="体检项目" :label-width="80">
                    <i-select v-model="req.project" style="width:160px">
                        <i-option :value="-1">全部</i-option>
                        <i-option v-for="item of projectList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="区域" :label-width="80">
                    <i-select v-model="req.area_id" style="width:160px" @on-change="areaChange">
                        <i-option :value="-1">全部</i-option>
                        <i-option v-for="item of areaList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                    <i-select v-model="req.area_id2" style="width:160px">
                        <i-option :value="-1">全部</i-option>
                        <i-option v-for="item of areaList1" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="学校名称" :label-width="80">
                    <i-select v-model="req.school_no" style="width:160px">
                        <i-option :value="-1">全部</i-option>
                        <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <i-button class="searchBtn" size="small" type="primary" @click="initSearch">重置</i-button>
            </div>

            <div>
                <FormItem label="年级" :label-width="80">
                    <i-select v-model="req.grade_no" style="width:160px">
                        <i-option :value="-1">全部</i-option>
                        <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="班级" :label-width="80">
                    <i-select v-model="req.class_no" style="width:160px">
                        <i-option :value="-1">全部</i-option>
                        <i-option v-for="item of classList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="性别" :label-width="80">
                    <i-select v-model="req.gender" style="width:160px">
                        <i-option :value="-1">全部</i-option>
                        <i-option  :value='1'>男</i-option>
                        <i-option  :value='2'>女</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="年龄段" :label-width="80" style="margin-left: 163px">
                    <i-select v-model="req.age" style="width:160px">
                        <i-option :value="-1">全部</i-option>
                        <i-option v-for="item of areaList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
            </div>
        </Form>
        <Divider dashed/>
        <div class="btn-box">
            <div class="action-btn" @click="openModel">
                <img style="margin: 8px 6px;" src="../../../assets/common/print.png" alt="生成报表"/>
                生成报表
            </div>
            <div class="action-btn">
                <img style="margin: 8px 6px;" src="../../../assets/common/export.png" alt="统计"/>
                统计
            </div>
        </div>
        <div id="myChart" :style="{width: '1000px', height: '600px'}" style="margin-left: 224px"></div>
        <Modal
                v-model="model"
                :width="1200"
                class="physicalReportInfo"
                :mask-closable="false"
                class-name="vertical-center-modal"
        >
            <Table center :disabled-hover='true' border :columns="columns" :data="tableData"
                   style="margin-top: 15px"></Table>
        </Modal>
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
        name: 'summaryReport',
        data() {
            return {
                model: false,
                req: {
                    type: -1,
                    project: -1,
                    area_id: -1,
                    area_id2: -1,
                    school_no: -1,
                    grade_no: -1,
                    class_no:-1,
                    gender: -1,
                    age: -1
                },
                columns: [
                    {
                        width: 100,
                        fixed: 'left',
                        title: '年级',
                        align: 'center',
                        key: 'grade_name'
                    },
                    {
                        title: '性别',
                        width: 70,
                        fixed: 'left',
                        align: 'center',
                        key: 'gender',
                        render: (h, params) => {
                            return h('span', params.row.gender === 1 ? '男' : '女');
                        }
                    },
                    {
                        title: '学生人数',
                        key: 'allcount',
                        width: 80,
                        align: 'center',
                        fixed: 'left'
                    },
                    {
                        title: '实检人数',
                        width: 90,
                        align: 'center',
                        key: 'real_numme',
                        fixed: 'left'
                    },
                    {
                        title: '视力低下',
                        align: 'center',
                        children: [{
                            title: '人数',
                            width: 90,
                            align: 'center',
                            key: 'eye_num'
                        }, {
                            title: '占受检%',
                            width: 90,
                            align: 'center',
                            key: 'eye_per'
                        }]
                    },
                    {
                        title: '沙眼',
                        align: 'center',
                        children: [{
                            title: '人数',
                            width: 90,
                            align: 'center',
                            key: 'trachoma_num'
                        }, {
                            title: '占受检%',
                            width: 90,
                            align: 'center',
                            key: 'trachoma_per'
                        }]
                    },
                    {
                        title: '乳牙',
                        align: 'center',
                        children: [{
                            title: '人数',
                            width: 90,
                            align: 'center',
                            key: 'deciduous_num'
                        }, {
                            title: '乳牙龋患率%',
                            width: 90,
                            align: 'center',
                            key: 'deciduous_per1'
                        }, {
                            title: '乳牙龋率%',
                            width: 90,
                            align: 'center',
                            key: 'deciduous_per2'
                        }, {
                            title: '乳牙龋失率%',
                            width: 90,
                            align: 'center',
                            key: 'deciduous_per3'
                        }, {
                            title: '乳牙龋补率%',
                            width: 90,
                            align: 'center',
                            key: 'deciduous_per4'
                        }, {
                            title: '乳牙龋均',
                            width: 90,
                            align: 'center',
                            key: 'deciduous_per5'
                        }, {
                            title: '乳牙龋齿充填率％',
                            width: 90,
                            align: 'center',
                            key: 'deciduous_per6'
                        }]
                    },
                    {
                        title: '恒牙',
                        align: 'center',
                        children: [{
                            title: '人数',
                            width: 90,
                            align: 'center',
                            key: 'permanent_num'
                        }, {
                            title: '恒牙龋患率%',
                            width: 90,
                            align: 'center',
                            key: 'permanent_per1'
                        }, {
                            title: '恒牙龋率%',
                            width: 90,
                            align: 'center',
                            key: 'permanent_per2'
                        }, {
                            title: '恒牙龋失率%',
                            width: 90,
                            align: 'center',
                            key: 'permanent_per3'
                        }, {
                            title: '恒牙龋补率%',
                            width: 90,
                            align: 'center',
                            key: 'permanent_per4'
                        }, {
                            title: '恒牙龋均',
                            width: 90,
                            align: 'center',
                            key: 'permanent_per5'
                        }, {
                            title: '恒牙龋齿充填率％',
                            width: 90,
                            align: 'center',
                            key: 'permanent_per6'
                        }]
                    },
                    {
                        title: '营养不良',
                        align: 'center',
                        children: [{
                            title: '人数',
                            width: 90,
                            align: 'center',
                            key: 'malnutrition_num'
                        }, {
                            title: '占受检%',
                            width: 90,
                            align: 'center',
                            key: 'malnutrition_per'
                        }]
                    },
                    {
                        title: '超重',
                        align: 'center',
                        children: [{
                            title: '人数',
                            width: 90,
                            align: 'center',
                            key: 'overweight_num'
                        }, {
                            title: '占受检%',
                            width: 90,
                            align: 'center',
                            key: 'overweight_per'
                        }]
                    },
                    {
                        title: '肥胖',
                        align: 'center',
                        children: [{
                            title: '人数',
                            width: 90,
                            align: 'center',
                            key: 'fat_num'
                        }, {
                            title: '占受检%',
                            width: 90,
                            align: 'center',
                            key: 'fat_per'
                        }]
                    },
                    {
                        title: '血压偏高',
                        align: 'center',
                        children: [{
                            title: '人数',
                            width: 90,
                            align: 'center',
                            key: 'High_blood_num'
                        }, {
                            title: '占受检%',
                            width: 90,
                            align: 'center',
                            key: 'High_blood_per'
                        }]
                    }
                ],
                tableData: [
                    {
                        grade_name: '二年级',
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
                typeList: [],
                areaList: [],
                areaList1: [],
                projectList: [],
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
        mounted() {
            this.drawLine();
        },
        methods: {
            openModel() {
                this.model = true;
            },
            getSelectCondition() {
                /// ===========获取下拉列表查询条件
                this.$ajax({ // 区域
                    url: urls.area_all_list,
                    data: {
                        // "type": 2,
                        // "status": 1
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.areaList = data.data.filter(function (item) {
                            return item.type === 2;
                        });
                    } else {
                        this.areaList = [];
                    }
                }).catch(err => {
                    this.areaList = [];
                });
            },
            areaChange(value){
                this.req.area_id2 = -1;
                this.$ajax({ // 区
                    url: urls.area_all_list,
                    data: {
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.areaList1 = data.data.filter(function (item) {
                            return item.type === 3 && item.pid === value;
                        });
                    } else {
                        this.areaList1 = [];
                    }
                }).catch(err => {
                    this.areaList1 = [];
                });
            },
            initSearch() {
                // 重新查询时页面置为第一页
                this.pageConfig.page = 1;
                // this.search();
            },
            search() {
                let json = {
                    page: this.pageConfig.page,
                    size: this.pageConfig.size,
                    area_id: this.req.area_id === -1 ? null : this.req.area_id,
                    school_name: this.req.school_id ? this.req.school_id : null
                };
                this.$ajax({
                    url: urls.student_list,
                    data: json
                }).then(data => {
                    if (data.code === 200) {
                        this.tableData = data.data;
                        this.pageConfig.total = data.totalRecords;
                    } else {
                        this.tableData = [];
                        this.pageConfig.total = 0;
                    }
                }).catch(() => {
                    this.tableData = [];
                    this.pageConfig.total = 0;
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
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    backgroundColor: '#ffffff',
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                            color: '#fafafa'
                        }

                    },
                    title: {
                        text: '',
                        subtext: ''
                    },
                    legend: {
                        data: ['男', '女']
                    },
                    toolbox: {
                        show: false,
                        feature: {
                            mark: {
                                show: true
                            },
                            dataView: {
                                show: true,
                                readOnly: false
                            },
                            magicType: {
                                show: true,
                                type: ['stack', 'tiled']
                            },
                            restore: {
                                show: true
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    calculable: true,
                    xAxis: [{
                        type: 'category',
                        data: ['一年级', '二年级', '三年级', '四年级', '五年级',
                            '六年级', '初一', '初二'
                            , '初三', '高一', '高二', '高三']
                    }],
                    yAxis: [{
                        name: '肥胖',
                        type: 'value'
                    }],

                    series: [
                        {
                            name: '男',
                            type: 'bar',
                            stack: '总量',
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        position: 'inside'
                                    },
                                    color: '#05BFF1'
                                }
                            },
                            data: [133, 333, 222, 874, 678, 133, 333, 222, 312, 321, 133, 333]
                        },
                        {
                            name: '女',
                            type: 'bar',
                            stack: '总量',
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        position: 'inside'
                                    },
                                    color: '#FF6347'
                                }
                            },
                            data: [120, 132, 101, 134, 90, 120, 132, 101, 134, 90, 90, 120]
                        }


                    ]
                });
            }
        },
        created() {
            this.getSelectCondition();
            // this.search();
        }
    };
</script>

<style lang="less">
    .summaryreport {
        min-height: 500px;
        border-radius: 8px;
        padding: 30px 44px;
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

