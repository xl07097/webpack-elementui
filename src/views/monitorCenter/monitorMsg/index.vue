<template>
  <div>
    <FormRender v-model="searchData" :fields="fields" :label-width="100" />
  </div>
</template>

<script>
import FormRender from '@/components/form/FormRender'
export default {
  name: 'MonitorMsg',
  components: {FormRender },
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
        { type: 'select',  prop: 'businessType', label: '产品类型', },

      ]),
      data: [],
    }
  },
  methods: {},
}
</script>

<style></style>
