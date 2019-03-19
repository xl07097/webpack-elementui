
<template>
    <div>
        <Modal
                :title="title"
                :value="true"
                :width="800"
                class="addSchedule"
                :mask-closable="false"
                @on-cancel="close"
                class-name="vertical-center-modal"
        >
            <div class="edit clearfix">
                <Form ref="obj" inline label-position="top">
                    <FormItem label="体测年份" style="width: 300px;margin-right: 90px!important">
                        <i-input v-model="obj.year" :maxlength="19" :disabled="disabled"></i-input>
                    </FormItem>
                    <FormItem label="体测学校" style="width: 300px;margin-right: 0!important">
                        <i-input v-model="obj.school_name" :disabled="disabled"></i-input>
                    </FormItem>
                    <FormItem label="体测计划代号" style="width: 300px">
                        <i-input v-model="obj.code" :disabled="disabled" :maxlength="15"></i-input>
                    </FormItem>
                </Form>
            </div>
            <i-table center :disabled-hover='true' size="small" :height="200" :columns="columns" :data="tableData"></i-table>
            <div slot="footer">
                <div v-show="!flag">
                    <button type="button" class="close" @click='close'>取消</button>
                    <button type="button" class="confirm" @click='confirms'>保存</button>
                </div>
            </div>
        </Modal>

        <Modal
                title="体测排程编辑"
                :value="tableModal"
                :width="562"
                :mask-closable="false"
                class="addSchedule2"
                @on-cancel="tableclose"
                class-name="vertical-center-modal"
        >
            <i-form
                    ref="tableform"
                    :model="tableform"
                    inline
                    :rules="tablerules"
                    label-position="top">
                <FormItem label="体测年级" prop="grade_id" style="margin-left: 20px;">
                    <i-input v-model="tableform.grade_name" style="width:200px" :disabled="disabled"></i-input>
                </FormItem>
                <FormItem label="体测班级" prop="class_id">
                    <i-input v-model="tableform.class_name" style="width:200px" :disabled="disabled"></i-input>
                </FormItem>
                <FormItem label="体测人数" prop="population" style="margin-left: 20px;">
                    <i-input v-model="tableform.population" style="width:200px" :disabled="true"></i-input>
                </FormItem>
                <FormItem label="体测时间" prop="time">
                    <DatePicker v-model="tableform.time" format="yyyy/MM/dd HH:mm" type="datetimerange" confirm placement="bottom-end" style="width: 200px"></DatePicker>
                </FormItem>
            </i-form>

            <div slot="footer">
                <button type="button" class="close" @click='tableclose'>取消</button>
                <button type="button" class="confirm" @click='tableconfirms'>确定</button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import urls from '../../../../service/Urls';
    import {datetimeformatFromString} from "../../../../libs/dateUtils"
    export default {
        name: 'addSchedule',
        props: ['id', 'title', 'flag'],
        data() {
            return {
                obj: {
                    year: '',
                    school_id: '',
                    code: '',
                },
                columns: [],
                columns1: [
                    {
                        title: ' ',
                        width: 40
                    },
                    {
                        type: 'index',
                        title: '序号',
                        width: 120
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
                        key: 'population'
                    },
                    {
                        title: '体测时间',
                        key: 'time'
                    },
                    {
                        title: '操作',
                        key: 'operator',
                        width: 80,
                        render: (h, params) => {
                            if (this.flag) {
                                return '';
                            }
                            return h('span', {
                                attrs: {
                                    class: 'delete'
                                },
                                on: {
                                    click: () => {
                                        this.edit(params.row,params.index);
                                    }
                                }
                            }, '编辑');
                        }
                    }
                ],
                columns2:  [
                    {
                        title: ' ',
                        width: 40
                    },
                    {
                        type: 'index',
                        title: '序号',
                        width: 120
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
                        key: 'population'
                    },
                    {
                        title: '体测时间',
                        key: 'time'
                    }
                ],
                tableData: [],
                disabled: true,
                tableModal: false,
                tableform: {
                    population: '',
                    grade_id: '',
                    class_id: '',
                    time: []
                },
                tablerules: {
                    time: [{required: true,type: 'array', message: '请选择体测时间', trigger: 'blur'}
                    ],
                },
                index: null
            };
        },
        methods: {
            search() {
                this.$ajax({
                    url: urls.get_physical_object,
                    data: {
                        id: this.id
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.obj = {
                            code: data.data.code,
                            year: data.data.year,
                            school_name: data.data.school_name,
                        };
                        this.tableData = data.data.fitnessPlanInfs;
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            edit(data,index) {
                this.index = index;
                this.tableModal = true;
                if(data.time){
                    this.tableform = {
                        id: data.id,
                        population: data.population,
                        grade_name: data.grade_name,
                        class_name: data.class_name,
                        time: [new Date(data.time.split('-')[0]),new Date(data.time.split('-')[1])]
                    };
                }else{
                    this.tableform = {
                        id: data.id,
                        population: data.population,
                        grade_name: data.grade_name,
                        class_name: data.class_name,
                        time: []
                    };
                }

            },
            confirms() {
                let data = {};
                data.planInfo = {
                    id: this.id
                };
                let children = this.tableData.map(item => {
                    let items = {};
                    items.id = item.id;
                    if(item.time){
                        items.start_plan_time = new Date(item.time.split('-')[0]).getTime();
                        items.end_plan_time = new Date(item.time.split('-')[1]).getTime();
                    }else {
                        items.start_plan_time = null;
                        items.end_plan_time = null;
                    }

                    return items;
                });
                data.fitnessInfoList = children;
                //  排程时间

                console.log(data);
                this.$ajax({
                    url: urls.time_physical_object,
                    data: data
                }).then(data => {
                    if (data.code === 200) {
                        this.$Message.success('体测排程信息编辑成功');
                        this.$emit('modal-close', true);
                    } else {
                        this.$Message.error(data.error);
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            close() {
                this.$emit('modal-close');
            },
            tableclose() {
                this.tableModal = false;
            },
            tableconfirms() {
                this.$refs['tableform'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交！');
                        return false;
                    }
                    console.log(this.tableform.time);
                    this.tableData.splice(this.index,1,{
                        id: this.tableform.id,
                        grade_name: this.tableform.grade_name,
                        class_name: this.tableform.class_name,
                        population: this.tableform.population,
                        time: datetimeformatFromString(this.tableform.time[0]).substr(0,16) +"-"+datetimeformatFromString(this.tableform.time[1]).substr(0,16)
                    });
                    this.tableModal = false;
                });
            }
        },
        created() {
            if(this.flag){
                this.columns = this.columns2;
            }else{
                this.columns = this.columns1;
            }
            if (this.id) { //编辑
                this.search();
            }
        }
    };
</script>
<style lang="less">
    .addSchedule {
        .ivu-modal-body {
            padding: 18px 28px;
            overflow-y: auto;
            .ivu-form-item-label {
                color: #333 !important;
            }
        }
        .img {
            /*width: 104px;*/
            img {
                display: block;
                width: 100%;
            }
        }
        .ivu-upload {
            display: block !important;
            width: 100% !important;
            padding: 6px 10px;
            text-align: center;
            cursor: pointer;
        }
        .addschool {
            display: inline-block;
            margin-bottom: 12px;
            cursor: pointer;
            &:hover {
                opacity: 0.8;
            }
            img {
                position: relative;
                top: 5px
            }
        }
        .ivu-form-item {
            margin-right: 0 !important;
        }
        .ivu-modal-footer {
            border: none;
            padding: 17px 38px 17px;
        }
        .ivu-select-disabled .ivu-select-selection,
        .ivu-input[disabled],
        fieldset[disabled] .ivu-input {
            color: #515a6e;
        }
        .ivu-table td, .ivu-table th {
            height: 36px;
        }
        .delete {
            display: inline-block;
            color: #518783;
            padding: 4px 8px;
            cursor: pointer;
        }
        .delete:hover {
            background: ghostwhite;
        }
        .close {
            width: 70px;
            height: 30px;
            font-size: 16px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgb(128, 128, 128);
            background: rgb(255, 255, 255);
            border: 1px solid rgb(173, 173, 173);
            border-radius: 4px;
            cursor: pointer;
        }
        .confirm {
            width: 70px;
            height: 30px;
            font-size: 16px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgb(255, 255, 255);
            background: rgb(255, 114, 0);
            border-radius: 4px;
            border: none;
            cursor: pointer;
        }
    }

    .addSchedule2 {
        .ivu-modal-body {
            .ivu-form-item-label {
                color: #333 !important;
            }
        }
        .ivu-select-disabled .ivu-select-selection,
        .ivu-input[disabled],
        fieldset[disabled] .ivu-input {
            color: #515a6e;
        }
        .ivu-modal-footer {
            border: none;
            padding: 17px 38px 17px;
        }
        .close {
            width: 70px;
            height: 30px;
            font-size: 16px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgb(128, 128, 128);
            background: rgb(255, 255, 255);
            border: 1px solid rgb(173, 173, 173);
            border-radius: 4px;
            cursor: pointer;
        }
        .confirm {
            width: 70px;
            height: 30px;
            font-size: 16px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgb(255, 255, 255);
            background: rgb(255, 114, 0);
            border-radius: 4px;
            border: none;
            cursor: pointer;
        }
    }
</style>


