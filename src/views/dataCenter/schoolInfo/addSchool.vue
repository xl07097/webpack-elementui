<template>
    <div id="schoolAdd">
        <Modal
                :title="title"
                :value="true"
                :width="644"
                :mask-closable="false"
                class="schoolModal"
                @on-cancel="close"
                class-name="vertical-center-modal"
        >
            <Form ref="obj" :model="obj" :rules="rules" inline label-position="top">
                <FormItem label="学校代号" prop="code">
                    <i-input v-model.trim="obj.code" :maxlength="15" style="width: 222px" placeholder="请输入"></i-input>
                </FormItem>
                 <FormItem label="学校名称" prop="name" style="margin-right: 0 !important;">
                    <i-input v-model.trim="obj.name" :maxlength="18" style="width: 222px" placeholder="请输入"></i-input>
                </FormItem>
                <FormItem label="学校性质" prop="nature">
                    <i-select v-model="obj.nature" style="width:222px">
                        <i-option v-for="item of natureList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="所在区域" prop="area_id" style="margin-right: 0 !important;">
                    <i-select v-model="obj.area_id" style="width:110px">
                        <i-option v-for="item of bigareaList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                    <i-select v-model="obj.area_id" style="width:110px">
                        <i-option v-for="item of areaList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="详细地址" prop="address">
                    <i-input v-model.trim="obj.address" :maxlength="10" style="width: 488px" placeholder="请输入"></i-input>
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
        name: 'AddSchool',
        props: ['id', 'title'],
        data() {
            return {
                obj: {
                    code: '',
                    name: '',
                    nature: '',
                    area_id: '',
                    unit_id: '',
                    address: ''
                },
                rules: {
                    code: [{required: true, message: '请输入学校代号', trigger: 'blur'}],
                    name: [{required: true, message: '请输入学校名称', trigger: 'blur'}],
                    nature: [{required: true, message: '请选择学校性质', trigger: 'change'}],
                    area_id: [{required: true, message: '请选择所在区域', trigger: 'change'}],
                    address: [{required: true, message: '请输入详细地址', trigger: 'change'}]
                },
                hospitalList: [],
                bigareaList: [{
                    id: 1,
                    name: '苏州市'
                },{
                    id: 2,
                    name: '张家港'
                },{
                    id: 3,
                    name: '昆山'
                },{
                    id:4,
                    name: '常熟市'
                }],
                areaList: [{
                    id: 1,
                    name: '姑苏区'
                },{
                    id:2,
                    name:'吴中区'
                }],
                natureList: []
            };
        },
        methods: {
            getSelectCondition() {
                /// ===========学校性质，接口不全
                this.$ajax({
                    url: urls.unit_opt_list,
                    data: {
                        type: 2,
                        status: 1
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.natureList = data.data;
                    } else {
                        this.natureList = [];
                    }
                }).catch(err => {
                    this.natureList = [];
                });
            },
            search() {
                this.$ajax({
                    url: urls.unit_info,
                    data: {
                        id: this.id
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.obj = {
                            name: data.data.name,
                            code: data.data.code,
                            nature: data.data.nature,
                            area_id:data.data.area_id,
                            unit_id: data.data.unit_id,
                            address: data.data.address
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
                            name: this.obj.name,
                            code: this.obj.code,
                            nature: this.obj.nature,
                            area_id: this.obj.area_id,
                            unit_id: this.obj.unit_id,
                            address: this.obj.address
                        };
                        this.$ajax({
                            url: urls.unit_edit,
                            data: data
                        }).then(json => {
                            if (json.code === 200) {
                                this.$Message.success('编辑' + data.name + '学校成功');
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
                            code: this.obj.code,
                            nature: this.obj.nature,
                            area_id:this.obj.area_id,
                            unit_id: this.obj.unit_id,
                            address: this.obj.address
                        };
                        this.$ajax({
                            url: urls.unit_add,
                            data: data
                        }).then(json => {
                            if (json.code === 200) {
                                this.$Message.success('新增' + data.name + '学校成功');
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
            this.getSelectCondition();
            if (this.id) { //编辑
                this.search();
            }
        }
    };
</script>
<style lang="less">
    .schoolModal {
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
        .ivu-form{
            padding: 0 48px;
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
