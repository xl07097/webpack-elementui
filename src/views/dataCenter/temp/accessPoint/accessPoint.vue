<template>
    <div class="accessPoint">
        <div class="content-box">
            <div class="title">
                接入点管理
            </div>
            <Form ref="formInline" :model="formInline" inline style="margin-top: 34px;">
            </Form>
            <div class="divider"/>
            <div class="btn-box">
                <div class="action-btn" @click="addEncoding">
                    <img style="margin: 8px 6px;" src="../../../../assets/system/role/add.png"/>
                    新增
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
        <!-- 新增修改 -->
        <Modal
                class="accessPonitAddModal"
                :title="addtitle"
                v-model="addModal"
                :mask-closable="false"
                width='644'
                :styles="{top: '20px'}"
                class-name="vertical-center-modal"
                @on-cancel="closeaddModal">
            <Form ref="addFormValidate" inline :model="addForm" label-position="top" :rules="addFormValidate">
                <Row>
                    <Col span="12" class="leftFormItem">
                        <FormItem label="接入代号" prop="prefix">
                            <Select style="width:75px" v-model="addForm.prefix" @on-change="v=>{setCurrnertNum(v)}"
                                    :label-in-value="true">
                                <Option v-for="item in prefixList" :value="item.id" :key="item.id">{{ item.name }}
                                </Option>
                            </Select>
                            <Input v-model="addForm.currentNum" style="width: 75px" disabled></Input>
                        </FormItem>
                    </Col>
                    <Col span="12" class="rightFormItem">
                        <FormItem label="所属单位" prop="unit">
                            <Input v-model.trim="addForm.unit"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12" class="leftFormItem">
                        <FormItem label="IP地址" prop="ip">
                            <Input v-model.trim="addForm.ip"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12" class="rightFormItem">
                        <FormItem label="MAC地址" prop="mac">
                            <Input v-model.trim="addForm.mac"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12" class="leftFormItem">
                        <FormItem label="负责人" prop="leader">
                            <Input v-model.trim="addForm.leader"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12" class="rightFormItem">
                        <FormItem label="联系电话" prop="tel">
                            <Input v-model.trim="addForm.tel"></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div class="footer">
                <i-button class="close" type='default' @click='closeaddModal'>取消</i-button>
                <i-button class="confirm" type="primary" @click='confirmaddModal'>保存</i-button>
            </div>
        </Modal>
        <!-- 新增修改 -->
        <Modal
                class="accessPonitAddModal"
                title="详情"
                v-model="infoModal"
                :mask-closable="false"
                width='644'
                :styles="{top: '20px'}"
                class-name="vertical-center-modal"
                @on-cancel="confirmInfoModal">
            <Form ref="addFormValidate" inline :model="addForm" label-position="top">
                <Row>
                    <Col span="12" class="leftFormItem">
                        <FormItem label="接入代号" prop="prefix">
                            <Select style="width:75px" v-model="addForm.prefix" @on-change="v=>{setCurrnertNum(v)}"
                                    :label-in-value="true" disabled>
                                <Option v-for="item in prefixList" :value="item.id" :key="item.id">{{ item.name }}
                                </Option>
                            </Select>
                            <Input v-model="addForm.currentNum" style="width: 75px" readonly></Input>
                        </FormItem>
                    </Col>
                    <Col span="12" class="rightFormItem">
                        <FormItem label="所属单位" prop="unit">
                            <Input v-model="addForm.unit" readonly></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12" class="leftFormItem">
                        <FormItem label="IP地址" prop="ip">
                            <Input v-model="addForm.ip" readonly></Input>
                        </FormItem>
                    </Col>
                    <Col span="12" class="rightFormItem">
                        <FormItem label="MAC地址" prop="mac">
                            <Input v-model="addForm.mac" readonly></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12" class="leftFormItem">
                        <FormItem label="负责人" prop="leader">
                            <Input v-model="addForm.leader" readonly></Input>
                        </FormItem>
                    </Col>
                    <Col span="12" class="rightFormItem">
                        <FormItem label="联系电话" prop="tel">
                            <Input v-model="addForm.tel" readonly></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div class="footer">
                <i-button class="confirm" type="primary" @click='confirmInfoModal'>确定</i-button>
            </div>
        </Modal>

    </div>
</template>
<script>
    import urls from '../../../../service/Urls.js';

    export default {
        props: [''],
        data() {
            const validateip = function (rule, value, callback) {
                if (!value) {
                    return callback(new Error('请输入ip地址'));
                } else if (!/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(value)) {
                    return callback(new Error('请输入正确的ip地址'));
                } else {
                    callback();
                }
            };
            const validatemac = function (rule, value, callback) {
                if (!value) {
                    return callback(new Error('请输入mac地址'));
                } else if (!/[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}/.test(value)) {
                    return callback(new Error('请输入正确的mac地址'));
                } else {
                    callback();
                }
            };
            const validatetel = function (rule, value, callback) {
                if (!value) {
                    return callback(new Error('请输入联系电话'));
                } else if (!/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(value)) {
                    return callback(new Error('请输入正确的联系电话'));
                } else {
                    callback();
                }
            };

            return {
                addModal: false,
                infoModal: false,
                addtitle: '',
                editRowIndex: '',
                formInline: {},
                totalRecords: 2,
                columns: [
                    {
                        title: '接入代号',
                        key: 'accessCode',
                        align: 'center'
                    },
                    {
                        title: 'IP地址',
                        key: 'ip',
                        align: 'center'
                    },
                    {
                        title: 'MAC地址',
                        key: 'mac',
                        align: 'center'
                    },
                    {
                        title: '所属单位',
                        key: 'unit',
                        align: 'center'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('i-switch', {
                                    props: {
                                        type: 'primary',
                                        value: params.row.status === 1
                                    },
                                    style: {
                                        marginRight: '8px'
                                    },
                                    on: {
                                        'on-change': () => {
                                            this.changeStatus(params.row.id, params.row.status, params.index);
                                        }
                                    }
                                }),
                                h('span', params.row.status === 1 ? '启用' : '禁用')
                            ])
                        }
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {src: require('../../../../assets/system/role/info.png')},
                                    style: {
                                        display: 'inline-block',
                                        width: '20px',
                                        height: '20px',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.infoAccessPoint(params.row);
                                        }
                                    }
                                }),
                                h(
                                    'span',
                                    {
                                        style: {
                                            position: 'relative',
                                            left: '5px',
                                            top: '-3px',
                                            cursor: 'pointer'
                                        },
                                        on: {
                                            click: () => {
                                                this.infoAccessPoint(params.row);
                                            }
                                        }
                                    },
                                    '详情'
                                ),
                                h('img', {
                                    attrs: {src: require('../../../../assets/system/role/edit.png')},
                                    style: {
                                        display: 'inline-block',
                                        width: '20px',
                                        height: '20px',
                                        marginLeft: '21px',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.editAccessPoint(params.row);
                                        }
                                    }
                                }),
                                h(
                                    'span',
                                    {
                                        style: {
                                            position: 'relative',
                                            left: '5px',
                                            top: '-3px',
                                            cursor: 'pointer'
                                        },
                                        on: {
                                            click: () => {
                                                this.editAccessPoint(params.row);
                                            }
                                        }
                                    },
                                    '编辑'
                                )
                            ]);
                        }
                    }
                ],
                data: [
                    {
                        prefix: '1',
                        currentNum: '0001',
                        accessCode: 'test1',
                        ip: '192.1.168.1',
                        mac: '9C:2E:35:48:2C:5E',
                        unit: '苏州苏大信息技术有限公司',
                        leader: '甲',
                        tel: '18888888888',
                        status: 1
                    },
                    {
                        prefix: '2',
                        currentNum: '0001',
                        accessCode: 'test2',
                        ip: '192.1.168.1',
                        mac: '9C:2E:35:48:2C:5E',
                        unit: '苏州苏大信息技术有限公司',
                        leader: '张三',
                        tel: '18888888888',
                        status: 1
                    },
                ],
                prefixList: [{id: '1', name: 'test1'}, {id: '2', name: 'test2'}],
                addFormValidate: {
                    prefix: [{required: true, message: '请选择前缀', trigger: 'change'},],
                    unit: [{required: true, message: '请输入单位', trigger: 'blur'},],
                    ip: [{required: true, validator: validateip, trigger: 'blur'},],
                    mac: [{required: true, validator: validatemac, trigger: 'blur'},],
                    leader: [{required: true, message: '请输入负责人', trigger: 'blur'},],
                    tel: [{required: true, validator: validatetel, trigger: 'blur'},],
                },
                filterForm: {
                    page: 1,
                    size: 10
                },
                addForm: {
                    accessCode: '',
                    currnetNum: '',
                    prefix: '',
                    unit: '',
                    ip: '',
                    mac: '',
                    leader: '',
                    tel: '',
                },
            };
        },
        methods: {
            pageChange(page) {
                this.filterForm.page = page;
                // this.getList();
            },
            sizeChange(size) {
                this.filterForm.size = size;
                if (this.filterForm.page === 1) {
                    this.pageChange(1);
                }
            },
            addEncoding() {
                this.$refs['addFormValidate'].resetFields();
                this.addForm.currnetNum = '';
                this.addtitle = '新增接入点';
                this.addModal = true;
            },
            changeStatus(id, status, index) {
                if (status === 1) {
                    this.$set(this.data[index], 'status', 2);
                    this.$Message.success('禁用成功');
                } else {
                    this.$set(this.data[index], 'status', 1);
                    this.$Message.success('启用成功');
                }
            },
            Search() {
                this.$Message.success('查询');
            },
            infoAccessPoint(row) {
                this.editRowIndex = row._index;
                this.addtitle = '详情';
                this.addForm.accessCode = row.accessCode;
                this.addForm.prefix = row.prefix;
                this.addForm.unit = row.unit;
                this.addForm.currentNum = row.currentNum;
                this.addForm.ip = row.ip;
                this.addForm.mac = row.mac;
                this.addForm.leader = row.leader;
                this.addForm.tel = row.tel;
                this.infoModal = true;
            },
            editAccessPoint(row) {
                this.editRowIndex = row._index;
                this.addtitle = '修改接入点';
                this.addForm.accessCode = row.accessCode;
                this.addForm.prefix = row.prefix;
                this.addForm.unit = row.unit;
                this.addForm.currentNum = row.currentNum;
                this.addForm.ip = row.ip;
                this.addForm.mac = row.mac;
                this.addForm.leader = row.leader;
                this.addForm.tel = row.tel;
                this.addModal = true;
            },
            confirmInfoModal() {
                this.infoModal = false;
            },
            closeaddModal() {
                this.$refs['addFormValidate'].resetFields();
                this.addModal = false;
            },
            confirmaddModal() {
                this.$refs['addFormValidate'].validate((valid) => {
                    if (valid) {
                        if (this.addtitle === '新增接入点') {
                            this.data.push({
                                accessCode: this.addForm.accessCode,
                                unit: this.addForm.unit,
                                currentNum: this.addForm.currentNum,
                                ip: this.addForm.ip,
                                mac: this.addForm.mac,
                                leader: this.addForm.leader,
                                tel: this.addForm.tel,
                                status: 1
                            });
                        } else {
                            this.data[this.editRowIndex].accessCode = this.addForm.accessCode;
                            this.data[this.editRowIndex].unit = this.addForm.unit;
                            this.data[this.editRowIndex].currentNum = this.addForm.currentNum;
                            this.data[this.editRowIndex].ip = this.addForm.ip;
                            this.data[this.editRowIndex].mac = this.addForm.mac;
                            this.data[this.editRowIndex].leader = this.addForm.leader;
                            this.data[this.editRowIndex].tel = this.addForm.tel;
                        }
                        this.$Message.success('操作成功!');
                        this.addModal = false;
                    }
                });
            },
            setCurrnertNum(value) {
                this.addForm.accessCode = value.label;
                this.addForm.prefix = value.value;
                this.addForm.currnetNum = '0002';
            },
            get_unit_opt_list() {
                this.$ajax({
                    url: urls.unit_opt_list,
                    data: {
                        sys_type: null,
                    }
                }).then((res) => {
                    if (res && res.data) {
                    }
                });
            }
        },
        mounted() {
            // this.get_unit_opt_list();
        },
    };
</script>
<style lang="scss">
    .accessPonitAddModal {
        .ivu-form-item-label {
            font-size: 14px !important;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(126, 132, 133, 1) !important;
        }
        .ivu-modal-body {
            padding-top: 57px !important;
            .leftFormItem {
                padding-left: 62px;
                width: 262px;
                .formLabel {
                    font-size: 14px !important;
                    font-family: SourceHanSansCN-Regular;
                    font-weight: 400;
                    color: rgba(126, 132, 133, 1) !important;
                }
            }
            .rightFormItem {
                padding-left: 66px;
                width: 266px;
            }
            .ivu-btn-primary {
                span {
                    position: relative;
                    top: -5px;
                }
            }
        }
        .footer {
            margin: 66px 38px 22px 0;
            text-align: right;
            .confirm {
                width: 70px;
                height: 30px;
            }
            .close {
                width: 70px;
                height: 30px;
                margin-right: 28px;
            }
        }
        .ivu-modal-footer {
            display: none;
        }
    }

    .accessPoint {
        .content-box {
            padding: 30px 44px;
            .title {
                height: 26px;
                line-height: 26px;
                color: #333333;
                font-size: 26px;
                font-weight: bold;
            }
        }
    }
</style>


