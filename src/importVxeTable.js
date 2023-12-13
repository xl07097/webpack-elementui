import Vue from 'vue';
import XEUtils from 'xe-utils';
import VXETablePluginElement from 'vxe-table-plugin-element'
import {
  // 核心
  VXETable,

  // 功能模块
  // Icon,
  Filter,
  // Menu,
  Edit,
  // Export,
  // Keyboard,
  // Validator,
  Header,
  Footer,

  // 可选组件
  Column,
  Colgroup,
  // Grid,
  // Toolbar,
  // Pager,
  Checkbox,
  // CheckboxGroup,
  // Radio,
  // RadioGroup,
  // RadioButton,
  // Input,
  // Textarea,
  // Button,
  // Modal,
  Tooltip,
  // Form,
  // FormItem,
  // FormGather,
  // Select,
  // Optgroup,
  // Option,
  // Switch,
  // List,
  // Pulldown,

  // 表格
  Table,
} from 'vxe-table';
// import zhCN from 'vxe-table/lib/locale/lang/zh-CN';

// 按需加载的方式默认是不带国际化的，自定义国际化需要自行解析占位符 '{0}'，例如：
// VXETable.setup({
//   i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args),
// });

// 表格功能
Vue.use(Header)
  .use(Footer)
  // .use(Icon)
  .use(Filter)
  .use(Edit)
  // .use(Menu)
  // .use(Export)
  // .use(Keyboard)
  // .use(Validator)

  // 可选组件
  .use(Column)
  .use(Colgroup)
  // .use(Grid)
  // .use(Toolbar)
  // .use(Pager)
  .use(Checkbox)
  // .use(CheckboxGroup)
  // .use(Radio)
  // .use(RadioGroup)
  // .use(RadioButton)
  // .use(Input)
  // .use(Textarea)
  // .use(Button)
  // .use(Modal)
  .use(Tooltip)
  // .use(Form)
  // .use(FormItem)
  // .use(FormGather)
  // .use(Select)
  // .use(Optgroup)
  // .use(Option)
  // .use(Switch)
  // .use(List)
  // .use(Pulldown)

  // 安装表格
  .use(Table);

VXETable.use(VXETablePluginElement)

// 给 vue 实例挂载内部对象，例如：
// Vue.prototype.$XModal = VXETable.modal
// Vue.prototype.$XPrint = VXETable.print
// Vue.prototype.$XSaveFile = VXETable.saveFile
// Vue.prototype.$XReadFile = VXETable.readFile

/**
 * 四舍五入金额，每隔3位逗号分隔，默认2位小数
 */
VXETable.formats.add('formatMoney', {
  cellFormatMethod ({ cellValue }, digits = 2) {
    return XEUtils.commafy(XEUtils.toNumber(cellValue), { digits })
  }
})
// 式化日期，默认 yyyy-MM-dd HH:mm:ss
VXETable.formats.add('formatDate', {
  cellFormatMethod ({ cellValue }, format) {
    return XEUtils.toDateString(cellValue, format || 'yyyy-MM-dd HH:mm:ss')
  }
})

// 格式化银行卡，默认每4位空格隔开
VXETable.formats.add('formatBankcard', {
  cellFormatMethod ({ cellValue }) {
    return XEUtils.commafy(XEUtils.toValueString(cellValue), { spaceNumber: 4, separator: ' ' })
  }
})
// 向下舍入,默认两位数
VXETable.formats.add('formatCutNumber', {
  cellFormatMethod ({ cellValue }, digits = 2) {
    return XEUtils.toFixed(XEUtils.floor(cellValue, digits), digits)
  }
})
// 四舍五入,默认两位数
VXETable.formats.add('formatFixedNumber', {
  cellFormatMethod ({ cellValue }, digits = 2) {
    return XEUtils.toFixed(XEUtils.round(cellValue, digits), digits)
  }
})
// 格式化性别
VXETable.formats.add('formatSex', {
  cellFormatMethod ({ cellValue }) {
    return cellValue ? (cellValue === '1' ? '男' : '女') : ''
  }
})