<template>
    <div>
        <Modal
                :title="title"
                :value="true"
                :mask-closable="false"
                class="addObject"
                :width="800"
                :footer-hide="flag"
                @on-cancel="close"
        >
            <Form inline ref="obj" :model="obj" :rules="rules" label-position="top">
                <FormItem label="体检计划代号" prop="code">
                    <i-input style="width:310px" v-model.trim="obj.code" :maxlength="6" :disabled="flag || !!id"/>
                </FormItem>
                <FormItem label="医疗机构名称" style="margin-right: 0 !important;" prop="dep_id">
                    <i-select v-model="obj.dep_id" style="width:310px" :disabled="flag">
                        <Option v-for="item in hospitalList" :value="item.id" :key="item.id">{{item.name}}</Option>
                    </i-select>
                </FormItem>
                <FormItem label="体检年份" prop="year">
                    <DatePicker v-model="obj.year" type="year" placeholder="请选择"
                                style="width: 310px" :options="dateOpts" :disabled="flag"></DatePicker>
                </FormItem>
                <FormItem label="体检类型" style="margin-right: 0!important;" prop="type">
                    <i-select v-model="obj.type" style="width:310px;" :disabled="flag">
                        <Option :value="1">健康体检</Option>
                        <Option :value="2">升学体检</Option>
                    </i-select>
                </FormItem>
            </Form>

            <div class="action-btn" @click="add" v-if="!flag" style="margin-bottom: 10px;">
                <img style="margin: 0 4px 0 0;" src="../../../../assets/common/add.png" alt="add"/>
                新增
            </div>

            <Table :columns="columns" :data="tableData" size="small" height="300"
                   style="margin-bottom: 40px;"></Table>
            <div slot="footer">
                <button type="button" class="close" @click='close'>取消</button>
                <button type="button" class="confirm" @click='confirms'>保存</button>
            </div>
        </Modal>
        <component :is='com' :id="id" :year="year" :code="code" @modal-close='ModalClose'></component>
    </div>
</template>

<script>
    import urls from '../../../../service/Urls';
    import addStudentSchool from './addStudentSchool';

    export default {
        name: 'addObject',
        props: ['id', 'title', 'flag'],
        data() {
            return {
                obj: {
                    year: null,
                    type: '',
                    dep_id: '',
                    code: ''
                },
                columns: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '学校',
                        key: 'school_name'
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
                        key: 'count'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
                            return h('span', {
                                attrs: {
                                    class: 'editBtn'
                                },
                                style: {
                                    display: 'inline-block',
                                    cursor: 'pointer',
                                    color: '#FF7200'
                                },
                                on: {
                                    click: () => {
                                        this.deleteSchool(params.row.id, params.index);
                                    }
                                }
                            }, [
                                h('span', {
                                    style: {
                                        position: 'relative',
                                        top: '-4px'
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                columns1: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '学校',
                        key: 'school_name'
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
                        key: 'count'
                    }
                ],
                rules: {
                    year: [
                        {required: true, message: '请选择体检年份', type: 'date', trigger: 'change'}
                    ],
                    type: [
                        {required: true, type: 'number', message: '请选择体检类型', trigger: 'change'}
                    ],
                    dep_id: [
                        {required: true, message: '请选择体检医院', trigger: 'change'}
                    ],
                    code: [
                        {required: true, message: '请选择体检计划代号', trigger: 'blur'},
                        {pattern: /^[0-9]{6}$/, message: '证件号6位数字', trigger: 'blur'}
                    ]
                },
                tableData: [],
                hospitalList: [],
                dateOpts: {
                    disabledDate(date) {
                        let d = new Date();
                        return date && date.getFullYear() < d.getFullYear();
                    }
                },
                deleteArr: [],
                year: '',
                com: null,
                code: ''
            };
        },
        methods: {
            getSelectCondition(type) {
                /// ===========获取下拉列表查询条件
                this.$ajax({
                    /// =========== 学校名称
                    url: urls.dept_all_list,
                    data: {
                        // type: type,
                        status: 1
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.hospitalList = data.data.filter((item) => {
                            return item.type === 3;
                        });
                        this.schoolList = data.data.filter((item) => {
                            return item.type === 2;
                        });
                    } else {
                        this.hospitalList = [];
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            search() {
                this.$ajax({
                    url: urls.media_info,
                    data: {
                        id: this.id
                    }
                }).then((res) => {
                    if (res && res.data) {
                        this.obj.code = res.data.code;
                        this.obj.type = res.data.type;
                        this.obj.dep_id = res.data.dep_id;
                        this.obj.year = new Date(res.data.year, 2, 1);

                        this.tableData = res.data.children.map(item => {
                            return {
                                check_class_id: item.check_class_id,
                                class_no: item.class_no,
                                class_name: item.class_name,
                                count: item.count,
                                exam_end: item.exam_end,
                                exam_start: item.exam_start,
                                grade_name: item.grade_name,
                                grade_no: item.grade_no,
                                id: item.id,
                                plan_code: item.plan_code,
                                plan_id:item.plan_id,
                                school_name: item.school_name,
                                school_no: item.school_no,
                            }
                        });
                    }
                });
            },
            deleteSchool(id, index) {
                let arr = this.tableData.splice(index, 1);
                if(arr[0].id){
                    this.deleteArr.push({
                        check_class_id: arr[0].check_class_id
                    });
                }
            },
            add() {
                this.com = addStudentSchool;
                this.code = this.obj.code;
            },
            confirms() {
                this.$refs['obj'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交！');
                        return false;
                    }
                    let data = {};
                    data = {
                        year: String(this.obj.year.getFullYear()),
                        type: this.obj.type,
                        dep_id: this.obj.dep_id,
                        code: this.obj.code
                    };
                    let list = this.tableData.map(item => {
                        if (item.id) {
                            return {
                                id: item.id,
                                check_class_id: item.check_class_id,
                                // class_no: item.class_no,
                                // count: item.count,
                                // dep_id: item.dep_id,
                                // grade_no: item.grade_no
                            };
                        }
                        return {
                            check_class_id: item.check_class_id,
                            // class_no: item.class_no,
                            // count: item.count,
                            // dep_id: item.dep_id,
                            // grade_no: item.grade_no
                        };
                    });

                    let lists = this.deleteArr.map(item => {
                        return {
                            check_class_id: item.check_class_id
                        }
                    });
                    // return;
                    if (this.id) { // 编辑
                        data.id = this.id;
                        this.$ajax({
                            url: urls.media_edit,
                            data: {
                                planInfo: data,
                                medical_objs: list,
                                delete_objs: lists
                            }
                        }).then(json => {
                            if (json.code === 200) {
                                this.$Message.success('修改体检计划成功');
                                this.$emit('modal-close', true);
                            } else {
                                this.$Message.error(json.error);
                            }
                        }).catch(err => {
                            window.console.log(err);
                        });
                    } else { //新增

                        this.$ajax({
                            url: urls.media_add,
                            data: {
                                planInfo: data,
                                medical_objs: list
                            }
                        }).then(json => {
                            if (json.code === 200) {
                                this.$Message.success('新增体检计划成功');
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
            /**
             * @return {boolean}
             */
            ModalClose(data) {
                if (data) {
                    for (var i = 0, len = this.tableData.length; i < len; i++) {
                        if (this.tableData[i].class_no === data.class_no) {
                            this.$Message.error(`${data.school_name} ${data.grade_name} ${data.class_name} 班级重复添加`);
                            return false;
                        }
                    }
                    this.tableData.push(data);
                }
                this.com = null;
            }
        },
        created() {
            if (this.flag) {
                this.columns = this.columns1;
            }
            this.getSelectCondition(3);
            if (this.id) {
                this.search();
            }
        }
    };
</script>

<style lang="less">
    .addObject {
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
