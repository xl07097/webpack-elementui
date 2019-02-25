<template>
    <div>
        <Modal
                :title="title"
                :value="true"
                :width="800"
                class="testPlanModal1"
                :mask-closable="false"
                @on-cancel="close"
                class-name="vertical-center-modal"
        >
            <div class="edit clearfix">
                <Form ref="obj" :model="obj" :rules="rules" inline label-position="top">
                    <FormItem label="体测年份" prop="year" style="width: 300px;margin-right: 90px!important">
                        <DatePicker type="year" format="yyyy" v-model="obj.year" style="width: 100%;" :disabled="disabled"></DatePicker>
                    </FormItem>
                    <FormItem label="体测学校" prop="school_id" style="width: 300px;margin-right: 0!important">
                        <i-select v-model="obj.school_id" @on-change="schoolChange" :disabled="disabled">
                            <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}
                            </i-option>
                        </i-select>
                    </FormItem>
                    <FormItem label="体测计划代号" prop="code" style="width: 300px">
                        <i-input v-model="obj.code" :disabled="disabled" :maxlength="15"></i-input>
                    </FormItem>
                </Form>
            </div>
            <span class="addschool" v-if="!disabled" @click="addtable">
                <img src="../../../../assets/unit/add.png" alt="add">
                <span>新增</span>
            </span>
            <i-table center :disabled-hover='true' size="small" :height="200" :columns="columns" :data="tableData"></i-table>
            <div slot="footer">
                <div v-show="!flag">
                    <button type="button" class="close" @click='close'>取消</button>
                    <button type="button" class="confirm" @click='confirms'>保存</button>
                </div>
            </div>
        </Modal>

        <Modal
                title="新增"
                :value="tableModal"
                :width="562"
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
                <FormItem label="体测年级" prop="grade_id" style="margin-left: 20px;">
                    <i-select v-model="tableform.grade_id" style="width:200px" @on-change="gradeChange">
                        <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="体测班级" prop="class_id">
                    <i-select v-model="tableform.class_id" style="width:200px" @on-change="classChange">
                        <i-option v-for="item of classList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="体测人数" prop="population" style="margin-left: 20px;">
                    <i-input v-model="tableform.population" :disabled="true" style="width:200px"></i-input>
                </FormItem>
            </i-form>

            <div slot="footer">
                <button type="button" class="close" @click='tableclose'>取消</button>
                <button type="button" class="confirm" @click='tableconfirms'>确定</button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import urls from '../../../../service/Urls';
    export default {
        name: 'addTestPlan',
        props: ['id', 'title', 'flag'],
        data() {
            return {
                obj: {
                    year: null,
                    school_id: '',
                    code: '',
                },
                rules: {
                    year: [{required: true,type:'date', message: '请输入体测年份', trigger: 'blur'}],
                    school_id: [{required: true, message: '请选择体测学校', trigger: 'change'}],
                    code: [{required: true, message: '请输入体测计划代号', trigger: 'blur'}],
                },
                columns: [],
                columns1:[
                    {
                        title: ' ',
                        width: 40
                    },
                    {
                        type: 'index',
                        title: '序号',
                        width: 120
                    },
                    {
                        title: '年级',
                        key: 'grade_name'
                    },
                    {
                        title: '班级',
                        key: 'class_name'
                    },
                    {
                        title: '人数',
                        key: 'population'
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
                columns2:[
                    {
                        title: ' ',
                        width: 40
                    },
                    {
                        type: 'index',
                        title: '序号',
                        width: 120
                    },
                    {
                        title: '年级',
                        key: 'grade_name'
                    },
                    {
                        title: '班级',
                        key: 'class_name'
                    },
                    {
                        title: '人数',
                        key: 'population'
                    }
                ],
                tableData: [],
                disabled: false,
                tableModal: false,
                tableform: {
                    grade_id: '',
                    class_id: '',
                    population: null
                },
                tablerules: {
                    grade_id: [{required: true, message: '请选择体测年级', trigger: 'change'}],
                    class_id: [{required: true, message: '请选择体测班级', trigger: 'change'}],
                    population: [{required: true,type: 'number', message: '请输入体测人数', trigger: 'blur'}],
                },
                schoolList: [],
                gradeList: [],
                classList: []
            };
        },
        methods: {
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
                    url: urls.get_physical_object,
                    data: {
                        id: this.id
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.schoolChange(data.data.school_id);
                        this.obj = {
                            code: data.data.code,
                            year: new Date(data.data.year,5,0),
                            school_id: data.data.school_id,
                        };
                        this.tableData = data.data.fitnessPlanInfs;
                    }
                }).catch(err => {
                    window.console.log(err);
                });
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

                    if (!this.tableData.length) {
                        this.$Message.error('请维护体测对象');
                        return false;
                    }
                    let data = {};
                    data.planInfo= {
                        year: this.obj.year.getFullYear(),
                        school_id: this.obj.school_id,
                        code: this.obj.code,
                    };

                    if(this.id){
                        data.planInfo.id = this.id;
                        data.fitnessInfoList = this.tableData.map(item => {
                            let items = {};
                            if (item.id) {
                                items.id = item.id;
                            }
                            items.population = item.population;
                            items.grade_id = item.grade_id;
                            items.class_id = item.class_id;

                            return items;
                        });
                        // 编辑
                        this.$ajax({
                            url: urls.edit_physical_object,
                            data: data
                        }).then(data => {
                            if (data.code === 200) {
                                this.$Message.success('修改'+data.code+'体测计划成功');
                                this.$emit('modal-close', true);
                            } else {
                                this.$Message.error(data.error);
                            }
                        }).catch(err => {
                            window.console.log(err);
                        });
                    }else {
                        data.fitnessInfoList = this.tableData.map(item => {
                            let items = {};
                            items.population = item.population;
                            items.grade_id = item.grade_id;
                            items.class_id = item.class_id;

                            return items;
                        });

                        // 新增
                        this.$ajax({
                            url: urls.add_physical_object,
                            data: data
                        }).then(json => {
                            if (json.code === 200) {
                                this.$Message.success('新增'+data.planInfo.code+'体测计划成功');
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
            },
            schoolChange(value) {
                this.tableform.grade_id = '';
                this.tableData = [];

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
            gradeChange(value) {
                this.tableform.class_id = '';
                this.$ajax({
                    url: urls.class_all_list,
                    data: {
                        school_id: this.obj.school_id,
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
            classChange(value){
                if(value){
                    this.$ajax({
                        url: urls.get_student_count,
                        data: {
                            class_id: value
                        }
                    }).then(data => {
                        this.$set(this.tableform, 'population', data.count);
                    });
                }
            },
            addtable() {
                this.tableModal = true;
                this.$refs['tableform'].resetFields();
                this.tableform = {
                    count: null,
                    grade_id: '',
                    class_id: ''
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
                    for (var gradeindex = 0; gradeindex < this.gradeList.length; gradeindex++) {
                        if (this.gradeList[gradeindex].id === this.tableform.grade_id) {
                            this.tableform.grade_name = this.gradeList[gradeindex].name;
                            break;
                        }
                    }

                    for (var classindex = 0; classindex < this.classList.length; classindex++) {
                        if (this.classList[classindex].id === this.tableform.class_id) {
                            this.tableform.class_name = this.classList[classindex].name;
                            break;
                        }
                    }
                    for(var tableindex = 0;tableindex< this.tableData.length;tableindex++){
                        if(this.tableData[tableindex].grade_id === this.tableform.grade_id && this.tableData[tableindex].class_id === this.tableform.class_id){
                            this.$Message.error(this.tableform.grade_name+"年级"+this.tableform.class_name+"班级体测计划已存在");
                            return;
                        }
                    }

                    this.tableData.push({
                        grade_id: this.tableform.grade_id,
                        grade_name: this.tableform.grade_name,
                        class_id: this.tableform.class_id,
                        class_name: this.tableform.class_name,
                        population: this.tableform.population,
                    });
                    this.tableModal = false;
                });
            }
        },
        created() {
            this.getSelectCondition();
            this.disabled = !!this.flag;
            if(!this.disabled){
                this.columns = this.columns1;
            }else {
                this.columns = this.columns2;
            }
            if (this.id) { //编辑

                this.search();
            }
        }
    };
</script>
<style lang="less">
    .testPlanModal1 {
        .ivu-modal-body {
            padding: 18px 28px;
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

