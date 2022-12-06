/**
 * @author xueliang
 * @date 2021-10-09
 * @update
 * 数据验证工具库
 */

class Validate {
  constructor() {}

  static isEmpty(value) {
    return value === null || value === void 0 || value === ''
  }

  static isUndefined(value) {
    return typeof value === 'undefined'
  }

  static isNumber(value) {
    return typeof value === 'number'
  }

  static isMobile(value) {
    return /^1[3456789]\d{9}$/.test(value)
  }

  static isIdCard(value) {
    return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)
  }

  static isExcel(name) {
    return /(\.xls|\.xlsx)$/.test(name.toLowerCase())
  }

  static isImage(name) {
    return /(\.jpg|\.jpeg|\.png)$/.test(name.toLowerCase())
  }

  static isOutLimit(size, limit) {
    return size > limit * 1024 * 1024
  }

  static isOutTimeInteval(end, start, limit) {
    return new Date(end).getTime() - new Date(start).getTime() > limit * 1000 * 24 * 60 * 60
  }

  static fileChanged(file) {
    return new Promise((resolve, reject) => {
      file
        .slice(0, 1) // only the first byte
        .arrayBuffer() // try to read
        .then(resolve)
        .catch(() => {
          // showToast('文件已经改动，不能上传，请重新选择', '提示', 'warning')
          reject()
        })
    })
  }
}
