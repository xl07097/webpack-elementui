import Vue from 'vue'
import XEUtils from 'xe-utils'
import VXETablePluginElement from 'vxe-table-plugin-element'
import {
  VxeUI,
  // VxeAlert,
  // VxeAnchor,
  // VxeAnchorLink,
  // VxeAvatar,
  // VxeBadge,
  // VxeBreadcrumb,
  // VxeBreadcrumbItem,
  // VxeButton,
  // VxeButtonGroup,
  // VxeCalendar,
  // VxeCard,
  // VxeCarousel,
  // VxeCarouselItem,
  // VxeCheckbox,
  // VxeCheckboxGroup,
  // VxeCol,
  // VxeCollapse,
  // VxeCollapsePane,
  // VxeColorPicker,
  // VxeCountdown,
  // VxeDatePicker,
  // VxeDrawer,
  // VxeEmpty,
  // VxeForm,
  // VxeFormDesign,
  // VxeFormGather,
  // VxeFormGroup,
  // VxeFormItem,
  // VxeFormView,
  VxeIcon,
  // VxeIconPicker,
  // VxeImage,
  // VxeImageGroup,
  // VxeImagePreview,
  // VxeInput,
  // VxeLayoutAside,
  // VxeLayoutBody,
  // VxeLayoutContainer,
  // VxeLayoutFooter,
  // VxeLayoutHeader,
  // VxeLink,
  // VxeListDesign,
  // VxeListView,
  // VxeList,
  // VxeLoading,
  // VxeMenu,
  // VxeModal,
  // VxeNoticeBar,
  // VxeNumberInput,
  // VxeOptgroup,
  // VxeOption,
  // VxePager,
  // VxePasswordInput,
  // VxePrintPageBreak,
  // VxePrint,
  // VxePulldown,
  // VxeRadio,
  // VxeRadioButton,
  // VxeRadioGroup,
  // VxeRate,
  // VxeResult,
  // VxeRow,
  // VxeSelect,
  // VxeSlider,
  // VxeSteps,
  // VxeSwitch,
  // VxeTabPane,
  // VxeTableSelect,
  // VxeTabs,
  // VxeTag,
  // VxeTextEllipsis,
  // VxeText,
  // VxeTextarea,
  // VxeTip,
  VxeTooltip,
  // VxeTree,
  // VxeTreeSelect,
  // VxeUpload,
  // VxeWatermark,
} from 'vxe-pc-ui'
import {
  VxeTable,
  VxeColumn,
  VxeColgroup,
  VxeGrid,
  VxeToolbar,
} from 'vxe-table'

// 导入默认的语言
import zhCN from 'vxe-pc-ui/lib/language/zh-CN'

VxeUI.setI18n('zh-CN', zhCN)
VxeUI.setLanguage('zh-CN')

function lazyVxeUI(app) {
  // app.use(VxeButton)
  // app.use(VxeButtonGroup)
  // app.use(VxeDrawer)
  // app.use(VxeForm)
  // app.use(VxeFormGroup)
  // app.use(VxeFormItem)
  app.use(VxeIcon)
  // app.use(VxeLoading)
  // app.use(VxeModal)
  // app.use(VxePager)
  // app.use(VxePrint)
  app.use(VxeTooltip)
  // app.use(VxeUpload)
}

function lazyVxeTable(app) {
  app.use(VxeTable)
  app.use(VxeColumn)
  app.use(VxeColgroup)
  app.use(VxeGrid)
  app.use(VxeToolbar)
}

lazyVxeTable(Vue)
lazyVxeUI(Vue)

// VxeUI.use(VXETablePluginElement)

/**
 * 四舍五入金额，每隔3位逗号分隔，默认2位小数
 */
VxeUI.formats.add('formatMoney', {
  cellFormatMethod({ cellValue }, digits = 2) {
    return XEUtils.commafy(XEUtils.toNumber(cellValue), { digits })
  },
})
// 式化日期，默认 yyyy-MM-dd HH:mm:ss
VxeUI.formats.add('formatDate', {
  cellFormatMethod({ cellValue }, format) {
    return XEUtils.toDateString(cellValue, format || 'yyyy-MM-dd HH:mm:ss')
  },
})

// 格式化银行卡，默认每4位空格隔开
VxeUI.formats.add('formatBankcard', {
  cellFormatMethod({ cellValue }) {
    return XEUtils.commafy(XEUtils.toValueString(cellValue), {
      spaceNumber: 4,
      separator: ' ',
    })
  },
})
// 向下舍入,默认两位数
VxeUI.formats.add('formatCutNumber', {
  cellFormatMethod({ cellValue }, digits = 2) {
    return XEUtils.toFixed(XEUtils.floor(cellValue, digits), digits)
  },
})
// 四舍五入,默认两位数
VxeUI.formats.add('formatFixedNumber', {
  cellFormatMethod({ cellValue }, digits = 2) {
    return XEUtils.toFixed(XEUtils.round(cellValue, digits), digits)
  },
})
// 格式化性别
VxeUI.formats.add('formatSex', {
  cellFormatMethod({ cellValue }) {
    return cellValue ? (cellValue === '1' ? '男' : '女') : ''
  },
})
