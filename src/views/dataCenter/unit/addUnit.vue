<template>
    <div>
        <Modal
                :title="title"
                :value="true"
                :width="644"
                :mask-closable="false"
                class="medicalModal"
                @on-cancel="close"
                class-name="vertical-center-modal"
        >
            <Form ref="obj" :model="obj" :rules="rules" inline label-position="top">
                <FormItem label="医疗机构职业许可证(登记号)" prop="licence" style="margin-left: 40px">
                    <i-input v-model.trim="obj.licence" :maxlength="15" style="width: 222px" placeholder="请输入"></i-input>
                </FormItem>
                 <FormItem label="医疗机构名称" prop="name">
                    <i-input v-model.trim="obj.name" :maxlength="20" style="width: 222px" placeholder="请输入"></i-input>
                </FormItem>
                <FormItem label="性质" prop="nature" style="margin-left: 40px">
                    <i-select v-model="obj.nature" style="width:222px">
                        <i-option :value='1'>公立</i-option>
                        <i-option :value='2'>私立</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="所在区域" prop="area_id">
                    <i-select v-model="obj.area_id" style="width:110px;">
                        <i-option :value="1">张家港</i-option>
                        <i-option :value="2">常熟</i-option>
                        <i-option :value="3">昆山</i-option>
                    </i-select>
                    <i-select v-model="obj.unit_id" style="width:110px;">
                        <i-option v-for="item of areaList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="详细地址" prop="location" style="margin-left: 40px">
                    <i-input v-model.trim="obj.location" :maxlength="10" style="width: 488px" placeholder="请输入"></i-input>
                </FormItem>
            </Form>
            <div slot="footer">
                <button type="button" class="close" @click='close'>取消</button>
                <button type="button" class="confirm" @click='confirms'>保存</button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import urls from '../../../service/Urls';

    export default {
        name: 'AddMedical',
        props: ['id', 'title'],
        data() {
            return {
                obj: {
                    licence: '',
                    name: '',
                    nature: '',
                    area_id: '',
                    unit_id: '',
                    location: ''
                },
                rules: {
                    licence: [{required: true, message: '请输入医疗机构职业许可证(登记号)', trigger: 'blur'},
                        {pattern: /^[0-9]{1,15}$/, message: '医疗机构职业许可证(登记号)为数值类型', trigger: 'blur'}],
                    name: [{required: true, message: '请输入医疗机构名称', trigger: 'blur'}],
                    nature: [{required: true,type:'number', message: '请选择性质', trigger: 'change'}],
                    area_id: [{required: true,type: 'number', message: '请选择所在区域', trigger: 'change'}],
                    location: [{required: true, message: '请输入详细地址', trigger: 'blur'}]
                },
                areaList: []
            };
        },
        methods: {
            getSelectCondition() {
                /// ===========获取下拉列表查询条件
                this.$ajax({
                    url: urls.unit_opt_list,
                    data: {
                        type: 3,
                        status: 1
                    }
                }).then(data => {

                }).catch(err => {

                });
            },
            search() {
                this.$ajax({
                    url: urls.section_info,
                    data: {
                        id: this.id
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.obj = {
                            licence: data.data.licence,
                            name: data.data.name,
                            nature: data.data.nature,
                            area_id: data.data.area_id,
                            unit_id: data.data.unit_id,
                            location: data.data.location
                        };
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            confirms() {
                this.$refs['obj'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交！');
                        return false;
                    }
                    let data;
                    if (this.id) { // 编辑
                        data = {
                            id: this.id,
                            licence: this.obj.licence,
                            name: this.obj.name,
                            unit_id: this.obj.unit_id,
                            nature: this.obj.nature,
                            area_id: this.obj.area_id,
                            location: this.obj.location
                        };
                        this.$ajax({
                            url: urls.section_edit,
                            data: data
                        }).then(json => {
                            if (json.code === 200) {
                                this.$Message.success('编辑' + data.name + '医疗机构成功');
                                this.$emit('modal-close', true);
                            } else {
                                this.$Message.error(json.error);
                            }
                        }).catch(err => {
                            window.console.log(err);
                        });
                    } else { //新增
                        data = {
                            name: this.obj.name,
                            licence: this.obj.licence,
                            code: this.obj.code,
                            nature: this.obj.nature,
                            area_id: this.obj.area_id,
                            location: this.obj.location,
                            type: 3
                        };
                        this.$ajax({
                            url: urls.section_add,
                            data: data
                        }).then(json => {
                            if (json.code === 200) {
                                this.$Message.success('新增' + data.name + '医疗机构成功');
                                this.$emit('modal-close', true);
                            } else {
                                this.$Message.error(json.error);
                            }
                        }).catch(err => {
                            window.console.log(err);
                        });
                    }
                });
            },
            close() {
                this.$emit('modal-close');
            }
        },
        created() {
            if (this.id) { //编辑
                this.search();
            }
        }
    };
</script>
<style lang="less">
    .medicalModal {
        .ivu-modal-footer {
            border: none;
            padding: 0 38px 34px;
        }
        .ivu-modal-body {
            height: 300px;
            padding-top: 35px;
            .ivu-form-item-label {
                color: #333 !important;
            }
        }
        .ivu-select-disabled .ivu-select-selection,
        .ivu-input[disabled],
        fieldset[disabled] .ivu-input {
            color: #515a6e;
        }
        .close {
            width: 70px;
            height: 30px;
            font-size: 16px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(128, 128, 128, 1);
            background: rgba(255, 255, 255, 0);
            border: 1px solid rgba(173, 173, 173, 1);
            border-radius: 4px;
            cursor: pointer;
        }
        .confirm {
            width: 70px;
            height: 30px;
            font-size: 16px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            background: rgba(255, 114, 0, 1);
            border-radius: 4px;
            border: none;
            cursor: pointer;
        }
    }
</style>
