import writeXlsxFile from 'write-excel-file';

export const generatorSchema = (columns, title, key) => {
  return columns.map((item) => {
    let field = item[key || 'prop'];
    const width = item.width || 140;
    return {
      column: item[title || 'title'],
      width: width / 5,
      value: (row) => row[field],
    };
  });
};

export const simpleExcel = (data, schema, fileName) => {
  writeXlsxFile(data, {
    schema,
    fileName,
  });
};

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
  });
};
