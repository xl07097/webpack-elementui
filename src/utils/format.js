import NP from 'number-precision'
/**
 * 单个字段求和
 * @param {*} data 数据
 * @param {*} prop 求和字段属性
 * @param {*} cnyType 币种
 * @returns {number | string}
 */
export const summation = (data, prop, fixed) => {
  let count = ''
  data.forEach((item) => {
    const num = item[prop]
    if (num || num === 0) {
      count = NP.plus(count || 0, num)
    }
  })
  if (count === '') {
    return ''
  }
  if (fixed) {
    return count.toFixed(fixed)
  }
  return Number(count.toFixed(2))
}

/**
 * table 合计行合计
 * @param {*} columnList
 * @param {*} param
 * @returns
 */
export const customerCalc = (columnList, param) => {
  const { columns, data } = param
  let sums = []
  columns.forEach((column, index) => {
    if (columnList.includes(column.property)) {
      sums[index] = summation(data, column.property, 2)
    } else {
      sums[index] = ''
    }
  })
  sums[0] = ['合计']
  return sums
}

/**
 * 数值千分位表示
 * @param {number|string} value
 * @param {number?} fixed
 * @returns {string}
 */
export const numberFormat = (value, fixed) => {
  if (value === null || value === undefined || value === '') {
    return ''
  }
  // 保留小数位，格式化浮点数
  if (fixed) {
    return formatFloat(value, fixed)
  }

  // 不保留小数位，格式化整数
  return formatInteger(value)
}

/**
 * 数值千分位，格式化整数
 * @param {number|string} value
 */
export const formatInteger = (value) => {
  return Number(value)
    .toFixed(0)
    .replace(/(\d)(?=(\d{3})+$)/g, '$1,')
}

/**
 * 数值千分位，格式化浮点数
 * @param {number|string} value
 * @param {number} fixed
 */
export const formatFloat = (value, fixed) => {
  return Number(value)
    .toFixed(fixed)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
}

export const commonFormatter = (cellValue) => {
  if (cellValue || cellValue === 0) {
    const value = String(cellValue)
    if (value.includes('.')) {
      return numberFormat(value, 2)
    }
    return formatInteger(value)
  }
  return ''
}

/**
 * 格式化百分比
 * @param {*} cellValue
 * @param {*} fixed
 * @returns
 */
export const formatPercent = (cellValue, fixed = 2) => {
  if (cellValue || cellValue === 0) {
    return Number((cellValue * 100).toFixed(fixed)) + '%'
  }
  return ''
}

/**
 * 格式化文件大小, 输出成带单位的字符串
 * @method formatSize
 * @grammar formatSize( size ) => String
 * @grammar formatSize( size, pointLength ) => String
 * @grammar formatSize( size, pointLength, units ) => String
 * @param {Number} size 文件大小
 * @param {Number} [pointLength=2] 精确到的小数点数。
 * @param {Array} [units=[ 'B', 'K', 'M', 'G', 'TB' ]] 单位数组。从字节，到千字节，一直往上指定。如果单位数组里面只指定了到了K(千字节)，同时文件大小大于M, 此方法的输出将还是显示成多少K.
 * @example
 * console.log( formatSize( 100 ) );    // => 100B
 * console.log( formatSize( 1024 ) );    // => 1.00K
 * console.log( formatSize( 1024, 0 ) );    // => 1K
 * console.log( formatSize( 1024 * 1024 ) );    // => 1.00M
 * console.log( formatSize( 1024 * 1024 * 1024 ) );    // => 1.00G
 * console.log( formatSize( 1024 * 1024 * 1024, 0, ['B', 'KB', 'MB'] ) );    // => 1024MB
 */
export const formatSize = function (size, pointLength, units) {
  let unit

  units = units || ['B', 'K', 'M', 'G', 'TB', 'P', 'E']

  while ((unit = units.shift()) && size > 1024) {
    size = size / 1024
  }

  return (unit === 'B' ? size : size.toFixed(pointLength || 2)) + unit
}

/**
 * 过去时间
 * @param {*} time 时间
 * @param {*} units 单位
 * @returns
 */
export const timeAgo = function (time, units) {
  let unit
  units = units || [' minute', ' hour', ' day']
  const between = Date.now() / 1000 - Number(time)

  while ((unit = units.shift()) && between >= 3600) {
    unit = ~~(between / 60)
  }
  return between + unit + 's'
}
