<template>
    <div>
        <Modal
                :title="title"
                :value="true"
                :width="644"
                :mask-closable="false"
                class="medicalModal"
                @on-cancel="close"
                class-name="vertical-center-modal"
        >
            <Form ref="obj" :model="obj" :rules="rules" inline label-position="top">
                <FormItem label="医疗机构执业许可证(登记号)" prop="licence" style="margin-left: 40px">
                    <i-input v-model.trim="obj.licence" :maxlength="15" style="width: 222px" placeholder="请输入"></i-input>
                </FormItem>
                 <FormItem label="医疗机构名称" prop="name">
                    <i-input v-model.trim="obj.name" :maxlength="20" style="width: 222px" placeholder="请输入"></i-input>
                </FormItem>
                <FormItem label="性质" prop="nature" style="margin-left: 40px">
                    <i-select v-model="obj.nature" style="width:222px">
                        <i-option v-for="item of natureList" :key="item.id" :value='item.id'>{{item.value}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="所在区域" prop="area_id1">
                    <i-select v-model="obj.area_id1" style="width:110px;" @on-change="areaChange">
                        <i-option v-for="item of areaList1" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                    <i-select v-model="obj.area_id2" style="width:110px;">
                        <i-option v-for="item of areaList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="详细地址" prop="location" style="margin-left: 40px">
                    <i-input v-model.trim="obj.location" :maxlength="10" style="width: 488px" placeholder="请输入"></i-input>
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
        name: 'AddMedical',
        props: ['id', 'title'],
        data() {
            return {
                obj: {
                    licence: '',
                    name: '',
                    nature: '',
                    area_id1: '',
                    area_id2: '',
                    location: ''
                },
                rules: {
                    licence: [{required: true, message: '请输入医疗机构职业许可证(登记号)', trigger: 'blur'},
                        {pattern: /^[0-9]{1,15}$/, message: '医疗机构职业许可证(登记号)为数值类型', trigger: 'blur'}],
                    name: [{required: true, message: '请输入医疗机构名称', trigger: 'blur'}],
                    nature: [{required: true, message: '请选择性质', trigger: 'change'}],
                    area_id1: [{required: true, message: '请选择所在区域', trigger: 'change'}],
                    location: [{required: true, message: '请输入详细地址', trigger: 'blur'}]
                },
                areaList: [],
                areaList1: [],
                natureList: []
            };
        },
        methods: {
            getSelectCondition() {
                /// ===========获取下拉列表查询条件
                this.$ajax({ // 性质
                    url: urls.dictm_all_list,
                    data: {
                        "category_id": "81D5B0F79E0F4C83E050007F010062EE",
                        "status": 1
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.natureList = data.data;
                    } else {
                        this.natureList = [];
                    }
                }).catch(err => {
                    this.natureList = [];
                });

                this.$ajax({ // 区域
                    url: urls.area_all_list,
                    data: {
                        // "type": 2,
                        // "status": 1
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.areaList1 = data.data.filter(function (item) {
                            return item.type === 2;
                        });
                    } else {
                        this.areaList1 = [];
                    }
                }).catch(err => {
                    this.areaList1 = [];
                });
            },
            areaChange(value){
                this.obj.area_id2 = '';
                this.$ajax({ // 区
                    url: urls.area_all_list,
                    data: {
                        // "type": 3,
                        // "pid":value,
                        // "status": 1
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.areaList = data.data.filter(function (item) {
                            return item.type === 3 && item.pid === value;
                        });
                    } else {
                        this.areaList = [];
                    }
                }).catch(err => {
                    this.areaList = [];
                });
            },
            getArea(value){
                this.$ajax({ // 性质
                    url: urls.area_all_list,
                    data: {
                        // "type": 3,
                        // "status": 1
                    }
                }).then(data => {
                    if (data.code === 200) {
                        for(var i = 0;i < data.data.length;i++){
                            if(data.data[i].id === value){
                                this.obj.area_id1 = data.data[i].pid;
                                break;
                            }
                        }
                        this.areaList = data.data.filter((item) => {
                            return item.pid === this.obj.area_id1 && item.type === 3;
                        })
                    } else {
                        this.areaList = [];
                    }
                }).catch(err => {
                    this.areaList = [];
                });
            },
            search() {
                this.$ajax({
                    url: urls.dept_info,
                    data: {
                        id: this.id
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.getArea(data.data.area_id);
                        this.obj = {
                            licence: data.data.licence,
                            name: data.data.name,
                            nature: data.data.nature,
                            area_id1: '',
                            area_id2: data.data.area_id,
                            location: data.data.location
                        };
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
                    if(!this.obj.area_id2){
                        this.$Message.error('所在区域请选择完整！');
                        return false;
                    }
                    let data;
                    if (this.id) { // 编辑
                        data = {
                            id: this.id,
                            licence: this.obj.licence,
                            name: this.obj.name,
                            nature: this.obj.nature,
                            area_id: this.obj.area_id2,
                            location: this.obj.location,
                            type: 3
                        };
                        this.$ajax({
                            url: urls.dept_edit,
                            data: data
                        }).then(json => {
                            if (json.code === 200) {
                                this.$Message.success('编辑' + data.name + '医疗机构成功');
                                this.$emit('modal-close', true);
                            } else {
                                this.$Message.error(json.error);
                            }
                        }).catch(err => {
                            window.console.log(err);
                        });
                    } else { //新增
                        data = {
                            name: this.obj.name,
                            licence: this.obj.licence,
                            code: this.obj.code,
                            nature: this.obj.nature,
                            area_id: this.obj.area_id2,
                            location: this.obj.location,
                            type: 3
                        };
                        this.$ajax({
                            url: urls.dept_add,
                            data: data
                        }).then(json => {
                            if (json.code === 200) {
                                this.$Message.success('新增' + data.name + '医疗机构成功');
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
            if (this.id) { //编辑
                this.search();
            }
        }
    };
</script>
<style lang="less">
    .medicalModal {
        .ivu-modal-footer {
            border: none;
            padding: 0 38px 34px;
        }
        .ivu-modal-body {
            height: 300px;
            padding-top: 35px;
            .ivu-form-item-label {
                color: #333 !important;
            }
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
