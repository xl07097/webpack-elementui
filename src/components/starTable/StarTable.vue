<template>
  <div class="sh-table-wrap">
    <div
      ref="shTable"
      class="sh-table"
    >
      <VxeTable
        ref="tableRef"
        :data="tableData"
        :max-height="clientHeight"
        stripe
        :size="size"
        :align="align"
        :show-overflow="showOverflow"
        highlight-hover-row
        :show-footer="showFooter"
        :footer-method="footerMethod"
        :show-footer-overflow="showFooterOverflow"
        :tooltip-config="{
          theme: tooltipEffect,
          enterable: true,
        }"
        @checkbox-change="selectionChange"
        @checkbox-all="selectionChange"
      >
        <VxeColumn
          v-if="index"
          key="seqIndex"
          type="seq"
          title="序号"
          align="center"
          width="60"
        />
        <VxeColumn
          v-if="selection"
          key="checkbox"
          type="checkbox"
          title=""
          align="center"
          width="60"
        />
        <VxeColumn
          v-if="showAction"
          key="action"
          title="操作"
          :width="actionWidth"
        >
          <template #default="{ row, rowIndex }">
            <div class="erp-table-edit">
              <slot
                name="action"
                :row="row"
                :rowIndex="rowIndex"
              />
            </div>
          </template>
        </VxeColumn>
        <VxeColumn
          v-for="column of columns"
          :key="column.field"
          min-width="140px"
          v-bind="column"
        />
      </VxeTable>
    </div>
    <div class="sh-table-pagination">
      <ElPagination
        v-if="pageState"
        :current-page="pageNo"
        :page-sizes="pageParms.sizes"
        :page-size.sync="pageSize"
        :layout="pageParms.layout"
        :total="total"
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'StarTables',
  props: {
    // 是否显示序号
    index: {
      type: Boolean,
      default: true,
    },
    // 是否显示复选框
    selection: {
      type: Boolean,
      default: true,
    },
    showAction: {
      type: Boolean,
      default: true,
    },
    actionWidth: {
      type: [String, Number],
      default: '160px',
    },
    // table 列字段配置
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    tableData: {
      type: Array,
      default() {
        return [];
      },
    },
    align: {
      type: String,
      default: 'left',
    },
    height: {
      type: [String, Number],
      default: 0,
    },
    pageState: {
      type: Boolean,
      default: true,
    },
    pageIndex: {
      type: [String, Number],
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
    showOverflow: {
      type: Boolean,
      default: false,
    },
    haveTab: {
      type: Boolean,
      default: false,
    },
    scrollX: {
      type: Object,
      default() {
        return {
          gt: -1,
        };
      },
    },
    scrollY: {
      type: Object,
      default() {
        return {
          gt: -1,
        };
      },
    },
    size: {
      type: String,
      default: 'medium',
    },
    tooltipEffect: {
      type: String, // dark/light
      default: 'dark',
    },
    filter: {
      type: Object,
      default: () => {
        return {};
      },
    },
    showFooter: {
      type: Boolean,
      default: false,
    },
    summaryFields: {
      type: Array,
      default() {
        return [];
      },
    },
    showFooterOverflow: {
      type: [Boolean, String], // dark/light
      default: 'tooltip',
    },
  },
  data() {
    return {
      pageNo: 1,
      pageSize: this.$store.getters.get_page_parms.size,
      pageThrottle: false,
      selectionList: [],
      clientHeight: 'auto',
    };
  },
  computed: {
    pageParms() {
      return this.$store.getters.get_page_parms;
    },
  },
  watch: {
    pageIndex(newVal) {
      if (newVal !== 0) {
        this.pageNo = newVal;
      }
    },
    tableData() {
      this.selectionList = [];
      this.getTableHeight();
      this.$nextTick(() => {
        try {
          let bodyWrapper = this.$refs.tableRef.$el.querySelector('.vxe-table--body-wrapper');
          setTimeout(() => {
            bodyWrapper.scrollTo && bodyWrapper.scrollTo(0, 0);
          }, 5);
        } catch (error) {
          window.console.log(error);
        }
      });
    },
  },
  methods: {
    selectionChange({ records }) {
      this.selectionList = Object.freeze(records);
      this.$emit('selectionChange', records);
    },
    footerMethod({ columns, data }) {
      let sum = ['合计'];
      if (data.length === 0) {
        return [sum];
      }
      this.summaryFields.forEach((field) => {
        let index = columns.findIndex((item) => item.property === field.prop);
        let count = 0;
        if (field.method) {
          sum[index] = field.method(data);
        } else {
          count = data.reduce((total, current) => {
            return total + (Number(current[field.prop]) || 0);
          }, 0);
          sum[index] = Number(count.toFixed(2));
        }
      });
      return [sum];
    },
    // 格式化数据显示
    formatterText(filer, row, prop) {
      if (filer) {
        if (this.filter[filer]) {
          return this.filter[filer](row, prop);
        }
        if (this.$Rule[filer]) {
          return this.$Rule[filer](row[prop]);
        }
      }
      return row[prop];
    },
    sizeChange(size) {
      this.pageSize = size;
      this.pageNo = 1;
      this.currentChange(1);
    },
    currentChange(page) {
      this.pageNo = page;
      this.pageSizeSearch();
    },
    pageSizeSearch() {
      if (this.pageThrottle === true) {
        return;
      }
      this.pageThrottle = true;
      this.$emit('pageSizeSearch', this.pageNo, this.pageSize);
      this.pageThrottle = false;
    },
    // 刷新 列， 去除错位问题
    refreshColumn() {
      this.$nextTick(() => {
        this.$refs.tableRef.refreshColumn();
      });
    },
    getTableHeight() {
      if (this.height) {
        this.clientHeight = this.height;
        return;
      }
      this.$nextTick(() => {
        this.clientHeight = this.$Utils.getTbHeight(this, 'shTable', this.pageState);
        if (this.haveTab) {
          this.clientHeight = this.clientHeight - 50;
        }
        this.refreshColumn();
      });
    },
  },
};
</script>

<style lang="scss">
.sh-table-wrap {
  padding: 0 10px;
  .sh-table {
    .el-table {
      color: #444444;
      thead {
        color: #444444;
      }
      th.gutter {
        width: 18px !important;
      }
    }
  }
  .vxe-table {
    font-family: Microsoft YaHei, STXihei, '\534E\6587\7EC6\9ED1', '\9ED1\4F53', serif !important;
  }
  .vxe-table thead th {
    background-color: #ebf5ff;
  }
  .vxe-table tfoot .vxe-cell--item {
    padding-left: 6px;
  }
  .vxe-table--render-default.vxe-editable.size--medium .vxe-body--column,
  .vxe-table--render-default.size--medium .vxe-header--column.col--ellipsis,
  .vxe-table--render-default.size--medium .vxe-body--column.col--ellipsis,
  .vxe-table--render-default.size--medium .vxe-footer--column.col--ellipsis {
    height: 46px;
  }
  .vxe-table--render-default.size--medium .vxe-header--column.col--ellipsis > .vxe-cell,
  .vxe-table--render-default.size--medium .vxe-body--column.col--ellipsis > .vxe-cell,
  .vxe-table--render-default.size--medium .vxe-footer--column.col--ellipsis > .vxe-cell {
    max-height: 46px;
  }
  // .vxe-table--render-default.size--medium .vxe-header--column:not(.col--ellipsis), .vxe-table--render-default.size--medium .vxe-body--column:not(.col--ellipsis), .vxe-table--render-default.size--medium .vxe-footer--column:not(.col--ellipsis){
  //   padding: 0!important;
  // }
  .vxe-table--render-default .vxe-cell {
    // white-space: normal!important;
    color: #444;
    // padding: 10px;
  }
  .vxe-table--render-default .vxe-cell .erp-table-edit {
    white-space: normal !important;
  }
  .sh-table-pagination {
    padding: 10px 0;
  }
}
</style>
