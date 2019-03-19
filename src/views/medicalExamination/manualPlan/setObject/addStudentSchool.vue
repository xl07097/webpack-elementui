<template>
    <div>
        <Modal
                title="新增"
                :value="true"
                class="modal-form-min"
                :width="562"
                @on-cancel="addclose"
        >
            <Form inline ref="addschool" :model="addSchool" :rules="addRules" label-position="top">
                <FormItem label="体检学校" prop="dep_id">
                    <i-select style="width:200px" @on-change="schoolChange" v-model="addSchool.dep_id">
                        <i-option v-for="item in schoolList" :value="item.id" :key="item.id">{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="体检年级" prop="grade_no">
                    <i-select style="width:200px" @on-change="gradeChange" v-model="addSchool.grade_no">
                        <i-option v-for="item in gradeList" :value="item.id" :key="item.id">{{item.value}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="体检班级" prop="class_no">
                    <i-select style="width:200px" @on-change="classChange" v-model="addSchool.class_no">
                        <i-option v-for="item in classList" :value="item.class_no" :key="item.class_no">{{item.class_name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="体检人数" prop="count">
                    <i-input style="width:200px" v-model="addSchool.count" disabled/>
                </FormItem>
            </Form>
            <div slot="footer">
                <button type="button" class="close" @click='addclose'>取消</button>
                <button type="button" class="confirm" @click='addconfirms'>保存</button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import urls from '../../../../service/Urls';

    export default {
        name: 'addStudentSchool',
        props: ['id','code'],
        data(){
            return {
                addSchool: {
                    class_no: '',
                    count: null,
                    dep_id: '',
                    grade_no: ''
                },
                addRules: {
                    dep_id: [
                        {required: true, message: '请选择体检学校', trigger: 'change'}
                    ],
                    grade_no: [
                        {required: true, message: '请选择体检年级', trigger: 'change'}
                    ],
                    class_no: [
                        {required: true, message: '请选择体检班级', trigger: 'change'}
                    ],
                    count: [
                        {required: true,type:'number', message: '体检人数不能为空'}
                    ]
                },
                schoolList: [],
                gradeList: [],
                classList: [],
            }
        },
        methods: {
            getSelectCondition() {
                /// ===========获取下拉列表查询条件
                this.$ajax({
                    /// =========== 学校名称
                    url: urls.dept_all_list,
                    data: {
                        status: 1
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.schoolList = data.data.filter((item) => {
                            return item.type === 2;
                        });
                    } else {
                        this.schoolList = [];
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            schoolChange(value) {
                this.addSchool.grade_no = '';
                this.addSchool.class_no = '';
                this.addSchool.count = '';
                this.$ajax({
                    url: urls.dictm_all_list,
                    data: {
                        'category_id': '82649A1FDF4DEA7EE050007F01001901',
                        'status': 1
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
            gradeChange(value) {
                this.addSchool.class_no = '';
                this.$ajax({
                    url: urls.class_check_list,
                    data: {
                        plan_code: this.code,
                        grade_no: value,
                        dep_id: this.addSchool.dep_id
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.classList = data.data;
                    } else {
                        this.classList = [];
                    }
                });
            },
            classChange(value) {
                for(var i = 0;i < this.classList.length;i++){
                    if(this.classList[i].class_no === value){
                        this.addSchool.count = this.classList[i].count;
                    }
                }
            },
            addconfirms() {
                this.$refs['addschool'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交！');
                        return false;
                    }
                    let school_name = '';
                    let id = '';
                    for (let i = 0; i < this.schoolList.length; i++) {
                        if (this.schoolList[i].id === this.addSchool.dep_id) {
                            school_name = this.schoolList[i].name;
                            break;
                        }
                    }
                    let grade_name = '';
                    for (let j = 0; j < this.gradeList.length; j++) {
                        if (this.gradeList[j].id === this.addSchool.grade_no) {
                            grade_name = this.gradeList[j].value;
                        }
                    }
                    let class_name = '';
                    for (let k = 0; k < this.classList.length; k++) {
                        if (this.classList[k].class_no === this.addSchool.class_no) {
                            id = this.classList[k].id;
                            class_name = this.classList[k].class_name;
                        }
                    }
                    let data = {
                        check_class_id: id,
                        class_no: this.addSchool.class_no,
                        class_name: class_name,
                        count: this.addSchool.count,
                        dep_id: this.addSchool.dep_id,
                        school_name: school_name,
                        grade_no: this.addSchool.grade_no,
                        grade_name: grade_name
                    };
                    this.$emit('modal-close',data);
                });
            },
            addclose() {
                this.$emit('modal-close');
            }
        },
        created() {
            this.getSelectCondition();
        }
    };
</script>

<style lang="less">
    .modal-form-min {
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