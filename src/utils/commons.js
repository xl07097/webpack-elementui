/**
 * 深拷贝
 *
 * @returns
 */
const _toString = Object.prototype.toString

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

/**
 * 数组数据转换成tree
 * @param {*} data
 * @returns
 */
export const array2Tree = (data, options) => {
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
      if (!tmpMap[item[parentKey]][childKey]) tmpMap[item[parentKey]][childKey] = []
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
