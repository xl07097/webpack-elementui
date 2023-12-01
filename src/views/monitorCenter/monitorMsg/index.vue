<template>
  <div>
    <FormRender v-model="searchData" :fields="fields" :label-width="100" />
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
        { type: 'select',  prop: 'businessType1', label: '产品类型', },
        { type: 'select',  prop: 'businessType2', label: '产品类型', },
        { type: 'select',  prop: 'businessType3', label: '产品类型', },
        { type: 'select',  prop: 'businessType4', label: '产品类型', },
        { type: 'select',  prop: 'businessType5', label: '产品类型', },
        { type: 'select',  prop: 'businessType6', label: '产品类型', },
        { type: 'select',  prop: 'businessType7', label: '产品类型', },
        { type: 'select',  prop: 'businessType8', label: '产品类型', },
        { type: 'select',  prop: 'businessType9', label: '产品类型', },
        { type: 'select',  prop: 'businessType0', label: '产品类型', },
        { type: 'select',  prop: 'businessType11', label: '产品类型', },
        { type: 'select',  prop: 'businessType22', label: '产品类型', },
        { type: 'select',  prop: 'businessType33', label: '产品类型', },
        { type: 'select',  prop: 'businessType44', label: '产品类型', },
        { type: 'select',  prop: 'businessType55', label: '产品类型', },
        { type: 'select',  prop: 'businessType66', label: '产品类型', },
        { type: 'select',  prop: 'businessType77', label: '产品类型', },
        { type: 'select',  prop: 'businessType88', label: '产品类型', },
        { type: 'select',  prop: 'businessType99', label: '产品类型', },
        { type: 'select',  prop: 'businessType00', label: '产品类型', },
        { type: 'select',  prop: 'businessType111', label: '产品类型', },
        { type: 'select',  prop: 'businessType222', label: '产品类型', },
        { type: 'select',  prop: 'businessType333', label: '产品类型', },
        { type: 'select',  prop: 'businessType444', label: '产品类型', },
        { type: 'select',  prop: 'businessType555', label: '产品类型', },
        { type: 'select',  prop: 'businessType666', label: '产品类型', },
        { type: 'select',  prop: 'businessType777', label: '产品类型', },
        { type: 'select',  prop: 'businessType888', label: '产品类型', },
        { type: 'select',  prop: 'businessType999', label: '产品类型', },
        { type: 'select',  prop: 'businessType000', label: '产品类型', },
        { type: 'select',  prop: 'businessType12', label: '产品类型', },
        { type: 'select',  prop: 'businessType13', label: '产品类型', },
        { type: 'select',  prop: 'businessType14', label: '产品类型', },
        { type: 'select',  prop: 'businessType16', label: '产品类型', },
        { type: 'select',  prop: 'businessType15', label: '产品类型', },

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
