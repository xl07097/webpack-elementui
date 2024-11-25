import axios from 'axios'
import { showMessage } from '@/utils/message'
import { baseStorage } from '@/utils/storage'
import store from '@/store/store'

let isRefresh = false // 是否在重新自动登录

let retryQueue = [] // 需要重新请求的队列

const instance = axios.create({
  // baseURL: 'http://localhost:3003',
  baseURL: '/api',
  // timeout: 10000,
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  xsrfCookieName: 'xcsrf',
  xsrfHeaderName: 'xcsrf',
})

instance.interceptors.request.use((config) => {
  const token = baseStorage.getItem('token')
  if (token) {
    config.headers.token = token
    config.headers['AuthToken'] = token
  }
  return config
})

instance.interceptors.response.use(
  async (res) => {
    let data = res.data
    if (res.request.responseType === 'blob') {
      try {
        const text = await res.data.text()
        data = JSON.parse(text)
      } catch (error) {
        return Promise.resolve(res)
      }
    }
    // 此时需要重新登录
    if (data.code === 300 || data.code === 1001) {
      const config = res.config
      const url = res.config.url
      if (!url.includes('/login') && !url.includes('/refreshToken')) {
        if (!isRefresh) {
          isRefresh = true
          return retryLogin(config)
        } else {
          return new Promise((resolve) => {
            // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
            retryQueue.push(() => {
              resolve(instance.request(config))
            })
          })
        }
      }
    }
    return Promise.resolve(data)
  },
  (err) => {
    const response = err.response
    const { status } = response
    switch (status) {
      case 404:
        showMessage('资源不存在')
        break
      case 500:
        showMessage('服务器异常')
        break
      default:
        showMessage('gaga')
        break
    }
    return Promise.reject(err)
  }
)

export default instance

async function retryLogin(config) {
  const refreshToken = baseStorage.getItem('refreshToken')
  if (!refreshToken) {
    store.dispatch('permission/resetLogin')
    return
  }
  const res = await instance.get('/refreshToken', {
    params: {
      refreshToken: refreshToken,
    },
  })
  if (res.code === 200) {
    baseStorage.setItem('token', res.data)
    isRefresh = false
    retryQueue.forEach((cb) => cb())
    retryQueue = []
    return instance.request(config)
  }
  store.dispatch('permission/resetLogin')
}
