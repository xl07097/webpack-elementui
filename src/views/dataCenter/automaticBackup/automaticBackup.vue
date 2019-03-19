<template>
    <div class="automaticBackup">
        <div class="content-box clearfix">
            <div class="title">
                自动备份计划配置
            </div>
            <div class="divider"/>
            <div class="middle-content">
                <Form ref="centerContent" :model="centerContent" :label-width="110" style="width: 860px;z-index: 111" inline label-position="left" >
                    <Row>
                    <FormItem label="计划代号">
                        <Input  style="width: 200px"/>
                    </FormItem>
                    <FormItem label="源数据库" >
                        <Select style="width:200px;" v-model="centerContent.school" >
                            <Option value="0">全部</Option>
                            <Option value="1">数据库1</Option>
                            <Option value="2">数据库2</Option>
                        </Select>
                    </FormItem></Row>
                    <Row>
                        <FormItem label="类型">
                            <Input  style="width: 200px"/>
                        </FormItem>
                        <FormItem label="ip地址" >
                            <Input  style="width: 200px"/>
                        </FormItem></Row>
                    <Row>
                        <FormItem label="帐号">
                            <Select style="width:200px;" v-model="centerContent.account" >
                                <Option value="0">全部</Option>
                                <Option value="1">admin1</Option>
                                <Option value="2">admin2</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="密码" >
                            <Input  style="width: 200px"/>
                        </FormItem></Row>

                    <Row>
                    <FormItem label="备份方式">
                        <Select style="width:200px;" v-model="centerContent.way" >
                            <Option value="0">全部</Option>
                            <Option value="1">方式1</Option>
                            <Option value="2">方式2</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="时间间隔" >
                        <Input  style="width: 200px" placeholder="单位为“分”"/>
                    </FormItem></Row>
                    <Row>
                        <FormItem label="备份路径">
                            <Input  v-model="centerContent.url" type="textarea"/>
                        </FormItem>
                        <FormItem label="备注" >
                            <Input  v-model="centerContent.remark" type="textarea"/>
                        </FormItem></Row>
                </Form>

                <Upload action="//jsonplaceholder.typicode.com/posts/" style="width: 720px;text-align: right;margin: auto">
                    <Button type="primary" class="search-btn">立即备份</Button>
                </Upload>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: [''],
        data() {
            return {
                centerContent:{},
            };
        },
        methods: {
        }
    };
</script>
<style lang="scss">
    .automaticBackup {
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
