<template>
  <div>
    <StarTable :columns="columns" :table-data="data" />
  </div>
</template>

<script>
import StarTable from '@/components/starTable/StarTable.vue'
export default {
  name: 'OperationLog',
  components: { StarTable },
  data() {
    return {
      columns: Object.freeze([
        { title: 'title', field: 'field' },
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
