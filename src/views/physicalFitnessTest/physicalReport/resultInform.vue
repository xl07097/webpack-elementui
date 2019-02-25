<template>
    <div class="resultInform">
        <div class="content-box">
            <div class="title">
                体测结果通知
            </div>
            <Form ref="formInline" :model="req" inline style="margin-top: 34px;">
                <FormItem label="学校" :label-width="58">
                    <i-select style="width:260px;" v-model="req.school_id">
                        <Option value="-1">全部</Option>
                        <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="通知状态" :label-width="72">
                    <i-select style="width:106px" v-model="req.status">
                        <Option :value="0">全部</Option>
                        <Option :value="1">已通知</Option>
                        <Option :value="2">未通知</Option>
                    </i-select>
                </FormItem>
                <FormItem style="float: right;">
                    <Button type="primary" class="search-btn" @click="initSearch">查询</Button>
                </FormItem>
            </Form>
            <Divider dashed/>
            <div class="btn-box">
                <div class="action-btn" @click="inform">
                    <img style="margin: 8px 6px;" src="../../../assets/physicalFitnessTest/email.png"/>
                    <span style="position: relative;top: -4px">&nbsp;邮件</span>
                </div>
                <div class="action-btn" @click="inform">
                    <img style="margin: 8px 6px;" src="../../../assets/physicalFitnessTest/app.png"/>
                    <span style="position: relative;top: -4px">&nbsp;应用</span>
                </div>
                <div class="action-btn" @click="inform">
                    <img style="margin: 8px 6px;" src="../../../assets/physicalFitnessTest/message.png"/>
                    <span style="position: relative;top: -4px">&nbsp;短信</span>
                </div>

            </div>
            <Table ref="selection" :columns="columns" :data="data"></Table>
            <Page style="text-align: center;margin-top: 20px;"
                  :total="totalRecords"
                  :current="filterForm.page"
                  show-total
                  show-elevator
                  show-sizer
                  :page-size-opts="[10,20,50,100]"
                  @on-change="pageChange"
                  @on-page-size-change="sizeChange"
            />
        </div>

    </div>
</template>
<script>
    import urls from '../../../service/Urls';

    export default {
        props: [''],
        data() {
            return {
                addModal: false,
                addtitle: '',
                addForm: {
                    accountName: '',
                    status: 1,
                    userName: '',
                },
                req: {
                    school_id: '-1',
                    status: 0,
                },
                totalRecords: 0,
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '序号',
                        type: 'index'
                    },
                    {
                        title: '学校名称',
                        key: 'schoolName'
                    },
                    {
                        title: '年级',
                        key: 'grade'
                    },
                    {
                        title: '班级',
                        key: 'class'
                    },
                    {
                        title: '人数',
                        key: 'number'
                    },
                    {
                        title: '体测时间',
                        key: 'time'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            let statusShow = params.row.status === 0 ? '未通知' : '已通知';
                            return h('div', [

                                h(
                                    'span',
                                    statusShow
                                )
                            ]);
                        }
                    },
                ],
                data: [
                    {
                        schoolName: '苏州中学',
                        grade: '全部',
                        class: '全部',
                        number: '1254',
                        time: '2018-10-10',
                        status: 0
                    },
                    {
                        schoolName: '苏州中学',
                        grade: '全部',
                        class: '全部',
                        number: '1254',
                        time: '2018-10-10',
                        status: 0
                    },
                    {
                        schoolName: '苏州中学',
                        grade: '全部',
                        class: '全部',
                        number: '1254',
                        time: '2018-10-10',
                        status: 1
                    },
                ],
                checkedList: {},
                roleList: [
                    {name: '管理员', id: '1'},
                    {name: '眼科医生', id: '2'},
                    {name: '管理员', id: '3'},
                    {name: '管理员', id: '4'},
                    {name: '管理员', id: '5'},
                    {name: '管理员6', id: '6'}
                ],
                filterForm: {
                    page: 1,
                    size: 10
                },
                schoolList: []
            };
        },
        methods: {
            getSchoolList() {
                /// ===========获取下拉列表查询条件
                this.$ajax({ // 学校列表
                    url: urls.unit_opt_list,
                    data: {
                        type: 2,
                        status: 1,
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
            initSearch(){
                this.filterForm.page = 1;
            },
            search(){

            },
            pageChange(page) {
                this.filterForm.page = page;
            },
            sizeChange(size) {
                this.filterForm.size = size;
                if (this.filterForm.page === 1) {
                    this.pageChange(1);
                }
            },
            inform() {
                this.$Message.success('已发送');
            },
        },
        created() {
            this.getSchoolList();
        },
    };
</script>

<style lang="scss">
    .resultInform {
        .content-box {
            padding: 30px 44px;
            .title {
                height: 26px;
                color: #333333;
                font-size: 26px;
                font-weight: bold;
            }
        }
        .ivu-divider {
            margin: 10px;
        }
    }
</style>
