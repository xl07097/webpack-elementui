import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import ElementLocale from 'element-ui/lib/locale'

import store from '@/store/store'
import zh from './language/zh'
import en from './language/en'

Vue.use(VueI18n)

let locale = store.state.app.locale
if (!locale) {
  locale = navigator.language || 'zh-CN'
}

// 定义挂载文件
const i18n = new VueI18n({
  // locale: "zh", // 语言标识 //this.$i18n.locale // 通过切换locale的值来实现语言切换
  locale: locale, // localStorage.getItem('lang') || 'zh',
  messages: {
    'zh-CN': {
      ...zh,
      ...zhLocale,
    },
    en: {
      ...en,
      ...enLocale,
    },
  },
})

ElementLocale.i18n((key, value) => i18n.t(key, value))

export default i18n
