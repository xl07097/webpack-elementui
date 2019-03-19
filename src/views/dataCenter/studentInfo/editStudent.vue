<template>
    <div>
        <Modal
                :title="title"
                :value="true"
                :width="750"
                class="studentModal1"
                :mask-closable="false"
                @on-cancel="close"
                class-name="vertical-center-modal"
        >
            <div class="edit clearfix">
                <Row :gutter="36">
                    <i-col span="5">
                        <div class="img">
                            <img :src="obj.photos" alt="学籍照">
                            <Upload
                                    v-if="!disabled"
                                    ref="upload"
                                    :show-upload-list="false"
                                    name="uploadFile"
                                    :on-success="handleSuccess"
                                    :format="['jpg','jpeg','png']"
                                    :data="fileType"
                                    :max-size="1048"
                                    :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize"
                                    :action="uploadUrl"
                                    style="display: inline-block;width:58px;">
                                <a href="javascript:void(0)">学籍照</a>
                            </Upload>
                        </div>
                    </i-col>
                    <i-col span="19">
                        <Form ref="obj" :model="obj" :rules="rules" label-position="top">
                            <Row :gutter="16">
                                <i-col span="8">
                                    <FormItem label="学籍号" prop="code" style="margin-bottom: 20px;">
                                        <i-input v-model.trim="obj.code" :maxlength="19" :disabled="disabled"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="姓名" prop="name" style="margin-bottom: 20px;">
                                        <i-input v-model.trim="obj.name" :disabled="disabled" :maxlength="15"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="4">
                                    <FormItem label="性别" prop="gender" style="margin-bottom: 20px;">
                                        <i-select v-model="obj.gender" :disabled="disabled">
                                            <i-option :value='1'>男</i-option>
                                            <i-option :value='2'>女</i-option>
                                        </i-select>
                                    </FormItem>
                                </i-col>
                                <i-col span="4">
                                    <FormItem label="民族" prop="nation" style="margin-bottom: 20px;">
                                        <i-input v-model.trim="obj.nation" :disabled="disabled"
                                                 :maxlength="10"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="16">
                                <i-col span="8">
                                    <FormItem label="学号" prop="stu_num" style="margin-bottom: 20px;">
                                        <i-input v-model.trim="obj.stu_num" :disabled="disabled"
                                                 :maxlength="9"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="户籍类型" prop="household_type" style="margin-bottom: 20px;">
                                        <i-select v-model="obj.household_type" :disabled="disabled">
                                            <i-option :value='1'>城镇</i-option>
                                            <i-option :value='2'>农村</i-option>
                                        </i-select>
                                    </FormItem>
                                </i-col>

                                <i-col span="8">
                                    <FormItem label="是否住宿" prop="is_boarding" style="margin-bottom: 20px;">
                                        <i-select v-model="obj.is_boarding" :disabled="disabled">
                                            <i-option :value='1'>是</i-option>
                                            <i-option :value='2'>否</i-option>
                                        </i-select>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="16">
                                <i-col span="8">
                                    <FormItem label="证件类型" prop="card_type" style="margin-bottom: 20px;">
                                        <i-select v-model="obj.card_type" :disabled="disabled" @on-change="typeChange">
                                            <i-option :value='1'>身份证</i-option>
                                            <i-option :value='2'>护照</i-option>
                                        </i-select>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem v-if="card_flag" label="证件号" prop="card_num" style="margin-bottom: 20px;">
                                        <i-input v-model.trim="obj.card_num" key="1" :disabled="disabled"
                                                 :maxlength="18" @on-blur="idBlur"></i-input>
                                    </FormItem>
                                    <FormItem v-if="!card_flag" label="证件号" prop="card_num1"
                                              style="margin-bottom: 20px;">
                                        <i-input v-if="!card_flag" v-model.trim="obj.card_num1" key="2"
                                                 :disabled="disabled" :maxlength="9"
                                        ></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="出生日期" prop="birthday" style="margin-bottom: 20px;">
                                        <DatePicker format="yyyy.MM.dd" v-model="obj.birthday"
                                                    :disabled="obj.card_type!==2 || disabled"></DatePicker>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="16">
                                <i-col span="8">
                                    <FormItem label="第一监护人" prop="guardian1" style="margin-bottom: 20px;">
                                        <i-input v-model.trim="obj.guardian1" :disabled="disabled"
                                                 :maxlength="15"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="手机号" prop="guardian1_phone" style="margin-bottom: 20px;">
                                        <i-input v-model.trim="obj.guardian1_phone" :disabled="disabled"
                                                 :maxlength="11"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="工作类型" prop="guardian1_type" style="margin-bottom: 20px;">
                                        <i-input v-model.trim="obj.guardian1_type" :disabled="disabled"
                                                 :maxlength="10"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="16">
                                <i-col span="8">
                                    <FormItem label="第二监护人" prop="guardian2" style="margin-bottom: 10px;">
                                        <i-input v-model.trim="obj.guardian2" :disabled="disabled"
                                                 :maxlength="15"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="手机号" prop="guardian2_phone" style="margin-bottom: 10px;">
                                        <i-input v-model.trim="obj.guardian2_phone" :disabled="disabled"
                                                 :maxlength="11"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="工作类型" prop="guardian2_type" style="margin-bottom: 10px;">
                                        <i-input v-model.trim="obj.guardian2_type" :disabled="disabled"
                                                 :maxlength="10"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                        </Form>
                    </i-col>
                </Row>
            </div>
            <span class="addschool" v-if="!disabled" @click="addtable">
                <img src="../../../assets/unit/add.png" alt="add">
                <span>新增</span>
            </span>
            <i-table center :disabled-hover='true' size="small" :columns="columns" height="120"
                     :data="tableData"></i-table>
            <div slot="footer">
                <button type="button" class="close" @click='close'>取消</button>
                <button type="button" class="confirm" @click='confirms'>保存</button>
            </div>
        </Modal>

        <Modal
                title="新增页面"
                :value="tableModal"
                :width="644"
                :mask-closable="false"
                class="studentModal2"
                @on-cancel="tableclose"
                class-name="vertical-center-modal"
        >
            <i-form
                    ref="tableform"
                    :model="tableform"
                    :rules="tablerules"
                    inline
                    label-position="top">
                <FormItem label="学校名称" prop="dep_id" style="margin-left: 80px;">
                    <i-select v-model="tableform.dep_id" style="width:200px" @on-change="schoolChange">
                        <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="学年" prop="year">
                    <DatePicker type="year" format="yyyy" @on-change="gradeChange" v-model.trim="tableform.year"
                                style="width: 200px"
                                placeholder="请选择" :disabled="flag"></DatePicker>
                </FormItem>
                <FormItem label="学期" prop="term" style="margin-left: 80px;">
                    <i-select v-model="tableform.term" style="width:200px" @on-change="gradeChange">
                        <i-option :value='1'>第一学期</i-option>
                        <i-option :value='2'>第二学期</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="所属年级" prop="grade_no">
                    <i-select v-model="tableform.grade_no" style="width:200px" @on-change="gradeChange">
                        <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.value}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="班级名称" prop="class_no" style="margin-left: 80px;">
                    <i-select v-model="tableform.class_no" style="width:200px">
                        <i-option v-for="item of classList" :key="item.id" :value='item.id'>{{item.class_no}}</i-option>
                    </i-select>
                </FormItem>
            </i-form>

            <div slot="footer">
                <div>
                    <button type="button" class="close" @click='tableclose'>取消</button>
                    <button type="button" class="confirm" @click='tableconfirms'>确定</button>
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>
    import urls from '../../../service/Urls';
    import {dateFormatFromString} from '../../../libs/dateUtils';

    export default {
        name: 'EditStudent',
        props: ['id', 'title', 'flag'],
        data() {
            return {
                card_flag: true,
                obj: {
                    code: '',
                    stu_num: '',
                    name: '',
                    gender: '',
                    nation: '',
                    birthday: '',
                    card_type: '',
                    card_num: '',
                    card_num1: '',
                    household_type: '',
                    is_boarding: '',
                    guardian1: '',
                    guardian1_phone: '',
                    guardian1_type: '',
                    guardian2: '',
                    guardian2_phone: '',
                    guardian2_type: '',
                    photos: require('../../../assets/unit/default.png')
                },
                rules: {
                    code: [{required: true, message: '请输入学籍号', trigger: 'blur'},
                        {pattern: /^[0-9]{19}$/, message: '学籍号长度为19位数字', trigger: 'blur'}],
                    name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
                    gender: [{required: true, type: 'number', message: '请选择性别', trigger: 'change'}],
                    nation: [{required: true, message: '请输入民族', trigger: 'blur'}],
                    stu_num: [{required: true, message: '请输入学号', trigger: 'blur'},
                        {pattern: /^[0-9]{9}$/, message: '学号长度为9位数字', trigger: 'blur'}],
                    birthday: [{required: true, type: 'date', message: '请输入出生日期', trigger: 'blur'}],
                    is_boarding: [{required: true, type: 'number', message: '请选择是否住宿', trigger: 'change'}],
                    household_type: [{required: true, type: 'number', message: '请选择户籍类型', trigger: 'change'}],
                    card_type: [{required: true, type: 'number', message: '请选择证件类型', trigger: 'change'}],
                    card_num: [
                        {required: true, message: '请输入证件号', trigger: 'blur'},
                        {pattern: /^[0-9]{17}[0-9X]{1}$/, message: '证件号格式错误', trigger: 'blur'}
                        // {required: true, validator: this.testIDcode, trigger: 'blur'}
                    ],
                    card_num1: [
                        {required: true, message: '请输入证件号', trigger: 'blur'},
                        {pattern: /^[A-Z][0-9]{7,8}$/, message: '证件号为大写字母开头和数字组合', trigger: 'blur'}],
                    guardian1: [{required: true, message: '请输入第一监护人', trigger: 'blur'}],
                    guardian1_phone: [{required: true, message: '请输入手机号', trigger: 'blur'},
                        {pattern: /^1[0-9]{10}$/, message: '手机号格式错误', trigger: 'blur'}],
                    guardian2_phone: [{pattern: /^1[0-9]{10}$/, message: '手机号格式错误', trigger: 'blur'}]
                },
                columns: [],
                columns1: [
                    {
                        title: ' ',
                        width: 10,
                    },
                    {
                        title: '学校',
                        key: 'dep_id',
                    },
                    {
                        title: '学年',
                        key: 'year',
                    },
                    {
                        title: '学期',
                        key: 'term'
                    },
                    {
                        title: '年级',
                        key: 'grade_no',
                    },
                    {
                        title: '班级',
                        key: 'class_no',
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
                                        this.delete(params.index);
                                    }
                                }
                            }, '删除');
                        }
                    }
                ],
                columns2: [
                    {
                        title: ' ',
                        width: 10,
                    },
                    {
                        title: '学校',
                        key: 'dep_id'
                    },
                    {
                        title: '学年',
                        key: 'year'
                    },
                    {
                        title: '学期',
                        key: 'term'
                    },
                    {
                        title: '年级',
                        key: 'grade_no',
                    },
                    {
                        title: '班级',
                        key: 'class_no'
                    }
                ],
                tableData: [],
                uploadUrl: urls.uploadImage,
                fileType: {
                    filetype: 3
                },
                unitList: [],
                disabled: false,
                tableModal: false,
                tableform: {
                    dep_id: null,
                    year: null,
                    term: null,
                    grade_no: null,
                    class_no: null
                },
                tablerules: {
                    dep_id: [{required: true, message: '请选择学校名称', trigger: 'change'}],
                    year: [{required: true, type: 'date', message: '请选择学年', trigger: 'blur'}],
                    term: [{required: true, type: 'number', message: '请选择学期', trigger: 'change'}],
                    grade_no: [{required: true, message: '请选择所属年级', trigger: 'change'}],
                    class_no: [{required: true, message: '请输入班级名称', trigger: 'change'}]
                },
                schoolList: [],
                gradeList: [],
                classList: []
            };
        },
        methods: {
            testIDcode(rule, value, callback, source, options) {
                // 1 "验证通过!", 0 //校验不通过 // id为身份证号码
                var format =
                    /^[0-9]{6}[1][9][0-9]{4}[0-9]{2}[0-9]{3}[0-9X]$/;
                //号码规则校验
                if (!format.test(value)) {
                    callback('身份证号码不合规');
                    return;
                }
                //区位码校验
                //出生年月日校验 前正则限制起始年份为1900;
                var year = value.substr(6, 4), //身份证年
                    month = value.substr(10, 2), //身份证月
                    date = value.substr(12, 2), //身份证日
                    time = Date.parse(month + '-' + date + '-' + year), //身份证日期时间戳date
                    now_time = Date.parse(new Date()), //当前时间戳
                    dates = (new Date(year, month, 0)).getDate(); //身份证当月天数
                if (time > now_time || date > dates) {
                    callback('出生日期不合规');
                    return;
                }
                //校验码判断
                var c = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                //系数
                var b = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                //校验码对照表
                var id_array = value.split('');
                var sum = 0;
                for (var k = 0; k < 17; k++) {
                    sum += parseInt(id_array[k]) * parseInt(c[k]);
                }
                if (id_array[17].toUpperCase() !== b[sum % 11].toUpperCase()) {
                    callback('身份证校验码不合规');
                    return;
                }
                callback([]);
            },
            getSelectCondition() {
                /// ===========获取下拉列表查询条件
                this.$ajax({
                    /// =========== 学校列表
                    url: urls.dept_all_list,
                    data: {
                        type: 2
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.schoolList = data.data.filter(function (item) {
                            return item.type === 2;
                        });
                    } else {
                        this.schoolList = [];
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            search() {
                this.$ajax({
                    url: urls.student_info,
                    data: {
                        id: this.id
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.obj = {
                            code: data.data.code,
                            stu_num: data.data.stu_num,
                            name: data.data.name,
                            gender: data.data.gender,
                            nation: data.data.nation,
                            birthday: data.data.birthday ? new Date(data.data.birthday) : '',
                            card_type: data.data.card_type,
                            // card_num: data.data.card_num,
                            household_type: data.data.household_type,
                            is_boarding: data.data.is_boarding,
                            guardian1: data.data.guardian1,
                            guardian1_phone: data.data.guardian1_phone,
                            guardian1_type: data.data.guardian1_type,
                            guardian2: data.data.guardian2,
                            guardian2_phone: data.data.guardian2_phone,
                            guardian2_type: data.data.guardian2_type,
                            photos: data.data.photos
                        };
                        if (data.data.card_type === 1) {
                            this.obj.card_num = data.data.card_num;
                            this.card_flag = true;
                        } else {
                            this.obj.card_num1 = data.data.card_num;
                            this.card_flag = false;
                        }
                        this.tableData = data.data.edu_records || [];
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            handleSuccess(res) {
                if (res.code === 0) {
                    this.obj.photos = res.url;
                } else {
                    this.$Message.error(res.error);
                }
            },
            handleFormatError() {
                this.$Message.warning('请选择jpg、JPEG、png格式的图片');
            },
            handleMaxSize() {
                this.$Message.warning('图片大小限制在1M以内');
            },
            idBlur(event) {
                var value = event.target.value;
                if (value.length === 18) {
                    var y = value.substr(6, 4);
                    let m = value.substr(10, 2);
                    let d = value.substr(12, 2);
                    this.obj.birthday = new Date(y + '/' + m + '/' + d);
                } else {
                    this.obj.birthday = '';
                }
            },
            typeChange(value) {
                this.card_flag = value === 1;
            },
            delete(index) {
                this.tableData.splice(index, 1);
            },
            confirms() {
                this.$refs['obj'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交！');
                        return false;
                    }
                    if (!this.obj.photos) {
                        this.$Message.error('请上传学籍照！');
                        return false;
                    }
                    if (!this.tableData.length) {
                        this.$Message.error('教育履历至少有一条！');
                        return false;
                    }
                    let data = {};
                    data.studentInfo = {
                        id: this.id,
                        code: this.obj.code,
                        stu_num: this.obj.stu_num,
                        name: this.obj.name,
                        gender: this.obj.gender,
                        nation: this.obj.nation,
                        birthday: dateFormatFromString(this.obj.birthday).replace(/\//g, '.'),
                        card_type: this.obj.card_type,
                        // card_num: this.obj.card_num,
                        household_type: this.obj.household_type,
                        is_boarding: this.obj.is_boarding,
                        guardian1: this.obj.guardian1,
                        guardian1_phone: this.obj.guardian1_phone,
                        guardian1_type: this.obj.guardian1_type,
                        guardian2: this.obj.guardian2,
                        guardian2_phone: this.obj.guardian2_phone,
                        guardian2_type: this.obj.guardian2_type,
                        photos: this.obj.photos,
                    };
                    if (this.obj.card_type === 1) {
                        data.studentInfo.card_num = this.obj.card_num;
                    } else {
                        if (this.obj.card_num1.length === 8) {
                            data.studentInfo.card_num = '0' + this.obj.card_num1;
                        } else {
                            data.studentInfo.card_num = this.obj.card_num1;
                        }
                    }
                    data.studentInfo.edu_records = this.tableData.map(item => {
                        let items = {};
                        if (item.id) {
                            items.id = item.id;
                        }
                        items.student_id = this.id;
                        items.dep_id = item.dep_id;
                        items.year = item.year;
                        items.term = item.term;
                        items.grade_no = item.grade_no;
                        items.class_no = item.class_no;
                        return items;
                    });

                    // 编辑
                    this.$ajax({
                        url: urls.student_edit,
                        data: data.studentInfo
                    }).then(data => {
                        if (data.code === 200) {
                            this.$Message.success('学生信息编辑成功');
                            this.$emit('modal-close', true);
                        } else {
                            this.$Message.error(data.error);
                        }
                    }).catch(err => {
                        window.console.log(err);
                    });
                });
            },
            close() {
                this.$emit('modal-close');
            },
            schoolChange(value) {
                this.tableform.grade_no = '';
                this.tableform.class_no = '';
                this.classList = [];
                /// =========== 所属年级
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
                    this.natureList = [];
                });
            },
            gradeChange(value) {
                this.tableform.class_no = '';
                if (!this.tableform.grade_no) {
                    return;
                }
                this.$ajax({
                    url: urls.class_all_lists,
                    data: {
                        dep_id: this.tableform.dep_id,
                        term: this.tableform.term ? this.tableform.term : null,
                        year: this.tableform.year ? this.tableform.year.getFullYear() : null,
                        grade_no: this.tableform.grade_no ? this.tableform.grade_no : null
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.classList = data.data;
                    } else {
                        this.classList = [];
                    }
                });
            },
            addtable() {
                this.tableModal = true;
                this.$refs['tableform'].resetFields();
                this.tableform = {
                    dep_id: '',
                    year: null,
                    term: '',
                    grade_no: '',
                    class_no: ''
                };
            },
            tableclose() {
                this.tableModal = false;
            },
            tableconfirms() {
                let self = this;
                this.$refs['tableform'].validate(valid => {
                    if (!valid) {
                        self.$Message.error('还有必填项字段未填，请确认后再提交！');
                        return false;
                    }
                    for (var schoolindex = 0; schoolindex < self.schoolList.length; schoolindex++) {
                        if (self.schoolList[schoolindex].id === self.tableform.dep_id) {
                            self.tableform.school_name = self.schoolList[schoolindex].name;
                            break;
                        }
                    }
                    for (var gradeindex = 0; gradeindex < self.gradeList.length; gradeindex++) {
                        if (self.gradeList[gradeindex].id === self.tableform.grade_no) {
                            self.tableform.grade_name = self.gradeList[gradeindex].value;
                            break;
                        }
                    }

                    for (var classindex = 0; classindex < self.classList.length; classindex++) {
                        if (self.classList[classindex].id === self.tableform.class_no) {
                            self.tableform.class_name = self.classList[classindex].class_no;
                            break;
                        }
                    }
                    debugger;
                    for (let i = 0, len = self.tableData.length; i < len; i++) {

                        let term = self.tableform.term === 1 ? '第一学期' : '第二学期';
                        if (self.tableData[i].dep_id === self.tableform.school_name &&
                            self.tableData[i].year === String(self.tableform.year.getFullYear()) &&
                            self.tableData[i].term === term &&
                            self.tableData[i].grade_no === self.tableform.grade_name) {
                            self.$Message.error('教育履历添加重复');
                            return false;
                        }
                    }

                    self.tableData.push({
                        dep_id: self.tableform.school_name,
                        year: self.tableform.year.getFullYear(),
                        term: self.tableform.term === 1 ? '第一学期' : '第二学期',
                        grade_no: self.tableform.grade_name,
                        class_no: self.tableform.class_name
                    });
                    self.tableModal = false;
                });
            }
        },
        created() {
            this.getSelectCondition();
            this.disabled = !!this.flag;
            if (this.flag) {
                this.rules = [];
                this.columns = this.columns2;
            } else {
                this.columns = this.columns1;
            }
            if (this.id) { //编辑
                this.search();
            }
        }
    };
</script>
<style lang="less">
    .studentModal1 {
        .ivu-modal-body {
            padding: 18px 28px;
            height: 570px;

            .ivu-form-item-label {
                color: #333 !important;
            }
        }

        .img {
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
            color: #FF7200;
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

    .studentModal2 {
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
