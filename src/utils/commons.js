/**
 * 深拷贝
 *
 * @returns
 */
const _toString = Object.prototype.toString

/**
 * 深克隆
 * ps：循环依赖有问题
 * @param {object | Array} target
 * @returns
 */
export const deepClone = (target) => {
  let result
  if (Array.isArray(target)) {
    result = []
    target.forEach((item) => {
      result.push(deepClone(item))
    })
  } else if (_toString.call(target) === '[object Object]') {
    result = {}
    Object.keys(target).forEach((key) => {
      result[key] = deepClone(target[key])
    })
  } else {
    result = target
  }

  return result
}

export const channelDeepClone = (data) => {
  return new Promise((resovle) => {
    const { port1, port2 } = new MessageChannel()
    port2.onmessage((event) => {
      resovle(event.data)
    })
    port1.postMessage(data)
  })
}

/**
 * 数组数据转换成tree
 * @param { Array } data
 * @returns {Array} 返回值
 */
export const array2Tree = (data, options = {}) => {
  const tmpMap = {}
  const tree = []
  const key = options.key || 'id'
  const parentKey = options.parentKey || 'pid'
  const childKey = options.childKey || 'children'

  data.forEach((item) => {
    tmpMap[item[key]] = item
  })

  data.forEach((item) => {
    if (tmpMap[item[parentKey]] && item[key] !== item[parentKey]) {
      if (!tmpMap[item[parentKey]][childKey])
        tmpMap[item[parentKey]][childKey] = []
      tmpMap[item[parentKey]][childKey].push(item)
    } else {
      tree.push(item)
    }
  })

  return tree
}

/**
 * tree转换成数据
 * @returns
 */
export const tree2Array = (tree) => {
  const list = []
  const stack = [...tree]
  while (stack.length) {
    const node = stack.shift()
    list.push({
      ...node,
      children: null,
    })
    if (node.children && node.children.length) {
      stack.push(...node.children)
    }
  }
  return list
}

/**
 * 延迟成功
 * @returns
 */
export const delay = (ms = 200) => {
  return new Promise((resovle) => setTimeout(resovle, ms))
}

/**
 * 延迟失败
 * @returns
 */
export function timeout(ms = 1000) {
  return new Promise((_, reject) => setTimeout(reject, ms))
}

export const lastIndex = (arr) => {
  return arr.length - 1
}

export const lastItem = (arr) => {
  return arr.at(-1)
}

export const getUrlParam = function (name) {
  // 获取url参数
  let reg = new RegExp('(^|&?)' + name + '=([^&]*)(&|$)', 'i')
  let r = window.location.href.substring(1).match(reg)
  if (r != null) {
    return decodeURI(r[2])
  }
  return undefined
}
import dayjs from 'dayjs'

/**
 * 打印美化
 * @param {*} packageInfo
 */
export const copyRightConsole = (packageInfo) => {
  /* 样式代码 */
  const projectNameStyle =
    'font-size: 20px;font-weight: 600;color: rgb(244,167,89);'
  const descriptionStyle =
    'font-style: oblique;font-size:14px;color: rgb(244,167,89);font-weight: 400;'
  const versionStyle = 'color: rgb(30,152,255);padding:8px 0 2px;'
  const contentStyle = 'color: rgb(30,152,255);padding:0 0 2px;'
  const dateTimeStyle = 'color: rgb(30,152,255);padding:0 0 5px;'

  /* 内容代码 */
  const projectName = packageInfo.name || ''
  const description = packageInfo.description || ''
  const version = `版 本 号：${packageInfo.version}`
  const dateTime = `编译日期：${dayjs().format('YYYY-MM-DD HH:mm:ss')}`
  const releaseDateTime = `发布时间：${dayjs(window.REALEASE_DATE_TIME).format(
    'YYYY-MM-DD HH:mm:ss'
  )}`

  // 空格有意义，不要格式化
  console.log(
    `%c${description} %c${projectName}
%c${version}
%c${releaseDateTime}
%c${dateTime}`,
    projectNameStyle,
    descriptionStyle,
    versionStyle,
    contentStyle,
    dateTimeStyle
  )
}

export const debounce = function (fn, delay = 300) {
  let timerId = null
  return function (...args) {
    const ctx = this
    if (timerId) {
      clearTimeout(timerId)
    }
    timerId = setTimeout(() => {
      fn.apply(ctx, ...args)
    }, delay)
  }
}

export const throttle = function throttle(fn, delay = 300) {
  let timerId = null
  return function (...args) {
    const ctx = this
    if (timerId) {
      return
    }
    timerId = setTimeout(() => {
      fn.apply(ctx, ...args)
      timerId = null
    }, delay)
  }
}

/**
 * 验证字符串是否符合正则
 * @param {RegExp} regExp 正则表达式
 * @param {string} str 验证字符串
 * @returns
 */
export const regExpMatch = (regExp, str) => {
  return regExp.test((str || '').toLowerCase())
}

import router from '../router'
/**
 * 路由跳转公共方法
 * @param {object} link
 * @returns
 */
export const linkRouter = ({ query, path, params }) => {
  if (query) {
    router.push({
      path: path,
      query: query,
    })
    return
  }
  router.push({
    name: link.path,
    params: params,
  })
}

/**
 * 生成唯一的ID
 * @method guid
 * @grammar guid() => String
 * @grammar guid( prefx ) => String
 */
export const guid = (function () {
  var counter = 0

  return function (prefix) {
    var guid = (+new Date()).toString(32),
      i = 0

    for (; i < 5; i++) {
      guid += Math.floor(Math.random() * 65535).toString(32)
    }

    return (prefix || 'xsy_') + guid + (counter++).toString(32)
  }
})()

/**
 * 临时id生成器
 */
export const useId = (() => {
  let id = 0
  return () => {
    id++
    return 'T' + id
  }
})()

export const numberToChinese = function numberToChinese(num) {
  const chineseNumber = [
    '零',
    '壹',
    '贰',
    '叁',
    '肆',
    '伍',
    '陆',
    '柒',
    '捌',
    '玖',
  ]
  const chineseUnit = ['', '拾', '佰', '仟', '万', '亿']
  //对应小数部分单位
  var cnDecUnits = ['角', '分', '毫', '厘']

  let result = ''
  let unitIndex = 0
  // 处理特殊情况：零
  if (num === 0) {
    return chineseNumber[num]
  }
  // 处理负数
  if (num < 0) {
    result += '负'
    num = Math.abs(num)
  }
  // 转换为字符串，便于逐位处理
  const numString = num.toString()
  for (let i = numString.length - 1; i >= 0; i--) {
    const digit = parseInt(numString[i])
    let digitResult = ''
    if (digit > 0) {
      digitResult += chineseNumber[digit]
      digitResult += chineseUnit[unitIndex]
    }
    result = digitResult + result
    unitIndex++
  }
  return result
}
