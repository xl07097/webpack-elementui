/**
 *
 * @param {*} res 接口返回原始数据
 * @returns
 */
export const getExportName = (res) => {
  const { headers } = res;
  return decodeURIComponent(headers['content-disposition'].replace(/\w+;filename=(.*)/, '$1'));
};

/**
 *
 * @param {*} blob blob数据
 * @param {*} filename 文件名
 */
export const saveFile = (blob, filename) => {
  // let blob = new Blob([data], {
  //     type: type                 // 'application/vnd.ms-excel'
  // })
  if ('msSaveOrOpenBlob' in navigator) {
    // 兼容edge
    window.navigator.msSaveOrOpenBlob(blob, filename);
  }
  if (window.navigator && window.navigator.msSaveBlob) {
    window.navigator.msSaveBlob(blob, filename);
  } else {
    /* 火狐谷歌的文件下载方式 */
    let a = document.createElement('a');
    let href = window.URL.createObjectURL(blob);
    a.href = href;
    a.download = filename;
    document.body.appendChild(a);
    let evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(evt);
    window.URL.revokeObjectURL(href);
    setTimeout(() => {
      document.body.removeChild(a);
    }, 100);
  }
};
