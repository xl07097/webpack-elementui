import { _ } from 'core-js';

export default {
  fields: [
    { type: 'input', label: '项目名称', prop: 'name' },
    { type: 'select',  prop: 'businessType1', label: '产品类型',
      config:{
        list: [
          { value: '1', label: '产品1' },
        ]
      } 
    },
    { type: 'month', label: '月份', prop: 'month1' },
    { type: 'date', label: '日期', prop: 'date1' },
    { type: 'daterange', label: '日期范围', prop: 'daterangeStart', endProp: 'daterangeEnd' },
    { type: 'monthrange', label: '月份范围', prop: 'monthStart', endProp: 'monthEnd' },
    { type: 'cascader', label: '部门', prop: 'cascader1' },
  ]
}