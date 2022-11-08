<template>
  <vxe-table
    class="mytable-footer"
    height="400"
    :show-footer="true"
    :footer-method="footerMethod"
    :footer-cell-class-name="footerCellClassName3"
    :data="tableData3"
  >
    <vxe-column type="seq" width="60" fixed="left" />
    <vxe-column field="address" title="地址" width="100" fixed="left" />
    <vxe-colgroup title="基本信息">
      <vxe-column field="name" title="Name" min-width="600" sortable />
      <vxe-column field="age" title="Age" min-width="600" />
    </vxe-colgroup>
    <vxe-column field="date" title="Date" min-width="600" />
    <vxe-column field="amount" title="Amount" width="200" fixed="right" />
  </vxe-table>
</template>

<script>
export default {
  data() {
    return {
      showFooter: true,
      tableData3: [
        {
          id: 10001,
          name: 'Test1',
          role: 'Develop',
          sex: '0',
          age: 28,
          amount: 888,
          address: 'test abc',
        },
        {
          id: 10002,
          name: 'Test2',
          role: 'Test',
          sex: '1',
          age: 22,
          amount: 666,
          address: 'GuangzhouGuangzhouGuangzhouGuangzhou',
        },
        {
          id: 10003,
          name: 'Test3',
          role: 'PM',
          sex: '1',
          age: 32,
          amount: 89,
          address: 'Shanghai',
        },
        {
          id: 10004,
          name: 'Test4',
          role: 'Designer',
          sex: '0',
          age: 23,
          amount: 1000,
          address: 'test abc',
        },
        {
          id: 10005,
          name: 'Test5',
          role: 'Develop',
          sex: '0',
          age: 30,
          amount: 999,
          address: 'Shanghai',
        },
        {
          id: 10006,
          name: 'Test6',
          role: 'Designer',
          sex: '0',
          age: 21,
          amount: 998,
          address: 'test abc',
        },
        {
          id: 10007,
          name: 'Test7',
          role: 'Test',
          sex: '1',
          age: 29,
          amount: 2000,
          address: 'test abc',
        },
        {
          id: 10008,
          name: 'Test8',
          role: 'Develop',
          sex: '1',
          age: 35,
          amount: 999,
          address: 'test abc',
        },
      ],
      mergeCells: [
        {row: 1, col: 5,rowspan: 2, colspan: 2}
      ]
    };
  },
  methods: {
    footerCellClassName3({ $rowIndex, column }) {
      if (column.type === 'seq') {
        if ($rowIndex === 0) {
          return 'col-blue';
        } else {
          return 'col-red';
        }
      } else if (column.property === 'age') {
        if ($rowIndex === 1) {
          return 'col-red';
        }
      }
    },
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
      const means = [];
      const sums = [];
      const others = [];
      columns.forEach((column, columnIndex) => {
        if (columnIndex === 0) {
          means.push('平均');
          sums.push('和值');
          others.push('其他');
        } else {
          let meanCell = null;
          let sumCell = null;
          let otherCell = '-';
          switch (column.property) {
          case 'age':
          case 'amount':
            meanCell = this.meanNum(data, column.property);
            sumCell = this.sumNum(data, column.property);
            break;
          case 'sex':
            otherCell = '无';
            break;
          }
          means.push(meanCell);
          sums.push(sumCell);
          others.push(otherCell);
        }
      });
      // 返回一个二维数组的表尾合计
      return [means];
    },
  },
};
</script>

<style lang="scss">
.mytable-footer{
  .vxe-table--fixed-wrapper{
    .vxe-table--fixed-left-wrapper {
      .vxe-table--body-wrapper.fixed-left--wrapper{
        // overflow-x: hidden;
        // padding-bottom: 17px;
        width: auto;
      }
    }
    .vxe-table--body-wrapper{
      .vxe-body--column{
        // user-select: none;
      }
    }
  } 
}
</style>
