<template>
    <div class="examinationPlan">
        <div class="content-box">
            <div class="title">
                体检项目规划
            </div>
            <v-table
                    is-horizontal-resize
                    :height="680"
                    :title-row-height="40"
                    :row-height="48"
                    title-bg-color="#498E8A"
                    style="width:100%"
                    :columns="columns"
                    :table-data="tableData"
                    :cell-merge="cellMerge"
                    :title-rows="titleRows"
                    @on-custom-comp="customCompFunc"
            ></v-table>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import {getexaminationPlan} from './table_Data.js';
    import Urls from '../../service/Urls';

    export default {
        name: 'examinationPlan',
        props: ['title'],
        mounted() {
            this.getTableCheck();
        },
        data() {
            return {
                selectData: [],
                check: false,
                titleRows: [
                    [
                        {fields: ['department'], title: '体检科室', titleAlign: 'center'},
                        {fields: ['itemType', 'item'], title: '体检项', titleAlign: 'center', colspan: 2},
                        {fields: ['result'], title: '结果数据', titleAlign: 'center'},
                        {fields: ['healthy'], title: '健康体检', titleAlign: 'center'},
                        {fields: ['highschool'], title: '升学体检', titleAlign: 'center'},
                    ]
                ],
                tableData: [],
                columns: [
                    {
                        field: 'department',
                        width: 160,
                        columnAlign: 'center',
                        isResize: true
                    },
                    {
                        field: 'itemType',
                        width: 200,
                        columnAlign: 'center',
                        isResize: true
                    }, {
                        field: 'item',
                        width: 200,
                        columnAlign: 'center',
                        isResize: true
                    },
                    {
                        field: 'healthy',
                        title: '健康体检',
                        width: 200,
                        titleAlign: 'center',
                        columnAlign: 'center',
                        isResize: true
                    },
                    {
                        field: 'highschool',
                        title: '升学体检',
                        width: 200,
                        titleAlign: 'center',
                        columnAlign: 'center',
                        isResize: true
                    },
                    {
                        field: '',
                        title: '',
                        width: 1
                    }
                ]
            };
        },
        methods: {
            update() {
                // 参数根据业务场景随意构造
                let params = {type: 'edit', index: this.index, rowData: this.rowData, selectData: this.selectData};
                this.$emit('on-custom-comp', params);
            },
            //设置table选中
            getTableCheck() {
                this.$ajax({
                    url: Urls.examination_plan_list,
                    data: {}
                }).then((data) => {
                    if (data.code === 200) {
                        let oldtableData = getexaminationPlan;
                        let resselectData = data.data;
                        resselectData.forEach((a) => {
                            //自定义老数组
                            oldtableData.forEach((olda) => {
                                if (a.set_id == olda.id) {
                                    olda.is_health = a.is_health;
                                    olda.is_upper = a.is_upper;
                                }
                            });
                        });
                        this.tableData = oldtableData;
                    } else {
                        this.tableData = [];
                        this.$Message.error('数据查询失败');
                    }
                }).catch(() => {
                    this.tableData = [];
                    this.$Message.error('数据查询失败');
                });
            },
            highschool() {
                let params = {
                    type: 'highschool',
                    index: this.index,
                    rowData: this.rowData,
                    selectData: this.selectData
                };
                this.$emit('on-custom-comp', params);
            },
            //选中
            customCompFunc(params) {
                //健康体检选中
                if (params.type === 'edit') { // do edit operation
                    let self = this;
                    let rowData = params['rowData'];
                    let is_health;
                    rowData.is_health == '1' ? is_health = '0' : is_health = '1';
                    if (rowData.checkId) {
                        let tempList = rowData.checkId;
                        let physicaltype = [];
                        for (let i = 0; i < tempList.length; i++) {
                            let obj = {};
                            obj.set_id = tempList[i];
                            obj.is_health = is_health;
                            obj.is_upper = rowData.is_upper == undefined ? '0' : rowData.is_upper.toString();
                            physicaltype.push(obj);
                        }
                        this.$ajax({
                            url: Urls.examination_plan_check,
                            data: {
                                'physicaltype': physicaltype
                            }
                        }).then((data) => {
                            if (data.code === 200) {
                                self.$Message.success(data.result);
                                self.getTableCheck();
                            } else {
                                self.$Message.error('勾选失败，请重试');
                            }
                        }).catch(() => {
                            self.$Message.error('勾选失败，请重试');
                        });
                    }
                    //一行一项
                    else {
                        let obj = {};
                        obj.set_id = rowData.id;
                        obj.is_health = is_health;
                        obj.is_upper = rowData.is_upper == undefined ? '0' : rowData.is_upper.toString();
                        let physicaltype = [];
                        physicaltype.push(obj);
                        this.$ajax({
                            url: Urls.examination_plan_check,
                            data: {
                                'physicaltype': physicaltype
                            }
                        }).then((data) => {
                            if (data.code === 200) {
                                self.$Message.success(data.result);
                            } else {
                                self.$Message.error('勾选失败，请重试');
                            }
                        }).catch(() => {
                            self.$Message.error('勾选失败，请重试');
                        });
                    }
                }
                //升学体检选中
                if (params.type === 'highschool') { // do edit operation
                    let self = this;
                    let rowData = params['rowData'];
                    let is_upper;
                    rowData.is_upper == '1' ? is_upper = '0' : is_upper = '1';
                    //有子项
                    if (rowData.checkId) {
                        let tempList = rowData.checkId;
                        let physicaltype = [];
                        for (let i = 0; i < tempList.length; i++) {
                            let obj = {};
                            obj.set_id = tempList[i];
                            obj.is_health = rowData.is_health == undefined ? '0' : rowData.is_health.toString();
                            obj.is_upper = is_upper;
                            physicaltype.push(obj);
                        }
                        this.$ajax({
                            url: Urls.examination_plan_check,
                            data: {
                                'physicaltype': physicaltype
                            }
                        }).then((data) => {
                            if (data.code === 200) {
                                self.$Message.success(data.result);
                            } else {
                                self.$Message.error('勾选失败，请重试');
                            }
                        }).catch(() => {
                            self.$Message.error('勾选失败，请重试');
                        });
                    }
                    //一行一项
                    else {
                        let obj = {};
                        obj.set_id = rowData.id;
                        obj.is_upper = is_upper;
                        obj.is_health = rowData.is_health == undefined ? '0' : rowData.is_health.toString();
                        let physicaltype = [];
                        physicaltype.push(obj);
                        this.$ajax({
                            url: Urls.examination_plan_check,
                            data: {
                                'physicaltype': physicaltype
                            }
                        }).then((data) => {
                            if (data.code === 200) {
                                self.$Message.success(data.result);
                            } else {
                                self.$Message.error('勾选失败，请重试');
                            }
                        }).catch(() => {
                            self.$Message.error('勾选失败，请重试');
                        });
                    }
                }
            },
            abstractMerge(para) {
                return {
                    colSpan: para.colSpan || 1,
                    rowSpan: para.rowSpan || 1,
                    content: para.content || '',
                    componentName: para.componentName || '',
                };
            },
            cellMerge(rowIndex, rowData, field) {
                //合并第一列
                if (field === 'department') {
                    if (rowIndex === 0) {
                        return this.abstractMerge({'rowSpan': 25, 'content': '问诊'});
                    }
                    if (rowIndex === 25) {
                        return this.abstractMerge({'rowSpan': 2, 'content': '形体'});
                    }
                    if (rowIndex === 27) {
                        return this.abstractMerge({'rowSpan': 3, 'content': '生理功能'});
                    }
                    if (rowIndex === 30) {
                        return this.abstractMerge({'rowSpan': 4, 'content': '视力'});
                    }
                    if (rowIndex === 34) {
                        return this.abstractMerge({'rowSpan': 9, 'content': '眼科'});
                    }
                    if (rowIndex === 43) {
                        return this.abstractMerge({'rowSpan': 10, 'content': '口腔科'});
                    }
                    if (rowIndex === 53) {
                        return this.abstractMerge({'rowSpan': 3, 'content': '耳鼻喉科'});
                    }
                    if (rowIndex === 56) {
                        return this.abstractMerge({'rowSpan': 8, 'content': '外科'});
                    }
                    if (rowIndex === 64) {
                        return this.abstractMerge({'rowSpan': 5, 'content': '内科'});
                    }
                    if (rowIndex === 69) {
                        return this.abstractMerge({'rowSpan': 5, 'content': '检验科'});
                    }
                }
                //合并第二列
                if (field == 'itemType') {
                    if (rowIndex === 0) {
                        return this.abstractMerge({'rowSpan': 8, 'content': '既往病史'});
                    }
                    if (rowIndex === 9) {
                        return this.abstractMerge({'rowSpan': 6, 'content': '残疾'});
                    }
                    if (rowIndex === 15) {
                        return this.abstractMerge({'colSpan': 2, 'content': '其他残疾说明'});
                    }
                    if (rowIndex === 16) {
                        return this.abstractMerge({'rowSpan': 8, 'content': '近期不适应症'});
                    }
                    if ((rowIndex === 8 || rowIndex === 24)) {
                        return this.abstractMerge({'colSpan': 2, 'content': '其他不适症状说明'});
                    }
                    if ((rowIndex === 25)) {
                        return this.abstractMerge({'colSpan': 2, 'content': '身高'});
                    }
                    if ((rowIndex === 26)) {
                        return this.abstractMerge({'colSpan': 2, 'content': '体重'});
                    }
                    if ((rowIndex === 27)) {
                        return this.abstractMerge({'rowSpan': 2, 'content': '血压'});
                    }
                    if ((rowIndex === 29)) {
                        return this.abstractMerge({'colSpan': 2, 'content': '脉搏'});
                    }
                    if ((rowIndex === 30)) {
                        return this.abstractMerge({'rowSpan': 2, 'content': '视力'});
                    }
                    if ((rowIndex === 32)) {
                        return this.abstractMerge({'rowSpan': 2, 'content': '矫正视力'});
                    }
                    if ((rowIndex === 34)) {
                        return this.abstractMerge({'rowSpan': 2, 'content': '屈光'});
                    }
                    if ((rowIndex === 36)) {
                        return this.abstractMerge({'rowSpan': 2, 'content': '近视'});
                    }
                    if ((rowIndex === 38)) {
                        return this.abstractMerge({'rowSpan': 2, 'content': '沙眼'});
                    }
                    if ((rowIndex === 40)) {
                        return this.abstractMerge({'colSpan': 2, 'content': '结膜炎'});
                    }
                    if ((rowIndex === 41)) {
                        return this.abstractMerge({'rowSpan': 2, 'content': '色觉'});
                    }
                    if ((rowIndex === 43)) {
                        return this.abstractMerge({'colSpan': 2, 'content': '齿列'});
                    }
                    if ((rowIndex === 44)) {
                        return this.abstractMerge({'colSpan': 2, 'content': '牙周'});
                    }
                    if ((rowIndex === 45)) {
                        return this.abstractMerge({'colSpan': 2, 'content': '龋齿'});
                    }
                    if ((rowIndex === 46)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            content: '龋患牙数',
                            componentName: ''
                        };
                    }
                    if ((rowIndex === 48)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            content: '龋失牙数',
                            componentName: ''
                        };
                    }
                    if ((rowIndex === 50)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            content: '龋补牙数',
                        };
                    }
                    if ((rowIndex === 52)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '其他记录',
                        };
                    }
                    if ((rowIndex === 53)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '耳',
                        };
                    }
                    if ((rowIndex === 54)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '鼻',
                        };
                    }
                    if ((rowIndex === 55)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '喉',
                        };
                    }
                    if ((rowIndex === 56)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '皮肤',
                        };
                    }
                    if ((rowIndex === 57)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '淋巴结',
                        };
                    }
                    if ((rowIndex === 58)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '头部',
                        };
                    }
                    if ((rowIndex === 59)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '颈部',
                        };
                    }
                    if ((rowIndex === 60)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '脊柱',
                        };
                    }
                    if ((rowIndex === 61)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '四肢',
                        };
                    }
                    if ((rowIndex === 62)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '胸部',
                        };
                    }
                    if ((rowIndex === 63)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '其他记录',
                        };
                    }
                    if ((rowIndex === 64)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '心',
                        };
                    }
                    if ((rowIndex === 65)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '肺',
                        };
                    }
                    if ((rowIndex === 66)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '肝',
                        };
                    }
                    if ((rowIndex === 67)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '脾',
                        };
                    }
                    if ((rowIndex === 68)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '其他记录',
                        };
                    }
                    if ((rowIndex === 69)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            content: '肝功能',
                        };
                    }
                    if ((rowIndex === 71)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '血红蛋白',
                        };
                    }
                    if ((rowIndex === 72)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '结核菌素实验',
                        };
                    }
                    if ((rowIndex === 73)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '其他化验结果',
                        };
                    }
                    if ((rowIndex === 74)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '胸部X线检查',
                        };
                    }
                    if ((rowIndex === 75)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '结论',
                        };
                    }
                }
                //合并健康体检
                if (field == 'healthy') {
                    //既往病史
                    if (rowIndex === 0) {
                        return {
                            colSpan: 1,
                            rowSpan: 9,
                            componentName: 'examination_checkbox'
                        };
                    }
                    //残疾
                    if (rowIndex === 9) {
                        return {
                            colSpan: 1,
                            rowSpan: 7,
                            componentName: 'examination_checkbox'
                        };
                    }
                    //近期不适症状
                    if (rowIndex === 16) {
                        return {
                            colSpan: 1,
                            rowSpan: 9,
                            componentName: 'examination_checkbox'
                        };
                    }
                    //形体
                    if ((rowIndex === 25)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            componentName: 'examination_checkbox'
                        };
                    }
                    //生理功能
                    if ((rowIndex === 27)) {
                        return {
                            colSpan: 1,
                            rowSpan: 3,
                            componentName: 'examination_checkbox'
                        };
                    }
                    //视力
                    if ((rowIndex === 30)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            componentName: 'examination_checkbox'
                        };
                    }
                    //矫正视力
                    if ((rowIndex === 32)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            componentName: 'examination_checkbox'
                        };
                    }
                    //屈光
                    if ((rowIndex === 34)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            componentName: 'examination_checkbox'
                        };
                    }
                    //近视
                    if ((rowIndex === 36)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            componentName: 'examination_checkbox'
                        };
                    }
                    //沙眼
                    if ((rowIndex === 38)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            componentName: 'examination_checkbox'
                        };
                    }
                    //结膜炎
                    if ((rowIndex === 40)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'examination_checkbox'
                        };
                    }
                    //色觉
                    if ((rowIndex === 41)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            componentName: 'examination_checkbox'
                        };
                    }
                    //齿列
                    if ((rowIndex === 43)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'examination_checkbox'
                        };
                    }
                    //牙周
                    if ((rowIndex === 44)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'examination_checkbox'
                        };
                    }
                    //龋齿龋换失补
                    if ((rowIndex === 45)) {
                        return {
                            colSpan: 1,
                            rowSpan: 7,
                            componentName: 'examination_checkbox'
                        };
                    }
                    //其他记录
                    if ((rowIndex === 52)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'examination_checkbox'
                        };
                    }
                    if ((rowIndex === 53)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'examination_checkbox'
                        };
                    }
                    if ((rowIndex === 54)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'examination_checkbox'
                        };
                    }
                    if ((rowIndex === 55)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'examination_checkbox'
                        };
                    }
                    if ((rowIndex === 56)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'examination_checkbox'
                        };
                    }
                    if ((rowIndex === 57)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'examination_checkbox'
                        };
                    }
                    if ((rowIndex === 58)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'examination_checkbox'
                        };
                    }
                    if ((rowIndex === 59)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'examination_checkbox'
                        };
                    }
                    if ((rowIndex === 60)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'examination_checkbox'
                        };
                    }
                    if ((rowIndex === 61)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'examination_checkbox'
                        };
                    }
                    if ((rowIndex === 62)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'examination_checkbox'
                        };
                    }
                    if ((rowIndex === 63)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'examination_checkbox'
                        };
                    }
                    if ((rowIndex === 64)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'examination_checkbox'
                        };
                    }
                    if ((rowIndex === 65)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'examination_checkbox'
                        };
                    }
                    if ((rowIndex === 66)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'examination_checkbox'
                        };
                    }
                    if ((rowIndex === 67)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'examination_checkbox'
                        };
                    }
                    if ((rowIndex === 68)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'examination_checkbox'
                        };
                    }
                    if ((rowIndex === 69)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            componentName: 'examination_checkbox'
                        };
                    }
                    if ((rowIndex === 70)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'examination_checkbox'
                        };
                    }
                    if ((rowIndex === 71)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'examination_checkbox'
                        };
                    }
                    if ((rowIndex === 72)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'examination_checkbox'
                        };
                    }
                    if ((rowIndex === 73)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'examination_checkbox'
                        };
                    }
                    if ((rowIndex === 74)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'examination_checkbox'
                        };
                    }
                    if ((rowIndex === 75)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'examination_checkbox'
                        };
                    }
                }
                //合并升学体检
                if (field == 'highschool') {
                    //既往病史
                    if (rowIndex === 0) {
                        return {
                            colSpan: 1,
                            rowSpan: 9,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    //残疾
                    if (rowIndex === 9) {
                        return {
                            colSpan: 1,
                            rowSpan: 7,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    //近期不适症状
                    if (rowIndex === 16) {
                        return {
                            colSpan: 1,
                            rowSpan: 9,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    //形体
                    if ((rowIndex === 25)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    //生理功能
                    if ((rowIndex === 27)) {
                        return {
                            colSpan: 1,
                            rowSpan: 3,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    //视力
                    if ((rowIndex === 30)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    //矫正视力
                    if ((rowIndex === 32)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    //屈光
                    if ((rowIndex === 34)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    //近视
                    if ((rowIndex === 36)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    //沙眼
                    if ((rowIndex === 38)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    //结膜炎
                    if ((rowIndex === 40)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    //色觉
                    if ((rowIndex === 41)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    //齿列
                    if ((rowIndex === 43)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    //牙周
                    if ((rowIndex === 44)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    //龋齿龋换失补
                    if ((rowIndex === 45)) {
                        return {
                            colSpan: 1,
                            rowSpan: 7,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    //其他记录
                    if ((rowIndex === 52)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    if ((rowIndex === 53)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    if ((rowIndex === 54)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    if ((rowIndex === 55)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    if ((rowIndex === 56)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    if ((rowIndex === 57)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    if ((rowIndex === 58)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    if ((rowIndex === 59)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    if ((rowIndex === 60)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    if ((rowIndex === 61)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    if ((rowIndex === 62)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    if ((rowIndex === 63)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    if ((rowIndex === 64)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    if ((rowIndex === 65)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    if ((rowIndex === 66)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    if ((rowIndex === 67)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    if ((rowIndex === 68)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    if ((rowIndex === 69)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    if ((rowIndex === 70)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    if ((rowIndex === 71)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    if ((rowIndex === 72)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    if ((rowIndex === 73)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    if ((rowIndex === 74)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    if ((rowIndex === 75)) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            componentName: 'highschool_checkbox'
                        };
                    }
                }
            }
        },
    };
    // 健康体检组件
    Vue.component('examination_checkbox', {
        template: '<Checkbox :key=""  v-model="check" @on-change="update(rowData,index)"   size="large"></Checkbox>',
        props: {
            rowData: {
                type: Object
            },
            field: {
                type: String
            },
            index: {
                type: Number
            }
        },
        mounted() {
            this.check = this.rowData['is_health'] == 1;
        },
        data: function () {
            return {
                check: false
            };
        },
        methods: {
            update() {
                let params = {type: 'edit', index: this.index, rowData: this.rowData};
                this.$emit('on-custom-comp', params);
            }
        }
    });
    //升学体检
    Vue.component('highschool_checkbox', {
        template: '<Checkbox :key=""  v-model="check" @on-change="highschool(rowData,index)"   size="large"></Checkbox>',
        props: {
            rowData: {
                type: Object
            },
            field: {
                type: String
            },
            index: {
                type: Number
            }
        },
        mounted() {
            this.check = this.rowData['is_upper'] === 1;
        },
        data: function () {
            return {
                check: false
            };
        },
        methods: {
            highschool() {
                let params = {type: 'highschool', index: this.index, rowData: this.rowData};
                this.$emit('on-custom-comp', params);
            }
        }
    });
</script>
<style lang='scss'>
    .examinationPlan {
        .v-table-title-class {
            font-size: 16px;
            color: #FFFFFF;
        }
        .v-table-body-class {
            font-size: 16px;
        }
        .content-box {
            padding: 30px 44px;
        }
        .title {
            height: 80px;
            font-size: 26px;
            font-weight: bold;
            color: #333333;
        }
        /*设置表格样式时，style标签不能设置scoped*/
        .column-cell {
            background-color: #ffffff;
        }
    }
</style>
