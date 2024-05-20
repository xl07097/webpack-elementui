import { baseStorage, storage } from '@/utils/storage'

export default {
  namespaced: true,
  state: {
    locale: baseStorage.getItem('lang'),
  },
  getters: {
    getAppData: (state) => (type) => {
      return state[type] || storage.getItem(type)
    },
  },
  mutations: {
    setLocale(state, payload) {
      state.locale = payload
    },
    setAppData(state, { type, data }) {
      state[type] = data
      storage.setItem(type, data)
    },
  },
}
