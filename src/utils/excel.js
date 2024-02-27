import writeXlsxFile from 'write-excel-file'

export const generatorSchema = (columns, option = {}) => {
  const title = option.title || 'title'
  const key = option.key || 'prop'
  const OriginWidth = option.width || 140
  return columns.map((item) => {
    const field = item[key]
    const width = item.width || OriginWidth
    return {
      column: item[title],
      width: width / 5,
      height: 24,
      value: (row) => row[field],
    }
  })
}

export const simpleExcel = (data, schema, fileName) => {
  writeXlsxFile(data, {
    schema,
    fileName,
  })
}

/**
 *
 * @param {*} data Object[][]
 * @param {*} fileName
 */
//{
//    value: 'name',
//    rowSpan: 1,
//    span: 2,
//    fontWeight: 'bold'
//},
export const complexExcel = (data, fileName) => {
  writeXlsxFile(data, {
    fileName,
  })
}

/**
 * table 表格动态合并单元格数据预处理
 * @param {Array} data 表格数据
 * @param {*} field 字段
 */
export const mergeExcel = function (data, field) {
  let count = 0
  let indexCount = 1
  while (indexCount < data.length) {
    let item = data[count]
    if (!item.merge) {
      item.merge = {
        colspan: 1,
      }
    }
    if (!item.merge.rowspan) {
      item.merge.rowspan = 1
    }
    if (item[field] === data[indexCount][field]) {
      item.merge.rowspan = item.merge.rowspan + 1
      data[indexCount].merge = data[indexCount].merge || { colspan: 1 }
      data[indexCount].merge.rowspan = 0
    } else {
      count = indexCount
    }
    indexCount++
  }
}
