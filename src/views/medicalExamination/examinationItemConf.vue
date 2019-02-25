<template>
    <div class="examinationItemConf">
        <div class="content-box">
            <div class="title">
                体检项目参考值配置
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
        <Modal
                :title='bigmodal_title'
                v-model="modal"
                :loading="loading"
                :mask-closable="false"
                :styles="{top: '140px',width:'800px'}"
                ok-text="保存"
                @on-ok="submit()"
        >
            <Form inline :model="addFormData" label-position="top" class="modal-form">
                <FormItem label="体检项" style="margin-right: 90px!important;">
                    <Input v-model.trim="addFormData.item" readonly style="width:310px;"/>
                </FormItem>
                <FormItem label="参考值类型" style="margin-right: 30px !important;">
                    <Input style="width:140px;" v-model.trim="addFormData.type" readonly/>
                </FormItem>
                <FormItem label="单位" style="margin-right: 0 !important;">
                    <Input style="width:140px;" v-model.trim="addFormData.unit" readonly/>
                </FormItem>
            </Form>
            <div class="btn-box" style="margin: 6px">
                <div class="action-btn" @click="addItem">
                    <img style="margin: 8px 6px;" src="../../assets/common/add.png"/>
                    新增
                </div>
            </div>
            <Table ref="selection1" :columns="item_List_Columns" :data="item_List" height="300"
                   style="margin-bottom: 40px;"></Table>
        </Modal>
        <div class="transparent-mask" v-show="addmostModal">

        </div>
        <Modal
                title="新增"
                :mask="false"
                :loading="addmostloading"
                v-model="addmostModal"
                :styles="{top: '300px',width:'562px'}"
                @on-ok="addItemToTable()"
                ok-text="添加"
        >
            <Form inline :model="mostAddFormData" ref="mostformInline" :rules="AddformRule" label-position="top"
                  class="modal-form">
                <FormItem label="年龄" prop="age">
                    <Select style="width:200px" v-model="mostAddFormData.age">
                        <Option value="6">6</Option>
                        <Option value="7">7</Option>
                        <Option value="8">8</Option>
                        <Option value="9">9</Option>
                        <Option value="10">10</Option>
                        <Option value="11">11</Option>
                        <Option value="12">12</Option>
                        <Option value="13">13</Option>
                        <Option value="14">14</Option>
                        <Option value="15">15</Option>
                        <Option value="16">16</Option>
                        <Option value="17">17</Option>
                        <Option value="18">18</Option>
                    </Select>
                </FormItem>
                <FormItem label="性别" prop="gender">
                    <Select style="width:200px" v-model="mostAddFormData.gender">
                        <Option value="0">女</Option>
                        <Option value="1">男</Option>
                    </Select>
                </FormItem>
                <FormItem label="下限" prop="normal_low">
                    <Input v-model.trim="mostAddFormData.normal_low" style="width:200px;"/>
                </FormItem>
                <FormItem label="上限" prop="normal_up">
                    <Input style="width:200px" v-model.trim="mostAddFormData.normal_up"/>
                </FormItem>
            </Form>
            <!--<div slot="footer">-->
            <!--<button  type="button" class="ivu-btn ivu-btn-primary" @click='addItemToTable'>添加</button>-->
            <!--</div>-->
        </Modal>
    </div>
</template>
<script>
    import Vue from 'vue';
    import {gettexaminationItemConf} from './table_Data.js';
    import Urls from '../../service/Urls';

    export default {
        name: 'examinationItemConf',
        props: [''],
        mounted() {
        },
        data() {
            return {
                loading: true,
                addmostloading: true,
                bigmodal_title: '设定正常值范围',
                modal: false,
                addmostModal: false,
                item_List_Columns: [],
                //弹框的表格
                item_List: [],
                addFormData: {
                    isnormal: '',
                    unit: '',
                    item: '',
                    type: '',
                    set_id: ''
                },
                mostAddFormData: {
                    age: '',
                    gender: '',
                    normal_low: '',
                    normal_up: '',
                },
                //最小弹窗的验证
                AddformRule: {
                    age: [{required: true, message: '请选择年龄', trigger: 'change'}],
                    gender: [{required: true, message: '请选择性别', trigger: 'change'}],
                    normal_low: [{required: true, message: '请填写最小限制', trigger: 'blur'}],
                    normal_up: [{required: true, message: '请填写最大限制', trigger: 'blur'}],
                },
                titleRows: [
                    [
                        {fields: ['department'], title: '体检科室', titleAlign: 'left'},
                        {fields: ['itemType', 'item'], title: '体检项', titleAlign: 'left', colspan: 2},
                        {fields: ['result'], title: '结果数据', titleAlign: 'left'},
                        {fields: ['custome-adv'], title: '操作', titleAlign: 'left'},
                    ]
                ],
                tableData: gettexaminationItemConf,
                columns: [
                    {
                        field: 'department',
                        width: 180
                    },
                    {
                        field: 'itemType',
                        width: 200,
                    },
                    {
                        field: 'item',
                        width: 200,
                    },
                    {
                        field: 'result',
                        formatter: function (rowData) {
                            return rowData['type'] !== 'newline' ? ('<span >' + (rowData['result'] + '</span>')) : '<span   style="display:inline-block;line-height: 25px;width: 100%">' + (rowData['result'].split('@')[0] + ' <br/> ' + rowData['result'].split('@')[1]) + '</span>';
                        },
                        width: 200,
                        columnAlign: 'left',
                        isResize: true
                    },
                    {
                        field: 'custome-adv',
                        title: '操作',
                        width: 200,
                        componentName: 'table-operation',
                        isResize: true
                    }
                ]
            };
        },
        methods: {
            addItem() {
                this.$refs['mostformInline'].resetFields();
                this.addmostModal = true;
            },
            customCompFunc(params) {
                if (params.type === 'normal') { // do edit operation
                    this.addFormData.isnormal = 'normal';
                    this.bigmodal_title = '逻辑检验界值';
                    this.item_List_Columns = [
                        {
                            title: '序号',
                            width: 60,
                            align: 'center',
                            render: (h, params) => {
                                return h('span', null, params.index + 1);
                            }
                        }, {
                            title: '性别',
                            key: 'gender_name'
                        }, {
                            title: '年龄',
                            key: 'age'
                        }, {
                            title: '下限',
                            key: 'normal_low'
                        }, {
                            title: '上限',
                            key: 'normal_up',
                        }, {
                            title: '操作',
                            key: 'action',
                            render: (h, params) => {
                                return h('span', {
                                    attrs: {
                                        class: 'editBtn'
                                    },
                                    style: {
                                        display: 'inline-block',
                                        cursor: 'pointer',
                                        color: '#FF7200'
                                    },
                                    on: {
                                        click: () => {
                                            this.Itemdelete(params.row);
                                        }
                                    }
                                }, [
                                    h('span', {
                                        style: {
                                            position: 'relative',
                                            top: '-4px'
                                        }
                                    }, '删除')
                                ]);
                            }
                        }
                    ];
                    this.addFormData.set_id = params.rowData['action'];
                    this.addFormData.item = params.rowData['item'];
                    this.addFormData.unit = params.rowData['unit'];
                    this.addFormData.type = '正常值';
                    this.$ajax({
                        url: Urls.examination_config_list,
                        data: {
                            'page': 1,
                            'size': 10,
                            'set_id': params.rowData['action'],
                            'type': 0
                        }
                    }).then((data) => {
                        if (data.code === 200) {
                            this.item_List = data.data;
                            this.modal = true;
                        }
                    });
                }
                if (params.type === 'reset') {
                    this.addFormData.isnormal = 'reset';
                    this.bigmodal_title = '复测参考值';
                    this.addFormData.set_id = params.rowData['action'];
                    this.addFormData.item = params.rowData['item'];
                    this.addFormData.unit = params.rowData['unit'];
                    this.addFormData.type = '复测值';
                    this.$ajax({
                        url: Urls.examination_config_list,
                        data: {
                            'page': 1,
                            'size': 10,
                            'set_id': params.rowData['action'],
                            'type': 1
                        }
                    }).then((data) => {
                        if (data.code === 200) {
                            this.item_List = data.data;
                            this.item_List_Columns = [
                                {
                                    title: '序号',
                                    width: 60,
                                    align: 'center',
                                    render: (h, params) => {
                                        return h('span', null, params.index + 1);
                                    }
                                }, {
                                    title: '性别',
                                    key: 'gender_name'
                                }, {
                                    title: '年龄',
                                    key: 'age'
                                }, {
                                    title: '下限',
                                    key: 'abnormal_low'
                                }, {
                                    title: '上限',
                                    key: 'abnormal_up',
                                }, {
                                    title: '操作',
                                    key: 'action',
                                    render: (h, params) => {
                                        return h('span', {
                                            attrs: {
                                                class: 'editBtn'
                                            },
                                            style: {
                                                display: 'inline-block',
                                                cursor: 'pointer',
                                                color: '#FF7200'
                                            },
                                            on: {
                                                click: () => {
                                                    this.Itemdelete(params.row);
                                                }
                                            }
                                        }, [
                                            h('span', {
                                                style: {
                                                    position: 'relative',
                                                    top: '-4px'
                                                }
                                            }, '删除')
                                        ]);
                                    }
                                }
                            ];
                            this.modal = true;
                        }
                    });
                }
            },
            addItemToTable() {
                this.addmostloading = false;
                this.$nextTick(() => {
                    this.addmostloading = true;
                });
                this.$refs['mostformInline'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交!');
                        return false;
                    }
                    this.mostAddFormData.gender_name = (this.mostAddFormData.gender === 1 ? '男' : '女');
                    if (this.addFormData.isnormal === 'normal') {
                        this.item_List.push(this.mostAddFormData);
                    } else {
                        let obj = {};
                        obj.age = this.mostAddFormData.age;
                        obj.gender = this.mostAddFormData.gender;
                        obj.gender_name = this.mostAddFormData.gender_name;
                        obj.abnormal_up = this.mostAddFormData.normal_up;
                        obj.abnormal_low = this.mostAddFormData.normal_low;
                        this.item_List.push(obj);
                    }
                    this.addmostModal = false;
                });
            },
            //从表格中删除数据
            Itemdelete(para) {
                this.$confirm({
                    text: '是否删除此项参数？',
                    onOk: () => {
                        this.item_List.splice(para.index, 1);
                    },
                    cancel: () => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    }
                });
            },
            //提交数据
            submit() {
                this.loading = false;
                this.$nextTick(() => {
                    this.loading = true;
                });
                let that = this;
                let physicallimit = [];
                let ajaxurl = '';
                //如果是正常值
                if (this.addFormData.isnormal === 'normal') {
                    physicallimit = this.item_List.map(function (item) {
                        return {
                            'set_id': that.addFormData.set_id,
                            'gender': parseInt(item.gender),
                            'age': parseInt(item.age),
                            'normal_low': item.normal_low,
                            'normal_up': item.normal_up
                        };
                    });
                    ajaxurl = Urls.examination_config_add;
                }
                //复测值
                else {
                    physicallimit = this.item_List.map(function (item) {
                        return {
                            'set_id': that.addFormData.set_id,
                            'gender': parseInt(item.gender),
                            'age': parseInt(item.age),
                            'abnormal_low': item.abnormal_low,
                            'abnormal_up': item.abnormal_up
                        };
                    });
                    ajaxurl = Urls.examination_retest_add;
                }
                this.$ajax({
                    url: ajaxurl,
                    data: {
                        'physicallimit': physicallimit,
                        'set_id': that.addFormData.set_id
                    }
                }).then((data) => {
                    if (data.code === 200) {
                        this.$Message.success(data.result);
                        this.modal = false;
                    } else {
                        this.$Message.error(data.error);
                    }
                });
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
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            content: '形体',
                            componentName: ''
                        }
                    }
                    if (rowIndex === 2) {
                        return {
                            colSpan: 1,
                            rowSpan: 3,
                            content: '生理功能',
                            componentName: ''
                        }
                    }
                    if (rowIndex === 5) {
                        return {
                            colSpan: 1,
                            rowSpan: 9,
                            content: '眼科',
                            componentName: ''
                        }
                    }
                    if (rowIndex === 14) {
                        return {
                            colSpan: 1,
                            rowSpan: 4,
                            content: '视力',
                            componentName: ''
                        }
                    }
                    if (rowIndex === 18) {
                        return {
                            colSpan: 1,
                            rowSpan: 7,
                            content: '屈光度',
                            componentName: ''
                        }
                    }

                    if (rowIndex === 25) {
                        return {
                            colSpan: 1,
                            rowSpan: 10,
                            content: '口腔科',
                            componentName: ''
                        }
                    }
                    if (rowIndex === 35) {
                        return {
                            colSpan: 1,
                            rowSpan: 3,
                            content: '耳鼻喉科',
                            componentName: ''
                        }
                    }
                    if (rowIndex === 38) {
                        return {
                            colSpan: 1,
                            rowSpan: 8,
                            content: '外科',
                            componentName: ''
                        };
                    }
                    if (rowIndex === 46) {
                        return {
                            colSpan: 1,
                            rowSpan: 9,
                            content: '内科',
                            componentName: ''
                        }
                    }
                    if (rowIndex === 55) {
                        return {
                            colSpan: 1,
                            rowSpan: 4,
                            content: '检验科',
                            componentName: ''
                        }
                    }
                    if (rowIndex === 59) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            content: '结核病筛查检查',
                            componentName: ''
                        }
                    }
                    if (rowIndex === 61) {
                        return {
                            colSpan: 1,
                            rowSpan: 6,
                            content: '结核菌素皮肤试验检查',
                            componentName: ''
                        }
                    }
                }
                //合并第二列
                if (field === 'itemType') {
                    if ((rowIndex === 0)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '身高'
                        }
                    }
                    if ((rowIndex === 1)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '体重'
                        }
                    }
                    if ((rowIndex === 2)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            content: '血压'
                        }
                    }
                    if ((rowIndex === 4)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '脉搏'
                        }
                    }
                    if ((rowIndex === 5)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            content: '屈光'
                        }
                    }
                    if ((rowIndex === 7)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            content: '近视'
                        }
                    }
                    if ((rowIndex === 9)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            content: '沙眼'
                        }
                    }
                    if ((rowIndex === 11)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '结膜炎'
                        }
                    }
                    if ((rowIndex === 12)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            content: '色觉'
                        }
                    }
                    if ((rowIndex === 14)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            content: '视力'
                        }
                    }
                    if ((rowIndex === 16)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            content: '矫正视力'
                        }
                    }
                    if ((rowIndex === 18)) {
                        return {
                            colSpan: 1,
                            rowSpan: 3,
                            content: '右眼'
                        }
                    }
                    if ((rowIndex === 21)) {
                        return {
                            colSpan: 1,
                            rowSpan: 3,
                            content: '左眼'
                        }
                    }
                    if ((rowIndex === 24)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: 'PD'
                        }
                    }
                    if ((rowIndex === 25)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '齿列'
                        }
                    }
                    if ((rowIndex === 26)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '牙周'
                        }
                    }
                    if ((rowIndex === 27)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '龋齿'
                        }
                    }
                    if ((rowIndex === 28)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            content: '龋患牙数'
                        }
                    }
                    if ((rowIndex === 30)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            content: '龋失牙数'
                        }
                    }
                    if ((rowIndex === 32)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            content: '龋补牙数',
                        };
                    }
                    if ((rowIndex === 34)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '其他记录',
                        };
                    }
                    if ((rowIndex === 35)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '耳',
                        };
                    }
                    if ((rowIndex === 36)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '鼻',
                        };
                    }
                    if ((rowIndex === 37)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '喉',
                        };
                    }
                    if ((rowIndex === 38)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '皮肤',
                        };
                    }
                    if ((rowIndex === 39)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '淋巴结',
                        };
                    }
                    if ((rowIndex === 40)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '头部',
                        };
                    }
                    if ((rowIndex === 41)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '颈部',
                        };
                    }
                    if ((rowIndex === 42)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '脊柱',
                        };
                    }
                    if ((rowIndex === 43)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '四肢',
                        };
                    }
                    if ((rowIndex === 44)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '胸部',
                        };
                    }
                    if ((rowIndex === 45)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '其他记录',
                        };
                    }
                    if ((rowIndex === 46)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '近期不适症状（可多选）',
                        };
                    }
                    if ((rowIndex === 47)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '其他症状',
                        };
                    }
                    if ((rowIndex === 48)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '心率',
                        };
                    }
                    if ((rowIndex === 49)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '心脏杂音',
                        };
                    }
                    if ((rowIndex === 50)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '心律',
                        };
                    }
                    if ((rowIndex === 51)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '肺部罗音',
                        };
                    }
                    if ((rowIndex === 52)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '肝',
                        };
                    }
                    if ((rowIndex === 53)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '脾'
                        };
                    }
                    if ((rowIndex === 54)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '其他记录'
                        };
                    }
                    if ((rowIndex === 55)) {
                        return {
                            colSpan: 1,
                            rowSpan: 2,
                            content: '肝功能'
                        };
                    }
                    if ((rowIndex === 57)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '血红蛋白'
                        };
                    }
                    if ((rowIndex === 58)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '其他化验结果'
                        };
                    }
                    if ((rowIndex === 59)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '确认有无卡介苗接种史或卡痕？'
                        };
                    }
                    if ((rowIndex === 60)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '医生意见'
                        };
                    }
                    if ((rowIndex === 61)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '注射时间'
                        };
                    }
                    if ((rowIndex === 62)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '硬结直径（横径x纵径）'
                        };
                    }
                    if ((rowIndex === 63)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '平均直径'
                        };
                    }
                    if ((rowIndex === 64)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '注射后局部情况'
                        };
                    }
                    if ((rowIndex === 65)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '检验反应时间'
                        };
                    }
                    if ((rowIndex === 66)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '结果判定'
                        };
                    }
                    if ((rowIndex === 67)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '胸部X线检查'
                        };
                    }
                    if ((rowIndex === 68)) {
                        return {
                            colSpan: 2,
                            rowSpan: 1,
                            content: '结论'
                        };
                    }
                    // if ((rowIndex === 69)) {
                    //     return {
                    //         colSpan: 2,
                    //         rowSpan: 1,
                    //         content: rowData.itemType
                    //     };
                    // }
                }
            }
        }
    };
    // 自定义列组件
    Vue.component('table-operation', {
        template: `<span v-if="rowData.action!=''">
        <span style="padding-right: 40px;cursor: pointer"  @click.stop.prevent="normalize(rowData,index)"> <span class="handler-ico normarl"></span>逻辑检验界值</span>&nbsp;
         <span  style="cursor: pointer" @click.stop.prevent="retest(rowData,index)"><span class="handler-ico retest"></span>复测参考值</span>
        </span>`,
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
            normalize() {
                // 参数根据业务场景随意构造
                let params = {type: 'normal', index: this.index, rowData: this.rowData};
                this.$emit('on-custom-comp', params);
            },
            retest() {
                let params = {type: 'reset', index: this.index, rowData: this.rowData};
                this.$emit('on-custom-comp', params);
            }
        }
    });
</script>
<style lang="less">
    .examinationItemConf {
        .v-table-title-class {
            font-size: 16px;
            color: #FFFFFF;
        }

        .v-table-body-class {
            font-size: 16px;
        }

        .v-table-title-cell,
        .v-table-body-cell {
            padding-left: 10px !important;
        }


        .handler-ico {
            margin-right: 5px;
            display: inline-block;
            vertical-align: middle;
            width: 20px;
            height: 20px;
        }

        .normarl {
            background: url("../../assets/medicalExamination/reference_normal.png") no-repeat 100% 100%;
        }

        .retest {
            background: url("../../assets/medicalExamination/reference_retest.png") no-repeat 100% 100%;
        }

        .content-box {
            padding: 30px 44px;
        }

        .title {
            height: 26px;
            margin-bottom: 50px;
            line-height: 26px;
            color: #333333;
            font-size: 26px;
            font-weight: bold;
        }

        /*设置表格样式时，style标签不能设置scoped*/

        .column-cell {
            background-color: #ffffff;
        }
    }
</style>
