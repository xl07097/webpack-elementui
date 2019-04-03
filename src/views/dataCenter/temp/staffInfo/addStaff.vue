<template>
    <div>
        <Modal
                :title="title"
                :value="true"
                :width="644"
                :mask-closable="false"
                class="staffModal"
                @on-cancel="close"
                class-name="vertical-center-modal"
        >
            <div class="clearfix">
                <Row :gutter="24">
                    <i-col :span="5">
                        <div class="img">
                            <img :src="obj.photo" alt="头像">
                            <Upload
                                    v-if="!flag"
                                    ref="upload"
                                    :show-upload-list="false"
                                    :on-success="handleSuccess"
                                    :format="['jpg','jpeg','png']"
                                    :max-size="1048"
                                    :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize"
                                    :action="uploadUrl"
                                    style="display: inline-block;width:58px;">
                                <a href="javascript:void(0)">照片上传</a>
                            </Upload>
                        </div>
                    </i-col>
                    <i-col :span="19">
                        <Form ref="obj" :model="obj" :rules="rules" label-position="top">
                            <Row :gutter="20">
                                <i-col :span="10">
                                    <FormItem label="姓名" prop="name">
                                        <i-input v-model.trim="obj.name" :maxlength="15" :disabled="flag"
                                                 placeholder="请输入"></i-input>
                                    </FormItem>
                                </i-col>
                                <i-col :span="14">
                                    <FormItem label="所属单位" prop="unit_id">
                                        <i-select v-model="obj.unit_id" :disabled="flag" @on-change="unitchange">
                                            <i-option v-for="item of unitList" :key="item.id" :value='item.id'>
                                                {{item.name}}
                                            </i-option>
                                        </i-select>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="20">
                                <i-col :span="10">
                                    <FormItem label="所属年级" prop="grade_id" v-if="schoolflag">
                                        <i-select v-model="obj.grade_id" @on-change="gradechange" :disabled="flag">
                                            <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>
                                                {{item.name}}
                                            </i-option>
                                        </i-select>
                                    </FormItem>
                                </i-col>
                                <i-col :span="14">
                                    <FormItem label="所属班级" prop="classno_id" v-if="schoolflag">
                                        <i-select v-model="obj.classno_id" :disabled="flag">
                                            <i-option v-for="item of classList" :key="item.id" :value='item.id'>
                                                {{item.name}}
                                            </i-option>
                                        </i-select>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="20">
                                <i-col :span="10">
                                    <FormItem label="所属科室" prop="hdep_id" v-if="hospitalflag">
                                        <i-select v-model="obj.hdep_id" :disabled="flag">
                                            <i-option v-for="item of sectionList" :key="item.id" :value='item.id'>
                                                {{item.name}}
                                            </i-option>
                                        </i-select>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="20">
                                <i-col :span="10">
                                    <FormItem label="性别" prop="gender">
                                        <i-select v-model="obj.gender" :disabled="flag">
                                            <i-option :value='1'>男</i-option>
                                            <i-option :value='0'>女</i-option>
                                        </i-select>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <Row :gutter="20">
                                <i-col :span="10">
                                    <FormItem label="工作人员代号" prop="code">
                                        <i-input v-model.trim="obj.code" :maxlength="15" :disabled="flag"
                                                 placeholder="请输入"></i-input>
                                    </FormItem>
                                </i-col>
                            </Row>
                        </Form>
                    </i-col>
                </Row>
            </div>

            <div slot="footer">
                <div  v-if="!flag">
                    <button type="button" class="close" @click='close'>取消</button>
                    <button type="button" class="confirm" @click='confirms'>保存</button>
                </div>
            </div>
        </Modal>
    </div>

</template>
<script>
    /* eslint-disable no-undef */

    import urls from '../../../../service/Urls';

    export default {
        name: 'AddStaff',
        props: ['id', 'title', 'flag'],
        data() {
            return {
                schoolflag: false,
                hospitalflag: false,
                obj: {
                    name: '',
                    unit_id: '',
                    grade_id: '',
                    classno_id: '',
                    hdep_id: '',
                    gender: '',
                    code: '',
                    photo: require('../../../../assets/unit/default.png')
                },
                rules: {
                    name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
                    unit_id: [{required: true, message: '请选择所属单位', trigger: 'change'}],
                    grade_id: [{required: true, message: '请选择所属年级', trigger: 'change'}],
                    classno_id: [{required: true, message: '请选择所属班级', trigger: 'change'}],
                    hdep_id: [{required: true, message: '请选择所属科室', trigger: 'change'}],
                    gender: [{required: true, type: 'number', message: '请选择性别', trigger: 'change'}],
                    code: [{required: true, message: '请输入工作人员代号', trigger: 'blur'}]
                },
                uploadUrl: '',
                unitList: [],
                gradeList: [],
                classList: [],
                sectionList: [],
            };
        },
        methods: {
            getSelectCondition() {
                /// ===========获取下拉列表查询条件
                this.$ajax({  //所有单位
                    url: urls.unit_all_list,
                    data: {}
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.unitList = data.data;
                        } else {
                            this.unitList = [];
                        }
                        if (this.id) { //编辑
                            this.search();
                        }
                    })
                    .catch(err => {
                        window.console.log(err);
                    });
            },
            schoolChange(value) {
                this.obj.grade_id = '';
                this.$ajax({
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
                });
            },
            unitchange(value) { // 选择所属单位时
                let type = '';
                for (let index = 0; index < this.unitList.length; index++) {
                    if (this.unitList[index].id === value) {
                        type = this.unitList[index].type;
                        break;
                    }
                }
                if (type === 2) { // 学校
                    this.schoolflag = true;
                    this.hospitalflag = false;
                    this.obj.classno_id = '';
                    this.obj.grade_id = '';
                    this.schoolChange(value);
                } else if (type === 3) { // 医院
                    this.schoolflag = false;
                    this.hospitalflag = true;
                    this.obj.hdep_id = '';
                    this.sectionChange(value);
                } else { // 其他
                    this.schoolflag = false;
                    this.hospitalflag = false;
                }
            },
            gradechange(value) { // 选择年级时带出对应班级
                if (value === '-1') {
                    this.classList = [];
                    return false;
                }
                this.$ajax({
                    url: urls.class_all_list,
                    data: {
                        school_id: this.obj.unit_id,
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
            sectionChange(value) {
                this.$ajax({
                    url: urls.section_all_list,
                    data: {
                        unit_id: value,
                        status: 1,
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.sectionList = data.data;
                    } else {
                        this.sectionList = [];
                    }
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
                        for(var index = 0;index < this.unitList.length;index++){
                            if(this.unitList[index].id === data.data.unit_id){
                                if(this.unitList[index].type === 2){
                                    this.schoolflag = true;
                                    this.hospitalflag = false;
                                    this.schoolChange(data.data.unit_id);
                                    this.obj.unit_id = data.data.unit_id;
                                    this.gradechange(data.data.grade_id);
                                }else if (this.unitList[index].type === 3) { // 医院
                                    this.schoolflag = false;
                                    this.hospitalflag = true;
                                    this.sectionChange(data.data.unit_id);
                                } else { // 其他
                                    this.schoolflag = false;
                                    this.hospitalflag = false;
                                }
                                break;
                            }
                        }

                        this.obj = {
                            name: data.data.name,
                            unit_id: data.data.unit_id,
                            grade_id: data.data.grade_id,
                            classno_id: data.data.classno_id,
                            hdep_id: data.data.hdep_id,
                            gender: data.data.gender,
                            code: data.data.code,
                            photo: data.data.photo,
                        };
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
            confirms() {
                this.$refs['obj'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交！');
                        return false;
                    }
                    let data;
                    if (this.schoolflag) {
                        data = {
                            name: this.obj.name,
                            gender: this.obj.gender,
                            code: this.obj.code,
                            photo: this.obj.photo,
                            unit_id: this.obj.unit_id,
                            grade_id: this.obj.grade_id,
                            classno_id: this.obj.classno_id
                        };
                    } else if (this.hospitalflag) {
                        data = {
                            name: this.obj.name,
                            gender: this.obj.gender,
                            code: this.obj.code,
                            photo: this.obj.photo,
                            unit_id: this.obj.unit_id,
                            hdep_id: this.obj.hdep_id
                        };
                    } else {
                        data = {
                            name: this.obj.name,
                            gender: this.obj.gender,
                            code: this.obj.code,
                            photo: this.obj.photo,
                            unit_id: this.obj.unit_id,
                        };
                    }
                    if (this.id) { // 编辑
                        data.id = this.id;
                        this.$ajax({
                            url: urls.staff_edit,
                            data: data
                        }).then(json => {
                            if (json.code === 200) {
                                this.$Message.success('修改' + data.name + '工作人员成功');
                                this.$emit('modal-close', true);
                            } else {
                                this.$Message.error(json.error);
                            }
                        }).catch(err => {
                            window.console.log(err);
                        });
                    } else { //新增
                        this.$ajax({
                            url: urls.staff_add,
                            data: data
                        }).then(json => {
                            if (json.code === 200) {
                                this.$Message.success('新增' + data.name + '工作人员成功');
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

        }
    };
</script>
<style lang="less">
    .staffModal {
        .img {
            float: left;
            width: 104px;
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
        .ivu-modal-body {
            padding: 12px 40px !important;
            .ivu-form-item-label {
                color: #333 !important;
            }
        }
        .ivu-form-item {
            margin-right: 0 !important;
        }
        .ivu-modal-footer {
            border: none;
            padding: 0 38px 34px;
        }
        .ivu-select,
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
