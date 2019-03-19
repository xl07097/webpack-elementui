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
        'department': '视力',
        'itemType': '视力',
        'item': '右眼',
        'action': '1166bb360c164301af0dcd511dc51d5b',
        'unit': '度',
        'result': '数值， _._ ',
    },
    {
        'department': '视力',
        'itemType': '视力',
        'item': '左眼',
        'action': '0c2345886b404c20b11644016de790fb',
        'unit': '度',
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
        'unit': '度',
        'result': '数值， _._ ',
    },
    {
        'department': '眼科',
        'itemType': '屈光',
        'item': '右眼',
        'action': '',
        'unit': '',
        'result': '否/是 ',
    },
    {
        'department': '眼科',
        'itemType': '屈光',
        'item': '左眼',
        'action': '',
        'unit': '',
        'result': '否/是 ',
    },
    {
        'department': '眼科',
        'itemType': '近视',
        'item': '右眼',
        'action': '',
        'unit': '',
        'result': '否/是 ',
    },
    {
        'department': '眼科',
        'itemType': '近视',
        'item': '左眼',
        'action': '',
        'unit': '',
        'result': '否/是 ',
    },
    {
        'department': '眼科',
        'itemType': '沙眼',
        'item': '右眼',
        'action': '',
        'unit': '',
        'result': '阴性/沙凝/阳性 ',
    },
    {
        'department': '眼科',
        'itemType': '沙眼',
        'item': '左眼',
        'action': '',
        'unit': '',
        'result': '阴性/沙凝/阳性 ',
    },
    {
        'department': '眼科',
        'itemType': '结膜炎',
        'item': '结膜炎',
        'action': '',
        'unit': '',
        'result': '阴性/阳性 ',
    },
    {
        'department': '眼科',
        'itemType': '色觉',
        'item': '色盲',
        'action': '',
        'unit': '',
        'result': '正常/异常 ',
    },
    {
        'department': '眼科',
        'itemType': '色觉',
        'item': '色弱',
        'action': '',
        'unit': '',
        'result': '正常/异常 ',
    },
    {
        'department': '屈光度',
        'itemType': '右眼',
        'item': 'S',
        'unit': '度',
        'action': 'c8996f32cd6944aeb5b7c6052e4ffd26',
        'result': '数值， _._',
    },
    {
        'department': '屈光度',
        'itemType': '右眼',
        'item': 'C',
        'unit': '度',
        'action': 'c8996f32cd6944aeb5b7c6052e4ffd26',
        'result': '数值， _._',
    },
    {
        'department': '屈光度',
        'itemType': '右眼',
        'item': 'A',
        'unit': '度',
        'action': 'c8996f32cd6944aeb5b7c6052e4ffd26',
        'result': '数值， _._',
    },
    {
        'department': '屈光度',
        'itemType': '左眼',
        'item': 'S',
        'unit': '度',
        'action': 'a407b18e30784039b49e6a65fe2e0045',
        'result': '数值， _._',
    },
    {
        'department': '屈光度',
        'itemType': '左眼',
        'item': 'C',
        'unit': '度',
        'action': 'a407b18e30784039b49e6a65fe2e0045',
        'result': '数值， _._',
    },
    {
        'department': '屈光度',
        'itemType': '左眼',
        'item': 'A',
        'unit': '度',
        'action': 'a407b18e30784039b49e6a65fe2e0045',
        'result': '数值， _._',
    },
    {
        'department': '屈光度',
        'itemType': 'PD',
        'item': 'PD',
        'action': '11',
        'unit': 'mm',
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
        'unit': '颗',
        'result': '无有'
    },
    // {
    //     'department': '口腔科',
    //     'itemType': '龋患牙数',
    //     'item': '乳牙',
    //     'action': 'b3a8a3525b4a41879a3711fad851f7e2',
    //     'unit': '',
    //     'result': '数值，_ ，_ ',
    // },
    {
        'department': '口腔科',
        'itemType': '龋患牙数',
        'item': '龋患牙数',
        'action': 'f17b10c29f354b778de8752aa0b745f9',
        'unit': '颗',
        'result': '数值，_ ，_ ',
    },
    // {
    //     'department': '口腔科',
    //     'itemType': '龋失牙数',
    //     'item': '乳牙',
    //     'action': '9f60daf57a544993ad86e9e3f4e7575f',
    //     'unit': '',
    //     'result': '数值，_ ，_ ',
    // },
    {
        'department': '口腔科',
        'itemType': '龋失牙数',
        'item': '龋失牙数',
        'action': '302555030f844a12970c432401033b51',
        'unit': '颗',
        'result': '数值，_ ，_ ',
    },
    // {
    //     'department': '口腔科',
    //     'itemType': '龋补牙数',
    //     'item': '乳牙',
    //     'action': '25e2916dd6514653992dadfedec95b7a',
    //     'unit': '',
    //     'result': '数值，_ ，_ ',
    // },
    {
        'department': '口腔科',
        'itemType': '龋补牙数',
        'item': '龋补牙数',
        'action': '00d990328454449f9911199c84ebf480',
        'unit': '颗',
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
        'unit': 'mm',
        'result': '（月/日/时）'
    },
    {
        'department': '结核菌素皮肤试验检查',
        'itemType': '硬结直径（横径x纵径）',
        'item': '硬结直径（横径x纵径）',
        'action': '8',
        'unit': 'mm',
        'result': '数值，_ _ ,_ _ @单位为毫米(mm)',
        'type': 'newline'
    },
    {
        'department': '结核菌素皮肤试验检查',
        'itemType': '平均直径',
        'item': '平均直径',
        'action': '9',
        'unit': 'mm',
        'result': '数值，_ _ ,_ _ @单位为毫米(mm)',
        'type': 'newline'
    },
    {
        'department': '结核菌素皮肤试验检查',
        'itemType': '注射后局部情况',
        'item': '注射后局部情况',
        'action': '',
        'unit': 'mm',
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
        'unit': 'mm',
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
    // {
    //     'id': '1239fd8aaea54009aadea6ab822aef2b',
    //     'checkId': ['1239fd8aaea54009aadea6ab822aef2b', '7131737d290147fbb2794e4e2f984568'],
    //     'department': '问诊',
    //     'itemType': '既往病史',
    //     'action': '',
    //     'item': '肝炎',
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '既往病史',
    //     'item': '肺结核',
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '既往病史',
    //     'item': '肺结核密切接触史',
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '既往病史',
    //     'item': '先天性心脏病',
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '既往病史',
    //     'item': '肾炎',
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '既往病史',
    //     'item': '风湿病',
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '既往病史',
    //     'item': '哮喘',
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '既往病史',
    //     'item': '过敏性疾病',
    // },
    // {
    //     'department': '问诊',
    //     'id': '7131737d290147fbb2794e4e2f984568',
    //     'itemType': '其他不适症状说明',
    //     'item': '其他不适症状说明',
    //     'action': '',
    //     'result': '文本内容',
    // },
    // {
    //     'department': '问诊',
    //     'id': '086ad0d39f774070b6146c69cae21515',
    //     'checkId': ['086ad0d39f774070b6146c69cae21515', '95879f519a0844bebc63002a67334535'],
    //
    //     'itemType': '残疾',
    //     'item': '视力',
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '残疾',
    //     'item': '听力',
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '残疾',
    //     'item': '言语',
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '残疾',
    //     'item': '肢体',
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '残疾',
    //     'item': '智力',
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '残疾',
    //     'item': '精神',
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '其他残疾说明',
    //     'item': '其他残疾说明',
    // },
    // {
    //     'department': '问诊',
    //     'id': '8f57e55b2bbd47949fec4c2faa72a6df',
    //     'checkId': ['8f57e55b2bbd47949fec4c2faa72a6df', '5a75a74c54274504a09581df7e2552ea'],
    //     'itemType': '近期不适应症',
    //     'item': '疲乏无力',
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '近期不适应症',
    //     'item': '低热',
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '近期不适应症',
    //     'item': '盗汗',
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '近期不适应症',
    //     'item': '胸痛',
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '近期不适应症',
    //     'item': '咳嗽',
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '近期不适应症',
    //     'item': '咳痰',
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '近期不适应症',
    //     'item': '食欲减退',
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '近期不适应症',
    //     'item': '消瘦',
    // },
    // {
    //     'department': '问诊',
    //     'itemType': '其他不适症状说明',
    //     'item': '其他不适症状说明',
    // },
    {
        'id':'8EE7B19DFAC74C7E898E983785800A0A',
        'department': '形体',
        'cid': '2239fd8aaea54009aadea6ab822aef2b',
        'itemType': '身高',
        'item': '身高'
    },
    {
        'id':'8EE7B19DFAC74C7E898E983785800A0A',
        'department': '形体',
        'cid': '75cab047bf274671bd0ca1834ec3da90',
        'itemType': '体重',
        'item': '体重'
    },
    {

        'id': '8e185be85aa84a69894d33bc80aee4dc',
        'cid': '85e664a24bb54df99332956306500355',
        'department': '生理功能',
        'itemType': '血压',
        'item': '收缩压'
    },
    {
        'id': '8e185be85aa84a69894d33bc80aee4dc',
        'cid': '85e664a24bb54df99332956306500355',
        'department': '生理功能',
        'itemType': '血压',
        'item': '舒张压'
    },
    {
        'id': '8e185be85aa84a69894d33bc80aee4dc',
        'cid': '65c75a15844f4436a5df4f36e59273a2',
        'department': '生理功能',
        'itemType': '脉搏',
        'item': '脉搏'
    },
    {
        'id': '3438ae5f1a8249c192c0e8abf1629210',
        'cid': '1166bb360c164301af0dcd511dc51d5b',
        'department': '视力',
        'itemType': '视力',
        'item': '右眼'
    },
    {
        'id': '3438ae5f1a8249c192c0e8abf1629210',
        'cid': '0c2345886b404c20b11644016de790fb',
        'department': '视力',
        'itemType': '视力',
        'item': '左眼'
    },
    {
        'id': '3438ae5f1a8249c192c0e8abf1629210',
        'cid': '6178ff6f2cc34219adf6644611aaccc5',
        'department': '视力',
        'itemType': '矫正视力',
        'item': '右眼'
    },
    {
        'id': '3438ae5f1a8249c192c0e8abf1629210',
        'cid': '4d8fc73468d74250a4f5c3cf5eb32898',
        'department': '视力',
        'itemType': '矫正视力',
        'item': '左眼'
    },
    {
        'id': 'a6efcc860d76449ab45de28bf128f769',
        'cid': 'c8996f32cd6944aeb5b7c6052e4ffd26',
        'department': '眼科',
        'itemType': '屈光',
        'item': '右眼'
    },
    {
        'id': 'a6efcc860d76449ab45de28bf128f769',
        'cid': 'a407b18e30784039b49e6a65fe2e0045',
        'department': '眼科',
        'itemType': '屈光',
        'item': '左眼'
    },
    {
        'id': 'a6efcc860d76449ab45de28bf128f769',
        'cid': '1c24013eece6486885dec9cfd84d8e62',
        'department': '眼科',
        'itemType': '近视',
        'item': '右眼'
    },
    {
        'id': 'a6efcc860d76449ab45de28bf128f769',
        'cid': 'cf9096be605947baa2c57f31469a8100',
        'department': '眼科',
        'itemType': '近视',
        'item': '左眼'
    },
    {
        'id': 'a6efcc860d76449ab45de28bf128f769',
        'cid': 'a26cba9ce895426cab9ef1bd39590949',
        'department': '眼科',
        'itemType': '沙眼',
        'item': '右眼'
    },
    {
        'id': 'a6efcc860d76449ab45de28bf128f769',
        'cid': '6d32ae688d3d49e595195bf15e1b82f2',
        'department': '眼科',
        'itemType': '沙眼',
        'item': '左眼'
    },
    {
        'id': 'a6efcc860d76449ab45de28bf128f769',
        'department': '眼科',
        'itemType': '结膜炎',
        'item': '结膜炎',
    },
    {
        'id': 'a6efcc860d76449ab45de28bf128f769',
        'cid': '6c0c7ba2d28b459c840925abd2a6cccb',
        'department': '眼科',
        'itemType': '色觉',
        'item': '色盲',
    },
    {
        'id': 'a6efcc860d76449ab45de28bf128f769',
        'cid': '280b02e3c19949acb7afb97321baef23',
        'department': '眼科',
        'itemType': '色觉',
        'item': '色弱',
    },
    {
        'id': 'e19ace3a2be24fbb9679c648fa868bc9',
        'cid': '53c41b00-00f2-46b8-be30-826a44eabe60',
        'department': '屈光度',
        'itemType': '右眼',
        'item': 'S',
    },
    {
        'id': 'e19ace3a2be24fbb9679c648fa868bc9',
        'cid': '53c41b00-00f2-46b8-be30-826a44eabe60',
        'department': '屈光度',
        'itemType': '右眼',
        'item': 'C',
    },
    {
        'id': 'e19ace3a2be24fbb9679c648fa868bc9',
        'cid': '53c41b00-00f2-46b8-be30-826a44eabe60',
        'department': '屈光度',
        'itemType': '右眼',
        'item': 'A',
    },
    {
        'id': 'e19ace3a2be24fbb9679c648fa868bc9',
        'cid': '53c41b00-00f2-46b8-be30-826a44eabe60',
        'department': '屈光度',
        'itemType': '左眼',
        'item': 'S',
    },
    {
        'id': 'e19ace3a2be24fbb9679c648fa868bc9',
        'cid': '53c41b00-00f2-46b8-be30-826a44eabe60',
        'department': '屈光度',
        'itemType': '左眼',
        'item': 'S',
    },
    {
        'id': 'e19ace3a2be24fbb9679c648fa868bc9',
        'cid': '53c41b00-00f2-46b8-be30-826a44eabe60',
        'department': '屈光度',
        'itemType': '左眼',
        'item': 'A',
    },
    {
        'id': 'e19ace3a2be24fbb9679c648fa868bc9',
        'cid': '53c41b00-00f2-46b8-be30-826a44eabe60',
        'department': '屈光度',
        'itemType': 'PD',
        'item': 'PD',
    },
    {
        'id': 'b8b0af7f6dab499281ceb9dc31ff2dcb',
        'cid': '105e7d5a2f6143b389161095a9e0b67b',
        'department': '口腔科',
        'itemType': '齿列',
        'item': '齿列'
    },
    {
        'id': 'b8b0af7f6dab499281ceb9dc31ff2dcb',
        'cid':'0783f1f2ed1c468aaec51940ae642dff',
        'department': '口腔科',
        'itemType': '牙周',
        'item': '牙周',
    },
    {
        'id': 'b8b0af7f6dab499281ceb9dc31ff2dcb',
        'cid':'e8939b0116384bd8a7cb6c5b6690c3de',
        'department': '口腔科',
        'itemType': '龋齿',
        'item': '龋齿'
    },
    {
        'id': 'b8b0af7f6dab499281ceb9dc31ff2dcb',
        'cid':'f17b10c29f354b778de8752aa0b745f9',
        'department': '口腔科',
        'itemType': '龋患牙数',
        'item': '龋患牙数'
    },
    {
        'id': 'b8b0af7f6dab499281ceb9dc31ff2dcb',
        'cid':'302555030f844a12970c432401033b51',
        'department': '口腔科',
        'itemType': '龋失牙数',
        'item': '龋失牙数'
    },
    {
        'id': 'b8b0af7f6dab499281ceb9dc31ff2dcb',
        'cid':'00d990328454449f9911199c84ebf480',
        'department': '口腔科',
        'itemType': '龋补牙数',
        'item': '龋补牙数'
    },
    {
        'id': 'b8b0af7f6dab499281ceb9dc31ff2dcb',
        'cid':'dfd5e88d178148d5a3bcc2e5b10f9a0c',
        'department': '口腔科',
        'itemType': '其他记录',
        'item': '其他记录'
    },
    {
        'id': 'da0d6ae217f744ffb68ad147f5bdb28b',
        'cid':'be7f87873037471da76ef669d88dcb8d',
        'department': '耳鼻喉科',
        'itemType': '耳',
        'item': '耳'
    },
    {
        'id': 'da0d6ae217f744ffb68ad147f5bdb28b',
        'cid':'45b7f2a91b924cef87a1d588e4b02253',
        'department': '耳鼻喉科',
        'itemType': '鼻',
        'item': '鼻'
    },
    {
        'id': 'da0d6ae217f744ffb68ad147f5bdb28b',
        'cid':'6105651b9348479098adfb47b5aacdcb',
        'department': '耳鼻喉科',
        'itemType': '喉',
        'item': '喉'
    },
    {
        'id': '7c59edca1a434725b9b11702876858b3',
        'cid':'521d40d94f3a46ffbc91f3a804f07072',
        'department': '外科',
        'itemType': '皮肤',
        'item': '皮肤',
        'action': ''
    },
    {
        'id': '7c59edca1a434725b9b11702876858b3',
        'cid':'e035d43b35ce41d5b507096893936ec8',
        'department': '外科',
        'itemType': '淋巴结',
        'item': '淋巴结'
    },
    {
        'id': '7c59edca1a434725b9b11702876858b3',
        'cid':'ef4e0d4c230f447694e7f09bff6b210b',
        'department': '外科',
        'itemType': '头部',
        'item': '头部'
    },
    {
        'id': '7c59edca1a434725b9b11702876858b3',
        'cid':'8df68d987e6144bc9b8fe8cad741667b',
        'department': '外科',
        'itemType': '颈部',
        'item': '颈部'
    },
    {
        'id': '7c59edca1a434725b9b11702876858b3',
        'cid':'c5b3a0e3664e4643824a63db03fa6fc1',
        'department': '外科',
        'itemType': '脊柱',
        'item': '脊柱',
        'action': ''
    },
    {
        'id': '7c59edca1a434725b9b11702876858b3',
        'cid':'6e24ba8a4d62496892a668ce7db49bcc',
        'department': '外科',
        'itemType': '四肢',
        'item': '四肢',
        'action': ''
    },
    {
        'id': '7c59edca1a434725b9b11702876858b3',
        'cid':'2bbae6cfd92344a08eb45f15007fa388',
        'department': '外科',
        'itemType': '胸部',
        'item': '胸部',
        'action': ''
    },
    {
        'id': '7c59edca1a434725b9b11702876858b3',
        'cid':'539d3d6760244375bfb341e4956a9ec5',
        'department': '外科',
        'itemType': '其他记录',
        'item': '其他记录'
    },
    {
        'id': 'f8845b0393d64726a9cc269d25ded5fd',
        'cid':'d1c02fea23e34848a5b078f82651119f',
        'department': '内科',
        'itemType': '近期不适症状（可多选）',
        'item': '近期不适症状（可多选）'
    },
    {
        'id': 'f8845b0393d64726a9cc269d25ded5fd',
        'cid':'d1c02fea23e34848a5b078f82651119f',
        'department': '内科',
        'itemType': '其他症状',
        'item': '其他症状'
    },
    {
        'id': 'f8845b0393d64726a9cc269d25ded5fd',
        'cid':'d1c02fea23e34848a5b078f82651119f',
        'department': '内科',
        'itemType': '心率',
        'item': '心率'
    },
    {
        'id': 'f8845b0393d64726a9cc269d25ded5fd',
        'cid':'d1c02fea23e34848a5b078f82651119f',
        'department': '内科',
        'itemType': '心脏杂音',
        'item': '心脏杂音'
    },
    {
        'id': 'f8845b0393d64726a9cc269d25ded5fd',
        'cid':'d1c02fea23e34848a5b078f82651119f',
        'department': '内科',
        'itemType': '心律',
        'item': '心律'
    },
    {
        'id': 'f8845b0393d64726a9cc269d25ded5fd',
        'cid':'d1c02fea23e34848a5b078f82651119f',
        'department': '内科',
        'itemType': '肺部罗音',
        'item': '肺部罗音'
    },
    {
        'id': 'f8845b0393d64726a9cc269d25ded5fd',
        'cid':'d1c02fea23e34848a5b078f82651119f',
        'department': '内科',
        'itemType': '肝',
        'item': '肝',
    },
    {
        'id': 'f8845b0393d64726a9cc269d25ded5fd',
        'cid':'0e5bf11d0b3a4324b0af981fdefe012b',
        'department': '内科',
        'itemType': '脾',
        'item': '脾',
    },
    {
        'id': 'f8845b0393d64726a9cc269d25ded5fd',
        'cid':'09377ddd3f194ac5b81d6b825e2d3d21',
        'department': '内科',
        'itemType': '其他记录',
        'item': '其他记录',
    },
    {
        'id': 'd56fcfc34fa94d99a4e3ea5ce775a1f7',
        'cid':'06614cc576f743f19ab58d60729b9786',
        'department': '检验科',
        'itemType': '肝功能',
        'item': '谷丙转氨酶ALT'
    },
    {
        'id': 'd56fcfc34fa94d99a4e3ea5ce775a1f7',
        'cid':'ae6d475c3a3a4c5687195b6da1beb567',
        'department': '检验科',
        'itemType': '肝功能',
        'item': '总胆红素TBIL'
    },
    {
        'id': 'd56fcfc34fa94d99a4e3ea5ce775a1f7',
        'cid':'d66e98043e5b476e89780618c604a79e',
        'department': '检验科',
        'itemType': '血红蛋白',
        'item': '血红蛋白'
    },
    {
        'id': 'd56fcfc34fa94d99a4e3ea5ce775a1f7',
        'cid':'940e39103fff4417958072f3866bda2c',
        'department': '检验科',
        'itemType': '其他化验结果',
        'item': '其他化验结果'
    },
    {
        'id': '920a5cf8cd2848aa91995f80888291b9',
        'cid':'e13b1c80e9dd45c89e94ebe3f04c3b7f',
        'department': '结核病筛查检查',
        'itemType': '确认有无卡介苗接种史或卡痕？',
        'item': '确认有无卡介苗接种史或卡痕'
    },
    {
        'id': '920a5cf8cd2848aa91995f80888291b9',
        'cid':'e13b1c80e9dd45c89e94ebe3f04c3b7f',
        'department': '结核病筛查检查',
        'itemType': '其他化验结果',
        'item': '其他化验结果'
    },
    {
        'id': 'e0449ee79436491d9ae149287c023efe',
        'cid':'cdc1a9ed-8220-4914-bd23-0e2bff92b6e6',
        'department': '结核菌素皮肤试验检查',
        'itemType': '注射时间',
        'item': '注射时间'
    },
    {
        'id': 'e0449ee79436491d9ae149287c023efe',
        'cid':'cdc1a9ed-8220-4914-bd23-0e2bff92b6e6',
        'department': '结核菌素皮肤试验检查',
        'itemType': '硬结直径（横径x纵径）',
        'item': '硬结直径（横径x纵径）'
    },
    {
        'id': 'e0449ee79436491d9ae149287c023efe',
        'cid':'cdc1a9ed-8220-4914-bd23-0e2bff92b6e6',
        'department': '结核菌素皮肤试验检查',
        'itemType': '平均直径',
        'item': '平均直径'
    },
    {
        'id': 'e0449ee79436491d9ae149287c023efe',
        'cid':'cdc1a9ed-8220-4914-bd23-0e2bff92b6e6',
        'department': '结核菌素皮肤试验检查',
        'itemType': '注射后局部情况',
        'item': '注射后局部情况'
    },
    {
        'id': 'e0449ee79436491d9ae149287c023efe',
        'cid':'cdc1a9ed-8220-4914-bd23-0e2bff92b6e6',
        'department': '结核菌素皮肤试验检查',
        'itemType': '检验反应时间',
        'item': '检验反应时间'
    },
    {
        'id': 'e0449ee79436491d9ae149287c023efe',
        'cid':'cdc1a9ed-8220-4914-bd23-0e2bff92b6e6',
        'department': '结核菌素皮肤试验检查',
        'itemType': '结果判定',
        'item': '结果判定'
    },
    {
        'id': 'd1477eb2c08546c98bc46d71ede96c65',
        'cid':'286e2367e6e84bb7a004b0ad316d32c8',
        'department': '检查',
        'itemType': '胸部X线检查',
        'item': '胸部X线检查'
    },
    {
        'id': '4CB1D6E85926467392DC1E194032AAF9',
        'cid':'4f8f61a840f1496d827dddc87271c537',
        'department': '主检',
        'itemType': '结论',
        'item': '结论'
    }];
export {getexaminationPlan, gettexaminationItemConf};
