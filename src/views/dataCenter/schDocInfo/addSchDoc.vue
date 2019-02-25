<template>
    <div>
        <Modal
                :title="title"
                :value="true"
                :width="644"
                class="schDocModal"
                :mask-closable="false"
                @on-cancel="close"
                class-name="vertical-center-modal"
        >
            <Form ref="obj" :model="obj" :rules="rules" inline label-position="top">
                <FormItem label="校医姓名" prop="name">
                    <i-input v-model.trim="obj.name" :maxlength="10" style="width: 200px"
                             placeholder="请输入"></i-input>
                </FormItem>
                <FormItem label="性别" prop="gender">
                    <i-select v-model="obj.gender" style="width:200px">
                        <i-option :value='1'>男</i-option>
                        <i-option :value='2'>女</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="出生年月" prop="birth">
                    <DatePicker format="yyyy-MM-dd" v-model="obj.birth" style="width: 200px" placeholder="请选择"></DatePicker>
                </FormItem>
                <FormItem label="学历" prop="grade_id">
                    <i-select v-model="obj.grade_id" style="width:200px">
                        <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="专业" prop="profe">
                    <i-input v-model.trim="obj.profe" :maxlength="10" style="width: 200px"
                             placeholder="请输入"></i-input>
                </FormItem>
                <FormItem label="职称" prop="headmaster">
                    <i-select v-model="obj.headmaster" style="width:200px">
                        <i-option :value="1">初级</i-option>
                        <i-option :value="2">中级</i-option>
                        <i-option :value="3">高级</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="是否在编" prop="semester">
                    <i-select v-model="obj.semester" style="width:200px">
                        <i-option :value="1">是</i-option>
                        <i-option :value="2">否</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="所属学校" prop="school_id">
                    <i-select v-model="obj.school_id" style="width:200px">
                        <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
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
        name: 'AddSchDoc',
        props: ['id', 'title', 'flag'],
        data() {
            return {
                grade_name: '',
                obj: {
                    name: '',
                    gender: '',
                    birth: '',
                    grade_id: '',
                    headmaster: '',
                    profe: '',
                    semester: '',
                    school_id: '',
                },
                rules: {
                    name: [{required: true, message: '请输入校医姓名', trigger: 'blur'}],
                    gender: [{required: true, message: '请选择性别', trigger: 'change'}],
                    birth: [{required: true, type: 'date', message: '请选择出生年月'}],
                    grade_id: [{required: true, message: '请选择学历', trigger: 'change'}],
                    profe:[{required: true, message: '请输入专业', trigger: 'blur'}],
                    headmaster: [{required: true,type: 'number', message: '请选择职称', trigger: 'change'}],
                    semester: [{required: true, type: 'number', message: '请选择是否在编', trigger: 'change'}],
                    school_id: [{required: true, message: '请选择所属学校', trigger: 'change'}]
                },
                schoolList: [],
                gradeList: []
            };
        },
        methods: {
            getSelectCondition(type) {
                /// ===========获取下拉列表查询条件
                this.$ajax({
                    /// =========== 学校名称
                    url: urls.unit_opt_list,
                    data: {
                        type: 2,
                        status: 1
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.schoolList = data.data;
                    } else {
                        this.schoolList = [];
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            search() {
                this.$ajax({
                    url: urls.staff_info,
                    data: {
                        id: this.id
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.schoolChange(data.data.school_id);
                        this.obj = {
                            year: new Date(data.data.year, 5, 0),
                            semester: data.data.semester,
                            school_id: data.data.school_id,
                            grade_id: data.data.grade_id,
                            name: data.data.name
                        };
                        this.grade_name = data.data.grade;
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
                        this.$ajax({
                            url: urls.staff_edit,
                            data: {
                                id: this.id,
                                year: this.obj.year.getFullYear(),
                                semester: this.obj.semester,
                                school_id: this.obj.school_id,
                                grade_id: this.obj.grade_id,
                                name: this.obj.name
                            }
                        }).then(json => {
                            if (json.code === 200) {
                                this.$Message.success('修改' + this.grade_name + '年级' + this.obj.name + '班级成功');
                                this.$emit('modal-close', true);
                            } else {
                                this.$Message.error(json.error);
                            }
                        }).catch(err => {
                            window.console.log(err);
                        });
                    } else { //新增
                        data = {
                            year: this.obj.year.getFullYear(),
                            semester: this.obj.semester,
                            school_id: this.obj.school_id,
                            grade_id: this.obj.grade_id,
                            name: this.obj.name
                        };
                        this.$ajax({
                            url: urls.staff_add,
                            data: data
                        }).then(json => {
                            if (json.code === 200) {
                                this.$Message.success('新增' + this.obj.name + '班级成功');
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
            if (window.localStorage.getItem('is_roles')) {
                let type = window.localStorage.getItem('type');/// 1教育局2学校3医院4体科所
                if (type === '1') {
                    this.getSelectCondition(1);
                } else if (type === '2') {
                    this.getSelectCondition(2);
                } else if (type === '3') {
                    this.getSelectCondition(3);
                } else if (type === '4') {
                    this.getSelectCondition(4);
                } else {
                    this.getSelectCondition(2);
                }
            } else {
                this.getSelectCondition(2);
            }
            if (this.id) { //编辑
                this.search();
            } else {
                if (window.localStorage.getItem('is_roles')) {
                    this.obj.school_id = window.localStorage.getItem('unit_id');
                }
            }
        }
    };
</script>
<style lang="less">
    .schDocModal {
        .ivu-form {
            padding-left: 66px;

            .ivu-form-item-label {
                color: #333 !important;
            }
        }

        .ivu-modal-footer {
            border: none;
            padding: 0 38px 34px;
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
