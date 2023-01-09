import VueI18n from "vue-i18n";
import Vue from "vue";
Vue.use(VueI18n);
import store from "@/store/store";

// 定义挂载文件
const i18n = new VueI18n({
  // locale: "zh", // 语言标识 //this.$i18n.locale // 通过切换locale的值来实现语言切换
  locale: store.state.app.locale , // localStorage.getItem('lang') || 'zh',
  messages: {
    zh: require("./language/zh"), 
    en: require("./language/en"),
  },
});

export default i18n