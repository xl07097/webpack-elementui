<template>
    <div>
        <Modal
                title="导入"
                :value="true"
                :width="644"
                :mask-closable="false"
                class="importStudent"
                @on-cancel="close"
                class-name="vertical-center-modal"
        >
            <i-form
                    ref="obj"
                    :model="obj"
                    :rules="rules" inline :label-width="100" style="text-align: center;">
                <FormItem label="学校" prop="dep_id">
                    <i-select v-model="obj.dep_id" style="width:200px;text-align: left;" @on-change="schoolChange">
                        <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <br>
                <!--<FormItem label="学年" prop="year">-->
                    <!--<DatePicker type="year" format="yyyy" @on-change="gradeChange" v-model.trim="obj.year"-->
                                <!--style="width: 200px;text-align: left;"-->
                                <!--placeholder="请选择"></DatePicker>-->
                <!--</FormItem>-->
                <FormItem label="学期" prop="term">
                    <i-select v-model="obj.term" style="width:200px;text-align: left;">
                        <i-option :value='1'>第一学期</i-option>
                        <i-option :value='2'>第二学期</i-option>
                    </i-select>
                </FormItem>
                <br>
                <FormItem label="年级" prop="grade_no">
                    <i-select v-model="obj.grade_no" style="width:200px;text-align: left;">
                        <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.value}}</i-option>
                    </i-select>
                </FormItem>
                <br>
                <FormItem label="上传文件">
                    <div style="display: inline-block;width: 200px;text-align: left;">
                        <label for="files" class="ivu-btn ivu-btn-primary clicklabel ">
                            <span>选择文件</span>
                            <input ref="afile" @change="fileChange" type="file" id="files">
                        </label><br>
                        <span>{{name}}</span>
                    </div>
                </FormItem>
            </i-form>

            <div slot="footer">
                <div>
                    <button type="button" class="close" @click='close'>取消</button>
                    <button type="button" class="confirm" @click='confirms'>确定</button>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
    import urls from '../../../service/Urls'
    import axios from 'axios';
    export default {
        name: 'importStudent',
        props: ['id', 'title', 'flag'],
        data(){
            return {
                obj:{
                    dep: '',
                    year: '',
                    term: '',
                    grade_no: '',
                    class_no: ''
                },
                rules: {
                    dep_id: [{required: true, message: '请选择学校名称', trigger: 'change'}],
                    year: [{required: true, type: 'date', message: '请选择学年', trigger: 'blur'}],
                    term: [{required: true, type: 'number', message: '请选择学期', trigger: 'change'}],
                    grade_no: [{required: true, message: '请选择所属年级', trigger: 'change'}],
                    class_no: [{required: true, message: '请输入班级名称', trigger: 'change'}]
                },
                name: '',
                schoolList: [],
                gradeList: [],
                classList: []
            }
        },
        methods: {
            getSelectCondition() {
                this.$ajax({
                    // 学校
                    url: urls.dept_all_list,
                    data: {
                        type: 2,
                        status: 1
                    }
                })
                    .then(data => {
                        if (data.code === 200) {
                            this.schoolList = data.data.filter((item)=>{
                                return item.type === 2
                            });
                        } else {
                            this.schoolList = [];
                        }
                    })
                    .catch(err => {
                        window.console.log(err);
                    });
            },
            schoolChange(value) {
                this.obj.grade_no = '';
                this.obj.class_no = '';
                this.classList = [];
                /// =========== 所属年级
                this.$ajax({
                    url: urls.dictm_all_list,
                    data: {
                        'category_id': '82649A1FDF4DEA7EE050007F01001901',
                        'status': 1
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.gradeList = data.data;
                    } else {
                        this.gradeList = [];
                    }
                }).catch(err => {
                    this.natureList = [];
                });
            },
            gradeChange(value) {
                this.obj.class_no = '';
                if (!this.obj.grade_no) {
                    return;
                }
                this.$ajax({
                    url: urls.class_all_lists,
                    data: {
                        dep_id: this.obj.dep_id,
                        term: this.obj.term ? this.obj.term : null,
                        year: this.obj.year ? this.obj.year.getFullYear() : null,
                        grade_no: this.obj.grade_no ? this.obj.grade_no : null
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.classList = data.data;
                    } else {
                        this.classList = [];
                    }
                });
            },
            fileChange(){
              let file = this.$refs.afile;
              if(file.files[0]){
                  this.name = file.files[0].name;
              }else {
                  this.name = '';
              }
            },
            confirms(){
                this.$refs['obj'].validate(valid => {
                    if (!valid) {
                        self.$Message.error('还有必填项字段未填，请确认后再提交！');
                        return false;
                    }
                    let file = this.$refs.afile;
                    if(file.files[0]){
                        let arr = file.files[0].name.split('.');
                        let ext = arr[arr.length -1];
                        if(ext !== 'xls' && ext !== 'xlsx'){
                            this.$Message.error('请选择excel文件');
                            this.$refs.afile.value = '';
                            return false;
                        }
                        if(file.files[0].size / 1024 /1024 > 1){
                            this.$Message.error('文件大小应小于1M');
                            this.$refs.afile.value = '';
                            return false;
                        }
                        this.name = file.files[0].name;
                    }else {
                        this.$Message.error('请选择excel类型的文件');
                        return false;
                    }
                    let form = new FormData();
                    form.append('uploadFile', this.$refs.afile.files[0]);
                    form.append('dep_id', this.obj.dep_id);
                    // form.append('year', this.obj.year.getFullYear());
                    form.append('term', this.obj.term);
                    form.append('grade_no', this.obj.grade_no);
                    axios.post(urls.class_import, form, {
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
                });
            },
            close(){
                this.$emit('modal-close');
            }
        },
        created() {
            this.getSelectCondition();
        }
    };
</script>

<style lang="less">
    .importStudent{
        .clicklabel{
            width: 100px;
            height: 34px;
            line-height: 34px;
            display: inline-block;
            text-align: center;
            cursor: pointer;
        }
        #files{
            display: none;
        }
    }
</style>