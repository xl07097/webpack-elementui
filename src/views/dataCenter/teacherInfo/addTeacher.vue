<template>
    <div>
        <Modal
                :title="title"
                :value="true"
                :width="644"
                class="teacherModal"
                :mask-closable="false"
                @on-cancel="close"
                class-name="vertical-center-modal"
        >
            <Form ref="obj" :model="obj" :rules="rules" inline label-position="top">
                <FormItem label="学校名称" prop="dep_id">
                    <i-select v-model="obj.dep_id" style="width:200px">
                        <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="老师类型" prop="type">
                    <i-select v-model="obj.type" style="width:200px">
                        <i-option :value="1">班主任</i-option>
                        <i-option :value="2">体育老师</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="老师姓名" prop="name">
                    <i-input v-model.trim="obj.name" :maxlength="10" style="width: 200px"
                             placeholder="请输入"></i-input>
                </FormItem>
                <FormItem label="性别" prop="gender">
                    <i-select v-model="obj.gender" style="width:200px">
                        <i-option :value="1">男</i-option>
                        <i-option :value="2">女</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="出生年月" prop="birthday">
                    <DatePicker format="yyyy/MM/dd" v-model="obj.birthday" style="width: 200px"
                                placeholder="请选择"></DatePicker>
                </FormItem>
                <FormItem label="学历" prop="education">
                    <i-select v-model="obj.education" style="width:200px">
                        <i-option v-for="item of headmaster" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="专业" prop="major">
                    <i-input v-model.trim="obj.major" :maxlength="10" style="width: 200px" placeholder="请输入"></i-input>
                </FormItem>
                <FormItem label="职称" prop="title">
                    <i-select v-model="obj.title" style="width:200px">
                        <i-option :value="1">初级</i-option>
                        <i-option :value="2">中级</i-option>
                        <i-option :value="3">高级</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="是否在编" prop="is_queue">
                    <i-select v-model="obj.is_queue" style="width:200px">
                        <i-option :value="1">是</i-option>
                        <i-option :value="2">否</i-option>
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
        name: 'AddTeacher',
        props: ['id', 'title', 'flag'],
        data() {
            return {
                grade_name: '',
                obj: {
                    dep_id: '',
                    type: '',
                    name: '',
                    gender: '',
                    birthday: '',
                    education: '',
                    major: '',
                    title: '',
                    is_queue: ''
                },
                rules: {
                    dep_id: [{required: true, message: '请选择学校', trigger: 'change'}],
                    type: [{required: true, message: '请选择老师类型', trigger: 'change'}],
                    name: [{required: true, message: '请输入老师姓名', trigger: 'blur'}],
                    gender: [{required: true, type:'number',message: '请选择性别', trigger: 'blur'}],
                    birthday: [{required: true,type:'date', message: '请选择出生年月', trigger: 'blur'}],
                    education: [{required: true, message: '请选择学历', trigger: 'change'}],
                    major:[{required: true, message: '请输入专业', trigger: 'change'}],
                    title: [{required: true, message: '请选择职称', trigger: 'change'}],
                    is_queue: [{required: true, message: '请选择是否在编', trigger: 'change'}]
                },
                schoolList: [],
                gradeList: [],
                headmaster: [],
                is_manage: true
            };
        },
        methods: {
            getSelectCondition(type) {
                /// ===========获取下拉列表查询条件
                this.$ajax({
                    /// =========== 学校名称
                    url: urls.school_all_list,
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
                        this.obj = {
                            dep_id: data.data.dep_id,
                            name: data.data.name,
                            type: data.data.type,
                            gender: data.data.gender,
                            birthday: data.data.birthday,
                            education: data.data.education,
                            major: data.data.major,
                            title: data.data.title,
                            is_queue: data.data.is_queue,
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
                                dep_id: this.obj.dep_id,
                                type: this.obj.type,
                                name: this.obj.name,
                                gender: this.obj.gender,
                                birthday: this.obj.birthday,
                                education: this.obj.education,
                                major: this.obj.major,
                                title: this.obj.title,
                                is_queue: this.obj.is_queue
                            }
                        }).then(json => {
                            if (json.code === 200) {
                                this.$Message.success('修改'+this.obj.name + '老师成功');
                                this.$emit('modal-close', true);
                            } else {
                                this.$Message.error(json.error);
                            }
                        }).catch(err => {
                            window.console.log(err);
                        });
                    } else { //新增
                        data = {
                            dep_id: this.obj.dep_id,
                            type: this.obj.type,
                            name: this.obj.name,
                            gender: this.obj.gender,
                            birthday: this.obj.birthday,
                            education: this.obj.education,
                            major: this.obj.major,
                            title: this.obj.title,
                            is_queue: this.obj.is_queue
                        };
                        this.$ajax({
                            url: urls.teacher_add,
                            data: data
                        }).then(json => {
                            if (json.code === 200) {
                                this.$Message.success('新增' + this.obj.name + '老师成功');
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
            this.getSelectCondition(2);
            if (this.id) { //编辑
                this.search();
            }
        }
    };
</script>
<style lang="less">
    .teacherModal {
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
