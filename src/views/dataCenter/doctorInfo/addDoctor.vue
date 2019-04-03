<template>
    <div id="addDoctor">
        <Modal
                :title="title"
                :value="true"
                :width="644"
                :mask-closable="false"
                class="doctorModal"
                @on-cancel="close"
                class-name="vertical-center-modal"
        >
            <Form ref="obj" :model="obj" :rules="rules" inline label-position="left">
                <FormItem label="医生姓名" prop="name" style="margin-left: 66px">
                    <i-input v-model.trim="obj.name" :maxlength="15" style="width: 200px" placeholder="请输入"></i-input>
                </FormItem>
                <FormItem label="所属医疗机构" prop="dep_id">
                    <i-select v-model="obj.dep_id" style="width:200px" @on-change="hospitalChange">
                        <i-option v-for="item of hospitalList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="所属科室" prop="hospital_dep_id" style="margin-left: 66px">
                    <i-select v-model="obj.hospital_dep_id" style="width:200px">
                        <i-option v-for="item of sectionList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
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
        name: 'AddDoctor',
        props: ['id', 'title'],
        data() {
            return {
                obj: {
                    name: '',
                    dep_id: '',
                    hospital_dep_id: ''
                },
                rules: {
                    name: [{required: true, message: '请输入医生姓名', trigger: 'blur'}],
                    hospital_dep_id: [{required: true, message: '请选择所属科室', trigger: 'change'}],
                    dep_id: [{required: true, message: '请选择所属医疗机构', trigger: 'change'}]
                },
                sectionList: [],
                hospitalList: [],
            };
        },
        methods: {
            getSelectCondition() {
                /// ===========获取下拉列表查询条件
                this.$ajax({
                    url: urls.dept_all_list,
                    data: {
                        type: 3,
                        status: 1
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.hospitalList = data.data.filter((item)=>{
                            return item.type === 3
                        });
                    } else {
                        this.hospitalList = [];
                    }
                }).catch(err => {
                    this.hospitalList = [];
                });
            },
            hospitalChange(id){
                this.obj.hospital_dep_id = '';
                this.$ajax({
                    url: urls.section_all_lists,
                    data: {
                        dep_id: id
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.sectionList = data.data;
                    } else {
                        this.sectionList = [];
                    }
                }).catch(err => {
                    this.sectionList = [];
                });
            },
            search() {
                this.$ajax({
                    url: urls.doctor_info,
                    data: {
                        id: this.id
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.hospitalChange(data.data.dep_id);
                        this.obj = {
                            name: data.data.name,
                            dep_id: data.data.dep_id,
                            hospital_dep_id: data.data.hospital_dep_id
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
                            dep_id: this.obj.dep_id,
                            hospital_dep_id: this.obj.hospital_dep_id
                        };
                        this.$ajax({
                            url: urls.doctor_edit,
                            data: data
                        }).then(json => {
                            if (json.code === 200) {
                                this.$Message.success('编辑' + data.name + '医生成功');
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
                            dep_id: this.obj.dep_id,
                            hospital_dep_id: this.obj.hospital_dep_id
                        };
                        this.$ajax({
                            url: urls.doctor_add,
                            data: data
                        }).then(json => {
                            if (json.code === 200) {
                                this.$Message.success('新增' + data.name + '医生成功');
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
    .doctorModal {
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
