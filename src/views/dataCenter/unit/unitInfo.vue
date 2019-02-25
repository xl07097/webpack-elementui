<template>
    <div class="unit">
        <h3 class="title">单位信息管理</h3>
        <div class="wrapper">
            <div class="inner">
                <div class="left">
                    <div class="left-tree">
                        <i-input v-model="keyword" @on-change="getLeftTree" style="position: relative;z-index: 100;" :maxlength="10"></i-input>
                        <div class="tree">
                            <Tree :data="treeData" @on-select-change='treeSelectChange'></Tree>
                        </div>

                    </div>
                </div>
                <div class="right">
                    <div class="right-table">
                        <div class="operator">
                            <a href="javascript:void(0)" @click="add">
                                <img src="../../../assets/unit/add.png" alt="add">&nbsp;新增
                            </a>
                            <!--<a href="javascript:void(0)" @click="info">-->
                            <!--<img src="../../../assets/unit/info.png" alt="add">&nbsp;详情-->
                            <!--</a>-->
                            <a href="javascript:void(0)" @click="edit">
                                <img src="../../../assets/unit/edit.png" alt="add">&nbsp;编辑
                            </a>
                            <i-switch @on-change="statusChange" v-model="switchValue"></i-switch>
                            <span>{{switchValue?'启用':'禁用'}}</span>
                        </div>
                        <div class="forms">
                            <div class="contents">
                                <h3>{{operatorTitle}}</h3>
                                <Form class="form" ref="obj" :model="obj" :rules="rules" inline
                                      label-position="top">
                                    <FormItem label="单位代号" prop="code">
                                        <i-input v-model.trim="obj.code" :maxlength="15" placeholder="请输入"
                                                 style="width:140px" :disabled="disabled"></i-input>
                                    </FormItem>
                                    <FormItem label="单位名称" prop="name">
                                        <i-input v-model.trim="obj.name" :maxlength="15" placeholder="请输入"
                                                 :disabled="disabled" style="width:322px"></i-input>
                                    </FormItem>
                                    <FormItem label="系统类别" prop="sys_type">
                                        <i-select v-model="obj.sys_type" placeholder="请选择" :disabled="disabled"
                                                  style="width:140px" @on-change="sysChange">
                                            <i-option v-for="item of sysType" :key="item.id" :value="item.id">
                                                {{item.name}}
                                            </i-option>
                                        </i-select>
                                    </FormItem>
                                    <FormItem label="上级单位" prop="pid">
                                        <i-select v-model="obj.pid" placeholder="请选择" :disabled="disabled"
                                                  style="width:140px">
                                            <i-option v-for="item of pnameList" :key="item.id" :value="item.id">
                                                {{item.name}}
                                            </i-option>
                                        </i-select>
                                    </FormItem>
                                    <FormItem label="单位类型" prop="type">
                                        <i-select v-model="obj.type" placeholder="请选择" :disabled="disabled"
                                                  style="width:140px" @on-change="unitChange">
                                            <i-option v-for="item of unitList" :key="item.id" :value="item.id">
                                                {{item.name}}
                                            </i-option>
                                        </i-select>
                                    </FormItem>
                                    <FormItem label="学校代码" prop="school_code" v-if="flag">
                                        <i-input v-model.trim="obj.school_code" :maxlength="10" placeholder="请输入"
                                                 :disabled="disabled" style="width:140px"></i-input>
                                    </FormItem>
                                    <FormItem label="学校性质" prop="nature" v-if="flag">
                                        <i-select v-model="obj.nature" placeholder="请选择" style="width:140px"
                                                  :disabled="disabled">
                                            <i-option :value="1">公办</i-option>
                                            <i-option :value="2">民办</i-option>
                                        </i-select>
                                    </FormItem>
                                    <FormItem label="是否直属" prop="directly_under" v-if="flag">
                                        <i-select v-model="obj.directly_under" placeholder="请选择" style="width:140px"
                                                  :disabled="disabled">
                                            <i-option :value="1">直属</i-option>
                                            <i-option :value="2">非直属</i-option>
                                        </i-select>
                                    </FormItem>
                                    <FormItem label="年级类型" prop="grades" v-if="flag">
                                        <i-select v-model="obj.grades" multiple placeholder="请选择"
                                                  :disabled="disabled"
                                                  style="width:506px">
                                            <i-option v-for="item of gradeList" :key="item.id" :value="item.id">
                                                {{item.name}}
                                            </i-option>
                                        </i-select>
                                    </FormItem>
                                    <FormItem label="所在区域" prop="area_id">
                                        <i-select v-model="obj.area_id" placeholder="请选择" style="width:140px"
                                                  :disabled="disabled">
                                            <i-option v-for="item of areaList" :key="item.id" :value="item.id">
                                                {{item.name}}
                                            </i-option>
                                        </i-select>
                                    </FormItem>
                                    <FormItem label="地址">
                                        <i-input v-model.trim="obj.location" :maxlength="20" placeholder="请输入"
                                                 style="width:322px" :disabled="disabled"></i-input>
                                    </FormItem>

                                    <div class="btnArea" v-show="btnFlag">
                                        <i-button type='default' @click='close'>取消</i-button>
                                        <i-button type="primary" @click='confirms'>保存</i-button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable no-unused-vars */

    import urls from '../../../service/Urls';

    export default {
        name: 'UnitInfo',
        data() {
            return {
                operatorTitle: '详情',
                keyword: null,
                obj: {
                    code: '',
                    name: '',
                    sys_type: '',
                    pid: '',
                    type: '',
                    school_code: '',
                    nature: 1,
                    area_id: '',
                    grades: [],
                    directly_under: 1,
                    location: ''
                },
                backObj: {},
                rules: {
                    code: [{required: true, message: '单位代号字段不可为空', trigger: 'blur'}],
                    name: [{required: true, message: '单位名称字段不可为空', trigger: 'blur'}],
                    sys_type: [{required: true, type: 'number', message: '系统类别字段不可为空', trigger: 'change'}],
                    pid: [{required: true, message: '上级单位字段不可为空', trigger: 'change'}],
                    type: [{required: true, type: 'number', message: '单位类型字段不可为空', trigger: 'change'}],
                    school_code: [
                        {required: true, message: '学校代码字段不可为空', trigger: 'blur'},
                        {pattern: /^[0-9]{10}$/, message: '学校代码应为10位数字', trigger: 'blur'}
                    ],
                    directly_under: [{required: true, type: 'number', message: '是否直属字段不可为空', trigger: 'change'}],
                    nature: [{required: true, type: 'number', message: '学校性质字段不可为空', trigger: 'change'}],
                    grades: [{required: true, type: 'array', message: '年级类型字段不可为空', trigger: 'change'}],
                    area_id: [{required: true, message: '所在区域字段不可为空', trigger: 'change'}],
                },
                treeData: [],
                gradeList: [], // 年级
                pnameList: [], //
                sysType: [
                    {
                        id: 1,
                        name: '教育系统'
                    },
                    {
                        id: 2,
                        name: '卫生系统'
                    },
                    {
                        id: 3,
                        name: '体育系统'
                    }
                ],
                unitList: [],
                areaList: [],
                switchValue: true,
                btnFlag: false, // 按钮是否可见
                id: '', // 选中左侧树时临时保存id
                name: '',
                disabled: true, // 是否可编辑
                flag: false // 选择单位类型时
            };
        },
        methods: {
            getSelectCondition() {
                /// ===========获取下拉列表查询条件
                this.$ajax({ // 区域列表
                    url: urls.area_list,
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.areaList = data.data;
                        } else {
                            this.areaList = [];
                        }
                    })
                    .catch(err => {
                        window.console.log(err);
                    });

                this.$ajax({ // 年级列表
                    url: urls.grade_all_list,
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
            getallUnit(value) {
                this.$ajax({  //所有单位
                    url: urls.unit_all_list,
                    data: {
                        sys_type: value
                    }
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.pnameList = data.data;
                        } else {
                            this.pnameList = [];
                        }
                        if (!this.disabled) {
                            this.backObj = {};
                        } else {
                            this.obj = {
                                code: this.backObj.code,
                                name: this.backObj.name,
                                sys_type: this.backObj.sys_type,
                                pid: this.backObj.pid,
                                type: this.backObj.type,
                                school_code: this.backObj.school_code,
                                nature: this.backObj.nature,
                                area_id: this.backObj.area_id,
                                grades: this.backObj.grades,
                                directly_under: this.backObj.directly_under,
                                location: this.backObj.location,
                            };
                        }

                    })
                    .catch(err => {
                        window.console.log(err);
                    });
            },
            getLeftTree() {
                this.$ajax({
                    url: urls.unit_tree,
                    data: {
                        keyword: this.keyword
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.treeData = this.recurveData(data.data);
                    }

                }).catch(err => {
                    window.console.log(err);
                });
            },
            add() {
                this.disabled = false;
                this.operatorTitle = '新增';
                this.id = '';
                this.switchValue = true;
                this.$refs['obj'].resetFields();
                this.obj = {
                    code: '',
                    name: '',
                    sys_type: '',
                    pid: '',
                    type: '',
                    school_code: '',
                    nature: 1,
                    area_id: '',
                    grades: [],
                    directly_under: 1,
                    location: ''
                };
                this.btnFlag = true;
            },
            edit() {
                if (!this.id) {
                    this.$Message.error('请选择一个数据');
                    this.switchValue = true;
                    this.operatorTitle = '编辑';
                    this.disabled = true;
                    this.btnFlag = false;
                } else {
                    this.operatorTitle = '编辑';
                    this.disabled = false;
                    this.btnFlag = true;
                }
            },
            info() {
                if (!this.id) {
                    this.$Message.error('请选择一个单位');
                    return false;
                }
                this.operatorTitle = '编辑';
                this.disabled = true;
                this.btnFlag = false;
            },
            sysChange(value) { // 系统类别
                if (!this.disabled) {
                    this.obj.pid = '';
                    this.obj.type = '';
                }

                this.getallUnit(value);
                if (value === 1) { // 教育系统
                    this.unitList = [{
                        id: 1,
                        name: '教育局'
                    }, {
                        id: 2,
                        name: '学校'
                    }];
                } else if (value === 3) { // 体育系统
                    this.unitList = [{
                        id: 4,
                        name: '管理单位'
                    }];
                } else if (value === 2) { // 卫生系统
                    this.unitList = [{
                        id: 4,
                        name: '管理单位'
                    }, {
                        id: 3,
                        name: '医院'
                    }];
                }
            },
            unitChange(value) {
                this.flag = false;
                for (var index = 0; index < this.unitList.length; index++) {
                    if (value === this.unitList[index].id && this.unitList[index].name === '学校') {
                        this.flag = true;
                        break;
                    }
                }
            },
            statusChange(status) {
                if (!this.id) {
                    this.$Message.error('请选择一个数据');
                    setTimeout(() => {
                        this.switchValue = true;
                    }, 100);
                    return false;
                }
                let data = {};
                let text = '', msg1 = '', msg2 = '';
                if (status === false) {
                    data.status = 2;
                    text = '确定禁用该单位？';
                    msg1 = '禁用' + this.name + '单位成功';
                    msg2 = '禁用' + this.name + '单位失败';
                } else {
                    data.status = 1;
                    text = '确定启用该单位？';
                    msg1 = '启用' + this.name + '单位成功';
                    msg2 = '启用' + this.name + '单位失败';
                }
                let self = this;
                this.$confirm({
                    text: text,
                    onOk: function () {
                        self
                            .$ajax({
                                url: urls.unit_status,
                                data: {
                                    id: self.id,
                                    status: data.status
                                }
                            })
                            .then(json => {
                                if (json.code === 200) {
                                    self.$Message.success(msg1);
                                } else {
                                    self.switchValue = !status;
                                    self.$Message.error(json.error);
                                }
                            })
                            .catch(() => {
                                self.switchValue = !status;
                                self.$Message.error(msg2);
                            });
                    },
                    cancel: function () {
                        self.switchValue = true;
                    }
                });
            },
            recurveData(data) {
                return data.map(item => {
                    if (item.children && item.children.length) {
                        let chi = this.recurveData(item.children);
                        if (item.status === 2) {
                            return {
                                id: item.id,
                                pid: item.pid,
                                title: item.name,
                                expand: true,
                                status: item.status,
                                children: chi
                            };
                        }
                        return {
                            id: item.id,
                            pid: item.pid,
                            title: item.name,
                            expand: true,
                            status: item.status,
                            children: chi
                        };
                    }
                    if (item.status === 2) {
                        return {
                            id: item.id,
                            pid: item.pid,
                            title: item.name,
                            status: item.status,
                            expand: true,
                        };
                    }
                    return {
                        id: item.id,
                        pid: item.pid,
                        title: item.name,
                        status: item.status,
                        expand: true,
                    };
                });
            },
            treeSelectChange(row) {
                this.btnFlag = false;
                this.disabled = true;
                this.operatorTitle = '详情';
                if (!row.length) {
                    this.backObj = {};
                    // this.obj = {};
                    if (!Object.keys(this.obj).length) {
                        this.$refs['obj'].resetFields();
                    }

                    return false;
                }
                if (row[0].title === '教育系统' || row[0].title === '卫生系统' || row[0].title === '体育系统' || !row[0].pid) {
                    this.backObj = {};
                    this.obj = {};
                    this.$refs['obj'].resetFields();
                    return false;
                }
                // this.$refs['obj'].resetFields();
                this.id = row[0].id;
                this.name = row[0].title;
                this.search();
            },
            search() {
                this.$ajax({
                    url: urls.unit_info,
                    data: {
                        id: this.id
                    }
                }).then(json => {
                    if (json.code === 200) {
                        this.sysChange(json.data.sys_type);
                        this.unitChange(json.data.type);
                        this.backObj = {
                            code: json.data.code,
                            name: json.data.name,
                            sys_type: json.data.sys_type,
                            pid: json.data.pid,
                            type: json.data.type,
                            school_code: json.data.school_code,
                            nature: Number(json.data.nature),
                            area_id: json.data.area_id,
                            grades: json.data.grades ? json.data.grades.split(',') : [],
                            directly_under: json.data.directly_under,
                            location: json.data.location,
                        };
                        this.switchValue = json.data.status === 1;
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            renderContent(h, {root, node, data}) {
                return h('span', {
                        style: {
                            display: 'inline-block'
                        }
                    },
                    [
                        h('Icon', {
                            props: {
                                type: 'ios-paper-outline'
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h('span', {
                            attrs: {
                                class: 'ivu-tree-title'
                            },
                            on: {
                                click: () => {
                                    this.treeSelectChange(node);
                                }
                            }
                        }, data.title)
                    ]
                );
            },
            confirms() {
                this.$refs['obj'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交！');
                        return false;
                    }
                    let data;
                    if (this.flag) {
                        data = {
                            code: this.obj.code,
                            name: this.obj.name,
                            sys_type: this.obj.sys_type,
                            pid: this.obj.pid,
                            type: this.obj.type,
                            school_code: this.obj.school_code,
                            nature: this.obj.nature,
                            area_id: this.obj.area_id,
                            grades: this.obj.grades.join(','),
                            directly_under: this.obj.directly_under,
                            location: this.obj.location,
                        };
                    } else {
                        data = {
                            code: this.obj.code,
                            name: this.obj.name,
                            sys_type: this.obj.sys_type,
                            pid: this.obj.pid,
                            type: this.obj.type,
                            school_code: '',
                            grades: '',
                            area_id: this.obj.area_id,
                            location: this.obj.location,
                        };
                    }

                    if (this.id) {
                        data.id = this.id;
                        this.$ajax({
                            url: urls.unit_edit,
                            data: data
                        })
                            .then(json => {
                                if (json.code === 200) {
                                    this.$Message.success('编辑' + data.name + '单位成功');
                                    this.getLeftTree(this.keyword);
                                    this.obj = {};
                                    this.$refs['obj'].resetFields();
                                } else {
                                    this.$Message.error(json.error);
                                }
                            })
                            .catch(err => {
                                window.console.log(err);
                            });
                    } else {
                        this.$ajax({
                            url: urls.unit_add,
                            data: data
                        })
                            .then(json => {
                                if (json.code === 200) {
                                    this.$Message.success('新增' + data.name + '单位成功');
                                    this.getLeftTree(this.keyword);
                                    this.obj = {};
                                    this.$refs['obj'].resetFields();
                                } else {
                                    this.$Message.error(json.error);
                                }
                            })
                            .catch(err => {
                                window.console.log(err);
                            });
                    }
                });
            },
            close() {
                this.disabled = false;
                this.$refs['obj'].resetFields();
                this.obj = {
                    code: '',
                    name: '',
                    sys_type: '',
                    pid: '',
                    type: '',
                    school_code: '',
                    nature: 1,
                    area_id: '',
                    grades: [],
                    directly_under: 1,
                    location: ''
                };
            }
        },
        created() {
            this.getSelectCondition();
            this.getLeftTree();
        }
    };
</script>

<style lang="less">
    .unit {
        position: relative;
        padding: 39px 48px 21px 43px;
        height: 100%;
        /*background: rgba(252, 255, 254, 1);*/
        border-radius: 8px;
        .title {
            position: relative;
            font-size: 26px;
            line-height: 1;
            font-family: SourceHanSansCN-Bold;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
            z-index: 100;
        }
        .wrapper {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            padding: 119px 48px 21px 43px;
            box-sizing: border-box;
        }
        .inner {
            display: flex;
            align-items: stretch;
            height: 100%;
            .left {
                width: 290px;
                .left-tree {
                    position: relative;
                    height: 100%;
                    padding: 10px 10px 20px 10px;
                    background: rgba(247, 250, 250, 1);
                    border: 1px solid rgba(222, 226, 225, 1);
                    border-radius: 2px 0 0 2px;
                    .tree {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        padding: 74px 10px 20px;

                    }
                    .ivu-tree {
                        height: 100%;
                        overflow-y: auto;
                    }
                    .ivu-tree-arrow {
                        position: relative;
                        top: 2px;
                    }
                    .ivu-tree-title-selected, .ivu-tree-title-selected:hover {
                        background-color: transparent;
                        color: #FF7200;
                    }
                    .ivu-tree-title {
                        padding: 4px 8px;
                        &:hover {
                            background-color: transparent;
                            color: #FF7200;
                        }
                    }
                    .ivu-tree-children > li {
                        overflow-x: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }
            .right {
                flex: 1;
                padding-left: 15px;
                box-sizing: border-box;
                .right-table {
                    position: relative;
                    height: 100%;
                    .operator {
                        position: relative;
                        z-index: 100;
                        margin-bottom: 15px;
                        a {
                            margin-right: 40px;
                            font-size: 16px;
                            font-family: SourceHanSansCN-Regular;
                            font-weight: 400;
                            color: rgba(39, 55, 60, 1);
                            &:hover {
                                opacity: 0.8;
                            }
                        }
                        img {
                            position: relative;
                            top: 4px;
                        }
                    }
                }
                .forms {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    padding-top: 43px;
                }
                .contents {
                    height: 100%;
                    padding-bottom: 20px;
                    overflow-y: auto;
                    border: 1px solid rgba(222, 226, 225, 1);
                    border-radius: 4px;
                    h3 {
                        margin: 28px 0 33px 29px;
                        font-size: 20px;
                        font-family: SourceHanSansCN-Medium;
                        font-weight: 500;
                        color: rgba(51, 51, 51, 1);
                    }
                    .form {
                        width: 550px;
                        margin-left: 25%;
                    }
                    .btnArea {
                        text-align: right;
                        margin-right: 45px;
                        button {
                            width: 70px;
                            height: 30px;
                            margin-left: 28px;
                            font-size: 16px;
                            font-family: SourceHanSansCN-Regular;
                            font-weight: 400;
                            border-radius: 4px;
                            line-height: 1;
                        }
                    }
                }

            }
        }
        .ivu-select-disabled .ivu-select-selection,
        .ivu-input[disabled],
        fieldset[disabled] .ivu-input {
            color: #515a6e;
        }
    }
</style>
