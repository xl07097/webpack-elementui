<template>
    <div class="resultSummarizing">
        <div class="content-box clearfix">
            <div class="title">
                体测结果汇总
            </div>
            <Divider dashed/>
            <div class="middle-content">
                <Form ref="centerContent" :model="req" :label-width="110" style="width: 860px;z-index: 111" inline label-position="left" >
                    <FormItem label="体测年份">
                        <DatePicker type="year" v-model="req.year" style="width: 226px"></DatePicker>
                    </FormItem>
                    <FormItem label="所属区域" class="areaItem">
                        <i-select v-model="req.area_id" style="width:95px" @on-change="areaChange">
                            <i-option value="-1">全部</i-option>
                            <i-option v-for="item of areaList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                        </i-select>
                        <i-select style="width:95px;" v-model="req.town" >
                            <Option value="0">全部</Option>
                            <Option value="1">观前街道</Option>
                            <Option value="2">平江街道</Option>
                        </i-select>
                        <i-select style="width:95px;" v-model="req.location" >
                            <Option value="0">全部</Option>
                            <Option value="1">aaaa</Option>
                            <Option value="2">bbbb</Option>
                        </i-select>
                    </FormItem>
                </Form>
                <Form ref="centerContent" :model="req" :label-width="110" style="width: 860px;z-index: 99" inline label-position="left" >
                    <FormItem label="学校名称">
                        <i-select v-model="req.school_id" style="width:226px">
                            <i-option value="-1">全部</i-option>
                            <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                        </i-select>
                    </FormItem>
                </Form>
                <Upload action="//jsonplaceholder.typicode.com/posts/" style="width: 750px;text-align: right;margin: auto">
                    <Button type="primary" class="search-btn">数据汇总</Button>
                </Upload>
            </div>
        </div>
    </div>
</template>
<script>
    import urls from '../../../service/Urls';

    export default {
        props: [''],
        data() {
            return {
                req:{
                    year: new Date(),
                    area_id: '-1',
                    school_id: '-1'
                },
                areaList: [],
                schoolList: [],
                gradeList: [],
                classList: [],
            };
        },
        methods: {
            getSelectCondition() {
                /// ===========获取下拉列表查询条件
                this.$ajax({ // 区域列表
                    url: urls.area_list,
                }).then(data => {
                    if (data.code === 200) {
                        this.areaList = data.data;
                    } else {
                        this.areaList = [];
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            areaChange() {
                this.req.school_id = -1;
                this.getSchoolList();
            },
            getSchoolList() {
                /// ===========获取下拉列表查询条件
                this.$ajax({ // 学校列表
                    url: urls.unit_opt_list,
                    data: {
                        type: 2,
                        status: 1,
                        area_id: this.req.area_id === -1 ? null : this.req.area_id
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
        },
        created(){
            this.getSelectCondition();
        }
    };
</script>
<style lang="scss">
    .resultSummarizing {
        .content-box {
            padding: 30px 44px;
            .ivu-form {
                position: relative;
                z-index: 100;
            }
            .title {
                height: 26px;
                line-height: 26px;
                color: #333333;
                font-size: 26px;
                font-weight: bold;
            }
            .ivu-divider{
                margin: 35px 0 0;
            }
            .download-group{
                cursor: pointer;
                text-align: right;
                img{
                    margin-right: 8px;
                }
            }
            .middle-content{
                margin: 112px 0 97px 0;
                .ivu-form{
                    margin: auto;

                    .ivu-form-item-label{
                        position: relative!important;
                        top: -2px!important;
                        font-size:16px!important;
                        font-family:SourceHanSansCN-Medium!important;
                        font-weight:500!important;
                        color:rgba(153,153,153,1)!important;
                    }
                    .ivu-form-item-content{
                        width: 248px!important;
                    }
                    .areaItem  .ivu-form-item-content{
                        width: 308px!important;
                    }
                    .ivu-select-selected-value,
                    .leader,
                    .ivu-input{
                        font-size:16px!important;
                        font-family:SourceHanSansCN-Medium!important;
                        font-weight:500!important;
                        color:rgba(0,0,0,1)!important;
                    }
                }
                .search-btn{
                    width: 100px;
                    margin-top: 60px;
                }

            }
        }
    }
</style>
