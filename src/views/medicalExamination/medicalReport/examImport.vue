<template>
    <div class="content-box exports">
        <div class="title">体检数据批量导出</div>
        <Divider dashed/>
        <div class="form-main">
            <div class="rows">
                <label>所属区域</label>
                <i-select v-model="req.area_id1" style="width:150px;" @on-change="areaChange">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of areaList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                </i-select>
                <i-select v-model="req.area_id2" style="width:150px;">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of areaList1" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                </i-select>

                <label style="margin-left: 80px">学校名称</label>
                <i-select style="width:300px" v-model="req.dep_id" @on-change="schoolChange">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                </i-select>
            </div>
            <div class="rows">
                <label>学年</label>
                <i-select v-model="req.year" style="width:304px" @on-change="gradeChange">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of yearList" :key="item.value" :value='item.value'>{{item.name}}</i-option>
                </i-select>

                <label style="margin-left: 80px">学期</label>
                <i-select v-model="req.term" style="width:300px" @on-change="gradeChange">
                    <Option value="-1">全部</Option>
                    <Option :value="1">第一学期</Option>
                    <Option :value="2">第二学期</Option>
                </i-select>
            </div>
            <div class="rows">
                <label>年级-班级</label>
                <i-select v-model="req.grade_no" style="width:150px;" @on-change="gradeChange">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.value}}</i-option>
                </i-select>
                <i-select v-model="req.class_no" style="width:150px;">
                    <i-option value="-1">全部</i-option>
                    <i-option v-for="item of classList" :key="item.id" :value='item.id'>{{item.class_no}}</i-option>
                </i-select>
            </div>

            <Button type="primary" class="search-btn" @click="search" style="float: right">导入</Button>
        </div>
    </div>
</template>
<script>
    import urls from '../../../service/Urls';

    export default {
        name: 'schoolImport',
        data() {
            return {
                req: {
                    area_id1: '-1',
                    area_id2: '-1',
                    dep_id: '-1',
                    year: '-1',
                    term: '-1',
                    grade_no: '-1',
                    class_no: '-1',
                },
                areaList: [],
                areaList1: [],
                schoolList: [],
                yearList: [],
                gradeList: [],
                classList: [],
            };
        },
        methods: {
            getSelectCondition(type) {
                let start = 2018;
                let today = new Date().getFullYear();
                let m = today - start;
                let temp = [];
                for (let i = 0; i <= m; i++) {
                    temp.push({
                        value: `${start + i}-${start + i + 1}`,
                        name: `${start + i}-${start + i + 1}`
                    });
                }
                this.yearList = temp.reverse();
                this.$ajax({ // 性质
                    url: urls.area_all_list,
                    data: {}
                }).then(data => {
                    if (data.code === 200) {
                        this.areaList = data.data.filter((item) => {
                            return item.type === 2;
                        });
                    } else {
                        this.areaList = [];
                    }
                }).catch(err => {
                    this.areaList = [];
                });
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
                            this.schoolList = data.data.filter((item) => {
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
            search() {

            },
            areaChange(value) {
                this.req.area_id2 = '';
                this.$ajax({ // 区
                    url: urls.area_all_list,
                    data: {}
                }).then(data => {
                    if (data.code === 200) {
                        this.areaList1 = data.data.filter(function (item) {
                            return item.type === 3 && item.pid === value;
                        });
                    } else {
                        this.areaList1 = [];
                    }
                }).catch(err => {
                    this.areaList1 = [];
                });
            },
            schoolChange(value) {
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
                    this.gradeList = [];
                });
            },
            gradeChange(value) {
                this.$ajax({
                    url: urls.class_all_lists,
                    data: {
                        dep_id: this.req.dep_id,
                        term: this.req.term ? this.req.term : null,
                        year: this.req.year ? this.req.year.getFullYear() : null,
                        grade_no: this.req.grade_no ? this.req.grade_no : null
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.classList = data.data;
                    } else {
                        this.classList = [];
                    }
                });
            },
        },
        created() {
            this.getSelectCondition();
        }
    };
</script>
<style lang="scss">
    .exports {
        padding: 30px 44px;
        min-height: 500px;
        border-radius: 8px;

        .title {
            height: 80px;
            font-size: 26px;
            line-height: 1;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
        }

        .operator {
            float: right;
            margin-bottom: 15px;
            text-align: right;
        }

        .search-btn {
            width: 100px;
            height: 40px;
            line-height: 1;
            font-size: 14px;
            font-family: SourceHanSansCN-Medium;
            font-weight: 500;
            color: rgb(254, 254, 254);
            background: rgba(255, 123, 16, 1);
            border-radius: 3px;
            border: none;
        }

        .search-btn:hover {
            opacity: 0.8;
        }

        .ivu-divider {
            margin: 0 0 24px 0;
        }

        .add {
            margin-bottom: 12px;
            display: inline-block;
            font-size: 16px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(39, 55, 60, 1);

            &:hover {
                opacity: 0.8;
            }

            img {
                position: relative;
                top: 4px;
            }
        }


        .form-main {
            width: 950px;
            height: 500px;
            margin: 112px auto auto;
        }

        .rows {
            margin-bottom: 60px;
        }

        .form-main label {
            display: inline-block;
            width: 120px;
            color: #999999;
            font-size: 18px;
        }

        /*.form-main span {*/
        /*!*color: #000000;*!*/
        /*font-size: 18px;*/
        /*}*/


        /*.modal-form .ivu-form-item {*/
        /*margin-right: 30px !important;*/
        /*}*/

        /*.ivu-form .ivu-form-item {*/
        /*margin-right: 30px !important;*/
        /*}*/

        /*.ivu-select-disabled .ivu-select-selection,*/
        /*.ivu-input[disabled],*/
        /*fieldset[disabled] .ivu-input {*/
        /*color: #515a6e;*/
        /*}*/
    }
</style>
