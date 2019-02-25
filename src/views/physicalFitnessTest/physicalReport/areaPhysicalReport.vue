<template>
    <div class="areaPhysicalReport content-box">
        <h3 class="title">区域汇总报告单</h3>
        <Form class="clearfix" inline label-position="left">
            <FormItem label="区域" :label-width="44">
                <i-select v-model="req.area_id" style="width:160px">
                    <i-option :value="-1">全部</i-option>
                    <i-option v-for="item of areaList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                </i-select>
            </FormItem>

            <div class="operator">
                <i-button class="searchBtn" size="small" type="primary" @click="initSearch">查询</i-button>
            </div>
        </Form>
        <Divider dashed/>
        <v-table
                :is-horizontal-resize="true"
                style="width:100%"
                :title-row-height='40'
                :row-height='48'
                :height="600"
                title-bg-color="#498E8A"
                :columns="columns1"
                :table-data="tableData"
                :cell-merge="cellMerge"
                :title-rows="titleRows"
        ></v-table>
        <!--<Table center :disabled-hover='true' :columns="columns" :data="tableData"></Table>-->


    </div>
</template>

<script>
    import urls from '../../../service/Urls';

    export default {
        name: 'areaPhysicalReport',
        data() {
            return {
                req: {
                    area_id: -1,
                },
                titleRows: [
                    [
                        {fields: ['school_name'], title: '学校', titleAlign: 'left', rowspan: 2},
                        {fields: ['gender',], title: '性别', titleAlign: 'left', rowspan: 2},
                        {fields: ['allcount'], title: '学生人数', titleAlign: 'left', rowspan: 2},
                        {fields: ['real_numme'], title: '实检人数', titleAlign: 'left', rowspan: 2},
                        {fields: ['BMI_per1','BMI_per2','BMI_per3','BMI_per4'], title: 'BMI', titleAlign: 'center',colspan: 4},
                        {fields: ['vitalcapacity_per1','vitalcapacity_per2','vitalcapacity_per3','vitalcapacity_per4'], title: '肺活量', titleAlign: 'center',colspan: 4},
                        {fields: ['rope_skipping1','rope_skipping2','rope_skipping3','rope_skipping4'], title: '一分钟跳绳', titleAlign: 'center',colspan: 4},
                        {fields: ['sit_per1','sit_per2','sit_per3','sit_per4'], title: '坐位体前屈', titleAlign: 'center',colspan: 4},
                        {fields: ['longjump_per1','longjump_per2','longjump_per3','longjump_per4'], title: '立定跳远', titleAlign: 'center',colspan: 4},
                        {fields: ['chinning_per1','chinning_per2','chinning_per3','chinning_per4'], title: '引体向上', titleAlign: 'center',colspan: 4},
                        {fields: ['situps_per1','situps_per2','situps_per3','situps_per4'], title: '一分钟仰卧起坐', titleAlign: 'center',colspan: 4},
                        {fields: ['run50_per1','run50_per2','run50_per3','run50_per4'], title: '50米跑', titleAlign: 'center',colspan: 4},
                        {fields: ['run50_8_per1','run50_8_per2','run50_8_per3','run50_8_per4'], title: '50米跑*8往返', titleAlign: 'center',colspan: 4},
                        {fields: ['run800_per1','run800_per2','run800_per3','run800_per4'], title: '800米跑', titleAlign: 'center',colspan: 4},
                        {fields: ['run1000_per1','run1000_per2','run1000_per3','run1000_per4'], title: '1000米跑', titleAlign: 'center',colspan: 4}
                    ],
                    [
                        {fields: ['BMI_per1'], title: '优秀率(%)', titleAlign: 'left'},
                        {fields: ['BMI_per2'], title: '良好率(%)', titleAlign: 'left'},
                        {fields: ['BMI_per2'], title: '合格率(%)', titleAlign: 'left'},
                        {fields: ['BMI_per4'], title: '不合格率(%)', titleAlign: 'left'},
                        {fields: ['vitalcapacity_per1'], title: '优秀率(%)', titleAlign: 'left'},
                        {fields: ['vitalcapacity_per2'], title: '良好率(%)', titleAlign: 'left'},
                        {fields: ['vitalcapacity_per3'], title: '合格率(%)', titleAlign: 'left'},
                        {fields: ['vitalcapacity_per4'], title: '不合格率(%)', titleAlign: 'left'},
                        {fields: ['rope_skipping1'], title: '优秀率(%)', titleAlign: 'left'},
                        {fields: ['rope_skipping2'], title: '良好率(%)', titleAlign: 'left'},
                        {fields: ['rope_skipping3'], title: '合格率(%)', titleAlign: 'left'},
                        {fields: ['rope_skipping4'], title: '不合格率(%)', titleAlign: 'left'},
                        {fields: ['sit_per1'], title: '优秀率(%)', titleAlign: 'left'},
                        {fields: ['sit_per2'], title: '良好率(%)', titleAlign: 'left'},
                        {fields: ['sit_per3'], title: '合格率(%)', titleAlign: 'left'},
                        {fields: ['sit_per4'], title: '不合格率(%)', titleAlign: 'left'},
                        {fields: ['longjump_per1'], title: '优秀率(%)', titleAlign: 'left'},
                        {fields: ['longjump_per2'], title: '良好率(%)', titleAlign: 'left'},
                        {fields: ['longjump_per3'], title: '合格率(%)', titleAlign: 'left'},
                        {fields: ['longjump_per4'], title: '不合格率(%)', titleAlign: 'left'},
                        {fields: ['chinning_per1'], title: '优秀率(%)', titleAlign: 'left'},
                        {fields: ['chinning_per2'], title: '良好率(%)', titleAlign: 'left'},
                        {fields: ['chinning_per3'], title: '合格率(%)', titleAlign: 'left'},
                        {fields: ['chinning_per4'], title: '不合格率(%)', titleAlign: 'left'},
                        {fields: ['situps_per1'], title: '优秀率(%)', titleAlign: 'left'},
                        {fields: ['situps_per2'], title: '良好率(%)', titleAlign: 'left'},
                        {fields: ['situps_per3'], title: '合格率(%)', titleAlign: 'left'},
                        {fields: ['situps_per4'], title: '不合格率(%)', titleAlign: 'left'},
                        {fields: ['run50_per1'], title: '优秀率(%)', titleAlign: 'left'},
                        {fields: ['run50_per2'], title: '良好率(%)', titleAlign: 'left'},
                        {fields: ['run50_per3'], title: '合格率(%)', titleAlign: 'left'},
                        {fields: ['run50_per4'], title: '不合格率(%)', titleAlign: 'left'},
                        {fields: ['run50_8_per1'], title: '优秀率(%)', titleAlign: 'left'},
                        {fields: ['run50_8_per2'], title: '良好率(%)', titleAlign: 'left'},
                        {fields: ['run50_8_per3'], title: '合格率(%)', titleAlign: 'left'},
                        {fields: ['run50_8_per4'], title: '不合格率(%)', titleAlign: 'left'},
                        {fields: ['run800_per1'], title: '优秀率(%)', titleAlign: 'left'},
                        {fields: ['run800_per2'], title: '良好率(%)', titleAlign: 'left'},
                        {fields: ['run800_per3'], title: '合格率(%)', titleAlign: 'left'},
                        {fields: ['run800_per4'], title: '不合格率(%)', titleAlign: 'left'},
                        {fields: ['run1000_per1'], title: '优秀率(%)', titleAlign: 'left'},
                        {fields: ['run1000_per2'], title: '良好率(%)', titleAlign: 'left'},
                        {fields: ['run1000_per3'], title: '合格率(%)', titleAlign: 'left'},
                        {fields: ['run1000_per4'], title: '不合格率(%)', titleAlign: 'left'}
                    ]
                ],
                columns1: [
                    {
                        field: 'school_name',
                        width: 160,
                        isFrozen: true,
                        // formatter: function (rowData, index) {
                        //     console.log(rowData)
                        //     return '<div style="padding-left: 8px;">'+ rowData.school_name+'</div>'
                        // }
                    },
                    {
                        field: 'gender',
                        width: 60,
                        isFrozen: true,
                    },
                    {
                        field: 'allcount',
                        width: 80,
                        isFrozen: true
                    },
                    {
                        field: 'real_numme',
                        width: 80,
                        isFrozen: true
                    },
                    {
                        field: 'BMI_per1',
                        width: 100
                    },
                    {
                        field: 'BMI_per2',
                        width: 100
                    },
                    {
                        field: 'BMI_per3',
                        width: 100
                    },
                    {
                        field: 'BMI_per4',
                        width: 100
                    },
                    {
                        field: 'vitalcapacity_per1',
                        width: 100
                    },
                    {
                        field: 'vitalcapacity_per2',
                        width: 100
                    },
                    {
                        field: 'vitalcapacity_per3',
                        width: 100
                    },
                    {
                        field: 'vitalcapacity_per4',
                        width: 100
                    },
                    {
                        field: 'sit_per1',
                        width: 100
                    },
                    {
                        field: 'sit_per2',
                        width: 100
                    },
                    {
                        field: 'sit_per3',
                        width: 100
                    },
                    {
                        field: 'sit_per4',
                        width: 100
                    },
                    {
                        field: 'rope_skipping1',
                        width: 100
                    },
                    {
                        field: 'rope_skipping2',
                        width: 100
                    },
                    {
                        field: 'rope_skipping3',
                        width: 100
                    },
                    {
                        field: 'rope_skipping4',
                        width: 100
                    },
                    {
                        field: 'longjump_per1',
                        width: 100
                    },
                    {
                        field: 'longjump_per2',
                        width: 100
                    },
                    {
                        field: 'longjump_per3',
                        width: 100
                    },
                    {
                        field: 'longjump_per4',
                        width: 100
                    },
                    {
                        field: 'chinning_per1',
                        width: 100
                    },
                    {
                        field: 'chinning_per2',
                        width: 100
                    },
                    {
                        field: 'chinning_per3',
                        width: 100
                    },
                    {
                        field: 'chinning_per4',
                        width: 100
                    },
                    {
                        field: 'situps_per1',
                        width: 100
                    },
                    {
                        field: 'situps_per2',
                        width: 100
                    },
                    {
                        field: 'situps_per3',
                        width: 100
                    },
                    {
                        field: 'situps_per4',
                        width: 100
                    },
                    {
                        field: 'run50_per1',
                        width: 100
                    },
                    {
                        field: 'run50_per2',
                        width: 100
                    },
                    {
                        field: 'run50_per3',
                        width: 100
                    },
                    {
                        field: 'run50_per4',
                        width: 100
                    },
                    {
                        field: 'run50_8_per1',
                        width: 100
                    },
                    {
                        field: 'run50_8_per2',
                        width: 100
                    },
                    {
                        field: 'run50_8_per3',
                        width: 100
                    },
                    {
                        field: 'run50_8_per4',
                        width: 100
                    },
                    {
                        field: 'run800_per1',
                        width: 100
                    },
                    {
                        field: 'run800_per2',
                        width: 100
                    },
                    {
                        field: 'run800_per3',
                        width: 100
                    },
                    {
                        field: 'run800_per4',
                        width: 100
                    },
                    {
                        field: 'run1000_per1',
                        width: 100
                    },
                    {
                        field: 'run1000_per2',
                        width: 100
                    },
                    {
                        field: 'run1000_per3',
                        width: 100
                    },
                    {
                        field: 'run1000_per4',
                        width: 100
                    }
                ],
                tableData: [
                ],
                areaList: [],

            };
        },
        methods: {
            getSelectCondition() {
                /// ===========获取下拉列表查询条件
                this.$ajax({ // 区域列表
                    url: urls.area_list,
                }).then(data => {
                    if (data.code === 200) {
                        this.areaList = data.data;
                    } else {
                        this.areaList = [];
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            initSearch() {
                // 重新查询时页面置为第一页
                this.search();
            },
            search() {
                let json = {
                    area_id: this.req.area_id === -1 ? '' : this.req.area_id
                };
                this.$ajax({
                    url: urls.area_report_list,
                    data: json
                }).then(data => {
                    if (data.code === 200) {
                        let list =data.data.map(v=>{
                            return{
                                'school_name':v.school_name,
                                'gender':v.gender,
                                'allcount':v.shouldpeople,
                                'real_numme':v.realpeople,
                                'BMI_per1': v.set_list[5].percent_yx?v.set_list[5].percent_yx:'0%',
                                'BMI_per2': v.set_list[5].percent_lh?v.set_list[5].percent_lh:'0%',
                                'BMI_per3': v.set_list[5].percent_jg?v.set_list[5].percent_jg:'0%',
                                'BMI_per4': v.set_list[5].percent_bjg?v.set_list[5].percent_bjg:'0%',
                                'vitalcapacity_per1': v.set_list[4].percent_yx?v.set_list[4].percent_yx:'0%',
                                'vitalcapacity_per2': v.set_list[4].percent_lh?v.set_list[4].percent_lh:'0%',
                                'vitalcapacity_per3': v.set_list[4].percent_jg?v.set_list[4].percent_jg:'0%',
                                'vitalcapacity_per4': v.set_list[4].percent_bjg?v.set_list[4].percent_bjg:'0%',
                                'sit_per1': v.set_list[0].percent_yx?v.set_list[0].percent_yx:'0%',
                                'sit_per2': v.set_list[0].percent_lh?v.set_list[0].percent_lh:'0%',
                                'sit_per3': v.set_list[0].percent_jg?v.set_list[0].percent_jg:'0%',
                                'sit_per4': v.set_list[0].percent_bjg?v.set_list[0].percent_bjg:'0%',
                                'rope_skipping1': v.set_list[3].percent_yx?v.set_list[3].percent_yx:'0%',
                                'rope_skipping2': v.set_list[3].percent_lh?v.set_list[3].percent_lh:'0%',
                                'rope_skipping3': v.set_list[3].percent_jg?v.set_list[3].percent_jg:'0%',
                                'rope_skipping4': v.set_list[3].percent_bjg?v.set_list[3].percent_bjg:'0%',
                                'longjump_per1': v.set_list[10].percent_yx?v.set_list[10].percent_yx:'0%',
                                'longjump_per2': v.set_list[10].percent_lh?v.set_list[10].percent_lh:'0%',
                                'longjump_per3': v.set_list[10].percent_jg?v.set_list[10].percent_jg:'0%',
                                'longjump_per4': v.set_list[10].percent_bjg?v.set_list[10].percent_bjg:'0%',
                                'chinning_per1': v.set_list[8].percent_yx?v.set_list[8].percent_yx:'0%',
                                'chinning_per2': v.set_list[8].percent_lh?v.set_list[8].percent_lh:'0%',
                                'chinning_per3': v.set_list[8].percent_jg?v.set_list[8].percent_jg:'0%',
                                'chinning_per4': v.set_list[8].percent_bjg?v.set_list[8].percent_bjg:'0%',
                                'situps_per1': v.set_list[1].percent_yx?v.set_list[1].percent_yx:'0%',
                                'situps_per2': v.set_list[1].percent_lh?v.set_list[1].percent_lh:'0%',
                                'situps_per3': v.set_list[1].percent_jg?v.set_list[1].percent_jg:'0%',
                                'situps_per4': v.set_list[1].percent_bjg?v.set_list[1].percent_bjg:'0%',
                                'run50_8_per1': v.set_list[9].percent_yx?v.set_list[9].percent_yx:'0%',
                                'run50_8_per2': v.set_list[9].percent_lh?v.set_list[9].percent_lh:'0%',
                                'run50_8_per3': v.set_list[9].percent_jg?v.set_list[9].percent_jg:'0%',
                                'run50_8_per4': v.set_list[9].percent_bjg?v.set_list[9].percent_bjg:'0%',
                                'run50_per1': v.set_list[2].percent_yx?v.set_list[2].percent_yx:'0%',
                                'run50_per2': v.set_list[2].percent_lh?v.set_list[2].percent_lh:'0%',
                                'run50_per3': v.set_list[2].percent_jg?v.set_list[2].percent_jg:'0%',
                                'run50_per4': v.set_list[2].percent_bjg?v.set_list[2].percent_bjg:'0%',
                                'run800_per1': v.set_list[6].percent_yx?v.set_list[6].percent_yx:'0%',
                                'run800_per2': v.set_list[6].percent_lh?v.set_list[6].percent_lh:'0%',
                                'run800_per3': v.set_list[6].percent_jg?v.set_list[6].percent_jg:'0%',
                                'run800_per4': v.set_list[6].percent_bjg?v.set_list[6].percent_bjg:'0%',
                                'run1000_per1': v.set_list[7].percent_yx?v.set_list[7].percent_yx:'0%',
                                'run1000_per2': v.set_list[7].percent_lh?v.set_list[7].percent_lh:'0%',
                                'run1000_per3': v.set_list[7].percent_jg?v.set_list[7].percent_jg:'0%',
                                'run1000_per4': v.set_list[7].percent_bjg?v.set_list[7].percent_bjg:'0%',
                            };
                        })
                        list.map((v,index)=>{
                            // alert(v)
                            // alert(index)
                        })
                        this.tableData = list;
                        // this.$Message.success('数据查询成功');
                    } else {
                        this.tableData = [];
                        // this.$Message.error('数据查询失败');
                    }
                }).catch(() => {
                    this.tableData = [];
                    // this.$Message.error('数据查询失败');
                });
            },
            abstractMerge(para) {
                return {
                    colSpan: para.colSpan || 1,
                    rowSpan: para.rowSpan || 1,
                    content: para.content || ''
                };
            },
            cellMerge(rowIndex, rowData, field) {
                // if (field === 'school_name') {
                //     // console.log(rowData.school_name)
                //     return {
                //         colSpan: 1,
                //         rowSpan: 1,
                //         content: '<div style="padding-left: 10px;">'+rowData.school_name+'</div>'
                //     }
                // }
            },
        },
        created() {
            this.getSelectCondition();
            this.search();
        }
    };
</script>

<style lang="less">
    .areaPhysicalReport {
        min-height: 500px;
        border-radius: 8px;
        padding: 30px 44px;
        .table-title, .v-table-sort-icon{

            font-size:16px;
            font-family:SourceHanSansCN-Heavy;
            font-weight:800;
            color:rgba(255,255,255,1);
            text-shadow:0 1px 2px rgba(129,188,201,0.96);
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
