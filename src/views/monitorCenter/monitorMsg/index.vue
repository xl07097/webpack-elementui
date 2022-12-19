<template>
  <div>
    <el-button @click="toggle">切换</el-button>
    <el-button @click="toggle1">切换1</el-button>
    <el-button @click="toggle2">切换2</el-button>
    <el-button @click="toggle3">切换3</el-button>
    {{ number }}
    <StarTable :columns="columns" :tableData="[{name: 'hahaha'}]">
      <template #name>{{ 'lplp' }}</template>
    </StarTable>
  </div>
</template>

<script>
import StarTable from '@/components/starTable/StarTable.vue';
export default {
  name: 'MonitorMsg',
  components:{StarTable},
  data(){
    return {
      columns: [
        { field: 'name', title: '姓名' },
        { field: 'batchNo', title: '批次编号' },
        { field: 'batchName', title: '批次名称',  },
        { field: 'batchType', title: '批次类型',  },
        { field: 'companyName', title: '发放公司',  },
        { field: 'projectName', title: '项目名称',  },
        { field: 'projectCode', title: '项目编号',  },
        { field: 'ccpName', title: '归集项目名称',  },
        { field: 'ccpCode', title: '归集项目编号',  },
      ],
      number: 0
    }
  },
  methods:{
    toggle(){
      this.number = 0
      this.columns = [
        { field: 'name', title: '姓名' },
        { field: 'batchNo', title: '批次编号' },
        { field: 'batchName', title: '批次名称',  },
        { field: 'batchType', title: '批次类型',  },
        { field: 'companyName', title: '发放公司',  },
        { field: 'projectName', title: '项目名称',  },
        { field: 'projectCode', title: '项目编号',  },
        { field: 'ccpName', title: '归集项目名称',  },
        { field: 'ccpCode', title: '归集项目编号',  },
      ]
    },
    toggle1(){
      this.number = 1
      this.columns = [
        { field: 'ccpCode', title: '归集项目编号',  },
        { field: 'ccpName', title: '归集项目名称',  },
        { field: 'projectCode', title: '项目编号',  },
        { field: 'projectName', title: '项目名称',  },
        { field: 'companyName', title: '发放公司',  },
        { field: 'batchType', title: '批次类型',  },
        { field: 'batchName', title: '批次名称',  },
        { field: 'batchNo', title: '批次编号' },
        { field: 'name', title: '姓名' },
      ]

    },
    toggle2(){
      this.number = 2
      this.columns = [
        { field: 'projectName', title: '项目名称',  },
        { field: 'batchNo', title: '批次编号' },
        { field: 'ccpName', title: '归集项目名称',  },
        { field: 'batchName', title: '批次名称',  },
        { field: 'batchType', title: '批次类型',  },
        { field: 'companyName', title: '发放公司',  },
        { field: 'ccpCode', title: '归集项目编号',  },
        { field: 'name', title: '姓名' },
        { field: 'projectCode', title: '项目编号',  },
      ]

    },
    toggle3(){
      this.number = 3
      this.columns = [
        { field: 'batchNo', title: '批次编号' },
        { field: 'name', title: '姓名' },
        { field: 'batchName', title: '批次名称',  },
        { field: 'companyName', title: '发放公司',  },
        { field: 'batchType', title: '批次类型',  },
        { field: 'projectCode', title: '项目编号',  },
        { field: 'projectName', title: '项目名称',  },
        { field: 'ccpCode', title: '归集项目编号',  },
        { field: 'ccpName', title: '归集项目名称',  },
      ]

    },
  }
}
</script>

<style>

</style>
