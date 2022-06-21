;(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  ['chunk-0638f5b2'],
  {
    '5ad8': function (e, t, a) {},
    7907: function (e, t, a) {
      'use strict'
      a.d(t, 'e', function () {
        return u
      }),
        a.d(t, 'b', function () {
          return p
        }),
        a.d(t, 'a', function () {
          return m
        }),
        a.d(t, 'c', function () {
          return f
        }),
        a.d(t, 'd', function () {
          return b
        }),
        a.d(t, 'j', function () {
          return I
        }),
        a.d(t, 'i', function () {
          return v
        }),
        a.d(t, 'h', function () {
          return g
        }),
        a.d(t, 'g', function () {
          return y
        }),
        a.d(t, 'f', function () {
          return k
        })
      var r = a('4667'),
        s = a('07a4')
      function n(e) {
        return d(e) || l(e) || i(e) || o()
      }
      function o() {
        throw new TypeError(
          'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
        )
      }
      function i(e, t) {
        if (e) {
          if ('string' === typeof e) return c(e, t)
          var a = Object.prototype.toString.call(e).slice(8, -1)
          return (
            'Object' === a && e.constructor && (a = e.constructor.name),
            'Map' === a || 'Set' === a
              ? Array.from(e)
              : 'Arguments' === a || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)
              ? c(e, t)
              : void 0
          )
        }
      }
      function l(e) {
        if (
          ('undefined' !== typeof Symbol && null != e[Symbol.iterator]) ||
          null != e['@@iterator']
        )
          return Array.from(e)
      }
      function d(e) {
        if (Array.isArray(e)) return c(e)
      }
      function c(e, t) {
        ;(null == t || t > e.length) && (t = e.length)
        for (var a = 0, r = new Array(t); a < t; a++) r[a] = e[a]
        return r
      }
      var u = function (e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
          return Object(r['f'])('option/listCustomerGroup', e, t)
        },
        p = function (e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
          return Object(r['g'])('project/customers/listEnterprises', e, t)
        },
        m = function (e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
          return Object(r['f'])('sys/company/option/forSave', e, t)
        },
        f = function () {
          return new Promise(function (e, t) {
            var a = s['a'].state.common.cascader
            if (a.length) return e(a)
            Object(r['f'])('sys/dept/cascader/list', {})
              .then(function (a) {
                0 == a.code &&
                  a.data.length > 0 &&
                  (s['a'].commit('setCascader', Object.freeze(a.data[0].children)),
                  e(a.data[0].children)),
                  t()
              })
              ['catch'](function () {
                t()
              })
          })
        },
        b = function () {
          return new Promise(function (e, t) {
            var a = s['a'].state.common.dictionary
            if (Object.keys(a).length) return e(a)
            Object(r['f'])('project/project/option')
              .then(function (t) {
                if (0 == t.code) {
                  var a = t.data
                  s['a'].commit('setDictionary', Object.freeze(a)), e(a)
                }
              })
              ['catch'](function () {
                t()
              })
          })
        },
        h = function (e) {
          var t = [],
            a = function e(a, r) {
              var s = [].concat(n(r), [a.id])
              a.children && 0 !== a.children.length
                ? a.children.forEach(function (t) {
                    e(t, s)
                  })
                : t.push(s)
            }
          return (
            e.forEach(function (e) {
              a(e, [])
            }),
            t
          )
        },
        I = function (e) {
          return new Promise(function (t, a) {
            Object(r['f'])('sys/dept/queryCheckedTreeList', e)
              .then(function (e) {
                var r = e.code,
                  s = e.data
                if (0 !== r) a()
                else {
                  var n = s.treeModelVO[0].children,
                    o = h(n),
                    i = s.operationPrivilegeIdList || [],
                    l = o.filter(function (e) {
                      var t = e.at(-1)
                      return i.includes(t)
                    })
                  t({ dept: n, deptIdList: l })
                }
              })
              ['catch'](function () {
                a()
              })
          })
        },
        v = function (e) {
          var t = { level1: [], level2: [] },
            a = [],
            r = function e(a) {
              var r = 'level'.concat(a.level)
              void 0 === t[r] && (t[r] = []),
                t[r].includes(a.data.id) || t[r].push(a.data.id),
                null !== a.parent && e(a.parent)
            }
          for (var s in (e.forEach(function (e) {
            r(e)
          }),
          t))
            a.push.apply(a, n(t[s]))
          return a
        },
        g = function (e) {
          return new Promise(function (t, a) {
            Object(r['f'])('sys/param/value-list.do', e)
              .then(function (e) {
                0 != e.code ? a() : t(e.data)
              })
              ['catch'](a)
          })
        },
        y = function () {
          return new Promise(function (e, t) {
            var a = s['a'].state.common.recruitChannel
            if (a.length) return e(a)
            Object(r['f'])('sys/channel/list.do', { pageNo: 1, pageSize: 200 })
              .then(function (t) {
                if (0 == t.code) {
                  var a = t.data.records
                  s['a'].commit('setRecruitChannel', Object.freeze(a.records)), e(a)
                }
              })
              ['catch'](function () {
                t()
              })
          })
        },
        k = function () {
          return new Promise(function (e, t) {
            var a = s['a'].state.common.industry
            if (a.length) return e(a)
            Object(r['f'])('option/industry', {})
              .then(function (a) {
                if (0 == a.code)
                  return (
                    s['a'].commit('setIndustry', Object.freeze(a.data.industry)),
                    void e(a.data.industry || [])
                  )
                t()
              })
              ['catch'](function () {
                t()
              })
          })
        }
    },
    c291: function (e, t, a) {
      'use strict'
      a.r(t)
      var r = function () {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t
          return a(
            'div',
            {
              directives: [
                { name: 'loading', rawName: 'v-loading', value: e.loading, expression: 'loading' },
              ],
              staticClass: 'edit',
            },
            [
              a('ShHeader', { attrs: { title: e.title }, on: { back: e.close } }),
              a(
                'ElForm',
                {
                  ref: 'baseInfo',
                  attrs: {
                    inline: '',
                    model: e.baseInfo,
                    'label-position': 'top',
                    size: 'small',
                    rules: e.rules,
                    disabled: 'see' == e.operType,
                  },
                },
                [
                  a(
                    'ShCard',
                    { attrs: { title: '基本信息' } },
                    [
                      a(
                        'ElRow',
                        [
                          a(
                            'ElCol',
                            { attrs: { span: 8 } },
                            [
                              a(
                                'ElFormItem',
                                { attrs: { label: '企业名称:', prop: 'name' } },
                                [
                                  a('ElInput', {
                                    style: 'width: ' + e.width + 'px',
                                    attrs: { disabled: e.disabled, placeholder: '请输入企业名称' },
                                    model: {
                                      value: e.baseInfo.name,
                                      callback: function (t) {
                                        e.$set(
                                          e.baseInfo,
                                          'name',
                                          'string' === typeof t ? t.trim() : t
                                        )
                                      },
                                      expression: 'baseInfo.name',
                                    },
                                  }),
                                ],
                                1
                              ),
                            ],
                            1
                          ),
                          a(
                            'ElCol',
                            { attrs: { span: 8 } },
                            [
                              a(
                                'ElFormItem',
                                { attrs: { label: '企业简称:', prop: 'shortName' } },
                                [
                                  a('ElInput', {
                                    style: 'width: ' + e.width + 'px',
                                    attrs: { placeholder: '请输入企业简称' },
                                    model: {
                                      value: e.baseInfo.shortName,
                                      callback: function (t) {
                                        e.$set(
                                          e.baseInfo,
                                          'shortName',
                                          'string' === typeof t ? t.trim() : t
                                        )
                                      },
                                      expression: 'baseInfo.shortName',
                                    },
                                  }),
                                ],
                                1
                              ),
                            ],
                            1
                          ),
                          a(
                            'ElCol',
                            { attrs: { span: 8 } },
                            [
                              a(
                                'ElFormItem',
                                { attrs: { label: '统一社会信用代码:', prop: 'orgCode' } },
                                [
                                  a('ElInput', {
                                    style: 'width: ' + e.width + 'px',
                                    attrs: { placeholder: '请输入统一社会信用代码' },
                                    model: {
                                      value: e.baseInfo.orgCode,
                                      callback: function (t) {
                                        e.$set(
                                          e.baseInfo,
                                          'orgCode',
                                          'string' === typeof t ? t.trim() : t
                                        )
                                      },
                                      expression: 'baseInfo.orgCode',
                                    },
                                  }),
                                ],
                                1
                              ),
                            ],
                            1
                          ),
                        ],
                        1
                      ),
                      a(
                        'ElRow',
                        [
                          a(
                            'ElCol',
                            { attrs: { span: 8 } },
                            [
                              a(
                                'ElFormItem',
                                { attrs: { label: '行业:', prop: 'industryId' } },
                                [
                                  a(
                                    'ElSelect',
                                    {
                                      style: 'width: ' + e.width + 'px',
                                      attrs: { disabled: e.disabled, placeholder: '请选择' },
                                      model: {
                                        value: e.baseInfo.industryId,
                                        callback: function (t) {
                                          e.$set(e.baseInfo, 'industryId', t)
                                        },
                                        expression: 'baseInfo.industryId',
                                      },
                                    },
                                    e._l(e.industryNamesList, function (e) {
                                      return a('ElOption', {
                                        key: e.value,
                                        attrs: { value: e.value, label: e.label },
                                      })
                                    }),
                                    1
                                  ),
                                ],
                                1
                              ),
                            ],
                            1
                          ),
                          a(
                            'ElCol',
                            { attrs: { span: 8 } },
                            [
                              a(
                                'ElFormItem',
                                {
                                  directives: [
                                    {
                                      name: 'loading',
                                      rawName: 'v-loading',
                                      value: e.list.deptLoading,
                                      expression: 'list.deptLoading',
                                    },
                                  ],
                                  attrs: { label: '运营部门:', prop: 'operationDeptIdList' },
                                },
                                [
                                  a('ElCascader', {
                                    ref: 'dept',
                                    style: 'width: ' + e.width + 'px',
                                    attrs: {
                                      placeholder: '请选择运营部门',
                                      options: e.list.dept,
                                      filterable: '',
                                      clearable: !1,
                                      props: e.props.dept,
                                    },
                                    model: {
                                      value: e.baseInfo.operationDeptIdList,
                                      callback: function (t) {
                                        e.$set(e.baseInfo, 'operationDeptIdList', t)
                                      },
                                      expression: 'baseInfo.operationDeptIdList',
                                    },
                                  }),
                                ],
                                1
                              ),
                            ],
                            1
                          ),
                          a(
                            'ElCol',
                            { attrs: { span: 8 } },
                            [
                              a(
                                'ElFormItem',
                                { attrs: { label: '企业等级:', prop: 'enterpriseLevel' } },
                                [
                                  a(
                                    'ElSelect',
                                    {
                                      style: 'width: ' + e.width + 'px',
                                      attrs: { disabled: e.disabled, placeholder: '请选择' },
                                      model: {
                                        value: e.baseInfo.enterpriseLevel,
                                        callback: function (t) {
                                          e.$set(e.baseInfo, 'enterpriseLevel', t)
                                        },
                                        expression: 'baseInfo.enterpriseLevel',
                                      },
                                    },
                                    [
                                      a('ElOption', { attrs: { value: 1, label: 'S级' } }),
                                      a('ElOption', { attrs: { value: 2, label: 'A级' } }),
                                      a('ElOption', { attrs: { value: 3, label: 'B级' } }),
                                      a('ElOption', { attrs: { value: 4, label: 'C级' } }),
                                    ],
                                    1
                                  ),
                                ],
                                1
                              ),
                            ],
                            1
                          ),
                        ],
                        1
                      ),
                      a(
                        'ElRow',
                        [
                          a(
                            'ElCol',
                            { attrs: { span: 8 } },
                            [
                              a(
                                'ElFormItem',
                                { attrs: { label: '单位简介:' } },
                                [
                                  a('ElInput', {
                                    style: 'width: ' + e.width + 'px',
                                    attrs: {
                                      type: 'textarea',
                                      rows: 2,
                                      placeholder: '请输入单位简介',
                                    },
                                    model: {
                                      value: e.baseInfo.introduction,
                                      callback: function (t) {
                                        e.$set(
                                          e.baseInfo,
                                          'introduction',
                                          'string' === typeof t ? t.trim() : t
                                        )
                                      },
                                      expression: 'baseInfo.introduction',
                                    },
                                  }),
                                ],
                                1
                              ),
                            ],
                            1
                          ),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                  a(
                    'ShCard',
                    { attrs: { title: '联系方式' } },
                    [
                      a(
                        'ElRow',
                        [
                          a(
                            'ElCol',
                            { attrs: { span: 8 } },
                            [
                              a(
                                'ElFormItem',
                                { attrs: { label: '联系人:' } },
                                [
                                  a('ElInput', {
                                    style: 'width: ' + e.width + 'px',
                                    attrs: { placeholder: '请输入联系人' },
                                    model: {
                                      value: e.baseInfo.contactUserName,
                                      callback: function (t) {
                                        e.$set(
                                          e.baseInfo,
                                          'contactUserName',
                                          'string' === typeof t ? t.trim() : t
                                        )
                                      },
                                      expression: 'baseInfo.contactUserName',
                                    },
                                  }),
                                ],
                                1
                              ),
                            ],
                            1
                          ),
                          a(
                            'ElCol',
                            { attrs: { span: 8 } },
                            [
                              a(
                                'ElFormItem',
                                { attrs: { label: '联系方式:' } },
                                [
                                  a('ElInput', {
                                    style: 'width: ' + e.width + 'px',
                                    attrs: { placeholder: '请输入联系方式' },
                                    model: {
                                      value: e.baseInfo.contactUserMobile,
                                      callback: function (t) {
                                        e.$set(
                                          e.baseInfo,
                                          'contactUserMobile',
                                          'string' === typeof t ? t.trim() : t
                                        )
                                      },
                                      expression: 'baseInfo.contactUserMobile',
                                    },
                                  }),
                                  a(
                                    'div',
                                    {
                                      staticStyle: {
                                        'line-height': '34px',
                                        'font-size': '14px',
                                        'margin-left': '5px',
                                      },
                                    },
                                    [e._v(' (注:联系方式若有多个请用英文逗号隔开) ')]
                                  ),
                                ],
                                1
                              ),
                            ],
                            1
                          ),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                  a(
                    'ShCard',
                    { attrs: { title: '地区定位' } },
                    [
                      a(
                        'ElRow',
                        [
                          a(
                            'ElCol',
                            { attrs: { span: 24 } },
                            [
                              a(
                                'ElFormItem',
                                { attrs: { label: '国家/省/市/区:' } },
                                [
                                  a('ElInput', {
                                    staticClass: 'ownDisabled',
                                    attrs: { placeholder: '请输入国家名称', disabled: e.disabled },
                                    model: {
                                      value: e.baseInfo.countryName,
                                      callback: function (t) {
                                        e.$set(
                                          e.baseInfo,
                                          'countryName',
                                          'string' === typeof t ? t.trim() : t
                                        )
                                      },
                                      expression: 'baseInfo.countryName',
                                    },
                                  }),
                                ],
                                1
                              ),
                              a(
                                'ElFormItem',
                                {
                                  attrs: { label: '' },
                                  scopedSlots: e._u([
                                    {
                                      key: 'label',
                                      fn: function () {
                                        return [e._v('   ')]
                                      },
                                      proxy: !0,
                                    },
                                  ]),
                                },
                                [
                                  e.disabled
                                    ? a('ElInput', {
                                        attrs: { disabled: '' },
                                        model: {
                                          value: e.address.provinceName,
                                          callback: function (t) {
                                            e.$set(e.address, 'provinceName', t)
                                          },
                                          expression: 'address.provinceName',
                                        },
                                      })
                                    : a(
                                        'ElSelect',
                                        {
                                          attrs: { disabled: e.disabled, placeholder: '请选择' },
                                          on: {
                                            change: function (t) {
                                              return e.changeArea(t, 1)
                                            },
                                          },
                                          model: {
                                            value: e.address.provinceCode,
                                            callback: function (t) {
                                              e.$set(
                                                e.address,
                                                'provinceCode',
                                                'string' === typeof t ? t.trim() : t
                                              )
                                            },
                                            expression: 'address.provinceCode',
                                          },
                                        },
                                        e._l(e.address.provinceList, function (e) {
                                          return a('ElOption', {
                                            key: e.code,
                                            attrs: { value: e.code, label: e.name },
                                          })
                                        }),
                                        1
                                      ),
                                ],
                                1
                              ),
                              a(
                                'ElFormItem',
                                {
                                  attrs: { label: '' },
                                  scopedSlots: e._u([
                                    {
                                      key: 'label',
                                      fn: function () {
                                        return [e._v('   ')]
                                      },
                                      proxy: !0,
                                    },
                                  ]),
                                },
                                [
                                  e.disabled
                                    ? a('ElInput', {
                                        attrs: { disabled: '' },
                                        model: {
                                          value: e.address.cityName,
                                          callback: function (t) {
                                            e.$set(e.address, 'cityName', t)
                                          },
                                          expression: 'address.cityName',
                                        },
                                      })
                                    : a(
                                        'ElSelect',
                                        {
                                          attrs: { disabled: e.disabled, placeholder: '请选择' },
                                          on: {
                                            change: function (t) {
                                              return e.changeArea(t, 2)
                                            },
                                          },
                                          model: {
                                            value: e.address.cityCode,
                                            callback: function (t) {
                                              e.$set(
                                                e.address,
                                                'cityCode',
                                                'string' === typeof t ? t.trim() : t
                                              )
                                            },
                                            expression: 'address.cityCode',
                                          },
                                        },
                                        e._l(e.address.cityList, function (e) {
                                          return a('ElOption', {
                                            key: e.code,
                                            attrs: { value: e.code, label: e.name },
                                          })
                                        }),
                                        1
                                      ),
                                ],
                                1
                              ),
                              a(
                                'ElFormItem',
                                {
                                  attrs: { label: '' },
                                  scopedSlots: e._u([
                                    {
                                      key: 'label',
                                      fn: function () {
                                        return [e._v('   ')]
                                      },
                                      proxy: !0,
                                    },
                                  ]),
                                },
                                [
                                  e.disabled
                                    ? a('ElInput', {
                                        attrs: { disabled: '' },
                                        model: {
                                          value: e.address.areaName,
                                          callback: function (t) {
                                            e.$set(e.address, 'areaName', t)
                                          },
                                          expression: 'address.areaName',
                                        },
                                      })
                                    : a(
                                        'ElSelect',
                                        {
                                          attrs: { disabled: e.disabled, placeholder: '请选择' },
                                          model: {
                                            value: e.address.areaCode,
                                            callback: function (t) {
                                              e.$set(
                                                e.address,
                                                'areaCode',
                                                'string' === typeof t ? t.trim() : t
                                              )
                                            },
                                            expression: 'address.areaCode',
                                          },
                                        },
                                        e._l(e.address.areaList, function (e) {
                                          return a('ElOption', {
                                            key: e.code,
                                            attrs: { value: e.code, label: e.name },
                                          })
                                        }),
                                        1
                                      ),
                                ],
                                1
                              ),
                            ],
                            1
                          ),
                        ],
                        1
                      ),
                      a(
                        'ElRow',
                        [
                          a(
                            'ElCol',
                            { attrs: { span: 24 } },
                            [
                              a(
                                'ElFormItem',
                                { attrs: { label: '详细地址:' } },
                                [
                                  a('ElInput', {
                                    staticClass: 'ownDisabled',
                                    staticStyle: { width: '790px' },
                                    attrs: { placeholder: '请输入详细地址', disabled: e.disabled },
                                    model: {
                                      value: e.address.address,
                                      callback: function (t) {
                                        e.$set(
                                          e.address,
                                          'address',
                                          'string' === typeof t ? t.trim() : t
                                        )
                                      },
                                      expression: 'address.address',
                                    },
                                  }),
                                ],
                                1
                              ),
                            ],
                            1
                          ),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                  a(
                    'ShCard',
                    { attrs: { title: '税务开票信息' } },
                    [
                      a(
                        'ElRow',
                        [
                          a(
                            'ElCol',
                            { attrs: { span: 8 } },
                            [
                              a(
                                'ElFormItem',
                                {
                                  attrs: {
                                    label: '企业名称:',
                                    prop: 'customerInvoice.invoiceTitle',
                                  },
                                },
                                [
                                  a('ElInput', {
                                    style: 'width: ' + e.width + 'px',
                                    attrs: { placeholder: '请输入企业名称' },
                                    model: {
                                      value: e.baseInfo.customerInvoice.invoiceTitle,
                                      callback: function (t) {
                                        e.$set(
                                          e.baseInfo.customerInvoice,
                                          'invoiceTitle',
                                          'string' === typeof t ? t.trim() : t
                                        )
                                      },
                                      expression: 'baseInfo.customerInvoice.invoiceTitle',
                                    },
                                  }),
                                ],
                                1
                              ),
                            ],
                            1
                          ),
                          a(
                            'ElCol',
                            { attrs: { span: 8 } },
                            [
                              a(
                                'ElFormItem',
                                {
                                  attrs: {
                                    label: '企纳税人识别号:',
                                    prop: 'customerInvoice.invoiceTaxNumber',
                                  },
                                },
                                [
                                  a('ElInput', {
                                    style: 'width: ' + e.width + 'px',
                                    attrs: { placeholder: '请输入企纳税人识别号' },
                                    model: {
                                      value: e.baseInfo.customerInvoice.invoiceTaxNumber,
                                      callback: function (t) {
                                        e.$set(
                                          e.baseInfo.customerInvoice,
                                          'invoiceTaxNumber',
                                          'string' === typeof t ? t.trim() : t
                                        )
                                      },
                                      expression: 'baseInfo.customerInvoice.invoiceTaxNumber',
                                    },
                                  }),
                                ],
                                1
                              ),
                            ],
                            1
                          ),
                        ],
                        1
                      ),
                      a(
                        'ElRow',
                        [
                          a(
                            'ElCol',
                            { attrs: { span: 8 } },
                            [
                              a(
                                'ElFormItem',
                                {
                                  attrs: {
                                    label: '公司营业注册地址:',
                                    prop: 'customerInvoice.registerAddress',
                                  },
                                },
                                [
                                  a('ElInput', {
                                    style: 'width: ' + e.width + 'px',
                                    attrs: { placeholder: '请输入公司营业注册地址' },
                                    model: {
                                      value: e.baseInfo.customerInvoice.registerAddress,
                                      callback: function (t) {
                                        e.$set(
                                          e.baseInfo.customerInvoice,
                                          'registerAddress',
                                          'string' === typeof t ? t.trim() : t
                                        )
                                      },
                                      expression: 'baseInfo.customerInvoice.registerAddress',
                                    },
                                  }),
                                ],
                                1
                              ),
                            ],
                            1
                          ),
                          a(
                            'ElCol',
                            { attrs: { span: 8 } },
                            [
                              a(
                                'ElFormItem',
                                {
                                  attrs: {
                                    label: '客户开户行名称:',
                                    prop: 'customerInvoice.bankName',
                                  },
                                },
                                [
                                  a('ElInput', {
                                    style: 'width: ' + e.width + 'px',
                                    attrs: { placeholder: '请输入客户开户行名称' },
                                    model: {
                                      value: e.baseInfo.customerInvoice.bankName,
                                      callback: function (t) {
                                        e.$set(
                                          e.baseInfo.customerInvoice,
                                          'bankName',
                                          'string' === typeof t ? t.trim() : t
                                        )
                                      },
                                      expression: 'baseInfo.customerInvoice.bankName',
                                    },
                                  }),
                                ],
                                1
                              ),
                            ],
                            1
                          ),
                          a(
                            'ElCol',
                            { attrs: { span: 8 } },
                            [
                              a(
                                'ElFormItem',
                                {
                                  attrs: {
                                    label: '客户注册信息电话:',
                                    prop: 'customerInvoice.registerPhone',
                                  },
                                },
                                [
                                  a('ElInput', {
                                    style: 'width: ' + e.width + 'px',
                                    attrs: { placeholder: '请输入客户注册信息电话' },
                                    model: {
                                      value: e.baseInfo.customerInvoice.registerPhone,
                                      callback: function (t) {
                                        e.$set(
                                          e.baseInfo.customerInvoice,
                                          'registerPhone',
                                          'string' === typeof t ? t.trim() : t
                                        )
                                      },
                                      expression: 'baseInfo.customerInvoice.registerPhone',
                                    },
                                  }),
                                ],
                                1
                              ),
                            ],
                            1
                          ),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                  a(
                    'ShCard',
                    { attrs: { title: '来款信息' } },
                    e._l(e.baseInfo.bankList, function (t, r) {
                      return a('div', { key: r, staticClass: 'form-money' }, [
                        a(
                          'div',
                          [
                            a(
                              'ElFormItem',
                              {
                                staticClass: 'erp-item',
                                attrs: {
                                  label: '所属银行:',
                                  prop: 'bankList.' + r + '.bankName',
                                  rules: e.rules.bankName,
                                },
                              },
                              [
                                a('ElInput', {
                                  style: 'width: 280px',
                                  attrs: { placeholder: '请输入所属银行', maxlength: '40' },
                                  model: {
                                    value: t.bankName,
                                    callback: function (a) {
                                      e.$set(t, 'bankName', 'string' === typeof a ? a.trim() : a)
                                    },
                                    expression: 'item.bankName',
                                  },
                                }),
                              ],
                              1
                            ),
                            a(
                              'ElFormItem',
                              {
                                staticClass: 'erp-item',
                                attrs: {
                                  label: '开户行:',
                                  prop: 'bankList.' + r + '.openBank',
                                  rules: e.rules.openBank,
                                },
                              },
                              [
                                a('ElInput', {
                                  style: 'width: 280px',
                                  attrs: { placeholder: '请输入开户行' },
                                  model: {
                                    value: t.openBank,
                                    callback: function (a) {
                                      e.$set(t, 'openBank', 'string' === typeof a ? a.trim() : a)
                                    },
                                    expression: 'item.openBank',
                                  },
                                }),
                              ],
                              1
                            ),
                            a(
                              'ElFormItem',
                              {
                                staticClass: 'erp-item',
                                attrs: {
                                  label: '行号:',
                                  prop: 'bankList.' + r + '.bankKey',
                                  rules: e.rules.bankKey,
                                },
                              },
                              [
                                a('ElInput', {
                                  style: 'width: 280px',
                                  attrs: { placeholder: '请输入行号', maxlength: '40' },
                                  model: {
                                    value: t.bankKey,
                                    callback: function (a) {
                                      e.$set(t, 'bankKey', 'string' === typeof a ? a.trim() : a)
                                    },
                                    expression: 'item.bankKey',
                                  },
                                }),
                              ],
                              1
                            ),
                            a('br'),
                            a(
                              'ElFormItem',
                              {
                                staticClass: 'erp-item',
                                attrs: {
                                  label: '公司账户名:',
                                  prop: 'bankList.' + r + '.userName',
                                  rules: e.rules.userName,
                                },
                              },
                              [
                                a('ElInput', {
                                  style: 'width: 280px',
                                  attrs: { placeholder: '请输入公司账户名' },
                                  model: {
                                    value: t.userName,
                                    callback: function (a) {
                                      e.$set(t, 'userName', 'string' === typeof a ? a.trim() : a)
                                    },
                                    expression: 'item.userName',
                                  },
                                }),
                              ],
                              1
                            ),
                            a(
                              'ElFormItem',
                              {
                                staticClass: 'erp-item',
                                attrs: {
                                  label: '银行账号:',
                                  prop: 'bankList.' + r + '.cardNo',
                                  rules: e.rules.cardNo,
                                },
                              },
                              [
                                a('ElInput', {
                                  style: 'width: 280px',
                                  attrs: { placeholder: '请输入银行账号', maxlength: '40' },
                                  model: {
                                    value: t.cardNo,
                                    callback: function (a) {
                                      e.$set(t, 'cardNo', 'string' === typeof a ? a.trim() : a)
                                    },
                                    expression: 'item.cardNo',
                                  },
                                }),
                              ],
                              1
                            ),
                            a(
                              'ElFormItem',
                              {
                                staticClass: 'erp-item',
                                attrs: {
                                  label: '身份证号码:',
                                  prop: 'bankList.' + r + '.remark0',
                                  rules: e.rules.remark0,
                                },
                              },
                              [
                                a('ElInput', {
                                  style: 'width: 280px',
                                  attrs: { placeholder: '个体户或者个人须填写' },
                                  model: {
                                    value: t.remark0,
                                    callback: function (a) {
                                      e.$set(t, 'remark0', 'string' === typeof a ? a.trim() : a)
                                    },
                                    expression: 'item.remark0',
                                  },
                                }),
                              ],
                              1
                            ),
                          ],
                          1
                        ),
                        'see' !== e.operType
                          ? a('div', { staticClass: 'money-btn' }, [
                              1 == t.defaultFlag
                                ? a('a', { staticClass: 'default' }, [e._v(' 默认 ')])
                                : e._e(),
                              1 != t.defaultFlag
                                ? a(
                                    'a',
                                    {
                                      staticClass: 'set-default',
                                      on: {
                                        click: function (t) {
                                          return e.setDefaults(r)
                                        },
                                      },
                                    },
                                    [e._v(' 设为默认 ')]
                                  )
                                : e._e(),
                              1 == t.defaultFlag
                                ? a('i', {
                                    staticClass: 'iconfont icon-jia',
                                    on: { click: e.adds },
                                  })
                                : e._e(),
                              1 != t.defaultFlag
                                ? a('i', {
                                    staticClass: 'iconfont icon-guanbi',
                                    on: {
                                      click: function (t) {
                                        return e.deletes(r)
                                      },
                                    },
                                  })
                                : e._e(),
                            ])
                          : e._e(),
                      ])
                    }),
                    0
                  ),
                  a(
                    'ShCard',
                    { attrs: { title: '其他' } },
                    [
                      a(
                        'ElFormItem',
                        { attrs: { label: '备注:' } },
                        [
                          a('ElInput', {
                            staticStyle: { width: '600px' },
                            attrs: { type: 'textarea', placeholder: '请输入备注' },
                            model: {
                              value: e.baseInfo.remark,
                              callback: function (t) {
                                e.$set(e.baseInfo, 'remark', 'string' === typeof t ? t.trim() : t)
                              },
                              expression: 'baseInfo.remark',
                            },
                          }),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                  a(
                    'ShCard',
                    { attrs: { title: '系统信息' } },
                    [
                      a(
                        'ElRow',
                        [
                          a(
                            'ElCol',
                            { attrs: { span: 8 } },
                            [
                              a(
                                'ElFormItem',
                                { attrs: { label: '负责人:' } },
                                [
                                  a(
                                    'ElSelect',
                                    {
                                      style: 'width: ' + e.width + 'px',
                                      attrs: { disabled: e.disabled, placeholder: '请选择' },
                                      model: {
                                        value: e.baseInfo.managerId,
                                        callback: function (t) {
                                          e.$set(
                                            e.baseInfo,
                                            'managerId',
                                            'string' === typeof t ? t.trim() : t
                                          )
                                        },
                                        expression: 'baseInfo.managerId',
                                      },
                                    },
                                    e._l(e.userList, function (e) {
                                      return a('ElOption', {
                                        key: e.value,
                                        attrs: { value: e.value, label: e.label },
                                      })
                                    }),
                                    1
                                  ),
                                ],
                                1
                              ),
                            ],
                            1
                          ),
                          a(
                            'ElCol',
                            { attrs: { span: 8 } },
                            [
                              a(
                                'ElFormItem',
                                { attrs: { label: '协作人:' } },
                                [
                                  a(
                                    'ElSelect',
                                    {
                                      style: 'width: 600px',
                                      attrs: {
                                        disabled: e.disabled,
                                        multiple: '',
                                        placeholder: '请选择',
                                      },
                                      model: {
                                        value: e.baseInfo.collaboratorIds,
                                        callback: function (t) {
                                          e.$set(
                                            e.baseInfo,
                                            'collaboratorIds',
                                            'string' === typeof t ? t.trim() : t
                                          )
                                        },
                                        expression: 'baseInfo.collaboratorIds',
                                      },
                                    },
                                    e._l(e.userList, function (e) {
                                      return a('ElOption', {
                                        key: e.value,
                                        attrs: { value: e.value, label: e.label },
                                      })
                                    }),
                                    1
                                  ),
                                ],
                                1
                              ),
                            ],
                            1
                          ),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                ],
                1
              ),
              a('ShBottom', {
                attrs: { 'save-visible': 'see' !== e.operType },
                on: { back: e.close, submit: e.submit },
              }),
            ],
            1
          )
        },
        s = [],
        n = a('4667'),
        o = a('7907'),
        i = a('fa7d'),
        l = {
          name: 'EnterpriseEdit',
          props: { id: { type: String, default: '' }, operType: { type: String, default: '' } },
          data: function () {
            return {
              props: {
                dept: {
                  value: 'id',
                  children: 'children',
                  label: 'name',
                  multiple: !0,
                  checkStrictly: !1,
                },
              },
              list: { dept: [], deptLoading: !1 },
              width: 300,
              loading: !1,
              isSync: !1,
              industryNamesList: [],
              baseInfo: {
                name: '',
                shortName: '',
                orgCode: '',
                industryId: '',
                operationDeptIdList: [],
                enterpriseLevel: '',
                introduction: '',
                contactUserName: '',
                contactUserMobile: '',
                countryName: '',
                customerInvoice: {
                  invoiceTitle: '',
                  invoiceTaxNumber: '',
                  registerAddress: '',
                  bankName: '',
                  registerPhone: '',
                },
                bankList: [
                  {
                    bankName: '',
                    openBank: '',
                    bankKey: '',
                    userName: '',
                    cardNo: '',
                    remark0: '',
                    defaultFlag: 1,
                  },
                ],
                remark: '',
                managerId: '',
                collaboratorIds: [],
              },
              address: {
                address: '',
                provinceCode: '',
                cityCode: '',
                areaCode: '',
                provinceName: '',
                cityName: '',
                areaName: '',
                provinceList: [],
                cityList: [],
                areaList: [],
              },
              rules: {
                name: [{ required: !0, message: '请输入企业名称', trigger: 'blur' }],
                shortName: [{ required: !0, message: '请输入企业简称', trigger: 'blur' }],
                orgCode: [{ required: !0, message: '请输入统一社会信用代码', trigger: 'blur' }],
                industryId: [{ required: !0, message: '请选择行业', trigger: 'change' }],
                operationDeptIdList: [
                  { type: 'array', required: !0, message: '请选择运营部门', trigger: 'change' },
                ],
                enterpriseLevel: [{ required: !0, message: '请选择企业等级', trigger: 'change' }],
                'customerInvoice.invoiceTitle': [
                  { required: !0, message: '请输入企业名称', trigger: ['blur', 'change'] },
                ],
                'customerInvoice.invoiceTaxNumber': [
                  { required: !0, message: '请输入企纳税人识别号', trigger: ['blur', 'change'] },
                ],
                'customerInvoice.registerAddress': [
                  { required: !0, message: '请输入公司营业注册地址', trigger: 'blur' },
                ],
                'customerInvoice.bankName': [
                  { required: !0, message: '请输入客户开户行名称', trigger: 'blur' },
                ],
                'customerInvoice.registerPhone': [
                  { required: !0, message: '请输入注册信息电话', trigger: 'blur' },
                  {
                    validator: function (e, t, a) {
                      var r = /^1[3-9]\d{9}$/,
                        s = /^[0][0-9]{2,3}-\d{5,10}$/,
                        n = /^[1-9]{1}\d{5,8}$/
                      if (r.test(t) || s.test(t) || n.test(t)) return a()
                      a(new Error('客户注册信息电话格式错误'))
                    },
                    trigger: 'blur',
                  },
                ],
                bankName: [{ required: !0, message: '请输入所属银行', trigger: 'blur' }],
                openBank: [{ required: !0, message: '请输入开户行', trigger: 'blur' }],
                bankKey: [
                  { required: !0, message: '请输入行号', trigger: 'blur' },
                  { pattern: /^[0-9]+$/g, message: '银行行号为数字类型', trigger: 'blur' },
                ],
                userName: [
                  { required: !0, message: '请输入公司账户名', trigger: ['blur', 'change'] },
                ],
                cardNo: [
                  { required: !0, message: '请输入银行账号', trigger: 'blur' },
                  { pattern: /^\d+$/g, message: '银行账号为数字类型', trigger: 'blur' },
                ],
                remark0: [
                  {
                    pattern:
                      /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/,
                    message: '身份证输入不合法',
                    trigger: 'blur',
                  },
                ],
              },
              userList: [],
            }
          },
          computed: {
            title: function () {
              return { add: '新增', edit: '编辑', see: '查看' }[this.operType]
            },
            disabled: function () {
              return this.isSync || 'see' === this.operType
            },
          },
          watch: {
            'baseInfo.name': function (e) {
              ;('edit' !== this.operType && 'add' !== this.operType) ||
                ((this.baseInfo.customerInvoice.invoiceTitle = e),
                this.baseInfo.bankList.forEach(function (t) {
                  t.userName = e
                }))
            },
            'baseInfo.orgCode': function (e) {
              ;('edit' !== this.operType && 'add' !== this.operType) ||
                (this.baseInfo.customerInvoice.invoiceTaxNumber = e)
            },
            disabled: function (e) {
              e &&
                ((this.rules.name = []),
                (this.rules.industryId = []),
                (this.rules.enterpriseLevel = []))
            },
          },
          created: function () {
            'see' == this.operType && (this.rules = {})
          },
          mounted: function () {
            var e = this
            ;(this.loading = !0),
              Promise.allSettled([
                this.changeDefauleCity(null, 0),
                this.getIndustryList(),
                this.getUserList(),
                this.getqueryCheckedTreeList(),
              ])
                .then(function () {
                  e.id ? e.getDetail() : (e.loading = !1)
                })
                ['catch'](function () {
                  e.loading = !1
                })
          },
          updated: function () {
            this.fixCascader()
          },
          methods: {
            getDetail: function () {
              var e = this
              Object(n['f'])('sys/company/customerDetail', { id: this.id })
                .then(function (t) {
                  if (((e.loading = !1), 0 == t.code)) {
                    var a = t.data || {}
                    ;(e.isSync = 1 === a.crmSyncFlag),
                      (e.baseInfo.name = a.name),
                      (e.baseInfo.shortName = a.shortName),
                      (e.baseInfo.orgCode = a.orgCode),
                      (e.baseInfo.industryId = a.industryId),
                      (e.baseInfo.enterpriseLevel = a.enterpriseLevel),
                      (e.baseInfo.introduction = a.introduction),
                      (e.baseInfo.contactUserName = a.contactUserName),
                      (e.baseInfo.contactUserMobile = a.contactUserMobile),
                      (e.baseInfo.countryName = a.countryName),
                      (e.address.provinceCode = a.provinceCode),
                      (e.address.cityCode = a.cityCode),
                      (e.address.areaCode = a.areaCode),
                      (e.address.provinceName = a.provinceName),
                      (e.address.cityName = a.cityName),
                      (e.address.areaName = a.areaName),
                      (e.address.address = a.address),
                      1 !== a.crmSyncFlag &&
                        'see' !== e.operType &&
                        (a.provinceCode && e.changeDefauleCity(a.provinceCode, 1, a.cityCode),
                        a.cityCode && e.changeDefauleCity(a.cityCode, 2, a.areaCode)),
                      e.$nextTick(function () {
                        ;(e.baseInfo.customerInvoice = a.customerInvoice || {
                          invoiceTitle: a.name,
                          invoiceTaxNumber: a.orgCode,
                          registerAddress: '',
                          bankName: '',
                          registerPhone: '',
                        }),
                          a.bankList.length > 0
                            ? (a.bankList.forEach(function (e) {
                                e.userName = e.userName || a.name
                              }),
                              (e.baseInfo.bankList = a.bankList))
                            : (e.baseInfo.bankList = [
                                {
                                  bankName: '',
                                  openBank: '',
                                  bankKey: '',
                                  userName: a.name,
                                  cardNo: '',
                                  remark0: '',
                                  defaultFlag: 1,
                                },
                              ]),
                          e.$refs.baseInfo.clearValidate()
                      }),
                      (e.baseInfo.remark = a.remark),
                      (e.baseInfo.managerId = a.managerId),
                      (e.baseInfo.collaboratorIds = a.collaboratorIds || [])
                  }
                })
                ['catch'](function () {
                  e.loading = !1
                })
            },
            getIndustryList: function () {
              var e = this
              return Object(o['f'])().then(function (t) {
                e.industryNamesList = Object(i['c'])(t)
              })
            },
            getUserList: function () {
              var e = this
              return Object(n['f'])('sys/user/option', {}).then(function (t) {
                0 == t.code && (e.userList = Object(i['c'])(t.data || []))
              })
            },
            getqueryCheckedTreeList: function () {
              var e = this
              return (
                (this.list.deptLoading = !0),
                Object(o['j'])({ id: this.id, functionType: 2 })
                  .then(function (t) {
                    var a = t.dept,
                      r = t.deptIdList
                    ;(e.list.deptLoading = !1),
                      (e.list.dept = a),
                      (e.baseInfo.operationDeptIdList = r)
                  })
                  ['catch'](function () {
                    e.list.deptLoading = !1
                  })
              )
            },
            changeDefauleCity: function (e, t, a) {
              var r = this
              Object(n['f'])('address.do', { code: e }).then(function (e) {
                if (0 == e.code)
                  switch (t) {
                    case 0:
                      r.address.provinceList = e.data
                      break
                    case 1:
                      ;(r.address.cityList = e.data), (r.address.cityCode = a)
                      break
                    case 2:
                      ;(r.address.areaList = e.data), (r.address.areaCode = a)
                      break
                    default:
                      break
                  }
              })
            },
            deletes: function (e) {
              this.baseInfo.bankList.splice(e, 1)
            },
            setDefaults: function (e) {
              this.baseInfo.bankList.forEach(function (t, a) {
                t.defaultFlag = a == e ? 1 : 0
              })
            },
            adds: function () {
              this.baseInfo.bankList.push({
                bankName: '',
                openBank: '',
                bankKey: '',
                userName: this.baseInfo.name,
                cardNo: '',
                remark0: '',
                defaultFlag: 0,
              })
            },
            submit: function () {
              var e = this
              this.$refs.baseInfo.validate(function (t) {
                if (t) {
                  var a = e.baseInfo
                  if (a.contactUserMobile) {
                    var r = /^[1][3456789][0-9]{9}$/,
                      s = /^([0-9]{3,4}-)?[0-9]{7,8}$/,
                      i = /^\d{3,4}-\d{3,4}-\d{3,4}$/,
                      l = a.contactUserMobile.trim().split(','),
                      d = l.every(function (e) {
                        return (
                          (r.lastIndex = 0),
                          (s.lastIndex = 0),
                          (i.lastIndex = 0),
                          r.test(e) || s.test(e) || i.test(e)
                        )
                      })
                    if (!d) return void e.$Info.info('请检查联系方式格式是否正确!')
                  }
                  var c = {
                    shortName: a.shortName,
                    orgCode: a.orgCode,
                    introduction: a.introduction,
                    contactUserName: a.contactUserName,
                    contactUserMobile: a.contactUserMobile,
                    customerInvoice: a.customerInvoice,
                    bankList: a.bankList,
                    remark: a.remark,
                  }
                  if (!1 === e.disabled) {
                    ;(c.name = a.name),
                      (c.industryId = a.industryId),
                      (c.enterpriseLevel = a.enterpriseLevel)
                    var u = e.address
                    ;(c.countryName = a.countryName),
                      (c.provinceCode = u.provinceCode),
                      (c.cityCode = u.cityCode),
                      (c.areaCode = u.areaCode),
                      (c.address = u.address),
                      (c.collaboratorIds = a.collaboratorIds),
                      (c.managerId = a.managerId)
                  }
                  var p = e.$refs.dept.getCheckedNodes(!0)
                  c.operationDeptIdList = Object(o['i'])(p)
                  var m = e.$refs.dept.getCheckedNodes()
                  ;(c.operationPrivilegeIdList = m.map(function (e) {
                    return e.value
                  })),
                    (e.loading = !0)
                  var f = 'sys/company/saveCustomer'
                  e.id && ((c.id = e.id), (f = 'sys/company/editCustomer')),
                    Object(n['g'])(f, c).then(function (t) {
                      0 == t.code && (e.$Info.info('保存成功'), e.$parent.submit()),
                        (e.loading = !1)
                    })
                } else e.$Info.warning('请完整填写表单内容！')
              })
            },
            changeArea: function (e, t) {
              var a = this
              Object(n['f'])('address.do', { code: e }).then(function (e) {
                0 == e.code &&
                  (1 == t
                    ? ((a.address.cityList = e.data),
                      (a.address.cityCode = ''),
                      (a.address.areaCode = ''),
                      (a.address.areaList = []))
                    : 2 == t && ((a.address.areaList = e.data), (a.address.areaCode = '')))
              })
            },
            close: function () {
              this.$emit('close')
            },
            fixCascader: function () {
              var e = this
              this.$nextTick(function () {
                setTimeout(function () {
                  try {
                    for (
                      var t = e.$refs['dept'].$el.querySelectorAll('.el-cascader__search-input'),
                        a = 0;
                      a < t.length;
                      a++
                    )
                      t[a].setAttribute('placeholder', '')
                  } catch (r) {
                    window.console.log(r)
                  }
                }, 20)
              })
            },
          },
        },
        d = l,
        c = (a('d7d3'), a('2877')),
        u = Object(c['a'])(d, r, s, !1, null, '86c91c4e', null)
      t['default'] = u.exports
    },
    d7d3: function (e, t, a) {
      'use strict'
      a('5ad8')
    },
  },
])
