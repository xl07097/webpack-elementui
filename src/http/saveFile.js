/**
 * @param {*} res 接口返回原始数据
 * @returns
 */
export const getExportName = (res) => {
  const { headers } = res
  return decodeURIComponent(headers['content-disposition'].replace(/\w+;filename=(.*)/, '$1'))
}

// let blob = new Blob([data], {
//     type: type                 // 'application/vnd.ms-excel'
// })

/**
 * @param {*} blob blob数据
 * @param {*} filename 文件名
 */
export const saveFile = (blob, filename) => {
  if ('msSaveOrOpenBlob' in navigator) {
    // 兼容edge
    window.navigator.msSaveOrOpenBlob(blob, filename)
  } else if (window.navigator.msSaveBlob) {
    window.navigator.msSaveBlob(blob, filename)
  } else {
    /* 火狐谷歌的文件下载方式 */
    const a = document.createElement('a')
    const href = window.URL.createObjectURL(blob)
    a.href = href
    a.download = filename
    document.body.appendChild(a)
    const evt = new MouseEvent('click', {
      bubbles: false,
      cancelable: true,
      view: window,
    })
    a.dispatchEvent(evt)
    window.URL.revokeObjectURL(href)
    setTimeout(() => {
      document.body.removeChild(a)
    }, 100)
  }
}
