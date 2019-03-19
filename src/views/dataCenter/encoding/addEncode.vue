<template>
    <div>
        <!-- 新增修改 -->
        <Modal
                class="encodingAddModal addEncode"
                :title="title"
                :value="true"
                :mask-closable="false"
                width='644'
                class-name="vertical-center-modal"
                @on-cancel="close">
            <Form ref="addFormValidate" :model="addForm" label-position="top" :rules="addFormValidate">
                <Row>
                    <Col span="12" class="leftFormItem">
                        <FormItem label="前缀" prop="prefix">
                            <Input v-model.trim="addForm.prefix" class="prefix" :disabled="flag"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12" class="rightFormItem">
                        <FormItem label="备注">
                            <Input v-model.trim="addForm.remark" type="textarea" :disabled="flag"/>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div class="footer" name="footer">
                <div v-show="!flag">
                    <button type="button" class="close" @click='close'>取消</button>
                    <button type="button" class="confirm" @click='confirm'>保存</button>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: 'addEncode',
        props: ['id', 'title', 'flag', 'pa'],
        data() {
            return {
                addFormValidate: {
                    prefix: [
                        {required: true, message: '请输入前缀', trigger: 'blur'},
                    ],
                },
                addForm: {
                    prefix: '',
                    remark: ''
                }
            };
        },
        methods: {
            confirm() {
                this.$refs['addFormValidate'].validate((valid) => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交！');
                        return false;
                    }
                    if(this.id){
                        // this.data[this.editRowIndex].prefix = this.addForm.prefix;
                        // this.data[this.editRowIndex].remark = this.addForm.remark;
                    }else {
                        // this.data.push({
                        //     prefix: this.addForm.prefix,
                        //     startNum: '1',
                        //     endNum: '9999',
                        //     currentNum: '0001',
                        //     remark: this.addForm.remark,
                        //     status: 1
                        // });
                    }
                    this.$emit('modal-close',true,this.addForm);
                    this.$Message.success('操作成功!');
                });
            },
            close() {
                this.$emit('modal-close');
            }
        },
        created() {
            if(this.id){
                this.addForm  ={
                    prefix: this.pa.prefix,
                    remark: this.pa.remark
                };
                console.log(this.addForm);
            }
        }

    };
</script>

<style lang="less">
    .addEncode{
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
