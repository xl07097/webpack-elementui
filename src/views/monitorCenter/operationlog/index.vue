<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="tab1" name="1" />
      <el-tab-pane label="tab2" name="2" />
    </el-tabs>
    <FormRender
      v-model="searchData"
      :fields="fields"
      :label-width="100"
      :active-name="activeName"
    />
    <StarTable :columns="columns" :table-data="data" :active-name="activeName" />
  </div>
</template>

<script>
import StarTable from '@/components/starTable/StarTable.vue'
import FormRender from '@/components/form/FormRender'
export default {
  name: 'OperationLog',
  components: { StarTable, FormRender },
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
      searchData: {
        name: 'hha',
        age: '',
        year: '2019',
        createTime: [],
        week: '',
      },
      fields: [],
      fields1: Object.freeze([
        { type: 'input', label: '项目名称', prop: 'name' },
        { type: 'input', label: '归集项目名称', prop: 'collectionProjectName' },
        { type: 'input', label: '项目编码', prop: 'code' },
        { type: 'input', label: '财务编码', prop: 'financeCode' },
        { type: 'input', label: '企业名称', prop: 'enterpriseName' },
        { type: 'select',  prop: 'businessType', label: '产品类型', },
        { type: 'select', prop: 'businessModel', label: '业务模式', },
        { type: 'input', label: '客户简称', prop: 'customerName' },
        { type: 'select', label: '运营状态', prop: 'operationStatus', },
        { type: 'daterange', label: '业绩开始时间', prop: 'performanceTimeStart', endProp: 'performanceTimeEnd' },
        { type: 'select', label: '行业', prop: 'industryId', },
        { type: 'cascader', label: '运营部门', prop: 'deptId', },
        { type: 'select', label: '是否转包', prop: 'subcontractFlag',
          list: [{ value: 1, name: '直签' }, { value: 2, name: '转包' }],
        },
        { type: 'select', label: '立项状态', prop: 'instanceStatus', },
        { type: 'select',  label: '变更状态', prop: 'changeStatus', },
        { type: 'input', label: '负责人', prop: 'headPersonName' },
        {
          type: 'select', label: '一事一议', prop: 'oneThingFlag', list: [
            { value: 1, name: '是' },
            { value: 0, name: '否' },
          ],
        },
        { type: 'input', label: '所属集团', prop: 'groupName' },
        { type: 'select',  label: '是否考勤', prop: 'attendanceFlag',
          list: [{ value: '1', name: '考勤' }, { value: '2', name: '不考勤' }],
        },
        { type: 'daterange', label: '创建时间', prop: 'createTimeStart', endProp: 'createTimeEnd' },
        { type: 'daterange', label: '最后修改时间', prop: 'updateTimeStart', endProp: 'updateTimeEnd' },
      ]),
      fields2: Object.freeze([
        { type: 'input', label: '项目名称', prop: 'name' },
        { type: 'input', label: '归集项目名称', prop: 'collectionProjectName' },
        { type: 'input', label: '项目编码', prop: 'code' },
        { type: 'input', label: '财务编码', prop: 'financeCode' },
        { type: 'input', label: '企业名称', prop: 'enterpriseName' },
        { type: 'select',  prop: 'businessType', label: '产品类型', },
        { type: 'select', prop: 'businessModel', label: '业务模式', },
        { type: 'input', label: '客户简称', prop: 'customerName' },
        { type: 'select', label: '运营状态', prop: 'operationStatus', },
        { type: 'daterange', label: '业绩开始时间', prop: 'performanceTimeStart', endProp: 'performanceTimeEnd' },
        { type: 'select', label: '行业', prop: 'industryId', },
        { type: 'cascader', label: '运营部门', prop: 'deptId', },
        { type: 'select', label: '是否转包', prop: 'subcontractFlag',
          list: [{ value: 1, name: '直签' }, { value: 2, name: '转包' }],
        },
        { type: 'select', label: '立项状态', prop: 'instanceStatus', },
        { type: 'select',  label: '变更状态', prop: 'changeStatus', },
        { type: 'input', label: '负责人', prop: 'headPersonName' },
        {
          type: 'select', label: '一事一议', prop: 'oneThingFlag', list: [
            { value: 1, name: '是' },
            { value: 0, name: '否' },
          ],
        },
        { type: 'input', label: '所属集团', prop: 'groupName' },
        { type: 'select',  label: '是否考勤', prop: 'attendanceFlag',
          list: [{ value: '1', name: '考勤' }, { value: '2', name: '不考勤' }],
        },
        { type: 'daterange', label: '创建时间', prop: 'createTimeStart', endProp: 'createTimeEnd' },
        { type: 'daterange', label: '最后修改时间', prop: 'updateTimeStart', endProp: 'updateTimeEnd' },
      ]),
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
          this.fields = this.fields1
          break;
        case '2':
          this.columns = this.columns2
          this.fields = this.fields2
          break;
        default:
          break;
      }
    }
  },
}
</script>

<style></style>
