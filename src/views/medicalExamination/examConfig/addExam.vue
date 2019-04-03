<template>
    <div>
        <Modal
                :title='title'
                :value="true"
                :loading="loading"
                :mask-closable="false"
                :styles="{top: '140px',width:'800px'}"
                ok-text="保存"
                @on-ok="submit()"
        >
            <Form inline :model="addFormData" label-position="top" class="modal-form">
                <FormItem label="体检项" style="margin-right: 90px!important;">
                    <i-input v-model.trim="addFormData.item" readonly style="width:310px;"></i-input>
                </FormItem>
                <FormItem label="参考值类型" style="margin-right: 30px !important;">
                    <i-input style="width:140px;" v-model.trim="addFormData.type" readonly></i-input>
                </FormItem>
                <FormItem label="单位" style="margin-right: 0 !important;">
                    <i-input style="width:140px;" v-model.trim="addFormData.unit" readonly></i-input>
                </FormItem>
            </Form>
            <div class="btn-box" style="margin: 6px">
                <div class="action-btn" @click="addItem">
                    <img style="margin: 8px 6px;" src="../../../assets/common/add.png" alt="add"/>
                    新增
                </div>
            </div>
            <Table ref="selection1" :columns="item_List_Columns" :data="item_List" height="300"
                   style="margin-bottom: 40px;"></Table>
        </Modal>
        <Modal
                title="新增"
                :mask="false"
                v-model="addmostModal"
                :width="562"
                @close="addclose"
                @on-ok="addItemToTable()"
        >
            <Form inline :model="mostAddFormData" ref="mostformInline" :rules="AddformRule" label-position="top"
                  class="modal-form">
                <FormItem label="年龄" prop="age">
                    <i-select style="width:200px" v-model="mostAddFormData.age">
                        <Option value="4">4</Option>
                        <Option value="5">5</Option>
                        <Option value="6">6</Option>
                        <Option value="7">7</Option>
                        <Option value="8">8</Option>
                        <Option value="9">9</Option>
                        <Option value="10">10</Option>
                        <Option value="11">11</Option>
                        <Option value="12">12</Option>
                        <Option value="13">13</Option>
                        <Option value="14">14</Option>
                        <Option value="15">15</Option>
                        <Option value="16">16</Option>
                        <Option value="17">17</Option>
                        <Option value="18">18</Option>
                    </i-select>
                </FormItem>
                <FormItem label="性别" prop="gender">
                    <i-select style="width:200px" v-model="mostAddFormData.gender">
                        <Option :value="1">男</Option>
                        <Option :value="2">女</Option>
                    </i-select>
                </FormItem>
                <FormItem label="下限" prop="normal_low">
                    <i-input v-model.trim="mostAddFormData.normal_low" style="width:200px;"/>
                </FormItem>
                <FormItem label="上限" prop="normal_up">
                    <i-input style="width:200px" v-model.trim="mostAddFormData.normal_up"/>
                </FormItem>
            </Form>
            <div slot="footer">
                <button type="button" class="close" @click='addclose'>取消</button>
                <button type="button" class="confirm" @click='addItemToTable'>保存</button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: 'addExam',
        props: ['id', 'title', 'flag'],
        data(){
            return {
                loading: true,
                addmostloading: true,
                bigmodal_title: '设定正常值范围',

                addmostModal: false,
                item_List_Columns: [],
                //弹框的表格
                item_List: [],
                addFormData: {
                    isnormal: '',
                    unit: '',
                    item: '',
                    type: '',
                    set_id: ''
                },
                mostAddFormData: {
                    age: '',
                    gender: '',
                    normal_low: '',
                    normal_up: '',
                },
                //最小弹窗的验证
                AddformRule: {
                    age: [{required: true, message: '请选择年龄', trigger: 'change'}],
                    gender: [{required: true, type: 'number', message: '请选择性别', trigger: 'change'}],
                    normal_low: [{required: true, message: '请填写最小限制', trigger: 'blur'}],
                    normal_up: [{required: true, message: '请填写最大限制', trigger: 'blur'}],
                },
                modal: false,
            }
        },
        methods: {
            addItem() {
                this.$refs['mostformInline'].resetFields();
                this.addmostModal = true;
            },
            addclose() {
                this.addmostModal = false;
            },
            addItemToTable() {
                this.$refs['mostformInline'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交!');
                        return false;
                    }
                    this.mostAddFormData.gender_name = (this.mostAddFormData.gender === 1 ? '男' : '女');
                    if (this.addFormData.isnormal === 'normal') {
                        this.item_List.push({
                            age: this.mostAddFormData.age,
                            gender: this.mostAddFormData.gender,
                            gender_name: this.mostAddFormData.gender_name,
                            normal_low: this.mostAddFormData.normal_low,
                            normal_up: this.mostAddFormData.normal_up,
                        });
                    } else {
                        this.item_List.push({
                            age: this.mostAddFormData.age,
                            gender: this.mostAddFormData.gender,
                            gender_name: this.mostAddFormData.gender_name,
                            abnormal_up: this.mostAddFormData.normal_up,
                            abnormal_low: this.mostAddFormData.normal_low,
                        })
                    }
                    this.addmostModal = false;
                });
            },
            //从表格中删除数据
            Itemdelete(para) {
                this.$confirm({
                    text: '是否删除此项参数？',
                    onOk: () => {
                        this.item_List.splice(para.index, 1);
                    },
                    cancel: () => {
                        this.$Message({
                            type: 'info',
                            message: '已取消'
                        });
                    }
                });
            },
            //提交数据
            submit() {
                this.loading = false;
                this.$nextTick(() => {
                    this.loading = true;
                });
                let that = this;
                let physicallimit = [];
                let ajaxurl = '';
                //如果是正常值
                if (this.addFormData.isnormal === 'normal') {
                    physicallimit = this.item_List.map(function (item) {
                        return {
                            'set_id': that.addFormData.set_id,
                            'gender': parseInt(item.gender),
                            'age': parseInt(item.age),
                            'normal_low': item.normal_low,
                            'normal_up': item.normal_up
                        };
                    });
                    ajaxurl = Urls.examination_config_add;
                }
                //复测值
                else {
                    physicallimit = this.item_List.map(function (item) {
                        return {
                            'set_id': that.addFormData.set_id,
                            'gender': parseInt(item.gender),
                            'age': parseInt(item.age),
                            'abnormal_low': item.abnormal_low,
                            'abnormal_up': item.abnormal_up
                        };
                    });
                    ajaxurl = Urls.examination_retest_add;
                }
                this.$ajax({
                    url: ajaxurl,
                    data: {
                        'physicallimit': physicallimit,
                        'set_id': that.addFormData.set_id
                    }
                }).then((data) => {
                    if (data.code === 200) {
                        this.$Message.success(data.result);
                        this.modal = false;
                    } else {
                        this.$Message.error(data.error);
                    }
                });
            },
        }
    };
</script>

<style scoped>

</style>