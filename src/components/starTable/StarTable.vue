<template>
  <div class="sh-table-wrap">
    <div class="operation">
      <div class="left-btn">
        <slot name="left">
          <template v-for="(item, opIndex) in operationFilter">
            <ElButton
              v-if="item.title === '删除' || item.title === '废弃'"
              :key="item.prop"
              type="danger"
              plain
              size="small"
              @click="operationFun(item.prop, item.state, item.menu)"
            >
              {{ item.title }}
            </ElButton>
            <ElButton
              v-else-if="opIndex === 0 || item.prop == 'exportTable'"
              :key="item.prop"
              type="primary"
              size="small"
              @click="operationFun(item.prop, item.state, item.menu)"
            >
              {{ item.title }}
            </ElButton>
            <ElButton
              v-else
              :key="item.prop"
              size="small"
              @click="operationFun(item.prop, item.state, item.menu)"
            >
              {{ item.title }}
            </ElButton>
          </template>
          <div v-if="!!tip" class="table-tip"><i class="el-icon-info" />&nbsp;&nbsp;{{ tip }}</div>
        </slot>
        <slot name="leftAction" />
      </div>
      <div class="right-btn">
        <slot name="operation" />
        <div class="oper-right">
          <template v-for="(item, indexs) in getOperationExportExcel">
            <i
              :key="indexs"
              class="iconfont icon icon-daochu"
              @click="operationFun(item.prop, item.state, item.menu)"
            />
          </template>
        </div>
      </div>
    </div>
    <div ref="shTable" class="sh-table">
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
          fixed="left"
          title="序号"
          align="center"
          width="60"
        />
        <VxeColumn
          v-if="selection"
          key="checkbox"
          fixed="left"
          type="checkbox"
          title=""
          align="center"
          width="60"
        />
        <VxeColumn
          v-if="showAction"
          key="actionWidth"
          fixed="left"
          title="操作"
          :width="actionWidth"
          align="center"
        >
          <template v-slot="{ row, rowIndex }">
            <div class="erp-table-edit">
              <slot name="action" :row="row" :rowIndex="rowIndex"> </slot>
            </div>
          </template>
        </VxeColumn>
        <VxeColumn
          v-for="column of tableColumn"
          :key="column.prop"
          :title="column.label"
          :field="column.prop"
          min-width="140px"
          :show-overflow="column.tooltip"
          v-bind="column"
        >
        </VxeColumn>
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
    loading: {
      type: Boolean,
      default: false,
    },
    height: {
      type: [String, Number],
      default: 0,
    },
    pageState: {
      type: Boolean,
      default: true,
    },
    total: {
      type: Number,
      default: 0,
    },
    // table 列表操作按钮
    button: {
      type: [Array, Boolean],
      default: () => {
        return false;
      },
    },
    tip: {
      type: String,
      default: '',
    },
    functionVerification: {
      type: Object,
      default: () => {
        return {};
      },
    },
    showOverflow: {
      type: Boolean,
      default: false,
    },
    haveTab: {
      type: Boolean,
      default: false,
    },
    showAction: {
      type: Boolean,
      default: true,
    },
    pageIndex: {
      type: [String, Number],
      default: 0,
    },
    actionWidth: {
      type: [String, Number],
      default: '160px',
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
    delName: {
      type: String,
      default: 'id',
    },
    url: {
      type: [Array, Object],
      default: () => {
        return {};
      },
    },
    // maxHeight: {
    //   type: [String, Number],
    //   default: 'auto',
    // },
    // stripe: {
    //   type: Boolean,
    //   default: false,
    // },
    // border: {
    //   type: Boolean,
    //   default: true,
    // },
    size: {
      type: String,
      default: 'medium',
    },
    // fit: {
    //   type: Boolean,
    //   default: true,
    // },
    // showHeader: {
    //   type: Boolean,
    //   default: true,
    // },
    // highlightCurrentRow: {
    //   type: Boolean,
    //   default: false,
    // },
    // currentRowKey: {
    //   type: [Number, String],
    // },
    // rowClassName: {
    //   type: [Function, Object],
    // },
    // rowStyle: {
    //   type: [Function, Object],
    // },
    // cellClassName: {
    //   type: [Function, String],
    // },
    // cellStyle: {
    //   type: [Function, Object],
    // },
    // headerRowClassName: {
    //   type: [Function, Object],
    // },
    // headerRowStyle: {
    //   type: [Function, Object],
    // },
    // rowKey: {
    //   type: [Function, Object],
    // },
    // emptyText: {
    //   type: String,
    //   default: '暂无数据',
    // },
    // defaultExpandAll: {
    //   type: Boolean,
    //   default: false,
    // },
    // expandRowKeys: {
    //   type: Array,
    //   default() {
    //     return []
    //   },
    // },
    // defaultSort: {
    //   type: Object,
    //   default() {
    //     return {}
    //   },
    // },
    tooltipEffect: {
      type: String, // dark/light
      default: 'dark',
    },
    operation: {
      type: [Array, Boolean],
      default: () => {
        return false;
      },
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
    fileName: {
      type: String,
      default: '',
    },
    // sumText: {
    //   type: String,
    //   default: '合计',
    // },
    // selectOnIndeterminate: {
    //   type: Boolean,
    //   default: true,
    // },
    // indent: {
    //   type: Number,
    //   default: 16,
    // },
    // lazy: {
    //   type: Boolean,
    //   default: false,
    // },
    // load: {
    //   type: Function,
    //   default() {
    //     return () => {}
    //   },
    // },
    // treeProps: {
    //   type: Object,
    //   default() {
    //     return { hasChildren: 'hasChildren', children: 'children' }
    //   },
    // },
  },
  data() {
    return {
      pageNo: 1,
      pageSize: this.$store.getters.get_page_parms.size,
      pageThrottle: false,
      selectionList: [],
      clientHeight: 'auto',
      tableColumn: [],
    };
  },
  computed: {
    pageParms() {
      return this.$store.getters.get_page_parms;
    },
    getAuthority() {
      return this.$store.getters.get_router_parms_now;
    },
    // table 内部操作按钮
    tablebutton() {
      if (this.button === false) {
        const table = this.getAuthority.authority.table || [];
        return table;
      } else {
        return this.button;
      }
    },
    // table 上方功能按钮
    operationFilter() {
      return this.getOperationBtn.filter((item) => this.functionState(item.prop, item));
    },
    getOperationBtn() {
      if (this.operation === false) {
        if (this.getAuthority.authority.operation === void 0) {
          return [];
        }
        return this.getAuthority.authority.operation.filter((e) => e.prop !== 'exportExcel');
      } else {
        return this.operation;
      }
    },
    getOperationExport() {
      if (this.operation === false) {
        const operations = this.getAuthority.authority.operation;
        if (operations === void 0) {
          return [];
        }
        return operations.filter((e) => e.prop === 'exportExcel');
      } else {
        return this.operation;
      }
    },
    getOperationExportExcel() {
      return this.getOperationExport.filter((item) => item.prop === 'exportExcel');
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
    functionState(name, val, index) {
      // 需要从functionVerification 接受一个Object 判断
      if (this.functionVerification[name] !== void 0) {
        return this.functionVerification[name](val, index);
      }
      return true;
    },
    // table上方按钮函数
    operationFun(prop, state) {
      this.$emit('actionMethod', prop, this.selectionList, state);
    },
    // table内部按钮函数
    buttonFun(val, prop) {
      this.$emit('actionMethod', prop, val);
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
@import '~vxe-table/styles/index.scss';
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
  .operation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 1000;
    height: 60px;
    padding: 14px 10px 14px;

    .el-button--danger.is-plain {
      color: #f42430;
      background: #fff;
      border-color: #f42430;
      //opacity: 0.3;
    }
  }
  .right-btn {
    display: flex;
    align-items: center;
    .oper-right {
      > i {
        margin-left: 20px;
      }
    }
  }
}
</style>
