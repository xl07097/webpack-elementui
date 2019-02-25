<template>
    <div>
        <Modal
                :title="title"
                :value="true"
                :width="644"
                class="classModal"
                :mask-closable="false"
                @on-cancel="close"
                class-name="vertical-center-modal"
        >
            <Form ref="obj" :model="obj" :rules="rules" inline label-position="top">
                <FormItem label="学年" prop="year">
                    <DatePicker type="year" format="yyyy" v-model="obj.year" style="width: 200px" placeholder="请选择"></DatePicker>
                </FormItem>
                <FormItem label="学期" prop="semester">
                    <i-select v-model="obj.semester" style="width:200px">
                        <i-option :value='1'>第一学期</i-option>
                        <i-option :value='2'>第二学期</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="所属学校" prop="school_id">
                    <i-select v-model="obj.school_id" style="width:200px" :disabled="!is_manage"
                              @on-change="schoolChange">
                        <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="所属年级" prop="grade_id">
                    <i-select v-model="obj.grade_id" style="width:200px">
                        <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="班级名称" prop="name">
                    <i-input v-model.trim="obj.name" :maxlength="10" style="width: 200px" placeholder="请输入"></i-input>
                </FormItem>
                <FormItem label="班主任" prop="headmaster">
                    <i-select v-model="obj.headmaster" style="width:200px">
                        <i-option v-for="item of headmaster" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="体育老师" prop="sportsTeacher">
                    <i-select v-model="obj.sportsTeacher" style="width:200px">
                        <i-option v-for="item of sportsTeacher" :key="item.id" :value='item.id'>{{item.name}}</i-option>
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
        name: 'AddClass',
        props: ['id', 'title', 'flag'],
        data() {
            return {
                grade_name: '',
                obj: {
                    year: null,
                    semester: '',
                    school_id: '',
                    grade_id: '',
                    name: '',
                    sportsTeacher: '',
                    headmaster: ''
                },
                rules: {
                    year: [{required: true, type: 'date', message: '请选择学年'}],
                    semester: [{required: true, type: 'number', message: '请选择学期', trigger: 'change'}],
                    school_id: [{required: true, message: '请选择所属学校', trigger: 'change'}],
                    grade_id: [{required: true, message: '请选择所属年级', trigger: 'change'}],
                    name: [{required: true, message: '请输入班级名称', trigger: 'blur'}],
                    headmaster: [{required: true, message: '请选择班主任', trigger: 'change'}],
                    sportsTeacher: [{required: true, message: '请选择体育老师', trigger: 'change'}],
                },
                schoolList: [],
                gradeList: [],
                classList: [],
                headmaster: [],
                sportsTeacher: [],
                is_manage: true
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
            schoolChange(value) {
                this.obj.grade_id = '';
                this.$ajax({
                    /// =========== 所属年级
                    url: urls.grade_list,
                    data: {
                        id: value,
                        status: 1
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.gradeList = data.data;
                    } else {
                        this.gradeList = [];
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            search() {
                this.$ajax({
                    url: urls.class_info,
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
                            url: urls.class_edit,
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
                            url: urls.class_add,
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
                this.is_manage = false;

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
    .classModal {
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
