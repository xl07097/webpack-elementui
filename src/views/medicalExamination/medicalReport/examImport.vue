<template>
    <div>
        <div class="content-box classes">
            <div class="title">
                体检数据批量导出
            </div>
            <div class="divider"/>

            <div class="form-main">
                <div class="rows">
                    <label>所属区域</label>
                    <Select style="width:100px;margin-left: 5px">
                        <Option value="">全部</Option>
                        <Option :value="1">健康体检</Option>
                        <Option :value="2">升学体检</Option>
                    </Select>
                    <Select style="width:100px">
                        <Option value="">全部</Option>
                        <Option :value="1">健康体检</Option>
                        <Option :value="2">升学体检</Option>
                    </Select>

                    <label style="margin-left: 164px">学校名称</label>
                    <Select style="width:100px">
                        <Option value="">全部</Option>
                        <Option :value="1">健康体检</Option>
                        <Option :value="2">升学体检</Option>
                    </Select>
                    <Select style="width:100px">
                        <Option value="">全部</Option>
                        <Option :value="1">健康体检</Option>
                        <Option :value="2">升学体检</Option>
                    </Select>
                </div>
                <div class="rows">
                    <label>学年</label>
                    <Select style="width:204px;margin-left:42px">
                        <Option value="">全部</Option>
                        <Option :value="1">健康体检</Option>
                        <Option :value="2">升学体检</Option>
                    </Select>

                    <label style="margin-left: 164px">学期</label>
                    <Select style="width:204px;margin-left:34px">
                        <Option value="">全部</Option>
                        <Option :value="1">健康体检</Option>
                        <Option :value="2">升学体检</Option>
                    </Select>
                </div>
                <div class="rows">
                    <label>年级-班级</label>
                    <Select style="width:100px">
                        <Option value="">全部</Option>
                        <Option :value="1">健康体检</Option>
                        <Option :value="2">升学体检</Option>
                    </Select>
                    <Select style="width:100px">
                        <Option value="">全部</Option>
                        <Option :value="1">健康体检</Option>
                        <Option :value="2">升学体检</Option>
                    </Select>
                </div>
                <Button type="primary" class="search-btn" style="float: right">导出</Button>
            </div>
        </div>
    </div>
</template>
<script>

</script>
<style type="scss" scoped>
    .form-main {
        margin-left: 200px;
        padding-left: 50px;
        width: 900px;
        height: 500px;
        margin-top: 112px;
    }

    .rows {
        margin-bottom: 60px;
    }
    .form-main label {
        color: #999999;
        font-size: 18px;
        margin-right: 32px;
    }

    .form-main span {
        color: #000000;
        font-size: 18px;
    }

    .content-box {
        padding: 30px 44px;
    }

    .title {
        height: 26px;
        line-height: 26px;
        color: #333333;
        font-size: 26px;
        font-weight: bold;
    }

    .modal-form .ivu-form-item {
        margin-right: 30px !important;
    }

    .classes {
        padding: 30px 44px;
        min-height: 500px;
        border-radius: 8px;
        .ivu-form .ivu-form-item {
            margin-right: 30px !important;
        }
        .ivu-select-disabled .ivu-select-selection,
        .ivu-input[disabled],
        fieldset[disabled] .ivu-input {
            color: #515a6e;
        }
        .title {
            height: 80px;
            font-size: 26px;
            line-height: 1;
            // font-family: SourceHanSansCN-Bold;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
        }
        .operator {
            float: right;
            margin-bottom: 15px;
            text-align: right;
        }
        .searchBtn {
            width: 80px;
            height: 34px;
            line-height: 1;
            font-size: 14px;
            font-family: SourceHanSansCN-Medium;
            font-weight: 500;
            color: rgba(254, 254, 254, 1);
            background: rgba(255, 123, 16, 1);
            border-radius: 3px;
            border: none;
        }
        .searchBtn:hover {
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
        .addBtn {
            margin-right: 40px;
        }
        .disabled span {
            color: #999999;
        }
        .editBtn:hover {
            opacity: 0.8;
        }
        .page {
            margin-top: 24px;
            text-align: center;
        }
    }
</style>
