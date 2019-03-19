<template>
    <div class="projectPlanNew">
        <div class="content-box clearfix">
            <div class="title">
                体测项目规划
            </div>
            <Form inline style="margin-top: 34px;">
            </Form>
            <div class="divider"/>
            <v-table
                    ref="vTable"
                    is-horizontal-resize
                    :height="680"
                    :title-row-height="40"
                    :row-height="48"
                    title-bg-color="#498E8A"
                    even-bg-color="#f2f2f2"
                    style="width:100%"
                    :columns="columns"
                    :table-data="tableData"
                    :cell-merge="cellMerge"
                    :title-rows="titleRows"
                    :cell-edit-done="cellEditDone"
                    @on-custom-comp="submitChnage"
            ></v-table>
        </div>
        <!-- 新增修改 -->

    </div>
</template>
<script>
    import Vue from 'vue';
    import Urls from '../../../service/Urls';

    export default {
        props: [''],
        data() {
            return {
                titleRows: [
                    [
                        {
                            fields: ['educationBackground', 'grade_id', 'gender'],
                            title: '体测项',
                            titleAlign: 'center',
                            colspan: 3,
                            isFrozen: true,
                        },
                        {fields: ['3012F15D7AEF474CB5E0CFF83671FAC5'], title: 'BMI', titleAlign: 'center'},
                        {fields: ['2793ED8F812A4928B220D5DA2A7F489C'], title: '肺活量', titleAlign: 'center'},
                        {fields: ['B2F6CDB8BC704A0A9F280C5CDA8D0019'], title: '握力', titleAlign: 'center'},
                        {fields: ['093C7820FD4346789DA7FF8ACB981E65'], title: '坐位体前屈', titleAlign: 'center'},
                        {fields: ['F657424A586743F891E5D7010301E204'], title: '俯卧背起', titleAlign: 'center'},
                        {fields: ['D241DD6A528F47BE9E75308A74E0EADD'], title: '立定跳远', titleAlign: 'center'},
                        {fields: ['5A7FE87B74714954B649427C8BF31D56'], title: '斜身引体', titleAlign: 'center'},
                        {fields: ['88ED8DA7E639489ABEF0306951A8BDC9'], title: '引体向上', titleAlign: 'center'},
                        {fields: ['1CFEB456E8744B9E9AA42B2BAAF57A4D'], title: '一分钟仰卧起坐', titleAlign: 'center'},
                        {fields: ['257B4D2B6D934C24A880891207795B2A'], title: '一分钟跳绳', titleAlign: 'center'},
                        {fields: ['1E0C72B68D8947E894399EFE598F9DC3'], title: '50米跑', titleAlign: 'center'},
                        {fields: ['AF32A3AEB7C4466CB3A170D0348E16A3'], title: '50米*8往返跑', titleAlign: 'center'},
                        {fields: ['6E40F3C06491405AAEBBCDB39FB43AD2'], title: '800米跑', titleAlign: 'center'},
                        {fields: ['84940DA547A944FEB7935D28D52A5803'], title: '1000米跑', titleAlign: 'center'},
                        {fields: ['custome-adv'], title: '总计', titleAlign: 'center'},
                        {fields: ['edit'], title: '操作', titleAlign: 'center'}
                    ],
                ],
                tableData: [],
                columns: [
                    {
                        field: 'educationBackground',
                        width: 60,
                        columnAlign: 'center',
                        isFrozen: true
                    },
                    {
                        field: 'grade_id',
                        width: 90,
                        columnAlign: 'center',
                        isFrozen: true
                    }, {
                        field: 'gender',
                        width: 40,
                        columnAlign: 'center',
                        isFrozen: true
                    }, {
                        field: '3012F15D7AEF474CB5E0CFF83671FAC5',
                        title: 'BMI',
                        width: 100,
                        columnAlign: 'center',
                        isResize: true,
                        isEdit: true,
                        formatter: function (rowData, rowIndex, pagingIndex, field) {
                            return `<span class='cell-edit-color'>${rowData[field]}</span>`;
                        },
                    }, {
                        field: '2793ED8F812A4928B220D5DA2A7F489C',
                        title: '肺活量',
                        width: 100,
                        columnAlign: 'center',
                        isEdit: true,
                        isResize: true
                    }, {
                        field: 'B2F6CDB8BC704A0A9F280C5CDA8D0019',
                        title: '握力',
                        width: 100,
                        columnAlign: 'center',
                        isEdit: true,
                        isResize: true
                    },
                    {
                        field: '093C7820FD4346789DA7FF8ACB981E65',
                        title: '坐位体前屈',
                        width: 100,
                        columnAlign: 'center',
                        isEdit: true,
                        isResize: true
                    },
                    {
                        field: 'F657424A586743F891E5D7010301E204',
                        title: '俯卧背起',
                        width: 100,
                        columnAlign: 'center',
                        isEdit: true,
                        isResize: true
                    },
                    {
                        field: 'D241DD6A528F47BE9E75308A74E0EADD',
                        title: '立定跳远',
                        width: 100,
                        columnAlign: 'center',
                        isEdit: true,
                        isResize: true
                    },
                    {
                        field: '5A7FE87B74714954B649427C8BF31D56',
                        title: '斜身引体',
                        width: 100,
                        columnAlign: 'center',
                        isEdit: true,
                        isResize: true
                    },
                    {
                        field: '88ED8DA7E639489ABEF0306951A8BDC9',
                        title: '引体向上',
                        width: 100,
                        columnAlign: 'center',
                        isEdit: true,
                        isResize: true
                    },
                    {
                        field: '1CFEB456E8744B9E9AA42B2BAAF57A4D',
                        title: '一分钟仰卧起坐',
                        width: 100,
                        columnAlign: 'center',
                        isEdit: true,
                        isResize: true
                    },
                    {
                        field: '257B4D2B6D934C24A880891207795B2A',
                        title: '一分钟跳绳',
                        width: 100,
                        columnAlign: 'center',
                        isEdit: true,
                        isResize: true
                    },
                    {
                        field: '1E0C72B68D8947E894399EFE598F9DC3',
                        title: '50米跑',
                        width: 100,
                        columnAlign: 'center',
                        isEdit: true,
                        isResize: true
                    },
                    {
                        field: 'AF32A3AEB7C4466CB3A170D0348E16A3',
                        title: '50米*8往返跑',
                        width: 100,
                        columnAlign: 'center',
                        isEdit: true,
                        isResize: true
                    },
                    {
                        field: '6E40F3C06491405AAEBBCDB39FB43AD2',
                        title: '800米跑',
                        width: 100,
                        columnAlign: 'center',
                        isEdit: true,
                        isResize: true
                    },
                    {
                        field: '84940DA547A944FEB7935D28D52A5803',
                        title: '1000米跑',
                        width: 100,
                        columnAlign: 'center',
                        isEdit: true,
                        isResize: true
                    },
                    {
                        field: 'custome-adv',
                        title: '总分', width: 100,
                        titleAlign: 'center',
                        columnAlign: 'center',
                        componentName: 'table-operation',
                        isFrozen: true,
                        isResize: true
                    },
                    {
                        field: 'edit',
                        title: '操作', width: 100,
                        titleAlign: 'center',
                        columnAlign: 'center',
                        componentName: 'table-edit',
                        isResize: true
                    }
                ]
            };
        },
        methods: {
            getProjectPlanList() {
                this.$ajax({
                    url: Urls.getProPlan_list,
                    data: {}
                }).then((data) => {
                    if (data.code === 200) {
                        this.tableData = data.data.map((value, index, array) => {
                            return {
                                'educationBackground': '',
                                'grade_id': value.grade_id,
                                'gender': value.gender == '女' ? 0 : 1,
                                '3012F15D7AEF474CB5E0CFF83671FAC5': this.getScore(value.set_list, '3012F15D7AEF474CB5E0CFF83671FAC5'),
                                '2793ED8F812A4928B220D5DA2A7F489C': this.getScore(value.set_list, '2793ED8F812A4928B220D5DA2A7F489C'),
                                'B2F6CDB8BC704A0A9F280C5CDA8D0019': this.getScore(value.set_list, 'B2F6CDB8BC704A0A9F280C5CDA8D0019'),
                                '093C7820FD4346789DA7FF8ACB981E65': this.getScore(value.set_list, '093C7820FD4346789DA7FF8ACB981E65'),
                                'F657424A586743F891E5D7010301E204': this.getScore(value.set_list, 'F657424A586743F891E5D7010301E204'),
                                'D241DD6A528F47BE9E75308A74E0EADD': this.getScore(value.set_list, 'D241DD6A528F47BE9E75308A74E0EADD'),
                                '5A7FE87B74714954B649427C8BF31D56': this.getScore(value.set_list, '5A7FE87B74714954B649427C8BF31D56'),
                                '88ED8DA7E639489ABEF0306951A8BDC9': this.getScore(value.set_list, '88ED8DA7E639489ABEF0306951A8BDC9'),
                                '1CFEB456E8744B9E9AA42B2BAAF57A4D': this.getScore(value.set_list, '1CFEB456E8744B9E9AA42B2BAAF57A4D'),
                                '257B4D2B6D934C24A880891207795B2A': this.getScore(value.set_list, '257B4D2B6D934C24A880891207795B2A'),
                                '1E0C72B68D8947E894399EFE598F9DC3': this.getScore(value.set_list, '1E0C72B68D8947E894399EFE598F9DC3'),
                                'AF32A3AEB7C4466CB3A170D0348E16A3': this.getScore(value.set_list, 'AF32A3AEB7C4466CB3A170D0348E16A3'),
                                '6E40F3C06491405AAEBBCDB39FB43AD2': this.getScore(value.set_list, '6E40F3C06491405AAEBBCDB39FB43AD2'),
                                '84940DA547A944FEB7935D28D52A5803': this.getScore(value.set_list, '84940DA547A944FEB7935D28D52A5803'),
                            };
                        });
                    } else {
                        this.tableData = [];
                        this.$Message.error('数据查询失败');
                    }
                }).catch(() => {
                    this.tableData = [];
                    this.$Message.error('数据查询失败');
                });
            },
            updateProPlan_list(obj) {
                this.$ajax({
                    url: Urls.updateProPlan_list,
                    data: obj
                }).then((data) => {
                    if (data.code === 200) {
                        this.$Message.success('更新成功');
                    } else {
                        this.$Message.error('更新失败');
                    }
                }).catch(() => {
                    this.$Message.error('更新失败');
                });
            },
            getScore(list, set_id) {
                let score = 0
                list.map(v => {
                    if (v.set_id == set_id) {
                        score = v.score;
                    }
                });
                return score;
            },
            submitChnage(params) {
                let dataJson = {
                    'grade_id': params.grade_id,
                    gender: params.gender,
                    'list': [{
                        'set_id': '093C7820FD4346789DA7FF8ACB981E65',
                        'score': parseFloat(params['093C7820FD4346789DA7FF8ACB981E65'])
                    },
                        {
                            'set_id': '1CFEB456E8744B9E9AA42B2BAAF57A4D',
                            'score': parseFloat(params['1CFEB456E8744B9E9AA42B2BAAF57A4D'])
                        },
                        {
                            'set_id': '1E0C72B68D8947E894399EFE598F9DC3',
                            'score': parseFloat(params['1E0C72B68D8947E894399EFE598F9DC3'])
                        },
                        {
                            'set_id': '257B4D2B6D934C24A880891207795B2A',
                            'score': parseFloat(params['257B4D2B6D934C24A880891207795B2A'])
                        },
                        {
                            'set_id': '2793ED8F812A4928B220D5DA2A7F489C',
                            'score': parseFloat(params['2793ED8F812A4928B220D5DA2A7F489C'])
                        },
                        {
                            'set_id': '3012F15D7AEF474CB5E0CFF83671FAC5',
                            'score': parseFloat(params['3012F15D7AEF474CB5E0CFF83671FAC5'])
                        },
                        {
                            'set_id': '5A7FE87B74714954B649427C8BF31D56',
                            'score': parseFloat(params['5A7FE87B74714954B649427C8BF31D56'])
                        },
                        {
                            'set_id': 'AF32A3AEB7C4466CB3A170D0348E16A3',
                            'score': parseFloat(params['AF32A3AEB7C4466CB3A170D0348E16A3'])
                        },
                        {
                            'set_id': 'B2F6CDB8BC704A0A9F280C5CDA8D0019',
                            'score': parseFloat(params['B2F6CDB8BC704A0A9F280C5CDA8D0019'])
                        },
                        {
                            'set_id': '6E40F3C06491405AAEBBCDB39FB43AD2',
                            'score': parseFloat(params['6E40F3C06491405AAEBBCDB39FB43AD2'])
                        },
                        {
                            'set_id': '84940DA547A944FEB7935D28D52A5803',
                            'score': parseFloat(params['84940DA547A944FEB7935D28D52A5803'])
                        },
                        {
                            'set_id': '88ED8DA7E639489ABEF0306951A8BDC9',
                            'score': parseFloat(params['88ED8DA7E639489ABEF0306951A8BDC9'])
                        },
                        {
                            'set_id': 'D241DD6A528F47BE9E75308A74E0EADD',
                            'score': parseFloat(params['D241DD6A528F47BE9E75308A74E0EADD'])
                        },
                        {
                            'set_id': 'F657424A586743F891E5D7010301E204',
                            'score': parseFloat(params['F657424A586743F891E5D7010301E204'])
                        },
                    ]
                };
                this.updateProPlan_list(dataJson);
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
                if (field === 'educationBackground') {
                    if (rowIndex === 0) {
                        return this.abstractMerge({'rowSpan': 12, 'content': '小学'});
                    }
                    if (rowIndex === 12) {
                        return this.abstractMerge({'rowSpan': 6, 'content': '初中'});
                    }
                    if (rowIndex === 18) {
                        return this.abstractMerge({'rowSpan': 6, 'content': '高中'});
                    }
                    // if (rowIndex === 24) {
                    //     return this.abstractMerge({'rowSpan': 8, 'content': '大学'});
                    // }
                }
                //第二列
                if (field === 'grade_id') {
                    if (rowIndex === 0) {
                        return this.abstractMerge({'rowSpan': 2, 'content': '一年级'});
                    }
                    if (rowIndex === 2) {
                        return this.abstractMerge({'rowSpan': 2, 'content': '二年级'});
                    }
                    if (rowIndex === 4) {
                        return this.abstractMerge({'rowSpan': 2, 'content': '三年级'});
                    }
                    if (rowIndex === 6) {
                        return this.abstractMerge({'rowSpan': 2, 'content': '四年级'});
                    }
                    if (rowIndex === 8) {
                        return this.abstractMerge({'rowSpan': 2, 'content': '五年级'});
                    }
                    if (rowIndex === 10) {
                        return this.abstractMerge({'rowSpan': 2, 'content': '六年级'});
                    }
                    if (rowIndex === 12) {
                        return this.abstractMerge({'rowSpan': 2, 'content': '初一'});
                    }
                    if (rowIndex === 14) {
                        return this.abstractMerge({'rowSpan': 2, 'content': '初二'});
                    }
                    if (rowIndex === 16) {
                        return this.abstractMerge({'rowSpan': 2, 'content': '初三'});
                    }
                    if (rowIndex === 18) {
                        return this.abstractMerge({'rowSpan': 2, 'content': '高一'});
                    }
                    if (rowIndex === 20) {
                        return this.abstractMerge({'rowSpan': 2, 'content': '高二'});
                    }
                    if (rowIndex === 22) {
                        return this.abstractMerge({'rowSpan': 2, 'content': '高三'});
                    }
                    if (rowIndex === 24) {
                        return this.abstractMerge({'rowSpan': 2, 'content': '大一'});
                    }
                    if (rowIndex === 26) {
                        return this.abstractMerge({'rowSpan': 2, 'content': '大二'});
                    }
                    if (rowIndex === 28) {
                        return this.abstractMerge({'rowSpan': 2, 'content': '大三'});
                    }
                    // if (rowIndex === 30) {
                    //     return this.abstractMerge({'rowSpan': 2, 'content': '大四'});
                    // }
                }
                //第三列
                if (field === 'gender') {
                    if (rowIndex % 2 != 1) {
                        return this.abstractMerge({'rowSpan': 1, 'content': '男'});
                    }
                    if (rowIndex % 2 == 1) {
                        return this.abstractMerge({'rowSpan': 1, 'content': '女'});
                    }
                }
            },
            // 单元格编辑回调
            cellEditDone(newValue, oldValue, rowIndex, rowData, field) {
                let isNum = /^(\d+)(\.\d+)?$/
                if (!isNum.test(newValue)) {
                    this.$Message.error('请输入大于0的数字');
                    return;
                }

                let total = parseFloat(this.tableData[rowIndex]['3012F15D7AEF474CB5E0CFF83671FAC5']) +
                    parseFloat(this.tableData[rowIndex]['2793ED8F812A4928B220D5DA2A7F489C']) +
                    parseFloat(this.tableData[rowIndex]['B2F6CDB8BC704A0A9F280C5CDA8D0019']) +
                    parseFloat(this.tableData[rowIndex]['093C7820FD4346789DA7FF8ACB981E65']) +
                    parseFloat(this.tableData[rowIndex]['F657424A586743F891E5D7010301E204']) +
                    parseFloat(this.tableData[rowIndex]['D241DD6A528F47BE9E75308A74E0EADD']) +
                    parseFloat(this.tableData[rowIndex]['5A7FE87B74714954B649427C8BF31D56']) +
                    parseFloat(this.tableData[rowIndex]['88ED8DA7E639489ABEF0306951A8BDC9']) +
                    parseFloat(this.tableData[rowIndex]['1CFEB456E8744B9E9AA42B2BAAF57A4D']) +
                    parseFloat(this.tableData[rowIndex]['257B4D2B6D934C24A880891207795B2A']) +
                    parseFloat(this.tableData[rowIndex]['1E0C72B68D8947E894399EFE598F9DC3']) +
                    parseFloat(this.tableData[rowIndex]['AF32A3AEB7C4466CB3A170D0348E16A3']) +
                    parseFloat(this.tableData[rowIndex]['6E40F3C06491405AAEBBCDB39FB43AD2']) +
                    parseFloat(this.tableData[rowIndex]['84940DA547A944FEB7935D28D52A5803']) -
                    parseFloat(oldValue)
                    + parseFloat(newValue)
                this.tableData[rowIndex][field] = newValue;
                let trhtml = (document.querySelectorAll('.v-table-leftview')[0].querySelectorAll('table')[1].querySelectorAll('tr')[rowIndex]).innerHTML
                let lengthArr = trhtml.split('<td ')
                let num = lengthArr.length - 2
                document.querySelectorAll('.v-table-leftview')[0].querySelectorAll('table')[1].querySelectorAll('tr')[rowIndex].querySelectorAll('td')[num].querySelectorAll('span')[0].innerHTML = '<span>' + total + '</span>'


            }
        },
        mounted() {
            this.getProjectPlanList();
        }

    };
    // 自定义列组件
    Vue.component('table-operation', {
        template: `<span>{{total}}</span>`,
        data: function () {
            return {
                total: 0
            };
        },
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
        methods: {
            // +rowData['2793ED8F812A4928B220D5DA2A7F489C']
        },
        created() {
            this.total = this.rowData['3012F15D7AEF474CB5E0CFF83671FAC5'] +
                this.rowData['2793ED8F812A4928B220D5DA2A7F489C'] +
                this.rowData['B2F6CDB8BC704A0A9F280C5CDA8D0019'] +
                this.rowData['093C7820FD4346789DA7FF8ACB981E65'] +
                this.rowData['F657424A586743F891E5D7010301E204'] +
                this.rowData['D241DD6A528F47BE9E75308A74E0EADD'] +
                this.rowData['5A7FE87B74714954B649427C8BF31D56'] +
                this.rowData['88ED8DA7E639489ABEF0306951A8BDC9'] +
                this.rowData['1CFEB456E8744B9E9AA42B2BAAF57A4D'] +
                this.rowData['257B4D2B6D934C24A880891207795B2A'] +
                this.rowData['1E0C72B68D8947E894399EFE598F9DC3'] +
                this.rowData['AF32A3AEB7C4466CB3A170D0348E16A3'] +
                this.rowData['6E40F3C06491405AAEBBCDB39FB43AD2'] +
                this.rowData['84940DA547A944FEB7935D28D52A5803'];
        },


    });

    Vue.component('table-edit', {
        template: `<Button class="submit-btn"   @click.stop.prevent="update(rowData,index)">提交
        </Button>`,
        props: {
            rowData: {
                type: Object
            },
            field: {
                type: String
            },
            index: {
                type: Number
            },
        },
        methods: {
            update() {
                if (parseFloat(this.rowData['3012F15D7AEF474CB5E0CFF83671FAC5']) +
                    parseFloat(this.rowData['2793ED8F812A4928B220D5DA2A7F489C']) +
                    parseFloat(this.rowData['B2F6CDB8BC704A0A9F280C5CDA8D0019']) +
                    parseFloat(this.rowData['093C7820FD4346789DA7FF8ACB981E65']) +
                    parseFloat(this.rowData['F657424A586743F891E5D7010301E204']) +
                    parseFloat(this.rowData['D241DD6A528F47BE9E75308A74E0EADD']) +
                    parseFloat(this.rowData['5A7FE87B74714954B649427C8BF31D56']) +
                    parseFloat(this.rowData['88ED8DA7E639489ABEF0306951A8BDC9']) +
                    parseFloat(this.rowData['1CFEB456E8744B9E9AA42B2BAAF57A4D']) +
                    parseFloat(this.rowData['257B4D2B6D934C24A880891207795B2A']) +
                    parseFloat(this.rowData['1E0C72B68D8947E894399EFE598F9DC3']) +
                    parseFloat(this.rowData['AF32A3AEB7C4466CB3A170D0348E16A3']) +
                    parseFloat(this.rowData['6E40F3C06491405AAEBBCDB39FB43AD2']) +
                    parseFloat(this.rowData['84940DA547A944FEB7935D28D52A5803']) != 100) {
                    this.$Message.error('总分不等于100分');
                    return;
                }
                // 参数根据业务场景随意构造
                let params = this.rowData;
                this.$emit('on-custom-comp', params);
            },

        }
    });

</script>
<style lang="scss">
    .projectPlanNew {
        .v-table-header{
            font-size: 14px;
            color:#FFF;

        }
        .content-box {
            padding: 30px 44px;
            .ivu-form {
                position: relative;
                z-index: 100;
            }
            .title {
                height: 26px;
                line-height: 26px;
                color: #333333;
                font-size: 26px;
                font-weight: bold;
            }
            .submit-btn {
                background-color: #FF7B10;
                color: #FEFEFE
            }

        }

    }
</style>

