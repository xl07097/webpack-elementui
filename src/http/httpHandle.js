import { showMessage } from '@/utils/message'

import { getExportName, saveFile } from './saveFile'

// 响应状态码 弹框处理
export const responseHandle = ({ code, msg }) => {
  switch (code) {
    case 300:
      showMessage(msg)
      break
    case 500:
      showMessage(msg)
      break
    case 1001:
      showMessage(msg)
      break
    default:
      break
  }
}

// 下载文件流处理
export const downloadHandle = async (res) => {
  try {
    const text = await res.data.text()
    const json = JSON.parse(text)
    responseHandle(json)
    return {
      code: 1000,
      message: '',
    }
  } catch (_error) {
    const filename = getExportName(res)
    saveFile(res.data, filename)
    return {
      code: 200,
      message: '导出成功',
    }
  }
}
