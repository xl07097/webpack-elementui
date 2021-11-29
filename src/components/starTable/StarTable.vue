<template>
  <div class='star-table-wrap'>
    <div class='operation'>
      <div class='left-btn'>
        <slot class='left'>
          <template v-for='(button, lbIndex) in leftButton'>
            <ElButton
              :key='lbIndex'
              :type='button.type'
              size='small'
              @click='operationFun(button.prop)'
            >
              {{ button.title }}
            </ElButton>
          </template>
        </slot>
        <slot name='leftAction' />
      </div>
      <div class='right-btn'>
        <slot name='operation' />

        <template v-for='(button, rbIndex) in rightButton'>
          <ElButton
            :key='rbIndex'
            :type='button.type'
            size='small'
            @click='operationFun(button.prop)'
          >
            {{ button.title }}
          </ElButton>
        </template>
      </div>
    </div>
    <div ref='shTable' class='star-table'>
      <VxeTable
        ref='tableRef'
        :data='tableData'
        :max-height='clientHeight'
        stripe
        :size='size'
        :align='align'
        :show-overflow='showOverflow'
        highlight-hover-row
        :show-footer='showFooter'
        :footer-method='footerMethod'
        :show-footer-overflow='showFooterOverflow'
        @checkbox-change='selectionChange'
        @checkbox-all='selectionChange'
      >
        <VxeColumn
          v-if='index'
          type='seq'
          fixed='left'
          title='序号'
          align='center'
          width='60'
        />
        <VxeColumn
          v-if='selection'
          fixed='left'
          type='checkbox'
          title=''
          align='center'
          width='60'
        />
        <VxeColumn
          v-if='showAction'
          fixed='left'
          title='操作'
          :width='actionWidth'
          align='center'
        >
          <template v-slot='{ row }'>
            <slot name='action' :row='row'>
              <div class='erp-table-edit'>
                <span
                  v-for='(i, idx) in tablebutton'
                  v-show='!i.if_state && functionState(i.prop, row)'
                  :key='idx'
                  :class='i.class'
                  @click='buttonFun(row, i.prop, i.state)'
                >
                  {{ i.title }}
                </span>
              </div>
            </slot>
          </template>
        </VxeColumn>
        <VxeColumn
          v-for='column of tableColumn'
          :key='column.prop'
          :title='column.label'
          :field='column.prop'
          min-width='140px'
          :show-overflow='column.tooltip'
          v-bind='column'
        >
          <template v-if='column.filer' v-slot='{ row }'>
            <div class='table-text'>
              <slot :name='column.prop' :row='row' :column='column'>
                {{ formatterText(column.filer, row, column.prop) }}
              </slot>
            </div>
          </template>
          <template v-else-if='!column.tooltip' v-slot='{ row }'>
            <div class='table-text'>
              {{ row[column.prop] }}
            </div>
          </template>
        </VxeColumn>
      </VxeTable>
    </div>

    <div class='star-table-pagination'>
      <ElPagination
        v-if='pageState'
        :current-page='pageNo'
        :page-sizes='pageParms.sizes'
        :page-size.sync='pageSize'
        :layout='pageParms.layout'
        :total='total'
        @size-change='sizeChange'
        @current-change='currentChange'
      />
    </div>
    <!--    <ShowFiled :dialog-visible.sync='dialogVisible' :title='columns' @updateColumn='updateColumn' />-->
  </div>
</template>

<script>
// import ShowFiled from './ShowFiled.vue';
// import excel from '../../config/excel';

export default {
  name: 'StarTable',
  components: {
    // ShowFiled,
  },
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
      dialogVisible: false,
      clientHeight: 'auto',
      tableColumn: [],
    };
  },
  computed: {
    getChangeHeight() {
      return this.$store.getters.get_change_height;
    },
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
    leftButton() {
      return this.getOperationBtn.filter(item => this.functionState(item.prop, item));
    },
    getOperationBtn() {
      if (this.operation === false) {
        if (this.getAuthority.authority.operation === void 0) {
          return [];
        }
        return this.getAuthority.authority.operation.filter(e => e.prop !== 'exportExcel');
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
        return operations.filter(e => e.prop === 'exportExcel');
      } else {
        return this.operation;
      }
    },
    getOperationExportExcel() {
      return this.getOperationExport.filter(item => item.prop === 'exportExcel');
    },
    publicHeight() {
      return this.$store.getters.get_height.max;
    },
  },
  watch: {
    getChangeHeight() {
      this.getTableHeight();
    },
    publicHeight() {
      this.getTableHeight();
    },
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
  mounted() {
    this.getTableHeight();
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
      this.summaryFields.forEach(field => {
        let index = columns.findIndex(item => item.property === field.prop);
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
    operationFun(prop) {
      this.$emit('actionMethod', prop, this.selectionList);
    },
    // table内部按钮函数
    buttonFun(val, prop) {
      this.$emit('actionMethod', prop, val);
    },
    updateColumn(column) {
      this.tableColumn = this.columns.filter(item => column.includes(item.label));
      this.refreshColumn();
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

<style lang='scss'>
@import '~vxe-table/styles/index.scss';

.star-table-wrap {
  padding: 0 10px;

  .star-table {
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

  .star-table-pagination {
    padding: 10px 0;
  }

  .operation {
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 1000;
    height: 60px;
    padding: 14px 10px 14px;
  }

  .right-btn {
    display: flex;
    align-items: center;
  }
}
</style>
