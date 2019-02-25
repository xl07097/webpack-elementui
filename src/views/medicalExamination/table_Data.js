//体检项目参考值配置
var gettexaminationItemConf = [
    // {
    //     'department': '问诊',
    //     'itemType': '既往病史',
    //     'action': '',
    //     'item': '肝炎',
    //     'result': '无/有@若“有”，填入年月日',
    //     'type': 'newline'
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '既往病史',
    //     'item': '肺结核',
    //     'action': '',
    //     'result': '无/有@若“有”，填入年月日',
    //     'type': 'newline'
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '既往病史',
    //     'item': '肺结核密切接触史',
    //     'action': '',
    //     'result': '无/有'
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '既往病史',
    //     'item': '先天性心脏病',
    //     'action': '',
    //     'result': '无/有@若“有”，填入年月日',
    //     'type': 'newline'
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '既往病史',
    //     'item': '肾炎',
    //     'action': '',
    //     'result': '无/有@若“有”，填入年月日',
    //     'type': 'newline'
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '既往病史',
    //     'item': '风湿病',
    //     'action': '',
    //     'result': '无/有@若“有”，填入年月日',
    //     'type': 'newline'
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '既往病史',
    //     'item': '哮喘',
    //     'action': '',
    //     'result': '无/有@若“有”，填入年月日',
    //     'type': 'newline'
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '既往病史',
    //     'item': '过敏性疾病',
    //     'action': '',
    //     'result': '无/有@若“有”，填入年月日',
    //     'type': 'newline'
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '残疾',
    //     'item': '其他不适症状说明',
    //     'action': '',
    //     'result': '文本内容',
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '残疾',
    //     'item': '视力',
    //     'action': '',
    //     'result': '无/有',
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '残疾',
    //     'item': '听力',
    //     'action': '',
    //     'result': '无/有',
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '残疾',
    //     'item': '言语',
    //     'action': '',
    //     'result': '无/有',
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '残疾',
    //     'item': '肢体',
    //     'action': '',
    //     'result': '无/有',
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '残疾',
    //     'item': '智力',
    //     'action': '',
    //     'result': '无/有',
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '残疾',
    //     'item': '精神',
    //     'action': '',
    //     'result': '无/有',
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '残疾',
    //     'item': '其他残疾说明',
    //     'action': '',
    //     'result': '文本内容',
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '近期不适应症',
    //     'item': '疲乏无力',
    //     'action': '',
    //     'result': '无/有@若“有”，填入年月日',
    //     'type': 'newline'
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '近期不适应症',
    //     'item': '低热',
    //     'action': '',
    //     'result': '无/有@若“有”，填入年月日',
    //     'type': 'newline'
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '近期不适应症',
    //     'item': '盗汗',
    //     'action': '',
    //     'result': '无/有@若“有”，填入年月日',
    //     'type': 'newline'
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '近期不适应症',
    //     'item': '胸痛',
    //     'action': '',
    //     'result': '无/有@若“有”，填入年月日',
    //     'type': 'newline'
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '近期不适应症',
    //     'item': '咳嗽',
    //     'action': '',
    //     'result': '无/有@若“有”，填入年月日',
    //     'type': 'newline'
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '近期不适应症',
    //     'item': '咳痰',
    //     'action': '',
    //     'result': '无/有@若“有”，填入年月日',
    //     'type': 'newline'
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '近期不适应症',
    //     'item': '食欲减退',
    //     'action': '',
    //     'result': '无/有@若“有”，填入年月日',
    //     'type': 'newline'
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '近期不适应症',
    //     'item': '消瘦',
    //     'action': '',
    //     'result': '无/有@若“有”，填入年月日',
    //     'type': 'newline'
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '近期不适症状',
    //     'item': '其他不适症状说明',
    //     'action': '',
    //     'result': '文本内容',
    // },
    {
        'department': '形体',
        'itemType': '身高',
        'item': '身高',
        'action': '2239fd8aaea54009aadea6ab822aef2b',
        'unit': 'cm',
        'result': '数值，_ _ _._ @单位为厘米(cm)',
        'type': 'newline'
    },
    {
        'department': '形体',
        'itemType': '体重',
        'item': '体重',
        'action': '75cab047bf274671bd0ca1834ec3da90',
        'unit': 'kg',
        'result': '数值，_ _ _._ @单位为公斤(kg)',
        'type': 'newline'
    },
    {
        'department': '生理功能',
        'itemType': '血压',
        'item': '收缩压',
        'action': '9ed4b87c56514ffdbe2e58bc7f4aac33',
        'unit': 'mmHg',
        'result': '数值，_ _ _ @单位为毫米/汞柱(mmHG)',
        'type': 'newline'
    },
    {
        'department': '生理功能',
        'itemType': '血压',
        'item': '舒张压',
        'action': '9803d231a46d4817ac8e390c0f91e923',
        'unit': 'mmHg',
        'result': '数值，_ _ _@单位为毫米/汞柱(mmHG)',
        'type': 'newline'
    },
    {
        'department': '生理功能',
        'itemType': '脉搏',
        'item': '脉搏',
        'unit': '次/分钟',
        'action': '65c75a15844f4436a5df4f36e59273a2',
        'result': '数值，_ _ _ @单位为次/分钟',
        'type': 'newline'
    },
    {
        'department': '眼科',
        'itemType': '屈光',
        'item': '右眼',
        'action': '',
        'result': '否/是 ',
    },
    {
        'department': '眼科',
        'itemType': '屈光',
        'item': '左眼',
        'action': '',
        'result': '否/是 ',
    },
    {
        'department': '眼科',
        'itemType': '近视',
        'item': '右眼',
        'action': '',
        'result': '否/是 ',
    },
    {
        'department': '眼科',
        'itemType': '近视',
        'item': '左眼',
        'action': '',
        'result': '否/是 ',
    },
    {
        'department': '眼科',
        'itemType': '沙眼',
        'item': '右眼',
        'action': '',
        'result': '阴性/沙凝/阳性 ',
    },
    {
        'department': '眼科',
        'itemType': '沙眼',
        'item': '左眼',
        'action': '',
        'result': '阴性/沙凝/阳性 ',
    },
    {
        'department': '眼科',
        'itemType': '结膜炎',
        'item': '结膜炎',
        'action': '',
        'result': '阴性/阳性 ',
    },
    {
        'department': '眼科',
        'itemType': '色觉',
        'item': '色盲',
        'action': '',
        'result': '正常/异常 ',
    },
    {
        'department': '眼科',
        'itemType': '色觉',
        'item': '色弱',
        'action': '',
        'result': '正常/异常 ',
    },
    {
        'department': '视力',
        'itemType': '视力',
        'item': '右眼',
        'action': '1166bb360c164301af0dcd511dc51d5b',
        'unit': '',
        'result': '数值， _._ ',
    },
    {
        'department': '视力',
        'itemType': '视力',
        'item': '左眼',
        'action': '0c2345886b404c20b11644016de790fb',
        'unit': '',
        'result': '数值， _._ ',
    },
    {
        'department': '视力',
        'itemType': '矫正视力',
        'item': '右眼',
        'action': '6178ff6f2cc34219adf6644611aaccc5',
        'unit': '',
        'result': '数值， _._ ',
    },
    {
        'department': '视力',
        'itemType': '矫正视力',
        'item': '左眼',
        'action': '4d8fc73468d74250a4f5c3cf5eb32898',
        'unit': '',
        'result': '数值， _._ ',
    },
    {
        'department': '屈光度',
        'itemType': '右眼',
        'item': 'S',
        'action': '1',
        'result': '数值， _._',
    },
    {
        'department': '屈光度',
        'itemType': '右眼',
        'item': 'C',
        'action': '2',
        'result': '数值， _._',
    },
    {
        'department': '屈光度',
        'itemType': '右眼',
        'item': 'A',
        'action': '3',
        'result': '数值， _._',
    },
    {
        'department': '屈光度',
        'itemType': '左眼',
        'item': 'S',
        'action': '4',
        'result': '数值， _._',
    },
    {
        'department': '屈光度',
        'itemType': '左眼',
        'item': 'C',
        'action': '5',
        'result': '数值， _._',
    },
    {
        'department': '屈光度',
        'itemType': '左眼',
        'item': 'A',
        'action': '6',
        'result': '数值， _._',
    },
    {
        'department': '屈光度',
        'itemType': 'PD',
        'item': 'PD',
        'action': '',
        'result': '数值， _._',
    },
    {
        'department': '口腔科',
        'itemType': '齿列',
        'item': '齿列',
        'action': '',
        'result': '整齐/不齐 ',
    },
    {
        'department': '口腔科',
        'itemType': '牙周',
        'item': '牙周',
        'action': '',
        'result': '阴性/牙龈炎/牙石/浅牙周袋@/深牙周袋/其他 ',
        'type': 'newline'
    },
    {
        'department': '口腔科',
        'itemType': '龋齿',
        'item': '龋齿',
        'action': '',
        'result': '无有'
    },
    {
        'department': '口腔科',
        'itemType': '龋患牙数',
        'item': '乳牙',
        'action': 'b3a8a3525b4a41879a3711fad851f7e2',
        'unit': '',
        'result': '数值，_ ，_ ',
    },
    {
        'department': '口腔科',
        'itemType': '龋患牙数',
        'item': '恒牙',
        'action': '9c9544f49d70433ba354aaf68fddd36f',
        'unit': '',
        'result': '数值，_ ，_ ',
    },
    {
        'department': '口腔科',
        'itemType': '龋失牙数',
        'item': '乳牙',
        'action': '9f60daf57a544993ad86e9e3f4e7575f',
        'unit': '',
        'result': '数值，_ ，_ ',
    },
    {
        'department': '口腔科',
        'itemType': '龋失牙数',
        'item': '恒牙',
        'action': 'c18d243702db4ef98e5ec8fe05a52310',
        'unit': '',
        'result': '数值，_ ，_ ',
    },
    {
        'department': '口腔科',
        'itemType': '龋补牙数',
        'item': '乳牙',
        'action': '25e2916dd6514653992dadfedec95b7a',
        'unit': '',
        'result': '数值，_ ，_ ',
    },
    {
        'department': '口腔科',
        'itemType': '龋补牙数',
        'item': '恒牙',
        'action': '8abcfdd9796342269be502c5a1e62ce0',
        'unit': '',
        'result': '数值，_ ，_ ',
    },
    {
        'department': '口腔科',
        'itemType': '其他记录',
        'item': '其他记录',
        'action': '',
        'result': '文本内容 ',
    },
    {
        'department': '耳鼻喉科',
        'itemType': '耳',
        'item': '耳',
        'action': '',
        'result': '正常/异常',
    },
    {
        'department': '耳鼻喉科',
        'itemType': '鼻',
        'item': '鼻',
        'action': '',
        'result': '正常/异常',
    },
    {
        'department': '耳鼻喉科',
        'itemType': '喉',
        'item': '喉',
        'action': '',
        'result': '正常/异常',
    },
    {
        'department': '外科',
        'itemType': '皮肤',
        'item': '皮肤',
        'action': '',
        'result': '正常/潮红/苍白/发绀/黄染/色素沉着/@湿疹/糜烂/其他',
        'type': 'newline'
    },
    {
        'department': '外科',
        'itemType': '淋巴结',
        'item': '淋巴结',
        'action': '',
        'result': '未触及/锁骨上/腋窝/其他 ',
    },
    {
        'department': '外科',
        'itemType': '头部',
        'item': '头部',
        'action': '',
        'result': '正常/耳朵机型/耳朵息肉/头部外伤@/脑瘫/其他',
        'type': 'newline'
    },
    {
        'department': '外科',
        'itemType': '颈部',
        'item': '颈部',
        'action': '',
        'result': '正常/甲状腺肿大/颈部外伤/其他',
    },
    {
        'department': '外科',
        'itemType': '脊柱',
        'item': '脊柱',
        'action': '',
        'result': '正常/脊柱侧弯/脊柱矫正中/脊柱术后/脊柱呈@S型/腰间盘突出/脊柱后凸/其他',
        'type': 'newline'
    },
    {
        'department': '外科',
        'itemType': '四肢',
        'item': '四肢',
        'action': '',
        'result': '正常/骨折及骨折史/残疾/先天畸形/扁平足/@跛行/其他',
        'type': 'newline'
    },
    {
        'department': '外科',
        'itemType': '胸部',
        'item': '胸部',
        'action': '',
        'result': '正常/桶装胸/扁平胸/鸡胸/漏斗胸/胸廓不对称/肋骨@畸形/胸骨畸形/胸部手术疤痕/其他',
        'type': 'newline'
    },
    {
        'department': '外科',
        'itemType': '其他记录',
        'item': '其他记录',
        'action': '',
        'result': '文本内容',
    },
    {
        'department': '内科',
        'itemType': '近期不适症状（可多选）',
        'item': '近期不适症状（可多选）',
        'action': '',
        'result': '疲乏无力/低热/盗汗/胸痛/咳嗽/咳痰/食欲减退/消瘦',
    },
    {
        'department': '内科',
        'itemType': '其他症状',
        'item': '其他症状',
        'action': '',
        'result': '文本内容'
    },
    {
        'department': '内科',
        'itemType': '心率',
        'item': '心率',
        'action': '',
        'result': '数值，_ _ _._ @单位为次/分钟',
        'type': 'newline'
    },
    {
        'department': '内科',
        'itemType': '心脏杂音',
        'item': '心脏杂音',
        'action': '',
        'result': '无/有',
    },
    {
        'department': '内科',
        'itemType': '心律',
        'item': '心律',
        'action': '',
        'result': '齐/不齐/绝对不齐'
    },
    {
        'department': '内科',
        'itemType': '肺部罗音',
        'item': '肺部罗音',
        'action': '',
        'result': '无/干罗音/湿罗音'
    },
    {
        'department': '内科',
        'itemType': '肝',
        'item': '肝',
        'action': '',
        'result': '正常/肝大'
    },
    {
        'department': '内科',
        'itemType': '脾',
        'item': '脾',
        'action': '',
        'result': '正常/脾大'
    },
    {
        'department': '内科',
        'itemType': '其他记录',
        'item': '其他记录',
        'action': '',
        'result': '文本内容',
    },
    {
        'department': '检验科',
        'itemType': '肝功能',
        'item': '谷丙转氨酶ALT',
        'unit': '单位/升(U/L)',
        'action': '06614cc576f743f19ab58d60729b9786',
        'result': '数值，_ _ ,_ _ @单位为单位/升(U/L)',
        'type': 'newline'
    },
    {
        'department': '检验科',
        'itemType': '肝功能',
        'item': '总胆红素TBIL',
        'unit': '微摩尔/升(μmo/L)',
        'action': 'ae6d475c3a3a4c5687195b6da1beb567',
        'result': '数值，_ _ ,_ _ @单位为微摩尔/升(μmo/L)',
        'type': 'newline'
    },
    {
        'department': '检验科',
        'itemType': '血红蛋白',
        'item': '血红蛋白',
        'unit': '克/升(g/L)',
        'action': 'd66e98043e5b476e89780618c604a79e',
        'result': '数值，_ _ ,_ _ @单位为克/升(g/L)',
        'type': 'newline'
    },
    {
        'department': '检验科',
        'itemType': '其他化验结果',
        'item': '其他化验结果',
        'action': '',
        'result': '文本内容'
    },
    {
        'department': '结核病筛查检查',
        'itemType': '确认有无卡介苗接种史或卡痕？',
        'item': '确认有无卡介苗接种史或卡痕？',
        'action': '',
        'result': '无/有'
    },
    {
        'department': '结核病筛查检查',
        'itemType': '医生意见',
        'item': '医生意见',
        'action': '',
        'result': '是肺结核可疑症状者/是肺结核密切接触者'
    },
    {
        'department': '结核菌素皮肤试验检查',
        'itemType': '注射时间',
        'item': '注射时间',
        'action': '',
        'result': '（月/日/时）'
    },
    {
        'department': '结核菌素皮肤试验检查',
        'itemType': '硬结直径（横径x纵径）',
        'item': '硬结直径（横径x纵径）',
        'action': '8',
        'result': '数值，_ _ ,_ _ @单位为毫米(mm)',
        'type': 'newline'
    },
    {
        'department': '结核菌素皮肤试验检查',
        'itemType': '平均直径',
        'item': '平均直径',
        'action': '9',
        'result': '数值，_ _ ,_ _ @单位为毫米(mm)',
        'type': 'newline'
    },
    {
        'department': '结核菌素皮肤试验检查',
        'itemType': '注射后局部情况',
        'item': '注射后局部情况',
        'action': '',
        'result': '水疱/溃疡/坏死/淋巴管炎'
    },
    {
        'department': '结核菌素皮肤试验检查',
        'itemType': '检验反应时间',
        'item': '检验反应时间',
        'action': '',
        'result': '（月/日/时）'
    },
    {
        'department': '结核菌素皮肤试验检查',
        'itemType': '结果判定',
        'item': '结果判定',
        'action': '',
        'result': '阴性/一般阳性/中度阳性/强阳性'
    },
    {
        'department': '检查科',
        'itemType': '胸部X线检查',
        'item': '胸部X线检查',
        'action': '',
        'result': '未见异常/异常@异常需填写异常情况描述',
        'type': 'newline'
    },
    {
        'department': '主检',
        'itemType': '结论',
        'item': '结论',
        'action': '',
        'result': '文本内容',
    }];

//体检项目规划表格数据
var getexaminationPlan = [
    {
        'id': '1239fd8aaea54009aadea6ab822aef2b',
        'checkId': ['1239fd8aaea54009aadea6ab822aef2b', '7131737d290147fbb2794e4e2f984568'],
        'department': '问诊',
        'itemType': '既往病史',
        'action': '',
        'item': '肝炎',
    }, {
        'department': '问诊',
        'itemType': '既往病史',
        'item': '肺结核',
    }, {
        'department': '问诊',
        'itemType': '既往病史',
        'item': '肺结核密切接触史',
    }, {
        'department': '问诊',
        'itemType': '既往病史',
        'item': '先天性心脏病',
    }, {
        'department': '问诊',
        'itemType': '既往病史',
        'item': '肾炎',
    }, {
        'department': '问诊',
        'itemType': '既往病史',
        'item': '风湿病',
    }, {
        'department': '问诊',
        'itemType': '既往病史',
        'item': '哮喘',
    }, {
        'department': '问诊',
        'itemType': '既往病史',
        'item': '过敏性疾病',
    }, {
        'id': '7131737d290147fbb2794e4e2f984568',
        'department': '问诊',
        'itemType': '其他不适症状说明',
        'item': '其他不适症状说明',
        'action': '',
        'result': '文本内容',
    }, {
        'id': '086ad0d39f774070b6146c69cae21515',
        'checkId': ['086ad0d39f774070b6146c69cae21515', '95879f519a0844bebc63002a67334535'],
        'department': '问诊',
        'itemType': '残疾',
        'item': '视力',
    }, {
        'department': '问诊',
        'itemType': '残疾',
        'item': '听力',
    }, {
        'department': '问诊',
        'itemType': '残疾',
        'item': '言语',
    }, {
        'department': '问诊',
        'itemType': '残疾',
        'item': '肢体',
    }, {
        'department': '问诊',
        'itemType': '残疾',
        'item': '智力',
    }, {
        'department': '问诊',
        'itemType': '残疾',
        'item': '精神',
    }, {
        'department': '问诊',
        'itemType': '其他残疾说明',
        'item': '其他残疾说明',
    }, {
        'id': '8f57e55b2bbd47949fec4c2faa72a6df',
        'checkId': ['8f57e55b2bbd47949fec4c2faa72a6df', '5a75a74c54274504a09581df7e2552ea'],
        'department': '问诊',
        'itemType': '近期不适应症',
        'item': '疲乏无力',
    }, {
        'department': '问诊',
        'itemType': '近期不适应症',
        'item': '低热',
    }, {
        'department': '问诊',
        'itemType': '近期不适应症',
        'item': '盗汗',
    }, {
        'department': '问诊',
        'itemType': '近期不适应症',
        'item': '胸痛',
    }, {
        'department': '问诊',
        'itemType': '近期不适应症',
        'item': '咳嗽',
    }, {
        'department': '问诊',
        'itemType': '近期不适应症',
        'item': '咳痰',
    }, {
        'department': '问诊',
        'itemType': '近期不适应症',
        'item': '食欲减退',
    }, {
        'department': '问诊',
        'itemType': '近期不适应症',
        'item': '消瘦',
    }, {
        'department': '问诊',
        'itemType': '其他不适症状说明',
        'item': '其他不适症状说明',
    }, {
        'id': '2239fd8aaea54009aadea6ab822aef2b',
        'checkId': ['2239fd8aaea54009aadea6ab822aef2b', '75cab047bf274671bd0ca1834ec3da90'],
        'department': '形体',
        'itemType': '身高',
        'item': '身高',
    }, {
        'id': '75cab047bf274671bd0ca1834ec3da90',
        'department': '形体',
        'itemType': '体重',
        'item': '体重',
    }, {
        'id': '85e664a24bb54df99332956306500355',
        'checkId': ['85e664a24bb54df99332956306500355', '65c75a15844f4436a5df4f36e59273a2'],
        'department': '生理功能',
        'itemType': '血压',
        'item': '收缩压',
    }, {
        'department': '生理功能',
        'itemType': '血压',
        'item': '舒张压',
    }, {
        'id': '65c75a15844f4436a5df4f36e59273a2',
        'department': '生理功能',
        'itemType': '脉搏',
        'item': '脉搏',
    }, {
        'id': '10205c35f4e24926a7f3160fa5633545',
        'department': '视力',
        'itemType': '视力',
        'item': '右眼',
    }, {
        'department': '视力',
        'itemType': '视力',
        'item': '左眼',
        'action': 'zuoyanshili',
        'result': '数值， _._ ',
    }, {
        'id': '5cde8e9b1c00449a89b5c0d4a22b6bca',
        'department': '视力',
        'itemType': '矫正视力',
        'item': '右眼',
    }, {
        'department': '视力',
        'itemType': '矫正视力',
        'item': '左眼',
    }, {
        'id': '32e46fb6929f4daea021d77af55aa3bb',
        'department': '眼科',
        'itemType': '屈光',
        'item': '右眼',
    }, {
        'department': '眼科',
        'itemType': '屈光',
        'item': '左眼',
    }, {
        'id': '5a81dc42605844858f6605724bc6c024',
        'department': '眼科',
        'itemType': '近视',
        'item': '右眼',
    }, {
        'department': '眼科',
        'itemType': '近视',
        'item': '左眼',
    }, {
        'id': '8bc1bf9b6c644bb29dcf407894aface3',
        'department': '眼科',
        'itemType': '沙眼',
        'item': '右眼',
    }, {
        'department': '眼科',
        'itemType': '沙眼',
        'item': '左眼',
    }, {
        'id': '3e2b0a4f6a6246fdb9a74ae616361320',
        'department': '眼科',
        'itemType': '结膜炎',
        'item': '结膜炎',
    }, {
        'id': '140b8db7096d49b09ef53e5ebb197c31',
        'department': '眼科',
        'itemType': '色觉',
        'item': '色盲',
    }, {
        'department': '眼科',
        'itemType': '色觉',
        'item': '色弱',
    }, {
        'id': '105e7d5a2f6143b389161095a9e0b67b',
        'department': '口腔科',
        'itemType': '齿列',
        'item': '齿列',
    }, {
        'id': '0783f1f2ed1c468aaec51940ae642dff',
        'department': '口腔科',
        'itemType': '牙周',
        'item': '牙周',
    }, {
        'id': 'e8939b0116384bd8a7cb6c5b6690c3de',
        'checkId': ['e8939b0116384bd8a7cb6c5b6690c3de', 'f17b10c29f354b778de8752aa0b745f9', '302555030f844a12970c432401033b51', '00d990328454449f9911199c84ebf480'],
        'department': '口腔科',
        'itemType': '龋齿',
        'item': '龋齿',
    }, {
        'department': '口腔科',
        'itemType': '龋患牙数',
        'item': '乳牙',
        'action': 'ruya',
        'result': '数值，_ ，_ ',
    }, {
        'department': '口腔科',
        'itemType': '龋患牙数',
        'item': '恒牙',
        'action': 'hengya',
        'result': '数值，_ ，_ ',
    }, {
        'department': '口腔科',
        'itemType': '龋失牙数',
        'item': '乳牙',
        'action': 'hengya',
        'result': '数值，_ ，_ ',
    }, {
        'department': '口腔科',
        'itemType': '龋失牙数',
        'item': '恒牙',
        'action': 'hengya',
        'result': '数值，_ ，_ ',
    }, {
        'department': '口腔科',
        'itemType': '龋补牙数',
        'item': '乳牙',
        'action': 'hengya',
        'result': '数值，_ ，_ ',
    }, {
        'department': '口腔科',
        'itemType': '龋补牙数',
        'item': '恒牙',
        'action': 'hengya',
        'result': '数值，_ ，_ ',
    }, {
        'id': 'dfd5e88d178148d5a3bcc2e5b10f9a0c',
        'department': '口腔科',
        'itemType': '其他记录',
        'item': '其他记录',
    }, {
        'id': 'be7f87873037471da76ef669d88dcb8d',
        'department': '耳鼻喉科',
        'itemType': '耳',
        'item': '耳',
        'action': '',
        'result': '正常/异常 ',
    }, {
        'id': '45b7f2a91b924cef87a1d588e4b02253',
        'department': '耳鼻喉科',
        'itemType': '鼻',
        'item': '鼻',
        'action': '',
        'result': '正常/异常 ',
    }, {
        'id': '6105651b9348479098adfb47b5aacdcb',
        'department': '耳鼻喉科',
        'itemType': '喉',
        'item': '喉',
        'action': '',
        'result': '正常/异常 ',
    }, {
        'id': '521d40d94f3a46ffbc91f3a804f07072',
        'department': '外科',
        'itemType': '皮肤',
        'item': '皮肤',
        'action': '',
        'result': '正常/潮红/苍白/发绀/黄染/色素沉着/@湿疹/糜烂/其他 ',
        'type': 'newline'
    }, {
        'id': 'e035d43b35ce41d5b507096893936ec8',
        'department': '外科',
        'itemType': '淋巴结',
        'item': '淋巴结',
        'action': '',
        'result': '未触及/锁骨上/腋窝/其他 ',
    }, {
        'id': 'ef4e0d4c230f447694e7f09bff6b210b',
        'department': '外科',
        'itemType': '头部',
        'item': '头部',
    }, {
        'id': '8df68d987e6144bc9b8fe8cad741667b',
        'department': '外科',
        'itemType': '颈部',
        'item': '颈部',
        'action': '',
        'result': '正常/甲状腺肿大/颈部外伤/其他',
    }, {
        'id': 'c5b3a0e3664e4643824a63db03fa6fc1',
        'department': '外科',
        'itemType': '脊柱',
        'item': '脊柱',
        'action': '',
        'result': '正常/脊柱侧弯/脊柱矫正中/脊柱术后/脊柱呈@S型/腰间盘突出/脊柱后凸/其他',
        'type': 'newline'
    }, {
        'id': '6e24ba8a4d62496892a668ce7db49bcc',
        'department': '外科',
        'itemType': '四肢',
        'item': '四肢',
        'action': '',
        'result': '正常/骨折及骨折史/残疾/先天畸形/扁平足/@跛行/其他',
        'type': 'newline'
    }, {
        'id': '2bbae6cfd92344a08eb45f15007fa388',
        'department': '外科',
        'itemType': '胸部',
        'item': '胸部',
        'action': '',
        'result': '正常/桶装胸/扁平胸/鸡胸/漏斗胸/胸廓不对称/肋骨@畸形/胸骨畸形/胸部手术疤痕/其他',
        'type': 'newline'
    }, {
        'id': '539d3d6760244375bfb341e4956a9ec5',
        'department': '外科',
        'itemType': '其他记录',
        'item': '其他记录',
        'action': '',
        'result': '文本内容',
    }, {
        'id': 'ca4ec19af43a43039238550b48a2370f',
        'department': '内科',
        'itemType': '心',
        'item': '心',
        'action': '',
        'result': '正常/病理性杂音/早搏/心率不齐/心动过速@/先心术后/心动过缓/其他',
        'type': 'newline'
    }, {
        'id': '83cf8b5a86c24a4abbb41c82e6cc5986',
        'department': '内科',
        'itemType': '肺',
        'item': '肺',
        'action': '',
        'result': '正常/哮鸣音/干啰音/湿啰音/干湿啰音/呼吸音@粗/胸膜摩擦音/其他',
        'type': 'newline'
    }, {
        'id': 'd1c02fea23e34848a5b078f82651119f',
        'department': '内科',
        'itemType': '肝',
        'item': '肝',
    }, {
        'id': '0e5bf11d0b3a4324b0af981fdefe012b',
        'department': '内科',
        'itemType': '脾',
        'item': '脾',
    }, {
        'id': '09377ddd3f194ac5b81d6b825e2d3d21',
        'department': '内科',
        'itemType': '其他记录',
        'item': '其他记录',
    }, {
        'id': '922a93344d9846808028008b540d3190',
        'department': '检验科',
        'itemType': '肝功能',
        'item': '谷丙转氨酶ALT',
        'action': 'guansuan',
        'result': '数值，_ _ ,_ _ @单位为单位/升(U/L)',
        'type': 'newline'
    }, {
        'department': '检验科',
        'itemType': '肝功能',
        'item': '总胆红素TBIL',
    }, {
        'id': 'd66e98043e5b476e89780618c604a79e',
        'department': '检验科',
        'itemType': '血红蛋白',
        'item': '血红蛋白',
        'action': 'xuehong',
        'result': '数值，_ _ ,_ _ @单位为克/升(g/L)',
        'type': 'newline'
    }, {
        'id': '4bcb26ee81bf4df5a83572a9f3fabc20',
        'department': '检验科',
        'itemType': '结核菌素实验',
        'item': '结核菌素实验',
        'action': '',
        'result': '阳性/阴性'
    }, {
        'id': '940e39103fff4417958072f3866bda2c',
        'department': '检验科',
        'itemType': '其他化验结果',
        'item': '其他化验结果',
        'action': '',
        'result': '文本内容'
    }, {
        'id': '286e2367e6e84bb7a004b0ad316d32c8',
        'department': '检查科',
        'itemType': '胸部X线检查',
        'item': '胸部X线检查',
        'action': '',
        'result': '未见异常/异常@异常需填写异常情况描述',
        'type': 'newline'
    }, {
        'id': '4f8f61a840f1496d827dddc87271c537',
        'department': '主检',
        'itemType': '结论',
        'item': '结论',
        'action': '',
        'result': '文本内容',
    }];
export {getexaminationPlan, gettexaminationItemConf};
