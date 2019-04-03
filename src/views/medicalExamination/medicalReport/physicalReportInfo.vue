<template>
    <div id="physicalReportInfo">
        <Modal
                :title="title"
                :value="true"
                :width="1200"
                class="physicalReportInfo"
                :mask-closable="false"
                @on-cancel="close"
                class-name="vertical-center-modal"
        >
            <div style="position: relative;">
                <Form ref="obj">
                    <Row>
                        <i-col span="4">
                            <FormItem class="first-label" label="学校名称" :label-width="80">
                                <i-input v-model="obj.school_name" :disabled="flag||!is_manage"
                                         style="width: 110px;"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="4">
                            <FormItem label="年级" :label-width="60">
                                <i-input v-model="obj.grade_name" :disabled="flag||!is_manage"
                                         style="width: 110px;"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="3">

                            <FormItem label="班级" :label-width="60">
                                <i-input v-model="obj.class_name" :disabled="flag||!is_manage"
                                         style="width: 60px;"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="3">
                            <FormItem label="姓名" :label-width="60">
                                <i-input v-model="obj.name" :disabled="flag||!is_manage" style="width: 80px;"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="3">
                            <FormItem label="性别" :label-width="60">
                                <i-input v-model="obj.gender" :disabled="flag" style="width: 60px;"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="7">
                            <FormItem label="身份证号" :label-width="80">
                                <i-input v-model="obj.id_num" :disabled="flag" style="width: 240px;"></i-input>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="4">
                            <FormItem class="first-label" label="体检日期" :label-width="80">
                                <i-input v-model="obj.physical_date" :disabled="flag||!is_manage"
                                         style="width: 110px;"></i-input>
                            </FormItem>
                        </i-col>
                        <i-col span="20">
                            <FormItem label="既往病史" class="pad pads" :label-width="60">
                                <i-input v-model="obj.anamnesis" :disabled="flag||!is_manage"
                                         style="width: 870px;"></i-input>
                            </FormItem>
                        </i-col>
                    </Row>
                </Form>
                <div class="reportInfos">
                    <div class="lefts">
                        <h4 class="bodys">形体</h4>
                        <Form inline>
                            <FormItem class="first-label" label="身 高" :label-width="52">
                                <i-input v-model="obj.height" :disabled="flag||!is_manage"
                                         style="width: 90px;"></i-input>
                            </FormItem>
                            <FormItem label="体 重" :label-width="70">
                                <i-input v-model="obj.weight" :disabled="flag||!is_manage"
                                         style="width: 90px;"></i-input>
                            </FormItem>
                        </Form>
                        <h4 class="bodys">体质指数</h4>
                        <Form inline>
                            <FormItem class="first-label" label="BMI" :label-width="52">
                                <i-input v-model="obj.BMI" :disabled="flag||!is_manage"
                                         style="width: 90px;"></i-input>
                            </FormItem>
                        </Form>
                        <h4 class="bodys">生理功能</h4>
                        <Form inline>
                            <FormItem class="first-label" label="收缩压" :label-width="60">
                                <i-input v-model="obj.systolic_pressure" :disabled="flag||!is_manage"
                                         style="width: 90px;"></i-input>
                            </FormItem>
                            <FormItem label="舒张压" :label-width="70">
                                <i-input v-model="obj.bloodPress" :disabled="flag||!is_manage"
                                         style="width: 90px;"></i-input>
                            </FormItem>
                            <FormItem label="脉 搏" :label-width="70">
                                <i-input v-model="obj.pulseBeat" :disabled="flag||!is_manage"
                                         style="width: 90px;"></i-input>
                            </FormItem>
                        </Form>
                        <h4 class="bodys">眼科</h4>
                        <Form inline>
                            <FormItem class="first-label pad" label="右眼视力" :label-width="65">
                                <i-input v-model="obj.right_eye" :disabled="flag||!is_manage"
                                         style="width: 60px;"></i-input>
                            </FormItem>
                            <FormItem label="左眼视力" class="pad" :label-width="70">
                                <i-input v-model="obj.left_eye" :disabled="flag||!is_manage"
                                         style="width: 60px;"></i-input>
                            </FormItem>
                            <FormItem label="右眼矫正视力" :label-width="70">
                                <i-input v-model="obj.shah_eye" :disabled="flag||!is_manage"
                                         style="width: 60px;"></i-input>
                            </FormItem>
                            <FormItem label="左眼矫正视力" :label-width="70">
                                <i-input v-model="obj.conjunctivitis" :disabled="flag||!is_manage"
                                         style="width: 60px;"></i-input>
                            </FormItem>
                            <FormItem class="first-label pad" label="屈光" :label-width="65">
                                <i-input v-model="obj.right_eye" :disabled="flag||!is_manage"
                                         style="width: 60px;"></i-input>
                            </FormItem>
                            <FormItem label="近视" class="pad" :label-width="70">
                                <i-input v-model="obj.left_eye" :disabled="flag||!is_manage"
                                         style="width: 60px;"></i-input>
                            </FormItem>
                            <FormItem label="沙 眼" :label-width="70">
                                <i-input v-model="obj.shah_eye" :disabled="flag||!is_manage"
                                         style="width: 60px;"></i-input>
                            </FormItem>
                            <FormItem label="结膜炎" :label-width="70">
                                <i-input v-model="obj.conjunctivitis" :disabled="flag||!is_manage"
                                         style="width: 60px;"></i-input>
                            </FormItem>
                            <FormItem label="色觉" :label-width="70">
                                <i-input v-model="obj.conjunctivitis" :disabled="flag||!is_manage"
                                         style="width: 60px;"></i-input>
                            </FormItem>
                        </Form>
                        <h4 class="bodys">口腔</h4>
                        <Form inline>
                            <FormItem class="first-label" label="齿    列" :label-width="80">
                                <i-input v-model="obj.systolic_pressure" :disabled="flag||!is_manage"
                                         style="width: 90px;"></i-input>
                            </FormItem>
                            <FormItem label="牙    周" :label-width="80">
                                <i-input v-model="obj.bloodPress" :disabled="flag||!is_manage"
                                         style="width: 90px;"></i-input>
                            </FormItem>
                            <FormItem label="有无龋齿" :label-width="80">
                                <i-input v-model="obj.pulseBeat" :disabled="flag||!is_manage"
                                         style="width: 90px;"></i-input>
                            </FormItem>
                            <FormItem class="first-label" label="龋患牙数" :label-width="80">
                                <i-input v-model="obj.systolic_pressure" :disabled="flag||!is_manage"
                                         style="width: 90px;"></i-input>
                            </FormItem>
                            <FormItem label="龋失牙数" :label-width="80">
                                <i-input v-model="obj.bloodPress" :disabled="flag||!is_manage"
                                         style="width: 90px;"></i-input>
                            </FormItem>
                            <FormItem label="龋补牙数" :label-width="80">
                                <i-input v-model="obj.pulseBeat" :disabled="flag||!is_manage"
                                         style="width: 90px;"></i-input>
                            </FormItem>
                        </Form>
                        <h4 class="bodys">内科</h4>
                        <Form inline>
                            <div>
                                <FormItem class="first-label" label="近期不适症状" :label-width="80"
                                          style="margin-right: 30px!important;">
                                    <i-input v-model="obj.heart" :disabled="flag" style="width: 420px;"></i-input>
                                </FormItem>
                            </div>
                            <FormItem label="心   率" :label-width="80" style="margin-right: 30px!important;">
                                <i-input v-model="obj.liver" :disabled="flag" style="width: 60px;"></i-input>
                            </FormItem>
                            <FormItem label="心脏杂音" :label-width="80" style="margin-right: 30px!important;">
                                <i-input v-model="obj.lung" :disabled="flag" style="width: 60px;"></i-input>
                            </FormItem>
                            <FormItem label="心    律" :label-width="80">
                                <i-input v-model="obj.spleen" :disabled="flag" style="width: 60px;"></i-input>
                            </FormItem>
                            <FormItem label="肺部罗音" :label-width="80" style="margin-right: 30px!important;">
                                <i-input v-model="obj.liver" :disabled="flag" style="width: 60px;"></i-input>
                            </FormItem>
                            <FormItem label="肝" :label-width="80" style="margin-right: 30px!important;">
                                <i-input v-model="obj.lung" :disabled="flag" style="width: 60px;"></i-input>
                            </FormItem>
                            <FormItem label="脾" :label-width="80">
                                <i-input v-model="obj.spleen" :disabled="flag" style="width: 60px;"></i-input>
                            </FormItem>
                        </Form>
                    </div>
                    <div class="rights">
                        <h4 class="bodys">外科</h4>
                        <Form inline>
                            <FormItem class="first-label" label="皮肤" :label-width="50"
                                      style="margin-right: 20px!important;margin-bottom: 6px!important;">
                                <i-input v-model="obj.head" :disabled="flag" style="width: 60px;"></i-input>
                            </FormItem>
                            <FormItem class="first-label" label="头部" :label-width="50"
                                      style="margin-right: 20px!important;margin-bottom: 6px!important;">
                                <i-input v-model="obj.head" :disabled="flag" style="width: 60px;"></i-input>
                            </FormItem>
                            <FormItem label="颈部" :label-width="50"
                                      style="margin-right: 20px!important;margin-bottom: 6px!important;">
                                <i-input v-model="obj.neck" :disabled="flag" style="width: 60px;"></i-input>
                            </FormItem>
                            <FormItem label="脊柱" :label-width="50"
                                      style="margin-right: 20px!important;margin-bottom: 6px!important;">
                                <i-input v-model="obj.brest" :disabled="flag" style="width: 60px;"></i-input>
                            </FormItem>
                            <FormItem label="淋巴结" :label-width="60" style="margin-bottom: 6px!important;">
                                <i-input v-model="obj.spine" :disabled="flag" style="width: 60px;"></i-input>
                            </FormItem>

                            <FormItem class="first-label" label="四肢" :label-width="50"
                                      style="margin-right: 20px!important;">
                                <i-input v-model="obj.arms" :disabled="flag" style="width: 60px;"></i-input>
                            </FormItem>
                            <FormItem label="胸部" :label-width="50" style="margin-right: 20px!important;">
                                <i-input v-model="obj.skin" :disabled="flag" style="width: 60px;"></i-input>
                            </FormItem>
                        </Form>

                        <h4 class="bodys">检验</h4>
                        <Form inline>
                            <FormItem class="first-label" label="肝功能ALT" :label-width="120"
                                      style="margin-right: 30px!important;margin-bottom: 6px!important;">
                                <i-input v-model="obj.tuberculin" :disabled="flag" style="width: 120px;"></i-input>
                            </FormItem>
                            <FormItem label="肝功能TBIL" :label-width="120"
                                      style="margin-right: 30px!important;margin-bottom: 6px!important;">
                                <i-input v-model="obj.hemoglobin" :disabled="flag" style="width: 120px;"></i-input>
                            </FormItem>
                            <FormItem class="first-label" label="血红蛋白" :label-width="120"
                                      style="margin-right: 30px!important;">
                                <i-input v-model="obj.bilirubin" :disabled="flag" style="width: 120px;"></i-input>
                            </FormItem>
                            <FormItem label="结核菌素试验" :label-width="120">
                                <i-input v-model="obj.glutamic_pyruvic" :disabled="flag"
                                         style="width: 120px;"></i-input>
                            </FormItem>
                        </Form>

                        <h4 class="bodys">检查</h4>
                        <Form>
                            <FormItem label="胸部X线检查" :label-width="100">
                                <i-input v-model="obj.prophylactic" :disabled="flag"></i-input>
                            </FormItem>
                        </Form>

                        <h4 class="bodys">需复查项目</h4>
                        <Form>
                            <FormItem :label-width="0">
                                <i-input v-model="obj.prophylactic" :disabled="flag" style="width: 464px;"></i-input>
                            </FormItem>
                        </Form>

                        <h4 class="bodys">本次体检结论</h4>
                        <Form>
                            <FormItem :label-width="0" class="p-content">
                                <p>1、重度视力不良，加强锻炼。睡眠充足，营养均衡，正确佩戴眼镜。</p>
                                <p>2、超重，肥胖；合理饮食，减少能量摄入，加强体育锻炼与户外活动。</p>
                                <p>3、结膜炎(阴性)，请到综合性医院复查，并积极治疗。</p>
                                <p>4、牙周疾病，请到综合性医院，正规口腔医疗机构复查治疗。</p>
                            </FormItem>
                        </Form>
                        <Form>
                            <FormItem label="健康评价" :label-width="80">
                                <i-input v-model="obj.prophylactic" :disabled="flag"></i-input>
                            </FormItem>
                        </Form>
                        <h4 class="bodys">健康指导</h4>
                        <Form class="idea">
                            <FormItem :label-width="0" class="p-content">
                                <p>1、去医院复查排除。</p>
                                <p>2、去医院复查治疗。</p>
                                <p>3、督促小孩改变不良生活习惯，培养良好的用眼、刷牙方式。</p>
                                <p>4、关系小孩良好的饮食习惯，保证早餐，多吃水果，每天喝牛奶和豆制品。</p>
                            </FormItem>
                        </Form>
                    </div>
                </div>
                <span class="sub-tip">苏州市疾病预防控制中心</span>
            </div>
            <div slot="footer">
                <!--<button type="button" class="close" @click='close'>取消</button>-->
                <!--<button type="button" class="confirm" @click='confirms'>保存</button>-->
            </div>
        </Modal>
    </div>
</template>
<script>
    import urls from '../../../service/Urls';

    export default {
        name: 'physicalReportInfo',
        props: ['id', 'title', 'flag'],
        data() {
            return {
                grade_name: '',
                obj: {
                    school_name: '苏州工业园区金鸡湖学校',
                    school_id: '',
                    grade_name: '二年级',
                    grade_id: '',
                    class_name: '三班',
                    classno_id: '',
                    gender: '男',
                    id_num: '321324201008081452',
                    name: '李雷',
                    physical_date: '2018/06/06',
                    anamnesis: '无',
                    height: '148cm',
                    weight: '48kg',
                    BMI: '25',
                    systolic_pressure: '124mmHg',
                    bloodPress: '58mmHg',
                    pulseBeat: '62次/分',
                    left_eye: '4.0',
                    right_eye: '4.0',
                    shah_eye: '阴性',
                    conjunctivitis: '阳性',
                    tooth_week: '牙石',
                    heart: '正常',
                    liver: '正常',
                    lung: '正常',
                    spleen: '正常',
                    head: '正常',
                    neck: '正常',
                    brest: '正常',
                    spine: '正常',
                    arms: '正常',
                    skin: '正常',
                    lymphaden: '正常',
                    tuberculin: '',
                    hemoglobin: '',
                    bilirubin: '',
                    glutamic_pyruvic: '',
                    prophylactic: ''
                },
                rules: {
                    year: [{required: true, type: 'date', message: '请选择学年'}],
                    semester: [{required: true, type: 'number', message: '请选择学期', trigger: 'change'}],
                    school_id: [{required: true, message: '请选择所属学校', trigger: 'change'}],
                    grade_id: [{required: true, message: '请选择所属年级', trigger: 'change'}],
                    name: [{required: true, message: '请输入班级名称', trigger: 'blur'}],
                },
                schoolList: [],
                gradeList: [],
                is_manage: true
            };
        },
        methods: {
            getSelectCondition(type) {
                /// ===========获取下拉列表查询条件
                this.$ajax({
                    /// =========== 学校名称
                    url: urls.unit_opt_list,
                    data: {
                        type: 2,
                        status: 1
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
            schoolChange(value) {
                this.obj.grade_id = '';
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
                for (let index = 0; index < this.gradeList.length; index++) {
                    if (this.gradeList[index].id === value) {
                        this.grade_name = this.gradeList[index].name;
                        break;
                    }
                }
            },
            search() {
                this.$ajax({
                    url: urls.elec_get_one,
                    data: {
                        id: this.id
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.schoolChange(data.data.school_id);
                        this.obj = {
                            year: new Date(data.data.year, 5, 0),
                            semester: data.data.semester,
                            school_id: data.data.school_id,
                            grade_id: data.data.grade_id,
                            name: data.data.name
                        };
                        this.grade_name = data.data.grade;
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            confirms() {
                console.log(this.obj);
                this.$refs['obj'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交！');
                        return false;
                    }
                    let data;
                    if (this.id) { // 编辑
                        this.$ajax({
                            url: urls.class_edit,
                            data: {
                                id: this.id,
                                year: this.obj.year.getFullYear(),
                                semester: this.obj.semester,
                                school_id: this.obj.school_id,
                                grade_id: this.obj.grade_id,
                                name: this.obj.name
                            }
                        }).then(json => {
                            if (json.code === 200) {
                                this.$Message.success('修改' + this.grade_name + '年级' + this.obj.name + '班级成功');
                                this.$emit('modal-close', true);
                            } else {
                                this.$Message.error(json.error);
                            }
                        }).catch(err => {
                            window.console.log(err);
                        });
                    } else { //新增
                        data = {
                            year: this.obj.year.getFullYear(),
                            semester: this.obj.semester,
                            school_id: this.obj.school_id,
                            grade_id: this.obj.grade_id,
                            name: this.obj.name
                        };
                        this.$ajax({
                            url: urls.class_add,
                            data: data
                        }).then(json => {
                            if (json.code === 200) {
                                this.$Message.success('新增' + this.obj.name + '班级成功');
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
            if (window.localStorage.getItem('is_roles')) {
                this.is_manage = false;

                let type = window.localStorage.getItem('type');
                if (type === '1') {
                    // this.getSelectCondition(1);
                } else if (type === '2') {
                    // this.getSelectCondition(2);
                } else if (type === '3') {
                    // this.getSelectCondition(3);
                } else if (type === '4') {
                    // this.getSelectCondition(4);
                } else {
                    // this.getSelectCondition(2);
                }
            } else {
                // this.getSelectCondition(2);
            }
            this.search();
        }
    };
</script>
<style lang="less">
    .physicalReportInfo {
        .ivu-modal-body {
            position: relative;
            height: 600px;
            overflow-y: auto;
        }
        .sub-tip {
            position: absolute;
            bottom: -20px;
            right: 31px;
            font-size: 14px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(0, 0, 0, 1);
        }
        .ivu-form {
            .ivu-input {
                border-radius: 0;
            }
            .ivu-form-item-label {
                font-size: 14px;
                font-family: SourceHanSansCN-Regular;
                font-weight: 400;
                color: rgba(126, 132, 133, 1);
            }
            .first-label .ivu-form-item-label {
                text-align: left;
            }
            .ivu-form-item {
                margin-right: 0 !important;
                margin-bottom: 10px !important;
            }
        }
        .reportInfos .ivu-form .ivu-form-item {
            margin-bottom: 20px !important;
        }
        .pad .ivu-form-item-label {
            padding-top: 2px;
            padding-bottom: 0;
        }
        .pads .ivu-form-item-label {
            padding-left: 10px;
        }
        .reportInfos {
            display: flex;
            .lefts, .rights {
                width: 572px;
            }
            .rights {
                padding-left: 20px;
            }
            .bodys {
                font-size: 20px;
                margin-bottom: 12px;
                font-family: SourceHanSansCN-Medium;
                font-weight: 500;
                color: rgba(0, 0, 0, 1);
            }
            .permanent {
                display: flex;
                .per-left {
                    > div {
                        display: flex;
                        align-items: stretch;
                        width: 180px;
                        padding-top: 10px;
                        line-height: 1.2;
                    }

                    .s1 {
                        width: 40px;
                        font-size: 14px;
                        font-family: SourceHanSansCN-Regular;
                        font-weight: 400;
                        color: rgba(126, 132, 133, 1);
                    }
                    .s2 {
                        width: 140px;
                    }
                }
                .per-right {
                    width: 380px;
                    display: flex;
                    padding-left: 10px;
                    flex-wrap: wrap;
                    .items {
                        width: 20px;
                        height: 34px;
                        margin: 0 2px 2px 0;
                        background: rgba(233, 240, 242, 1);
                        border: 1px solid rgba(221, 229, 231, 1);
                        text-align: center;
                    }
                }
            }
            .p-content {
                p {
                    font-size: 14px;
                    font-family: SourceHanSansCN-Regular;
                    font-weight: 400;
                    color: rgba(0, 0, 0, 1);
                    line-height: 20px;
                }
            }
            .idea {
                .squ {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    background: rgba(233, 240, 242, 1);
                    border: 1px solid rgba(221, 229, 231, 1);
                }
                .data {
                    margin-left: 14px;
                    position: relative;
                    top: -6px;
                }
            }
        }

        .ivu-modal-footer {
            border: none;
            padding: 0 38px 34px;
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

