<template>
  <div>
    <FormRender v-model="searchData" :fields="fields" />
    <StarTable :columns="columns" :table-data="data" />
  </div>
</template>

<script>
import FormRender from '@/components/form/FormRender'
import StarTable from '@/components/table/StarTable.vue'
export default {
  name: 'MonitorMsg',
  components: {FormRender, StarTable },
  data() {
    return {
      searchData: {
        name: 'hha',
        age: '',
        year: '2019',
        createTime: [],
        week: '',
      },
      fields: Object.freeze([
        { type: 'input', label: '项目名称', prop: 'name' },
        { type: 'select',  prop: 'businessType1', label: '产品类型', config:{
          list: [
            { value: '1', label: '产品1' },
          ]} 
        },
        { type: 'select',  prop: 'GENDER', label: '产品类型', config:{
          request:{
            remote: true,
            remoteMethod: async () => {
              return fetch('http://localhost:3003/dict/options', {
                method: 'POST',
                headers:{
                  'AuthToken': 'W88G0R46WEUP9JXKOF6H71WI',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(['GENDER'])
              }).then(res => res.json())
            },
            handleData: (res) => {
              return res.data.GENDER.map(item => {
                return {
                  value: item.dictValue,
                  label: item.dictName
                }
              })
            }
          },
        }
        },
        { type: 'month', label: '月份', prop: 'month1' },
        { type: 'date', label: '日期', prop: 'date1' },
        { type: 'daterange', label: '日期范围', prop: 'daterangeStart', endProp: 'daterangeEnd' },
        { type: 'monthrange', label: '月份范围', prop: 'monthStart', endProp: 'monthEnd' },
        { type: 'cascader', label: '部门', prop: 'cascader1' },
      ]),
      columns: Object.freeze([
        { title: 'title', field: 'field', minWidth: '140px' },
        { title: 'title1', field: 'field1' },
        { title: 'title2', field: 'field2' },
        { title: 'title3', field: 'field3' },
        { title: 'title4', field: 'field4' },
        { title: 'title5', field: 'field5' },
        { title: 'title6', field: 'field6' },
        { title: 'title7', field: 'field7' },
        { title: 'title8', field: 'field8' },
        { title: 'title9', field: 'field9' },
        { title: 'title10', field: 'field10' },
        { title: 'title11', field: 'field11' },
        { title: 'title12', field: 'field12' },
        { title: 'title13', field: 'field13' },
        { title: 'title14', field: 'field14' },
        { title: 'title15', field: 'field15' },
      ]),
      data: [],
    }
  },
  methods: {},
}
</script>

<style></style>
