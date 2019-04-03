<template>
    <div>
        <Modal
                :title="title"
                :value="true"
                :width="400"
                class="addFile"
                :mask-closable="false"
                @on-cancel="close"
                class-name="vertical-center-modal"
        >
            <Form ref="obj" :model="obj" :rules="rules" label-position="left" :label-width="100">
                <FormItem label="学校名称" prop="dep_id">
                    <i-select v-model="obj.dep_id" style="width:200px">
                        <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="上传文件">
                    <label id="uplable" for="files">
                        <span style="font-size: 14px;">选择文件</span>
                        <input type="file" id="files" ref="file" @change="select">
                    </label><br>
                    <span>{{name}}</span>
                    <!--<Upload ref="upload"-->
                            <!--:action="importUrl"-->
                            <!--:on-success="imp"-->
                            <!--:before-upload="beforeUpload"-->
                            <!--:headers="header"-->
                            <!--name="uploadFile"-->
                            <!--:data="updata"-->
                            <!--:format="['xls','xlsx']"-->
                            <!--:show-upload-list="false"-->
                            <!--:on-format-error="formatErr">-->
                        <!--&lt;!&ndash;<span style="font-size: 16px;">选择文件</span>&ndash;&gt;-->
                        <!--<Button style="background: #67A19E;color: #fff;">选择文件</Button>-->
                    <!--</Upload>-->
                </FormItem>

            </Form>
            <div slot="footer">
                <button type="button" class="close" @click='close'>取消</button>
                <button type="button" class="confirm" @click='confirms'>导入</button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import urls from '../../../service/Urls';
    import axios from 'axios';

    export default {
        name: 'addFile',
        props: ['id', 'title', 'flag'],
        data() {
            return {
                importUrl: urls.teacher_up,
                name: '',
                schoolList: [],
                header: {
                    'auth_token': sessionStorage.getItem('token')
                },

                obj: {
                    dep_id: ''
                },
                rules:{
                    dep_id: [{required: true, message: '请选择学校名称', trigger: 'change'}],
                },
                updata: {
                    dep_id: ''
                }
            };
        },
        methods: {
            getSelectCondition(type) {
                /// ===========获取下拉列表查询条件
                this.$ajax({
                    /// =========== 学校名称
                    url: urls.dept_all_list,
                    data: {
                        type: 2,
                        status: 1
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.schoolList = data.data.filter(function (item) {
                            return item.type === 2;
                        });
                    } else {
                        this.schoolList = [];
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            beforeUpload() {
                if (!this.obj.dep_id) {
                    this.$Message.error('请选择学校');
                    return false;
                } else {
                    this.updata.dep_id = this.obj.dep_id;
                }
            },
            select() {
                var file = this.$refs.file.files[0];
                if (file) {
                    this.name = file.name;
                }else {
                    this.name = '';
                }
            },
            // formatErr() {
            //     this.$Message.error('请上传excel类型的文件');
            // },
            // imp(res, file, fileList) {
            //     if (res.code === 200) {
            //         this.$Message.success('导入成功');
            //         this.$emit('modal-close', true);
            //     } else {
            //         this.$Message.error(res.error);
            //     }
            // },
            confirms() {
                this.$refs['obj'].validate(valid => {
                    if (!valid) {
                        self.$Message.error('还有必填项字段未填，请确认后再提交！');
                        return false;
                    }
                    var file = this.$refs.file.files[0];
                    if (file) {
                        let arr = file.name.split('.');
                        if (arr[arr.length - 1] !== 'xls' && arr[arr.length - 1] !== 'xlsx') {
                            this.$Message.error('请上传excel类型的文件');
                            return false;
                        }
                    }else {
                        this.$Message.error('请选择excel类型的文件');
                        return false;
                    }
                    let form = new FormData();
                    form.append('dep_id', this.obj.dep_id);
                    form.append('uploadFile', file);
                    axios.post(this.importUrl, form, {
                        headers: {
                            'auth_token': sessionStorage.getItem('token'),
                            'content-type': undefined
                        },
                        timeout: 10000,
                    }).then(data => data.data).then(data => {
                        if(data.code === 200){
                            this.$Message.error('导入成功');
                            this.$emit('modal-close', true);
                        }else {
                            this.$Message.error(data.error);
                        }
                    }).catch(() => {
                        this.$Message.error('导入失败');
                    });
                })
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
    #uplable{
        position: relative;
        display: inline-block;
        width: 100px;
        height: 34px;
        padding: 5px 15px 6px;
        line-height: 23px;
        font-size: 12px;
        border-radius: 4px;
        font-weight: 400;
        text-align: center;
        touch-action: manipulation;
        background-image: none;
        white-space: nowrap;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        transition: color .2s linear,background-color .2s linear,border .2s linear,box-shadow .2s linear;
        background-color: #FF7B10 !important;
        color: #FEFEFE !important;
        border-color: #FF7B10 !important;
        cursor: pointer;
        #files{
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
            clip: rect(1px,1px,1px,1px);
        }
    }
</style>