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

export const formatPercent = (cellValue, fixed = 2) => {
  if (cellValue || cellValue === 0) {
    return Number((cellValue * 100).toFixed(fixed)) + '%'
  }
  return ''
}
