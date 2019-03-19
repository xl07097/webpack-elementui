<template>
    <div>
        <Modal
                :title="title"
                :value="true"
                :mask-closable="false"
                :transfer="false"
                :width="800"
                :footer-hide="true"
                @on-cancel="close"
        >
            <Form inline :model="obj" ref="obj" class="modal-form" label-position="top">
                <FormItem label="体检年份" prop="year">
                    <DatePicker v-model="obj.year" type="year" disabled style="width: 310px"></DatePicker>
                </FormItem>
                <FormItem label="体检类型" prop="type">
                    <i-select v-model="obj.type" style="width:310px;" disabled>
                        <Option :value="1" :key="1">健康体检</Option>
                        <Option :value="2" :key="2">升学体检</Option>
                    </i-select>
                </FormItem>
                <FormItem label="体检医院" prop="dep_id">
                    <i-select style="width:310px" v-model="obj.dep_id" disabled>
                        <Option v-for="item in hospitalList" :value="item.id" :key="item.id">{{item.name}}</Option>
                    </i-select>
                </FormItem>
                <FormItem label="体检计划代号" prop="code">
                    <i-input style="width:310px" v-model="obj.code" disabled/>
                </FormItem>
            </Form>
            <Table :columns="columns" :data="tableData" height="300"></Table>
            <div slot="footer">
                <button type="button" class="close" @click='close'>取消</button>
                <button type="button" class="confirm" @click='confirms'>保存</button>
            </div>
        </Modal>
        <Modal
                title="体检排程编辑"
                :mask="false"
                :transfer="false"
                v-model="addSchoolModal"
                :width="562"
                @on-cancel="addclose"
        >
            <Form inline ref="plan_info_form" :model="planInfo" label-position="top" class="modal-form-min"
                  :rules="rules">
                <FormItem label="体检学校" prop="dep_id">
                    <i-input style="width:200px" v-model="planInfo.school_name" disabled/>
                </FormItem>
                <FormItem label="体检年级" prop="grade_no">
                    <i-input style="width:200px" v-model="planInfo.grade_name" disabled/>
                </FormItem>
                <FormItem label="体检班级" prop="class_no">
                    <i-input style="width:200px" v-model="planInfo.class_name" disabled/>
                </FormItem>
                <FormItem label="体检人数" prop="count">
                    <i-input style="width:200px" v-model="planInfo.count" disabled/>
                </FormItem>
                <FormItem label="体检时间" prop="time">
                    <DatePicker type="datetimerange" format="yyyy/MM/dd HH:mm"
                                v-model="planInfo.time" style="width: 220px">
                    </DatePicker>
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
    import {datetimeformatFromString} from '../../../../libs/dateUtils';

    export default {
        name: 'setSchedule',
        props: ['id', 'title', 'flag','code'],
        data() {
            return {
                obj: {
                    year: null,
                    type: '',
                    dep_id: '',
                    code: '',
                },
                tableData: [],
                hospitalList: [],
                columns: [
                    {
                        title: '序号',
                        width: 60,
                        type: 'index',
                        align: 'center',
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
                        key: 'count',
                        width: 60
                    },
                    {
                        title: '体检时间',
                        width: 200,
                        render: (h, params) => {
                            if (params.row.exam_start_long && params.row.exam_end_long) {
                                return h('span', null, datetimeformatFromString(new Date(params.row.exam_start_long)) + '-' + datetimeformatFromString(new Date(params.row.exam_end_long)));
                            } else {
                                return '';
                            }
                        }
                    },
                    {
                        title: '操作',
                        width: 80,
                        render: (h, params) => {
                            return h('span', {
                                attrs: {
                                    class: 'editBtn'
                                },
                                on: {
                                    click: () => {
                                        this.edit(params.index, params.row);
                                    }
                                }
                            }, [
                                h('span', {
                                    style: {
                                        position: 'relative',
                                        top: '-4px'
                                    }
                                }, '编辑')
                            ]);
                        }
                    }
                ],
                columns1: [
                    {
                        title: '序号',
                        width: 60,
                        type: 'index',
                        align: 'center',
                    },
                    {
                        title: '学校',
                        key: 'school_name'
                    },
                    {
                        title: '年级',
                        key: 'grade_name'
                    }, {
                        title: '班级',
                        key: 'class_name'
                    },
                    {
                        title: '人数',
                        key: 'count',
                        width: 60
                    },
                    {
                        title: '体检时间',
                        width: 200,
                        render: (h, params) => {
                            if (params.row.exam_start_long && params.row.exam_end_long) {
                                return h('span', null, datetimeformatFromString(new Date(params.row.exam_start_long)) + '-' + datetimeformatFromString(new Date(params.row.exam_end_long)));

                            } else {
                                return '';
                            }
                        }
                    }
                ],
                addSchoolModal: false,
                rules: {
                    time: [
                        {required: true, message: '请选择体检时间', type: 'array', trigger: 'change'}
                    ]
                },
                index: '',
                planInfo: {
                    id: '',
                    class_no: '',
                    class_name: '',
                    count: '',
                    dep_id: '',
                    school_name: '',
                    grade_no: '',
                    grade_name: '',
                    time: [],
                },
            };
        },
        methods: {
            getSelectCondition(type) {
                /// ===========获取下拉列表查询条件
                this.$ajax({
                    // 学校
                    url: urls.dept_all_list,
                    data: {
                        type: type,
                        status: 1
                    }
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.hospitalList = data.data.filter((item) => {
                                return item.type === type;
                            });
                        } else {
                            this.hospitalList = [];
                        }
                    })
                    .catch(err => {
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
                    if (res.code === 200) {
                        this.obj = {
                            year: new Date(res.data.year, 2, 1),
                            type: res.data.type,
                            dep_id: res.data.dep_id,
                            code: res.data.code
                        };
                        this.tableData = res.data.children;
                    }
                });
            },
            //编辑体检配置相关的学校信息
            edit(index, row) {
                this.index = index;
                this.addSchoolModal = true;
                if (row.exam_end_long && row.exam_start_long) {
                    this.planInfo = {
                        id: row.id,
                        class_no: row.class_no,
                        class_name: row.class_name,
                        count: row.count,
                        dep_id: row.dep_id,
                        school_name: row.school_name,
                        grade_no: row.grade_no,
                        grade_name: row.grade_name,
                        time: [new Date(row.exam_start_long), new Date(row.exam_end_long)],
                    };
                } else {
                    this.planInfo = {
                        id: row.id,
                        class_no: row.class_no,
                        class_name: row.class_name,
                        count: row.count,
                        dep_id: row.dep_id,
                        school_name: row.school_name,
                        grade_no: row.grade_no,
                        grade_name: row.grade_name,
                        time: [],
                    };
                }
            },
            confirms() {
                this.$refs['obj'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交！');
                        return false;
                    }
                    for(let i = 0,len = this.tableData.length;i < len;i++){
                        if(!this.tableData[i].exam_start || !this.tableData[i].exam_end){
                           this.$Message.error('体检时间不能为空');
                            return false;
                        }
                    }
                    let data = this.tableData.map(item => {
                        return {
                            id: item.id,
                            exam_start: new Date(item.exam_start).getTime(),
                            exam_end: new Date(item.exam_end).getTime()
                        }
                    });

                    this.$ajax({
                        url: urls.media_plan,
                        data:data
                    }).then(json => {
                        if (json.code === 200) {
                            this.$Message.success('排程成功');
                            this.$emit('modal-close', true);
                        } else {
                            this.$Message.error(json.error);
                        }
                    }).catch(err => {
                        window.console.log(err);
                    });

                });
            },
            close() {
                this.$emit('modal-close');
            },
            addclose() {
                this.planInfo = {
                    id: '',
                    class_no: '',
                    class_name: '',
                    count: '',
                    dep_id: '',
                    school_name: '',
                    grade_no: '',
                    grade_name: '',
                    time: [],
                };
                this.$refs['plan_info_form'].resetFields();
                this.addSchoolModal = false;
            },
            addconfirms() {
                this.$refs['plan_info_form'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交！');
                        return false;
                    }
                    let data = {
                        id: this.planInfo.id,
                        class_no: this.planInfo.class_no,
                        class_name: this.planInfo.class_name,
                        count: this.planInfo.count,
                        dep_id: this.planInfo.dep_id,
                        school_name: this.planInfo.school_name,
                        grade_no: this.planInfo.grade_no,
                        grade_name: this.planInfo.grade_name,
                        exam_start_long: this.planInfo.time[0].getTime(),
                        exam_end_long: this.planInfo.time[1].getTime()
                    };
                    this.$ajax({
                        url: urls.media_plan,
                        data: {
                            id: data.id,
                            plan_code: this.code,
                            exam_start: data.exam_start_long,
                            exam_end: data.exam_end_long
                        }
                    }).then(json => {
                        if(json.code === 200){
                            this.$Message.success('排程时间设置成功');
                            this.tableData.splice(this.index, 1, data);
                            this.addclose();
                        }else {
                            this.$Message.error('排程时间设置失败');
                        }
                    })

                });
            },
        },
        created() {
            if (this.flag === 1) {
                this.columns = this.columns1;
            }
            this.getSelectCondition(3);
            this.search();
        }
    };
</script>

<style lang="less">
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
</style>