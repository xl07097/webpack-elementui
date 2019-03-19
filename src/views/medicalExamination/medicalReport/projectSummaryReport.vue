<template>
    <div class="projectSummaryReport content-box">
        <div style="position: relative;z-index: 100;">
            <h3 class="title">体检项目报告单</h3>
            <Form class="clearfix" inline label-position="left">
                <FormItem label="项目" :label-width="44">
                    <i-select v-model="req.project_id" style="width:160px">
                        <i-option :value="-1">全部</i-option>
                        <i-option v-for="item of peojectList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>

                <div class="operator">
                    <i-button class="searchBtn" size="small" type="primary" @click="initSearch">查询</i-button>
                </div>
            </Form>
            <Divider dashed/>
        </div>

        <div class="table-wrapper">
            <div class="table-inner" ref="inner">
                <v-table
                        is-horizontal-resize
                        :title-row-height='40'
                        :row-height='48'
                        :height="600"
                        title-bg-color="#498E8A"
                        style="width:100%"
                        :columns="columns"
                        :table-data="tableData"
                        :cell-merge="cellMerge"
                        :title-rows="titleRows"
                ></v-table>
            </div>
        </div>

    </div>
</template>

<script>
    import urls from '../../../service/Urls';
    import Vue from 'vue';

    export default {
        name: 'projectSummaryReport',
        data() {
            return {
                req: {
                    project_id: -1,
                },
                titleRows: [
                    [
                        {fields: ['section_name'], title: '科室', titleAlign: 'center', rowspan: 2},
                        {fields: ['project_name',], title: '项目', titleAlign: 'center', rowspan: 2},
                        {fields: ['number'], title: '学生人数', titleAlign: 'center', rowspan: 2},
                        {fields: ['realnumber'], title: '实检人数', titleAlign: 'center', rowspan: 2},
                        {fields: ['normal_number','normal_per'], title: '正常', titleAlign: 'center',colspan: 2},
                        {fields: ['abnormal_number','abnormal_per'], title: '异常', titleAlign: 'center',colspan: 2},
                    ],
                    [
                        {fields: ['normal_number'], title: '人数', titleAlign: 'center'},
                        {fields: ['normal_per'], title: '占受检%', titleAlign: 'center'},
                        {fields: ['abnormal_number'], title: '人数', titleAlign: 'center'},
                        {fields: ['abnormal_per'], title: '占受检%', titleAlign: 'center'},
                    ]
                ],
                columns: [
                    {
                        field: 'section_name',
                        width: 160,
                        columnAlign: 'center',
                        isResize: true
                    },
                    {
                        field: 'project_name',
                        width: 100,
                        columnAlign: 'center',
                        isResize: true
                    },
                    {
                        field: 'number',
                        width: 160,
                        columnAlign: 'center',
                        isResize: true
                    },
                    {
                        field: 'realnumber',
                        width: 100,
                        columnAlign: 'center',
                        isResize: true
                    },
                    {
                        field: 'normal_number',
                        width: 80,
                        columnAlign: 'center',
                        isResize: true
                    },
                    {
                        field: 'normal_per',
                        width: 180,
                        columnAlign: 'center',
                        isResize: true
                    },
                    {
                        field: 'abnormal_number',
                        width: 100,
                        titleAlign: 'center',
                        columnAlign: 'center',
                        isResize: true
                    },
                    {
                        field: 'abnormal_per',
                        width: 100,
                        titleAlign: 'center',
                        columnAlign: 'center',
                        isResize: true
                    }
                ],
                tableData: [
                    {
                        id: '12',
                        section_name: '形体',
                        project_name: '身高',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },
                    {
                        id: '12',
                        section_name: '形体',
                        project_name: '体重',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },
                    {
                        id: '12',
                        section_name: '生理功能',
                        project_name: '血压',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },
                    {
                        id: '12',
                        section_name: '生理功能',
                        project_name: '脉搏',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },

                    {
                        id: '12',
                        section_name: '视力',
                        project_name: '视力',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },
                    {
                        id: '12',
                        section_name: '视力',
                        project_name: '矫正视力',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },

                    {
                        id: '12',
                        section_name: '眼科',
                        project_name: '屈光',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },
                    {
                        id: '12',
                        section_name: '眼科',
                        project_name: '近视',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },
                    {
                        id: '12',
                        section_name: '眼科',
                        project_name: '沙眼',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },
                    {
                        id: '12',
                        section_name: '眼科',
                        project_name: '结膜炎',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },
                    {
                        id: '12',
                        section_name: '眼科',
                        project_name: '色觉',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },

                    {
                        id: '12',
                        section_name: '口腔科',
                        project_name: '齿列',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },
                    {
                        id: '12',
                        section_name: '口腔科',
                        project_name: '牙周',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },
                    {
                        id: '12',
                        section_name: '口腔科',
                        project_name: '龋齿',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },
                    {
                        id: '12',
                        section_name: '口腔科',
                        project_name: '龋换牙数',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },
                    {
                        id: '12',
                        section_name: '口腔科',
                        project_name: '龋失牙数',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },
                    {
                        id: '12',
                        section_name: '口腔科',
                        project_name: '龋补牙数',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },
                    {
                        id: '12',
                        section_name: '口腔科',
                        project_name: '其他',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },

                    {
                        id: '12',
                        section_name: '耳鼻喉科',
                        project_name: '耳',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },
                    {
                        id: '12',
                        section_name: '耳鼻喉科',
                        project_name: '鼻',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },
                    {
                        id: '12',
                        section_name: '耳鼻喉科',
                        project_name: '喉',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },

                    {
                        id: '12',
                        section_name: '外科',
                        project_name: '皮肤',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },
                    {
                        id: '12',
                        section_name: '外科',
                        project_name: '淋巴结',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },
                    {
                        id: '12',
                        section_name: '外科',
                        project_name: '头部',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },
                    {
                        id: '12',
                        section_name: '外科',
                        project_name: '颈部',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },
                    {
                        id: '12',
                        section_name: '外科',
                        project_name: '脊柱',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },
                    {
                        id: '12',
                        section_name: '外科',
                        project_name: '四肢',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },
                    {
                        id: '12',
                        section_name: '外科',
                        project_name: '胸部',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },
                    {
                        id: '12',
                        section_name: '外科',
                        project_name: '其他',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },

                    {
                        id: '12',
                        section_name: '内科',
                        project_name: '心',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },
                    {
                        id: '12',
                        section_name: '内科',
                        project_name: '肺',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },
                    {
                        id: '12',
                        section_name: '内科',
                        project_name: '肝',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },
                    {
                        id: '12',
                        section_name: '内科',
                        project_name: '脾',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },
                    {
                        id: '12',
                        section_name: '内科',
                        project_name: '其他',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },

                    {
                        id: '12',
                        section_name: '检验科',
                        project_name: '肝功能',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },
                    {
                        id: '12',
                        section_name: '检验科',
                        project_name: '血红蛋白',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },
                    {
                        id: '12',
                        section_name: '检验科',
                        project_name: '结核菌素试验',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },
                    {
                        id: '12',
                        section_name: '检验科',
                        project_name: '其他化验结果',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    },
                    {
                        id: '12',
                        section_name: '检查科',
                        project_name: '胸部X线检查',
                        number: 20,
                        realnumber: 20,
                        normal_number: 16,
                        normal_per: '80%',
                        abnormal_number: 4,
                        abnormal_per: '20%'
                    }
                ],
                peojectList: [],
                pageConfig: {
                    page: 1,
                    size: 10,
                    total: 0,
                    opts: [10, 20, 50, 100]
                }
            };
        },
        methods: {
            getSelectCondition() {
                /// ===========获取下拉列表查询条件
                this.$ajax({ // 区域列表
                    url: urls.project_list,
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
                this.pageConfig.page = 1;
                this.search();
            },
            search() {
                let json = {
                    page: this.pageConfig.page,
                    size: this.pageConfig.size,
                    area_id: this.req.area_id === -1 ? null : this.req.area_id
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
            abstractMerge(para) {
                return {
                    colSpan: para.colSpan || 1,
                    rowSpan: para.rowSpan || 1,
                    content: para.content || ''
                };
            },
            cellMerge(rowIndex, rowData, field) {
                if (field === 'section_name') {
                    if (rowIndex === 0) {
                        return this.abstractMerge({'rowSpan': 2, 'content': '形体'});
                    }
                    else if (rowIndex === 2) {
                        return this.abstractMerge({'rowSpan': 2, 'content': '生理功能'});
                    }
                    else if (rowIndex === 4) {
                        return this.abstractMerge({'rowSpan': 2, 'content': '视力'});
                    }
                    else if (rowIndex === 6) {
                        return this.abstractMerge({'rowSpan': 5, 'content': '眼科'});
                    }
                    else if (rowIndex === 11) {
                        return this.abstractMerge({'rowSpan': 7, 'content': '口腔科'});
                    }
                    else if (rowIndex === 18) {
                        return this.abstractMerge({'rowSpan': 3, 'content': '耳鼻喉科'});
                    }
                    else if (rowIndex === 21) {
                        return this.abstractMerge({'rowSpan': 8, 'content': '外科'});
                    }
                    else if (rowIndex === 29) {
                        return this.abstractMerge({'rowSpan': 5, 'content': '内科'});
                    }
                    else if (rowIndex === 34) {
                        return this.abstractMerge({'rowSpan': 4, 'content': '检验科'});
                    }
                    else if (rowIndex === 38) {
                        return this.abstractMerge({'rowSpan': 1, 'content': '检查科'});
                    }
                }
            }
        },
        mounted(){
            let height = this.$refs.inner.style;
            console.log(height)
        },
        created() {
            // this.getSelectCondition();
            // this.search();
        }
    };
</script>

<style lang="less">
    .projectSummaryReport {
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
        .table-wrapper{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            padding-top: 210px;
            .table-inner{
                position: relative;
                width: 100%;
                height: 100%;
                padding: 0 44px;
                .v-table-views{
                    height: 100%;
                }
            }
        }
        .v-table-views{
            font-size: 16px;
            color: #000;
        }
    }
</style>
