function getExportName(res) {
    const { headers } = res;
    return headers['content-disposition'].replace(/\w+;filename=(.*)/, '$1')
}

export function saveFile(data, filename, type) {
    let blob = new Blob([data], {
        type: type                 // 'application/vnd.ms-excel'
    })
    if ('msSaveOrOpenBlob' in navigator) { // 兼容edge

        window.navigator.msSaveOrOpenBlob(blob, filename)
    }
    if (window.navigator && window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, filename)
    } else {
        /* 火狐谷歌的文件下载方式 */
        let a = document.createElement('a')
        let href = window.URL.createObjectURL(blob)
        a.href = href
        a.download = filename
        document.body.appendChild(a)
        let evt = document.createEvent('MouseEvents');
        evt.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(evt)
        window.URL.revokeObjectURL(href)
        document.body.removeChild(a)
    }
}