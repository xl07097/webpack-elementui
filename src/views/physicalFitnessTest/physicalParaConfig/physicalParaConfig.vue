<template>
    <div class="content-box">
        <div class="title">体测项目参考值配置</div>
        <Table :columns="columns" :data="tableData" :height="720"></Table>
        <Modal
                :title='test_title'
                v-model="test_modal"
                :loading="test_loading"
                :mask-closable="false"
                :width="800"
                ok-text="保存"
                @on-ok="testsubmit()"
                @on-cancel="testClose"
        >
            <Form inline :model="test" label-position="top" class="modal-form">
                <FormItem label="体检项" style="margin-right: 90px!important;">
                    <Input v-model="test.item" readonly style="width:310px;"/>
                </FormItem>
                <FormItem label="参考值类型" style="margin-right: 30px !important;">
                    <Input style="width:140px;" v-model="test.type" readonly/>
                </FormItem>
                <FormItem label="单位" style="margin-right: 0 !important;">
                    <Input style="width:140px;" v-model="test.unit" readonly/>
                </FormItem>
            </Form>
            <div class="btn-box" style="margin: 6px">
                <div class="action-btn" @click="addItem">
                    <img style="margin: 8px 6px;" src="../../../assets/common/add.png"/>
                    新增
                </div>
            </div>
            <Table :columns="test_List_Columns" :data="test_List_Data" size="small" height="300"
                   style="margin-bottom: 40px;"></Table>
        </Modal>
        <div class="transparent-mask" v-show="addtestModal">

        </div>
        <Modal
                title="新增"
                :mask="false"
                :loading="addtestloading"
                v-model="addtestModal"
                :styles="{top: '300px',width:'562px'}"
                @on-ok="addtestToTable()"
                @on-cancel="addtestModalClose"
                ok-text="添加"
        >
            <Form inline :model="addtestData" ref="addtestformInlie" :rules="addtestformRule" label-position="top"
                  class="modal-form">
                <FormItem label="年级" prop="grade_id">
                    <Select style="width:200px" v-model="addtestData.grade_id" :label-in-value="true" filterable
                            @on-change="v=>{ setGradeName(v)}">
                        <Option v-for="item in gradeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="性别" prop="gender">
                    <Select style="width:200px" v-model="addtestData.gender">
                        <Option value="0">女</Option>
                        <Option value="1">男</Option>
                    </Select>
                </FormItem>
                <FormItem label="下限" prop="lower" class="ivu-form-item-required">
                    <Input v-model="addtestData.lower" style="width:200px;"/>
                </FormItem>
                <FormItem label="上限" prop="upper" class="ivu-form-item-required">
                    <Input style="width:200px" v-model="addtestData.upper"/>
                </FormItem>
                <FormItem :label=labelTitle prop="score" v-show="score_show" class="ivu-form-item-required">
                    <Input style="width:200px" v-model="addtestData.score"/>
                </FormItem>
            </Form>
        </Modal>
        <!---->
    </div>
</template>
<script>
    import Urls from '../../../service/Urls';

    export default {
        name: 'physicalParaConfig',
        data() {
            const validatelower = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请填写最小限制'));
                } else {
                    if (isNaN(value)) {
                        callback(new Error('请输入数字'));
                    } else {
                        callback();
                    }
                }
            };
            const validateupper = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请填写最大限制'));
                } else {
                    if (isNaN(value)) {
                        callback(new Error('请输入数字'));
                    } else {
                        callback();
                    }
                }
            };
            const validatescore = (rule, value, callback) => {
                if (this.type == 3 || (this.type == 4)) {
                    if (!value) {
                        callback(new Error('请填写分数'));
                    } else {
                        if (isNaN(value)) {
                            callback(new Error('请输入数字'));
                        } else {
                            if (Number(value > 100)) {
                                callback(new Error('百分制最大上限为100，请核对分数'));
                            } else {
                                callback();
                            }
                        }
                    }
                } else {
                    callback();
                }
            };
            return {
                labelTitle: '',
                columns: [
                    {
                        title: '体测项',
                        key: 'name',
                        align: 'center',
                    }, {
                        title: '结果数据',
                        key: 'content',
                        render: (h, params) => {
                            return h('div', [
                                h('div', {
                                    style: {
                                        lineheight: '20px',
                                    }
                                }, [h('p', params.row.content.split('@')[0])]),
                                h('div', {
                                    style: {
                                        lineheight: '20px',
                                    }
                                }, [h('p', params.row.content.split('@')[1])])
                            ]);
                        },
                    },
                    {
                        title: '操作',
                        key: 'operator',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('span', {
                                    attrs: {
                                        class: 'editBtn'
                                    },
                                    on: {
                                        click: () => {
                                            this.operate(params.row, 1);
                                        }
                                    }
                                }, [
                                    h('img', {
                                        style: {
                                            marginRight: '5px'
                                        },
                                        attrs: {
                                            src: require('../../../assets/medicalExamination/reference_normal.png')
                                        }
                                    }),
                                    h('span', {
                                        style: {
                                            position: 'relative',
                                            top: '-4px'
                                        }
                                    }, '逻辑检验界值')
                                ]),
                                h('span', {
                                    attrs: {
                                        class: 'editBtn'
                                    },
                                    style: {
                                        marginRight: '20px'
                                    },
                                    on: {
                                        click: () => {
                                            this.operate(params.row, 2);
                                        }
                                    }
                                }, [
                                    h('img', {
                                        style: {
                                            marginRight: '5px'
                                        },
                                        attrs: {
                                            src: require('../../../assets/medicalExamination/reference_retest.png')
                                        }
                                    }),
                                    h('span', {
                                        style: {
                                            position: 'relative',
                                            top: '-4px'
                                        }
                                    }, '复测参考值')
                                ]),
                                h('span', {
                                    attrs: {
                                        class: 'editBtn'
                                    },
                                    on: {
                                        click: () => {
                                            this.operate(params.row, 3);
                                        }
                                    }
                                }, [
                                    h('img', {
                                        style: {
                                            marginRight: '5px'
                                        },
                                        attrs: {
                                            src: require('../../../assets/common/standard_score.png')
                                        }
                                    }),
                                    h('span', {
                                        style: {
                                            position: 'relative',
                                            top: '-4px'
                                        }
                                    }, '得分标准')
                                ]),
                                h('span', {
                                    attrs: {
                                        class: 'editBtn'
                                    },
                                    on: {
                                        click: () => {
                                            this.operate(params.row, 4);
                                        }
                                    }
                                }, [
                                    h('img', {
                                        style: {
                                            marginRight: '5px'
                                        },
                                        attrs: {
                                            src: require('../../../assets/common/awarded_marks.png')
                                        }
                                    }),
                                    h('span', {
                                        style: {
                                            position: 'relative',
                                            top: '-4px'
                                        }
                                    }, '加分标准')
                                ]),
                            ]);
                        }
                    }],
                tableData: [],
                gradeList: [],
                //   分数modal
                test_title: '',
                test_modal: false,
                test_loading: true,
                type: 0,
                test: {},
                test_List_Columns: [],
                test_List_Data: [],
                addtestloading: true,
                addtestModal: false,
                score_show: false,
                addtestData: {},
                selectGradeName: '',
                addtestformRule: {
                    grade_id: [{required: true, message: '请选择年级', trigger: 'change'}],
                    gender: [{required: true, message: '请选择性别', trigger: 'change'}],
                    lower: [{validator: validatelower, trigger: 'blur'}],
                    upper: [{validator: validateupper, trigger: 'blur'}],
                    score: [{validator: validatescore, trigger: 'blur'}]
                },
            };
        },
        methods: {
            search() {
                this.$ajax({
                    url: Urls.elecPhysical_Para_list,
                    data: {}
                }).then((data) => {
                    if (data.code === 200) {
                        this.tableData = data.data;
                    } else {
                        this.$Message.error(data.error);
                    }
                }).catch(() => {
                    this.$Message.error('获取列表失败，请重试');
                });

            },
            //操作
            operate(row, type) {
                this.test.item = row.name;
                this.test.unit = row.unit;
                this.test.set_id = row.id;
                this.type = type;
                if (type == 1) {
                    this.test.type = '逻辑检验界值';
                    this.test_title = '逻辑检验界值';
                    this.score_show = false;
                    this.test_List_Columns = [
                        {
                            title: '序号',
                            width: 60,
                            align: 'center',
                            render: (h, params) => {
                                return h('span', params.index + 1);
                            }
                        }, {
                            title: '年级',
                            key: 'grade_name'
                        }, {
                            title: '性别',
                            key: 'gender',
                            render: (h, params) => {
                                return h('span', params.row.gender === 1 ? '男' : '女');
                            }
                        }, {
                            title: '下限',
                            key: 'lower'
                        }, {
                            title: '上限',
                            key: 'upper',
                        }, {
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
                                            this.Itemdelete(params.row);
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
                    ];
                }
                if (type == 2) {
                    this.test.type = '复测参考值';
                    this.test_title = '复测参考值';
                    this.score_show = false;
                    this.test_List_Columns = [
                        {
                            title: '序号',
                            width: 60,
                            align: 'center',
                            render: (h, params) => {
                                return h('span', params.index + 1);
                            }
                        }, {
                            title: '年级',
                            key: 'grade_name'
                        }, {
                            title: '性别',
                            key: 'gender',
                            render: (h, params) => {
                                return h('span', params.row.gender === 1 ? '男' : '女');
                            }
                        }, {
                            title: '下限',
                            key: 'lower'
                        }, {
                            title: '上限',
                            key: 'upper',
                        }, {
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
                                            this.Itemdelete(params.row);
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
                    ];
                }
                if (type == 3) {
                    this.test.type = '得分标准';
                    this.test_title = '得分标准';
                    this.score_show = true;
                    this.labelTitle = '得分';
                    this.test_List_Columns = [
                        {
                            title: '序号',
                            width: 60,
                            align: 'center',
                            render: (h, params) => {
                                return h('span', params.index + 1);
                            }
                        }, {
                            title: '年级',
                            key: 'grade_name'
                        }, {
                            title: '性别',
                            key: 'gender',
                            render: (h, params) => {
                                return h('span', params.row.gender === 1 ? '男' : '女');
                            }
                        },
                        {
                            title: '得分',
                            key: 'score'
                        }, {
                            title: '下限',
                            key: 'lower'
                        }, {
                            title: '上限',
                            key: 'upper',
                        }, {
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
                                            this.Itemdelete(params.row);
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
                    ];
                }
                if (type == 4) {
                    this.test.type = '加分标准';
                    this.test_title = '加分标准';
                    this.score_show = true;
                    this.labelTitle = '加分';
                    this.test_List_Columns = [
                        {
                            title: '序号',
                            width: 60,
                            align: 'center',
                            render: (h, params) => {
                                return h('span', params.index + 1);
                            }
                        }, {
                            title: '年级',
                            key: 'grade_name'
                        }, {
                            title: '性别',
                            key: 'gender',
                            render: (h, params) => {
                                return h('span', params.row.gender === 1 ? '男' : '女');
                            }
                        }, {
                            title: '加分',
                            key: 'score'
                        }, {
                            title: '下限',
                            key: 'lower'
                        }, {
                            title: '上限',
                            key: 'upper',
                        }, {
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
                                            this.Itemdelete(params.row);
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
                    ];
                }
                this.getSetInfo(row.id, type.toString());
                this.test_modal = true;
            },
            //分数提交
            testsubmit() {
                this.test_loading = false;
                this.$nextTick(() => {
                    this.test_loading = true;
                });
                this.$ajax({ // 年级列表
                    url: Urls.elecPhysical_Para_edit,
                    data: {'paramConfigList': this.test_List_Data}
                }).then(data => {
                    if (data.code === 200) {
                        this.$Message.success('修改成功');
                        this.test_modal = false;
                    } else {
                        this.$Message.error(data.error);
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            addItem() {
                this.addtestModal = true;
            },
            //添加数据到表格
            addtestToTable() {
                this.addtestloading = false;
                this.$nextTick(() => {
                    this.addtestloading = true;
                });
                this.$refs['addtestformInlie'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交!');
                        return false;
                    }
                    if (Number(this.addtestData.lower) > Number(this.addtestData.upper)) {
                        this.$Message.error('下限数值应小于上限数值!');
                        return false;
                    }
                    let obj = {};
                    obj.gender = parseInt(this.addtestData.gender);
                    obj.grade_id = this.addtestData.grade_id;
                    obj.set_id = this.test.set_id;
                    obj.grade_name = this.selectGradeName;
                    obj.upper = Number(this.addtestData.upper);
                    obj.lower = Number(this.addtestData.lower);
                    obj.unit = this.test.unit;
                    obj.type = this.type;
                    if (this.type == 3 || this.type == 4) {
                        obj.score = Number(this.addtestData.score);
                    }
                    this.test_List_Data.push(obj);
                    this.addtestModal = false;
                    this.$refs.addtestformInlie.resetFields();
                    this.addtestData.score = '';
                });
            },
            //从表格中删除
            Itemdelete(para) {
                let messageWarning = '确认要删除吗？';
                this.$confirm({
                    text: messageWarning,
                    onOk: () => {
                        this.test_List_Data.splice(para._index, 1);
                    },
                    cancel: () => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    }
                });
            },
            testClose() {
                this.addtestModal = false;
            },
            addtestModalClose() {
                this.$refs.addtestformInlie.resetFields();
            },
            getGradeSelect() {
                this.$ajax({ // 年级列表
                    url: Urls.grade_all_list,
                    data: {
                        id: '7B887312F9CCE3FEE050007F01001BDF'
                    }
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.gradeList = data.data;
                        } else {
                            this.gradeList = [];
                        }
                    })

                    .catch(err => {
                        window.console.log(err);
                    });
            },
            setGradeName(item) {
                if (item) {
                    this.selectGradeName = item.label;
                }
            },
            getSetInfo(id, type) {
                this.$ajax({ // 年级列表
                    url: Urls.elecPhysical_Para_info,
                    data: {
                        set_id: id,
                        type: Number(type)
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.test_List_Data = data.data;
                    } else {
                        this.test_List_Data = [];
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            }
        },
        mounted() {
            this.search();
            // this.getGradeSelect();
        }
    };
</script>

<style lang="less" scoped>
    .content-box {
        padding: 30px 44px;
    }

    .title {
        height: 26px;
        line-height: 26px;
        color: #333333;
        margin-bottom: 50px;
        font-size: 26px;
        font-weight: bold;
    }

    .table-result {
        display: inline-block;
        line-height: 20px;
        width: 100%;
    }
</style>
