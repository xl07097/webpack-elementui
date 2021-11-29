<template>
  <div class="vxe-table-wrap">
    <vxe-table border show-footer height="400" :footer-method="footerMethod" :data="tableData">
      <vxe-column type="seq" width="60" fixed="left"></vxe-column>
      <vxe-column field="name" title="Name" width="300"></vxe-column>
      <vxe-column field="sex" title="Sex" width="300"></vxe-column>
      <vxe-column field="age" title="Age" width="300"></vxe-column>
      <vxe-column field="date13" title="Date" width="300"></vxe-column>
      <vxe-column field="address" title="Address" width="200" fixed="right" show-overflow></vxe-column>
    </vxe-table>
  </div>
</template>

<script>
export default {
  name: 'TestCom',
  data() {
    return {
      tableHeight: '300px',
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'vxe-table 从入门到放弃' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'vxe-table 从入门到放弃' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'vxe-table 从入门到放弃' },
      ],
    };
  },
  methods: {
    meanNum(list, field) {
      let count = 0;
      list.forEach((item) => {
        count += Number(item[field]);
      });
      return count / list.length;
    },
    sumNum(list, field) {
      let count = 0;
      list.forEach((item) => {
        count += Number(item[field]);
      });
      return count;
    },
    footerMethod({ columns, data }) {
      const sums = [];
      columns.forEach((column, columnIndex) => {
        if (columnIndex === 0) {
          sums.push('和值');
        } else {
          let meanCell = null;
          let sumCell = null;
          switch (column.property) {
            case 'age':
            case 'rate':
              meanCell = parseInt(this.meanNum(data, column.property));
              sumCell = this.sumNum(data, column.property);
              break;
          }
          sums.push(sumCell);
        }
      });
      // 返回一个二维数组的表尾合计
      return [sums];
    },
  },
};
</script>
<style lang="scss">
@import '~vxe-table/styles/index.scss';
.vxe-table-wrap {
  width: 1000px;
}
</style>
