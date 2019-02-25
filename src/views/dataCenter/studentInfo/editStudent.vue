<template>
    <div>
        <Modal
                :title="title"
                :value="true"
                :width="660"
                class="studentModal1"
                :mask-closable="false"
                @on-cancel="close"
                class-name="vertical-center-modal"
        >
            <div class="edit clearfix">
                <Row :gutter="36">
                    <i-col span="5">
                        <div class="img">
                            <img :src="obj.photo" alt="头像">
                            <Upload
                                    v-if="!disabled"
                                    ref="upload"
                                    :show-upload-list="false"
                                    :on-success="handleSuccess"
                                    :format="['jpg','jpeg','png']"
                                    :max-size="1048"
                                    :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize"
                                    :action="uploadUrl"
                                    style="display: inline-block;width:58px;">
                                <a href="javascript:void(0)">个人照片</a>
                            </Upload>
                        </div>
                    </i-col>
                    <i-col span="19">
                        <Form ref="obj" :model="obj" :rules="rules" label-position="top">
                            <Row :gutter="16">
                                <i-col span="8">
                                    <FormItem label="学籍号" prop="code">
                                        <i-input v-model.trim="obj.code" :maxlength="19"
                                                 :disabled="disabled"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="姓名" prop="name">
                                        <i-input v-model.trim="obj.name" :disabled="disabled" :maxlength="15"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="4">
                                    <FormItem label="性别" prop="gender">
                                        <i-select v-model="obj.gender" :disabled="disabled">
                                            <i-option :value='1'>男</i-option>
                                            <i-option :value='0'>女</i-option>
                                        </i-select>
                                    </FormItem>
                                </i-col>
                                 <i-col span="4">
                                    <FormItem label="民族" prop="nation">
                                        <i-input v-model.trim="obj.nation" :disabled="disabled" :maxlength="10"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="16">
                                <i-col span="8">
                                    <FormItem label="学号" prop="nation">
                                        <i-input v-model.trim="obj.nation" :disabled="disabled" :maxlength="10"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="户籍类型" prop="census_register">
                                        <i-select v-model="obj.census_register" :disabled="disabled">
                                            <i-option :value='1'>城镇</i-option>
                                            <i-option :value='2'>农村</i-option>
                                        </i-select>
                                    </FormItem>
                                </i-col>
                              
                                <i-col span="8">
                                    <FormItem label="是否住宿" prop="isboarding">
                                        <i-select v-model="obj.isboarding" :disabled="disabled">
                                            <i-option :value='1'>是</i-option>
                                            <i-option :value='2'>否</i-option>
                                        </i-select>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="16">
                                <i-col span="8">
                                    <FormItem label="证件类型" prop="census_register">
                                        <i-select v-model="obj.census_register" :disabled="disabled">
                                            <i-option :value='1'>身份证</i-option>
                                            <i-option :value='2'>护照</i-option>
                                        </i-select>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="证件号" prop="id_num">
                                        <i-input v-model.trim="obj.id_num" :disabled="disabled" :maxlength="18"
                                                 @on-blur="idBlur"></i-input>
                                    </FormItem>
                                </i-col>
                                  <i-col span="8">
                                    <FormItem label="出生日期" prop="birthdate">
                                        <i-input v-model="obj.birthdate" :disabled="true"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="16">
                                <i-col span="8">
                                    <FormItem label="第一监护人" prop="first_guardian">
                                        <i-input v-model.trim="obj.first_guardian" :disabled="disabled"
                                                 :maxlength="10"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="手机号" prop="first_guardian_tel">
                                        <i-input v-model.trim="obj.first_guardian_tel" :disabled="disabled"
                                                 :maxlength="11"></i-input>
                                    </FormItem>
                                </i-col>
                                  <i-col span="8">
                                    <FormItem label="工作类型" prop="first_guardian_tel">
                                        <i-input v-model.trim="obj.first_guardian_tel" :disabled="disabled"
                                                 :maxlength="11"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="16">
                                <i-col span="8">
                                    <FormItem label="第二监护人" prop="second_guardian">
                                        <i-input v-model.trim="obj.second_guardian" :disabled="disabled"
                                                 :maxlength="10"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="手机号" prop="second_guardian_tel">
                                        <i-input v-model.trim="obj.second_guardian_tel" :disabled="disabled"
                                                 :maxlength="11"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col span="8">
                                    <FormItem label="工作类型" prop="first_guardian_tel">
                                        <i-input v-model.trim="obj.first_guardian_tel" :disabled="disabled"
                                                 :maxlength="11"></i-input>
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
            <i-table center :disabled-hover='true' size="small" :columns="columns" :data="tableData"></i-table>
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
                <FormItem label="学校名称" prop="school_id" style="margin-left: 80px;">
                    <i-select v-model="tableform.school_id" style="width:200px" @on-change="schoolChange">
                        <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="学年" prop="year">
                    <DatePicker type="year" format="yyyy" v-model.trim="tableform.year" style="width: 200px"
                                placeholder="请选择" :disabled="flag"></DatePicker>
                    <!--<i-input v-model="tableform.year" :maxlength="4" style="width:200px" placeholder="请输入"></i-input>-->
                </FormItem>
                <FormItem label="学期" prop="semester" style="margin-left: 80px;">
                    <i-select v-model="tableform.semester" style="width:200px">
                        <i-option :value='1'>第一学期</i-option>
                        <i-option :value='2'>第二学期</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="所属年级" prop="grade_id">
                    <i-select v-model="tableform.grade_id" style="width:200px" @on-change="gradeChange">
                        <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="班级名称" prop="classno_id" style="margin-left: 80px;">
                    <!--<i-input v-model="tableform.class_name" :maxlength="10" style="width:200px"-->
                    <!--placeholder="请输入"></i-input>-->
                    <i-select v-model="tableform.classno_id" style="width:200px">
                        <i-option v-for="item of classList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
            </i-form>

            <div slot="footer">
                <div v-show="!flag">
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
                obj: {
                    code: '',
                    name: '',
                    gender: '',
                    nation: '',
                    birthdate: '',
                    isboarding: '',
                    census_register: '',
                    id_num: '',
                    first_guardian: '',
                    first_guardian_tel: '',
                    second_guardian: '',
                    second_guardian_tel: '',
                    photo: require('../../../assets/unit/default.png')
                },
                rules: {
                    code: [{required: true, message: '请输入学籍号', trigger: 'blur'},
                        {pattern: /^[0-9]{19}$/, message: '学籍号长度为19位数字', trigger: 'blur'}],
                    name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
                    gender: [{required: true, type: 'number', message: '请选择性别', trigger: 'change'}],
                    nation: [{required: true, message: '请输入民族', trigger: 'blur'}],
                    birthdate: [{required: true, message: '请输入出生日期', trigger: 'blur'}],
                    isboarding: [{required: true, type: 'number', message: '请选择是否住宿', trigger: 'change'}],
                    census_register: [{required: true, type: 'number', message: '请选择户籍类型', trigger: 'change'}],
                    id_num: [
                        {required: true, message: '请输入证件号', trigger: 'blur'},
                        {pattern: /^[0-9]{17}[0-9X]{1}$/, message: '证件号格式错误', trigger: 'blur'}
                        // {required: true, validator: this.testIDcode, trigger: 'blur'}
                    ],
                    first_guardian: [{required: true, message: '请输入第一监护人', trigger: 'blur'}],
                    first_guardian_tel: [{required: true, message: '请输入手机号', trigger: 'blur'},
                        {pattern: /^1[0-9]{10}$/, message: '手机号格式错误', trigger: 'blur'}],
                    second_guardian_tel: [{pattern: /^1[0-9]{10}$/, message: '手机号格式错误', trigger: 'blur'}]
                },
                columns: [],
                columns1: [
                    {
                        title: ' ',
                        width: 10,
                    },
                    {
                        title: '学校',
                        key: 'school_name',
                    },
                    {
                        title: '学年',
                        width: 80,
                        key: 'year',
                    },
                    {
                        title: '学期',
                        width: 70,
                        key: 'semester',
                        render: (h, params) => {
                            return h('span', params.row.semester === 1 ? '第一学期' : '第二学期');
                        }
                    },
                    {
                        title: '年级',
                        key: 'grade_name',
                        width: 100,
                    },
                    {
                        title: '班级',
                        key: 'class_name',
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
                        key: 'school_name'
                    },
                    {
                        title: '学年',
                        width: 80,
                        key: 'year'
                    },
                    {
                        title: '学期',
                        width: 70,
                        key: 'semester',
                        render: (h, params) => {
                            return h('span', params.row.semester === 1 ? '第一学期' : '第二学期');
                        }
                    },
                    {
                        title: '年级',
                        key: 'grade_name',
                        width: 120
                    },
                    {
                        title: '班级',
                        width: 100,
                        key: 'class_name'
                    }
                ],
                tableData: [],
                uploadUrl: '',
                unitList: [],
                disabled: false,
                tableModal: false,
                tableform: {
                    school_id: '',
                    year: null,
                    semester: '',
                    grade_id: '',
                    classno_id: ''
                },
                tablerules: {
                    school_id: [{required: true, message: '请选择学校名称', trigger: 'change'}],
                    year: [{required: true, type: 'date', message: '请选择学年', trigger: 'blur'},
                        // {pattern: /^[0-9]{4}$/, message: '学年长度为4位数字', trigger: 'blur'}
                    ],
                    semester: [{required: true, type: 'number', message: '请选择学期', trigger: 'change'}],
                    grade_id: [{required: true, message: '请选择所属年级', trigger: 'change'}],
                    classno_id: [{required: true, message: '请输入班级名称', trigger: 'change'}]
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
                    url: urls.unit_opt_list,
                    data: {
                        type: 2
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
                    url: urls.student_info,
                    data: {
                        id: this.id
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.obj = {
                            code: data.data.code,
                            name: data.data.name,
                            gender: data.data.gender,
                            nation: data.data.nation,
                            birthdate: dateFormatFromString(data.data.birthdate),
                            isboarding: Number(data.data.isboarding),
                            census_register: data.data.census_register,
                            id_num: data.data.id_num,
                            first_guardian: data.data.first_guardian,
                            first_guardian_tel: data.data.first_guardian_tel,
                            second_guardian: data.data.second_guardian,
                            second_guardian_tel: data.data.second_guardian_tel,
                            photo: data.data.photo,
                        };
                        this.tableData = data.data.children;
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            handleSuccess(res) {
                this.obj.photo = res.url;
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
                    this.obj.birthdate = y + '/' + m + '/' + d;
                } else {
                    this.obj.birthdate = '';
                }
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
                    if (!this.obj.photo) {
                        this.$Message.error('请上传学籍照！');
                        return false;
                    }
                    if (!this.tableData.length) {
                        this.$Message.error('教育履历至少有一条！');
                        return false;
                    }
                    let data = {};
                    let json  = {
                        id: this.id,
                        code: this.obj.code,
                        name: this.obj.name,
                        gender: this.obj.gender,
                        nation: this.obj.nation,
                        birthdate_long: new Date(this.obj.birthdate).getTime(),
                        isboarding: Number(this.obj.isboarding),
                        census_register: this.obj.census_register,
                        id_num: this.obj.id_num,
                        first_guardian: this.obj.first_guardian,
                        first_guardian_tel: this.obj.first_guardian_tel,
                        second_guardian: this.obj.second_guardian,
                        second_guardian_tel: this.obj.second_guardian_tel,
                        photo: this.obj.photo,
                    };
                    data.studentInfo = json;
                    data.studentInfo.id = this.id;
                    let children = this.tableData.map(item => {
                        let items = {};
                        if (item.id) {
                            items.id = item.id;
                        }
                        items.student_id = this.id;
                        items.school_id = item.school_id;
                        items.year = item.year;
                        items.semester = item.semester;
                        items.grade_id = item.grade_id;
                        items.classno_id = item.classno_id;

                        return items;
                    });
                    data.eduRecordList = children;

                    // 编辑
                    this.$ajax({
                        url: urls.student_edit,
                        data: data
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
                this.tableform.grade_id = '';
                this.$ajax({
                    /// =========== 所属年级
                    url: urls.grade_list,
                    data: {
                        id: value
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
            gradeChange(value) {
                this.tableform.classno_id = '';
                if (value === '-1') {
                    this.classList = [];
                    return false;
                }
                this.$ajax({
                    url: urls.class_all_list,
                    data: {
                        school_id: this.tableform.school_id,
                        status: 1,
                        grade_id: value
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
                    school_id: '',
                    year: null,
                    semester: '',
                    grade_id: '',
                    classno_id: ''
                };
            },
            tableclose() {
                this.tableModal = false;
            },
            tableconfirms() {
                this.$refs['tableform'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交！');
                        return false;
                    }
                    for (var schoolindex = 0; schoolindex < this.schoolList.length; schoolindex++) {
                        if (this.schoolList[schoolindex].id === this.tableform.school_id) {
                            this.tableform.school_name = this.schoolList[schoolindex].name;
                            break;
                        }
                    }
                    for (var gradeindex = 0; gradeindex < this.gradeList.length; gradeindex++) {
                        if (this.gradeList[gradeindex].id === this.tableform.grade_id) {
                            this.tableform.grade_name = this.gradeList[gradeindex].name;
                            break;
                        }
                    }

                    for (var classindex = 0; classindex < this.classList.length; classindex++) {
                        if (this.classList[classindex].id === this.tableform.classno_id) {
                            this.tableform.class_name = this.classList[classindex].name;
                            break;
                        }
                    }
                    this.tableData.push({
                        school_id: this.tableform.school_id,
                        school_name: this.tableform.school_name,
                        year: this.tableform.year.getFullYear(),
                        semester: this.tableform.semester,
                        grade_id: this.tableform.grade_id,
                        grade_name: this.tableform.grade_name,
                        classno_id: this.tableform.classno_id,
                        class_name: this.tableform.class_name,
                    });
                    this.tableModal = false;
                });
            }
        },
        created() {
            this.getSelectCondition();
            this.disabled = !!this.flag;
            if (this.flag) {
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
            height: 480px;
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
