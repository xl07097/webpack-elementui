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
                <FormItem label="学期" prop="term">
                    <i-select v-model="obj.term" style="width:200px">
                        <i-option :value='1'>第一学期</i-option>
                        <i-option :value='2'>第二学期</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="所属学校" prop="dep_id">
                    <i-select v-model="obj.dep_id" style="width:200px"
                              @on-change="schoolChange">
                        <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="所属年级" prop="grade_no">
                    <i-select v-model="obj.grade_no" style="width:200px">
                        <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.value}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="班级名称" prop="class_no">
                    <i-input v-model.trim="obj.class_no" :maxlength="10" style="width: 200px" placeholder="请输入"></i-input>
                </FormItem>
                <FormItem label="班主任" prop="class_teacher">
                    <i-select v-model="obj.class_teacher" style="width:200px">
                        <i-option v-for="item of headmaster" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="体育老师" prop="physical_teacher">
                    <i-select v-model="obj.physical_teacher" style="width:200px">
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
                    year: '',
                    term: '',
                    dep_id: '',
                    grade_no: '',
                    class_no: '',
                    class_teacher: '',
                    physical_teacher: ''
                },
                rules: {
                    year: [{required: true, type: 'date', message: '请选择学年'}],
                    term: [{required: true, type: 'number', message: '请选择学期', trigger: 'change'}],
                    dep_id: [{required: true, message: '请选择所属学校', trigger: 'change'}],
                    grade_no: [{required: true, message: '请选择所属年级', trigger: 'change'}],
                    class_no: [{required: true, message: '请输入班级名称', trigger: 'blur'}],
                    class_teacher: [{required: true, message: '请选择班主任', trigger: 'change'}],
                    physical_teacher: [{required: true, message: '请选择体育老师', trigger: 'change'}],
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
                    url: urls.dept_all_list,
                    data: {
                        type: type,
                        status: 1
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.schoolList = data.data.filter((item)=>{
                            return item.type === type
                        });
                    } else {
                        this.schoolList = [];
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            getTeacher(value){
                this.obj.class_teacher = '';
                this.obj.physical_teacher = '';
                this.$ajax({
                    /// =========== 所属年级
                    url: urls.teacher_all_list,
                    data: {}
                }).then(data => {
                    if (data.code === 200) {
                        let classTeacher = [];
                        let phiTeacher = [];
                        data.data.map((item) => {
                            if(item.type === 1 && item.dep_id === value){
                                classTeacher.push(item);
                            }else if(item.type === 2 && item.dep_id === value){
                                phiTeacher.push(item)
                            }
                        });
                        this.headmaster = classTeacher;
                        this.sportsTeacher = phiTeacher;
                    } else {
                        this.headmaster = [];
                        this.sportsTeacher = [];
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            schoolChange(value) {
                this.obj.grade_no = '';
                this.getTeacher(value);
                this.$ajax({
                    url: urls.dictm_all_list,
                    data: {
                        "category_id": "82649A1FDF4DEA7EE050007F01001901",
                        "status": 1
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.gradeList = data.data;
                    } else {
                        this.gradeList = [];
                    }
                }).catch(err => {
                    this.gradeList = [];
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
                        this.schoolChange(data.data.dep_id);
                        this.obj = {
                            year: new Date(data.data.year,5,0),
                            term: data.data.term,
                            dep_id: data.data.dep_id,
                            grade_no: data.data.grade_no,
                            class_no: data.data.class_no,
                            class_teacher: data.data.class_teacher,
                            physical_teacher: data.data.physical_teacher
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
                        this.$ajax({
                            url: urls.class_edit,
                            data: {
                                id: this.id,
                                year: this.obj.year.getFullYear(),
                                term: this.obj.term,
                                dep_id: this.obj.dep_id,
                                grade_no: this.obj.grade_no,
                                class_no: this.obj.class_no,
                                class_teacher: this.obj.class_teacher,
                                physical_teacher: this.obj.physical_teacher,
                            }
                        }).then(json => {
                            if (json.code === 200) {
                                this.$Message.success('修改' + this.obj.class_no + '班级成功');
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
                            term: this.obj.term,
                            dep_id: this.obj.dep_id,
                            grade_no: this.obj.grade_no,
                            class_no: this.obj.class_no,
                            class_teacher: this.obj.class_teacher,
                            physical_teacher: this.obj.physical_teacher,
                        };
                        this.$ajax({
                            url: urls.class_add,
                            data: data
                        }).then(json => {
                            if (json.code === 200) {
                                this.$Message.success('新增' + this.obj.class_no + '班级成功');
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
