import { baseStorage } from "@/utils/storage"

export default {
  namespaced: true,
  state: {
    locale: baseStorage.getItem('lang') || 'zh', // 菜单树
  },
  mutations: {
    setLocale(state, payload) {
      state.locale = payload || 'zh'
    },
  },
}
