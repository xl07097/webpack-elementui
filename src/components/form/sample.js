
export default {
  fields: [
    { type: 'input', label: '项目名称', prop: 'name' },
    {
      type: 'select',
      prop: 'businessType1',
      label: '产品类型',
      config: {
        list: [{ value: '1', label: '产品1' }],
      },
    },
    {
      type: 'select',
      prop: 'GENDER',
      label: '产品类型',
      config: {
        // 这个是啥会用url
        request: {
          url: '',
          method: 'GET',
          data: {},
          handleData: (res) => {
            return res.data.GENDER.map((item) => {
              return {
                value: item.dictValue,
                label: item.dictName,
              };
            });
          },
        },
      },
    },
    {
      type: 'select',
      prop: 'GENDER',
      label: '产品类型',
      config: {
        // 这个是使用已写好的有缓存功能的方法
        request: {
          cacheRequest: 'getGender',
          data: {},
          handleData: (res) => {
            return res.data.GENDER.map((item) => {
              return {
                value: item.dictValue,
                label: item.dictName,
              };
            });
          },
        },
      },
    },
    {
      type: 'select',
      prop: 'GENDER',
      label: '产品类型',
      config: {
        // 这个是使用实时搜索方式
        request: {
          remote: true,
          remoteMethod: async () => {
            return fetch('http://localhost:3003/dict/options', {
              method: 'POST',
              headers: {
                AuthToken: 'W88G0R46WEUP9JXKOF6H71WI',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(['GENDER']),
            }).then((res) => res.json());
          },
          handleData: (res) => {
            return res.data.GENDER.map((item) => {
              return {
                value: item.dictValue,
                label: item.dictName,
              };
            });
          },
        },
      },
    },
    { type: 'month', label: '月份', prop: 'month1' },
    { type: 'date', label: '日期', prop: 'date1' },
    {
      type: 'daterange',
      label: '日期范围',
      prop: 'daterangeStart',
      endProp: 'daterangeEnd',
    },
    {
      type: 'monthrange',
      label: '月份范围',
      prop: 'monthStart',
      endProp: 'monthEnd',
    },
    { type: 'cascader', label: '部门', prop: 'cascader1' },
  ],
};
