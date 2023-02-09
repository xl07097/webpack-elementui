import { baseStorage, storage } from '@/utils/storage'

export default {
  namespaced: true,
  state: {
    locale: baseStorage.getItem('lang') || 'zh', // 菜单树
  },
  getters: {
    getAppData: (state) => (type) => {
      return state[type] || storage.getItem(type)
    },
  },
  mutations: {
    setLocale(state, payload) {
      state.locale = payload || 'zh'
    },
    setAppData(state, {type, data}){
      state[type] = data
      storage.setItem(type, data)
    }
  },
}
