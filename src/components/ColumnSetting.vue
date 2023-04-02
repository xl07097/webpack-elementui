<template>
  <el-popover
    placement="bottom-end"
    title=""
    width="200"
    trigger="click"
    popper-class="table-column-popover"
    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
  >
    <el-checkbox
      v-model="all"
      class="table-column-all-check"
      label="全选"
      @change="changeAll"
    />
    <el-checkbox-group
      v-model="checkList"
      class="table-column-filter"
      size="mini"
      @change="changeSingle"
    >
      <draggable v-model="columnsList">
        <transition-group>
          <el-checkbox
            v-for="item of columnsList"
            :key="item.field"
            :label="item.field"
          >
            {{ item.title }}
          </el-checkbox>
        </transition-group>
      </draggable>
    </el-checkbox-group>
    <div class="table-column-popover-footer">
      <el-button type="text" @click="reset">还原</el-button>
      <el-button type="text" @click="confirm">确定</el-button>
    </div>
    <el-button slot="reference">配置</el-button>
  </el-popover>
</template>

<script>
import { storage } from '@/utils/storage'
import draggable from 'vuedraggable'
import { deepClone } from '@/utils/commons'
export default {
  components: { draggable },
  props: {
    columns: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      visible: false,
      checkList: [],
      all: true,
      columnsList: [],
      list: [
        { label: '111', id: '111' },
        { label: '112', id: '112' },
        { label: '113', id: '113' },
        { label: '114', id: '114' },
        { label: '115', id: '115' },
        { label: '116', id: '116' },
        { label: '117', id: '117' },
        { label: '118', id: '118' },
        { label: '119', id: '119' },
        { label: '120', id: '120' },
        { label: '121', id: '121' },
        { label: '123', id: '123' },
        { label: '124', id: '124' },
        { label: '125', id: '125' },
        { label: '126', id: '126' },
      ],
    }
  },
  created() {
    // debugger
    const storageColumns = storage.getItem('operationlog') || []
    const columns = this.columns
    if (storageColumns.length === 0) {
      this.columnsList = deepClone(columns)
      this.checkList = columns.map((item) => item.field)
    } else {
      const originFields = columns.map((item) => item.field)
      columns.forEach((item, index) => {
        // debugger
        const findIndex = storageColumns.findIndex(
          (sf) => sf.field === item.field
        )
        if (findIndex === -1) {
          if (index === 0) {
            storageColumns.unshift({
              ...item,
              select: true,
            })
          } else {
            const preItem = columns[index - 1]
            const findPreIndex = storageColumns.findIndex(
              (sf) => sf.field === preItem.field
            )
            storageColumns.splice(findPreIndex + 1, 0, {
              ...item,
              select: true,
            })
          }
        }
      })

      const filterColumns = storageColumns.filter((item) => {
        return originFields.includes(item.field)
      })
      this.columnsList = filterColumns
      this.checkList = filterColumns
        .filter((item) => item.select)
        .map((item) => item.field)
      this.all = this.checkList.length === filterColumns.length
    }
  },
  mounted() {
    this.confirm()
    // this.$emit(
    //   'confirm',
    //   this.columnsList.filter((item) => item.select)
    // )
  },
  methods: {
    changeAll(flag) {
      if (flag) {
        this.checkList = this.columnsList.map((item) => item.field)
      } else {
        this.checkList = []
      }
    },
    changeSingle(rows) {
      this.all = rows.length === this.columnsList.length
    },
    reset() {},
    confirm() {
      this.$nextTick(() => {
        document.body.click()
      })
      const checkList = this.checkList
      this.columnsList.forEach((item) => {
        item.select = checkList.includes(item.field)
      })
      const columns = this.columnsList.filter((item) =>
        checkList.includes(item.field)
      )
      storage.setItem('operationlog', this.columnsList)
      this.$emit('confirm', columns)
    },
  },
}
</script>

<style lang="scss">
.table-column-popover {
  padding: 0;
  .table-column-all-check {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 1em;
    margin-bottom: 4px;
    border-bottom: 1px solid #dadce0;
  }
  .table-column-filter {
    display: flex;
    flex-direction: column;
    max-height: 240px;
    overflow-y: auto;
    .el-checkbox {
      flex: none;
      margin: 0;
      display: flex;
      align-items: center;
      height: 34px;
      padding: 0 1em;
    }
    .el-checkbox:hover {
      background: #f5f7fa;
      cursor: pointer;
    }
    .el-checkbox:active {
      cursor: pointer;
    }
  }
  .table-column-popover-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 4px;
    border-top: 1px solid #dadce0;
    .el-button {
      padding: 10px 16px;
      font-size: 14px;
      flex: 1;
    }
  }
}
</style>
