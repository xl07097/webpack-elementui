<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="tab1" name="1" />
      <el-tab-pane label="tab2" name="2" />
    </el-tabs>
    <StarTable :columns="columns" :table-data="data" :active-name="activeName" />
  </div>
</template>

<script>
import StarTable from '@/components/starTable/StarTable.vue'
export default {
  name: 'OperationLog',
  components: { StarTable },
  data() {
    return {
      activeName: '1',
      columns1: Object.freeze([
        { title: 'title', field: 'field', fixed: 'left' },
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
      columns2: Object.freeze([
        { title: '标题1', field: 'field100', fixed: 'left' },
        { title: '标题2', field: 'field101' },
        { title: '标题3', field: 'field201' },
        { title: '标题4', field: 'field301' },
        { title: '标题5', field: 'field401' },
        { title: '标题6', field: 'field501' },
        { title: '标题7', field: 'field601' },
        { title: '标题8', field: 'field701' },
        { title: '标题9', field: 'field801' },
        { title: '标题10', field: 'field901' },
        { title: '标题11', field: 'field1001' },
        { title: '标题12', field: 'field1101' },
        { title: '标题13', field: 'field1201' },
        { title: '标题14', field: 'field1301' },
        { title: '标题15', field: 'field1401' },
        { title: '标题16', field: 'field1501' },
      ]),
      columns: Object.freeze([]),
      data: [],
    }
  },
  mounted(){
    this.handleClick({
      name: '1'
    })
  },
  methods: {
    handleClick(active){
      switch (active.name) {
        case '1':
          this.columns = this.columns1
          break;
        case '2':
          this.columns = this.columns2
          break;
        default:
          break;
      }
    }
  },
}
</script>

<style></style>
