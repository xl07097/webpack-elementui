<template>
    <div class="examinationPlan">
        <div class="content-box">
            <div class="title">
                体检项目规划
            </div>
            <v-table
                    :is-horizontal-resize="true"
                    :is-vertical-resize="true"
                    style="width:100%"
                    :height="680"
                    :title-row-height="40"
                    :row-height="48"
                    title-bg-color="#498E8A"
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
    import urls from '../../service/Urls';

    export default {
        name: 'examinationPlan',
        data() {
            return {
                selectData: [],
                check: false,
                titleRows: [
                    [
                        {fields: ['department'], title: '体检科室', titleAlign: 'left'},
                        {fields: ['itemType', 'item'], title: '体检项', titleAlign: 'left', colspan: 2},
                        {fields: ['healthy'], title: '健康体检', titleAlign: 'left'},
                        {fields: ['highschool'], title: '升学体检', titleAlign: 'left'},
                    ]
                ],
                tableData: [],
                columns: [
                    {
                        field: 'department',
                        width: 160,
                        columnAlign: 'left',
                        isResize: true
                    },
                    {
                        field: 'itemType',
                        width: 100,
                        columnAlign: 'left',
                        isResize: true
                    },
                    {
                        field: 'item',
                        width: 100,
                        columnAlign: 'left',
                        isResize: true
                    },
                    {
                        field: 'healthy',
                        title: '健康体检',
                        width: 100,
                        columnAlign: 'center',
                        isResize: true
                    },
                    {
                        field: 'highschool',
                        title: '升学体检',
                        width: 100,
                        columnAlign: 'center',
                        isResize: true
                    }
                ]
            };
        },
        methods: {
            //设置table选中
            search() {
                this.$ajax({
                    url: urls.medicaltype_tree,
                    data: {}
                }).then((data) => {
                    if (data.code === 200) {
                        var items = this.recusion(data.data);
                        let oldtableData = getexaminationPlan;
                        var arr = [];
                        arr = oldtableData.map((olda) => {
                            for (let i = 0; i < items.length; i++) {
                                if (olda.id === items[i].id) {
                                    return {
                                        department: olda.department,
                                        cid: olda.cid,
                                        itemType: olda.itemType,
                                        item: olda.item,
                                        id: olda.id,
                                        name: olda.name,
                                        is_true: items[i].is_true,
                                        is_health: items[i].is_health,
                                        is_upper: items[i].is_upper,
                                    };
                                }
                            }
                            return olda;
                        });
                        this.tableData = arr;
                    } else {
                        this.tableData = getexaminationPlan;
                    }
                }).catch(() => {
                    this.tableData = getexaminationPlan;
                });
            },
            recusion(data) {
                let items = [];
                function recu(datas) {
                    datas.map(item => {
                        if (item.children && item.children.length) {
                            recu(item.children);
                            items.push({
                                id: item.id,
                                name: item.name,
                                is_true: item.is_true,
                                is_health: item.is_health,
                                is_upper: item.is_upper,
                            });
                        } else {
                            items.push({
                                id: item.id,
                                name: item.name,
                                is_true: item.is_true,
                                is_health: item.is_health,
                                is_upper: item.is_upper,
                            });
                        }
                    });
                }
                recu(data);
                return items;
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
                let data = {};
                if (params.type === 'health') { // do edit operation
                    data = {
                        set_id: params.rowData.id,
                        is_health: params.check ? 1 : 0
                    }
                }
                //升学体检选中
                if (params.type === 'highschool') { // do edit operation
                    data = {
                        set_id: params.rowData.id,
                        is_upper: params.check ? 1 : 0
                    }
                }
                let self = this;
                this.$ajax({
                    url: urls.medicaltype_edit,
                    data: data
                }).then((data) => {
                    if (data.code === 200) {
                        self.$Message.success(data.result);
                        self.search();
                    } else {
                        self.$Message.error('勾选失败，请重试');
                    }
                })
            },
            cellMerge(rowIndex, rowData, field) {
                //合并第一列
                if (field === 'department') {
                    if (rowIndex === 0) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            content: '形体',
                            componentName: ''
                        };
                    }
                    if (rowIndex === 2) {
                        return {
                            colSpan: 1,
                            rowSpan: 3,
                            content: '生理功能',
                            componentName: ''
                        };
                    }
                    if (rowIndex === 5) {
                        return {
                            colSpan: 1,
                            rowSpan: 4,
                            content: '视力',
                            componentName: ''
                        };
                    }
                    if (rowIndex === 9) {
                        return {
                            colSpan: 1,
                            rowSpan: 9,
                            content: '眼科',
                            componentName: ''
                        };
                    }
                    if (rowIndex === 18) {
                        return {
                            colSpan: 1,
                            rowSpan: 7,
                            content: '屈光度',
                            componentName: ''
                        };
                    }

                    if (rowIndex === 25) {
                        return {
                            colSpan: 1,
                            rowSpan: 7,
                            content: '口腔科',
                            componentName: ''
                        };
                    }
                    if (rowIndex === 32) {
                        return {
                            colSpan: 1,
                            rowSpan: 3,
                            content: '耳鼻喉科',
                            componentName: ''
                        };
                    }
                    if (rowIndex === 35) {
                        return {
                            colSpan: 1,
                            rowSpan: 8,
                            content: '外科',
                            componentName: ''
                        };
                    }
                    if (rowIndex === 43) {
                        return {
                            colSpan: 1,
                            rowSpan: 9,
                            content: '内科',
                            componentName: ''
                        };
                    }
                    if (rowIndex === 52) {
                        return {
                            colSpan: 1,
                            rowSpan: 4,
                            content: '检验科',
                            componentName: ''
                        };
                    }
                    if (rowIndex === 56) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            content: '结核病筛查检查',
                            componentName: ''
                        };
                    }
                    if (rowIndex === 58) {
                        return {
                            colSpan: 1,
                            rowSpan: 6,
                            content: '结核菌素皮肤试验检查',
                            componentName: ''
                        };
                    }
                    if (rowIndex === 64) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            content: '检查',
                            componentName: ''
                        };
                    }
                    if (rowIndex === 65) {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            content: '主检',
                            componentName: ''
                        };
                    }
                }
                //合并第二列
                if (field === 'itemType') {
                    if ((rowIndex === 0)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '身高'
                        };
                    }
                    if ((rowIndex === 1)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '体重'
                        };
                    }
                    if ((rowIndex === 2)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            content: '血压'
                        };
                    }
                    if ((rowIndex === 4)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '脉搏'
                        };
                    }
                    if ((rowIndex === 5)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            content: '视力'
                        };
                    }
                    if ((rowIndex === 7)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            content: '矫正视力'
                        };
                    }
                    if ((rowIndex === 9)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            content: '屈光'
                        };
                    }
                    if ((rowIndex === 11)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            content: '近视'
                        };
                    }
                    if ((rowIndex === 13)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            content: '沙眼'
                        };
                    }
                    if ((rowIndex === 15)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '结膜炎'
                        };
                    }
                    if ((rowIndex === 16)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            content: '色觉'
                        };
                    }
                    if ((rowIndex === 18)) {
                        return {
                            colSpan: 1,
                            rowSpan: 3,
                            content: '右眼'
                        };
                    }
                    if ((rowIndex === 21)) {
                        return {
                            colSpan: 1,
                            rowSpan: 3,
                            content: '左眼'
                        };
                    }
                    if ((rowIndex === 24)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: 'PD'
                        };
                    }
                    if ((rowIndex === 25)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '齿列'
                        };
                    }
                    if ((rowIndex === 26)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '牙周'
                        };
                    }
                    if ((rowIndex === 27)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '龋齿'
                        };
                    }
                    if ((rowIndex === 28)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '龋患牙数'
                        };
                    }
                    if ((rowIndex === 29)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '龋失牙数'
                        };
                    }
                    if ((rowIndex === 30)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '龋补牙数',
                        };
                    }
                    if ((rowIndex === 31)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '其他记录',
                        };
                    }
                    if ((rowIndex === 32)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '耳',
                        };
                    }
                    if ((rowIndex === 33)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '鼻',
                        };
                    }
                    if ((rowIndex === 34)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '喉',
                        };
                    }
                    if ((rowIndex === 35)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '皮肤',
                        };
                    }
                    if ((rowIndex === 36)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '淋巴结',
                        };
                    }
                    if ((rowIndex === 37)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '头部',
                        };
                    }
                    if ((rowIndex === 38)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '颈部',
                        };
                    }
                    if ((rowIndex === 39)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '脊柱',
                        };
                    }
                    if ((rowIndex === 40)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '四肢',
                        };
                    }
                    if ((rowIndex === 41)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '胸部',
                        };
                    }
                    if ((rowIndex === 42)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '其他记录',
                        };
                    }
                    if ((rowIndex === 43)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '近期不适症状（可多选）',
                        };
                    }
                    if ((rowIndex === 44)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '其他症状',
                        };
                    }
                    if ((rowIndex === 45)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '心率',
                        };
                    }
                    if ((rowIndex === 46)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '心脏杂音',
                        };
                    }
                    if ((rowIndex === 47)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '心律',
                        };
                    }
                    if ((rowIndex === 48)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '肺部罗音',
                        };
                    }
                    if ((rowIndex === 49)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '肝',
                        };
                    }
                    if ((rowIndex === 50)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '脾'
                        };
                    }
                    if ((rowIndex === 51)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '其他记录'
                        };
                    }
                    if ((rowIndex === 52)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            content: '肝功能'
                        };
                    }
                    if ((rowIndex === 54)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '血红蛋白'
                        };
                    }
                    if ((rowIndex === 55)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '其他化验结果'
                        };
                    }
                    if ((rowIndex === 56)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '确认有无卡介苗接种史或卡痕？'
                        };
                    }
                    if ((rowIndex === 57)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '医生意见'
                        };
                    }
                    if ((rowIndex === 58)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '注射时间'
                        };
                    }
                    if ((rowIndex === 59)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '硬结直径（横径x纵径）'
                        };
                    }
                    if ((rowIndex === 60)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '平均直径'
                        };
                    }
                    if ((rowIndex === 61)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '注射后局部情况'
                        };
                    }
                    if ((rowIndex === 62)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '检验反应时间'
                        };
                    }
                    if ((rowIndex === 63)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '结果判定'
                        };
                    }
                    if ((rowIndex === 64)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '胸部X线检查'
                        };
                    }
                    if ((rowIndex === 65)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '结论'
                        };
                    }
                    if ((rowIndex === 66)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '结论'
                        };
                    }
                }
                //合并健康体检
                if (field === 'healthy') {
                    //形体
                    if ((rowIndex === 0)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            componentName: 'examination_checkbox'
                        };
                    }
                    //生理功能
                    if ((rowIndex === 2)) {
                        return {
                            colSpan: 1,
                            rowSpan: 3,
                            componentName: 'examination_checkbox'
                        };
                    }
                    //视力
                    if ((rowIndex === 5)) {
                        return {
                            colSpan: 1,
                            rowSpan: 4,
                            componentName: 'examination_checkbox'
                        };
                    }
                    //屈光
                    if ((rowIndex === 9)) {
                        return {
                            colSpan: 1,
                            rowSpan: 9,
                            componentName: 'examination_checkbox'
                        };
                    }
                    //屈光度
                    if ((rowIndex === 18)) {
                        return {
                            colSpan: 1,
                            rowSpan: 7,
                            componentName: 'examination_checkbox'
                        };
                    }
                    //口腔科
                    if ((rowIndex === 25)) {
                        return {
                            colSpan: 1,
                            rowSpan: 7,
                            componentName: 'examination_checkbox'
                        };
                    }
                    // 耳鼻喉
                    if ((rowIndex === 32)) {
                        return {
                            colSpan: 1,
                            rowSpan: 3,
                            componentName: 'examination_checkbox'
                        };
                    }
                    // 外科
                    if ((rowIndex === 35)) {
                        return {
                            colSpan: 1,
                            rowSpan: 8,
                            componentName: 'examination_checkbox'
                        };
                    }
                    //内科
                    if ((rowIndex === 43)) {
                        return {
                            colSpan: 1,
                            rowSpan: 9,
                            componentName: 'examination_checkbox'
                        };
                    }
                    // 检验科
                    if ((rowIndex === 52)) {
                        return {
                            colSpan: 1,
                            rowSpan: 4,
                            componentName: 'examination_checkbox'
                        };
                    }
                    // 结核病筛查
                    if ((rowIndex === 56)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            componentName: 'examination_checkbox'
                        };
                    }
                    // 结核素菌
                    if ((rowIndex === 58)) {
                        return {
                            colSpan: 1,
                            rowSpan: 6,
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
                }

                //合并升学体检
                if (field === 'highschool') {
                    //形体
                    if ((rowIndex === 0)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    //生理功能
                    if ((rowIndex === 2)) {
                        return {
                            colSpan: 1,
                            rowSpan: 3,
                            componentName: 'highschool_checkbox'
                        };
                    }

                    //视力
                    if ((rowIndex === 5)) {
                        return {
                            colSpan: 1,
                            rowSpan: 4,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    //屈光
                    if ((rowIndex === 9)) {
                        return {
                            colSpan: 1,
                            rowSpan: 9,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    //屈光度
                    if ((rowIndex === 18)) {
                        return {
                            colSpan: 1,
                            rowSpan: 7,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    //口腔科
                    if ((rowIndex === 25)) {
                        return {
                            colSpan: 1,
                            rowSpan: 7,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    // 耳鼻喉
                    if ((rowIndex === 32)) {
                        return {
                            colSpan: 1,
                            rowSpan: 3,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    // 外科
                    if ((rowIndex === 35)) {
                        return {
                            colSpan: 1,
                            rowSpan: 8,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    //内科
                    if ((rowIndex === 43)) {
                        return {
                            colSpan: 1,
                            rowSpan: 9,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    // 检验科
                    if ((rowIndex === 52)) {
                        return {
                            colSpan: 1,
                            rowSpan: 4,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    // 结核病筛查
                    if ((rowIndex === 56)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            componentName: 'highschool_checkbox'
                        };
                    }
                    // 结核素菌
                    if ((rowIndex === 58)) {
                        return {
                            colSpan: 1,
                            rowSpan: 6,
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
                }
            }
        },
        created() {
            this.search();
        }
    };
    // 健康体检组件
    Vue.component('examination_checkbox', {
        template: '<Checkbox v-model="check" @on-change="update(rowData,index)" size="large"></Checkbox>',
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
            this.check = this.rowData['is_health'] === 1;
        },
        data() {
            return {
                check: false
            };
        },
        methods: {
            update() {
                let params = {
                    type: 'health',
                    index: this.index,
                    rowData: this.rowData,
                    check: this.check
                };
                this.$emit('on-custom-comp', params);
            }
        }
    });
    //升学体检
    Vue.component('highschool_checkbox', {
        template: '<Checkbox v-model="check" @on-change="highschool(rowData,index)" size="large"></Checkbox>',
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
                let params = {
                    type: 'highschool',
                    index: this.index,
                    rowData: this.rowData,
                    check: this.check
                };
                this.$emit('on-custom-comp', params);
            }
        }
    });
</script>
<style lang='scss'>
    .examinationPlan {
        .content-box {
            padding: 30px 44px;
        }

        .title {
            height: 80px;
            font-size: 26px;
            font-weight: bold;
            color: #333333;
        }

        .v-table-title-cell,
        .v-table-body-cell {
            padding-left: 10px !important;
        }

        .v-table-rightview-special-border td:last-child .v-table-body-cell {
            border-right-width: 1px !important;
        }

        .v-table-title-class {
            font-size: 16px;
            color: #FFFFFF;
        }

        .v-table-body-class {
            font-size: 16px;
        }

        /*设置表格样式时，style标签不能设置scoped*/
        .column-cell {
            background-color: #ffffff;
        }
    }
</style>
