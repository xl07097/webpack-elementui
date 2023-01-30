import axios from 'axios'
import { showMessage } from '@/utils/message'
import { storage } from '@/utils/storage'

let isRefresh = false // 是否在重新自动登录

let retryQueue = [] // 需要重新请求的队列

const instance = axios.create({
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
  const token = storage.getItem('token')
  if (token) {
    config.headers.token = token
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
      if (!res.config.url.includes('/login')) {
        if (!isRefresh) {
          isRefresh = true
          return instance
            .post('/login', {
              name: 'xueliang',
              password: '28b064f575db2448c49c1db52e067d6d',
            })
            .then((res) => {
              if (res.code === 200) {
                storage.setItem('token', res.data.token)
                isRefresh = false
                retryQueue.forEach((cb) => cb())
                retryQueue = []
                return instance.request(config)
              }
            })
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
