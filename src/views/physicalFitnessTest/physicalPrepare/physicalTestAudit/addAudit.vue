<template>
    <div>
        <Modal
                :title="title"
                :value="true"
                :width="800"
                class="addAudit"
                :mask-closable="false"
                @on-cancel="close"
                class-name="vertical-center-modal"
        >
            <div class="edit clearfix">
                <Form ref="obj" :model="obj" inline label-position="top">
                    <FormItem label="体测年份" prop="year" style="width: 300px;margin-right: 90px!important">
                        <i-input v-model="obj.year" :maxlength="19" :disabled="true"></i-input>
                    </FormItem>
                    <FormItem label="体测学校" prop="school_id" style="width: 300px;margin-right: 0!important">
                        <i-input v-model="obj.school_name" :disabled="true"></i-input>
                    </FormItem>
                    <FormItem label="体测计划代号" prop="code" style="width: 300px">
                        <i-input v-model="obj.code" :disabled="true" :maxlength="15"></i-input>
                    </FormItem>
                </Form>
            </div>
            <i-table center :disabled-hover='true' size="small" :height="200" :columns="columns" :data="tableData"></i-table>
            <div class="status" v-show="info===1">
                <span class="tips">体测计划状态</span>
                <RadioGroup v-model="auditGroup" v-if="!flag" @on-change="radioChange">
                    <Radio label="通过"></Radio>
                    <Radio label="驳回"></Radio>
                </RadioGroup>
                <span class="reasons" v-else>{{auditMsg}}</span>
            </div>
            <div class="reason" v-if="disabled" v-show="info===1">
                <P>驳回理由</p>
                <Input class="reject" v-model="reason" type="textarea" :disabled="flag" :rows="4" style="width: 100%;" />
            </div>
            <div slot="footer">
                <div v-show="!flag">
                    <button type="button" class="close" @click='close'>取消</button>
                    <button type="button" class="confirm" @click='confirms'>保存</button>
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>
    import urls from '../../../../service/Urls';
    import {datetimeformatFromString} from '../../../../libs/dateUtils';

    export default {
        name: 'addAudit',
        props: ['id', 'title', 'flag','info'],
        data() {
            return {
                obj: {
                    year: '',
                    school_id: '',
                    code: '',
                },
                auditGroup: '',
                auditMsg: '',
                reason: '',
                columns: [
                    {
                        title: ' ',
                        width: 40
                    },
                    {
                        type: 'index',
                        title: '序号',
                        width: 80
                    },
                    {
                        title: '年级',
                        key: 'grade_name',
                        width: 150
                    },
                    {
                        title: '班级',
                        key: 'class_name',
                        width: 130
                    },
                    {
                        title: '人数',
                        key: 'population',
                        width: 80
                    },
                    {
                        title: '体测时间',
                        key: 'time'
                    },
                ],
                tableData: [],
                disabled: true,
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
                        if(data.data.state === 3){
                            this.auditMsg = '已通过';
                            this.disabled = false;
                        }else if(data.data.state === 4){
                            this.auditMsg = '已驳回';
                            this.disabled = true;
                            this.reason = data.data.remark;
                        }
                        this.tableData = data.data.fitnessPlanInfs.map(item => {
                            return {
                                grade_name: item.grade_name,
                                class_name: item.class_name,
                                population: item.population,
                                time: datetimeformatFromString(item.start_plan_time).substr(0,16)+"-"+datetimeformatFromString(item.end_plan_time).substr(0,16),
                            }
                        });
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            confirms() {
                let data = {};
                data.plan_id = this.id;
                if(this.auditGroup === '通过'){
                    data.result = 1;
                }else if(this.auditGroup === '驳回'){
                    data.result = 2;
                    if(!this.reason){
                        this.$Message.error("请填写驳回理由");
                        return;
                    }
                    data.content = this.reason;
                }else {
                    this.$Message.error("请选择体测计划状态");
                    return;
                }
                // 编辑
                this.$ajax({
                    url: urls.app_physical,
                    data: data
                }).then(data => {
                    if (data.code === 200) {
                        this.$Message.success('体测审核成功');
                        this.$emit('modal-close', true);
                    } else {
                        this.$Message.error(data.error);
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            radioChange(value){

            },
            close() {
                this.$emit('modal-close');
            },
        },
        created() {
            if (this.id) { //编辑
                this.search();
            }
        }
    };
</script>
<style lang="less">
    .addAudit {
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
        .tips{
            display: inline-block;
            margin:54px 20px 30px 0;
            font-size:14px;
            font-family:SourceHanSansCN-Bold;
            font-weight:bold;
            color:rgba(102,102,102,1);
        }
        .reasons{
            font-size:14px;
            font-family:SourceHanSansCN-Bold;
            font-weight:bold;
            color:rgba(51,51,51,1);
        }
        .reject .ivu-input.ivu-input-disabled{
            font-size:14px;
            font-family:SourceHanSansCN-Medium;
            font-weight:500;
            color:rgba(51,51,51,1);
        }
        .reason {
            p{
                margin: 0 0 10px;
                font-size:14px;
                font-family:SourceHanSansCN-Regular;
                font-weight:400;
                color:rgba(102,102,102,1);
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

    .addAudit2 {
        .ivu-modal-body {
            .ivu-form-item-label {
                color: #333 !important;
            }
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



