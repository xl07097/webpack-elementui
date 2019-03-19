<template>
    <div class="accessEnroll">
        <div class="content-box clearfix">
            <div class="title">
                接入点注册
            </div>
            <div class="divider"></div>
            <div class="middle-content">
                <Form ref="centerContent" :model="centerContent" :label-width="110" style="width: 860px;z-index: 111" inline label-position="left" >
                    <Row>
                        <FormItem label="接入代码" >
                            <Input  style="width: 200px"/>
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem label="接入位置"  class="longwidth">
                            <Select style="width:100px;" v-model="centerContent.ctiy" >
                                <Option value="1">苏州市</Option>
                                <Option value="2">张家港市</Option>
                            </Select>
                            <Select style="width:100px;" v-model="centerContent.area" >
                                <Option value="1">姑苏区</Option>
                                <Option value="2">工业园区</Option>
                            </Select>
                            <Select style="width:410px;" v-model="centerContent.school" >
                                <Option value="1">苏州中学</Option>
                                <Option value="2">金鸡湖小学</Option>
                            </Select>
                            <Input  style="width: 615px;margin-top: 5px"/>
                        </FormItem>
                      </Row>

                    <Row>
                        <FormItem label="负责人" >
                            <Input  style="width: 200px"/>
                        </FormItem>
                        <FormItem label="联系方式" >
                            <Input  style="width: 200px" />
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem label="接入点类型" >
                            <Select style="width:200px;" v-model="centerContent.type" >
                                <Option value="1">类型1</Option>
                                <Option value="2">类型2</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="接入密码">
                            <Input  style="width: 200px" />
                        </FormItem>
                    </Row>
                </Form>

                <div style="width: 720px;text-align: right;margin: auto">
                    <Button  class="close-btn">取消</Button>
                    <Button type="primary" class="search-btn">检测并注册</Button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: [''],
        data() {
            return {
                centerContent:{
                    type:'',
                    ctiy:'',
                    area:'',
                    school:'',
                },
            };
        },
        methods: {
        }
    };
</script>
<style lang="scss">
    .accessEnroll {
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
            .divider{
                margin-top: 15px;
            }
            textarea{
                width: 200px;
                height: 108px!important;
            }
            .download-group{
                cursor: pointer;
                text-align: right;
                img{
                    margin-right: 8px;
                }
                span{
                    position: relative;
                    top:-5px;
                    font-size:18px;
                    font-family:SourceHanSansCN-Regular;
                    font-weight:400;color:rgba(0,0,0,1);
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
                    .longwidth{
                        width: 820px!important;
                        .ivu-form-item-content{
                            width: 720px!important;
                        }
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
                    width: 120px;
                    margin-top: 60px;
                }
                .close-btn{
                    width: 80px;
                margin-top: 60px;
                    margin-right: 28px;
            }
            }
        }
    }
</style>
