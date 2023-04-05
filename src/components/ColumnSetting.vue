<template>
  <el-popover
    placement="bottom-end"
    title=""
    width="240"
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
      <draggable
        v-model="columnsList"
        scroll
        handle=".dargBtn"
        filter=".undraggable"
      >
        <transition-group>
          <div
            v-for="item of columnsList"
            :key="item.field"
            :class="[item.fixed ? 'undraggable' : '']"
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
            "
          >
            <el-checkbox :label="item.field">
              {{ item.title }}
            </el-checkbox>
            <span
              v-show="!item.fixed"
              class="el-icon-sort dargBtn"
              style="font-size: 20px; cursor: move"
            />
          </div>
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
import { baseStorage } from '@/utils/storage'
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
    }
  },
  computed: {
    key() {
      return this.$route.path.split('/').at(-1)
    },
  },
  created() {
    const storageColumns = baseStorage.getItem(this.key) || []
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
      this.columnsList = filterColumns.map((item) => {
        return columns.find((cln) => cln.field === item.field)
      })
      this.checkList = filterColumns
        .filter((item) => item.select)
        .map((item) => item.field)
      this.all = this.checkList.length === filterColumns.length
    }
  },
  mounted() {
    this.confirm()
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
      baseStorage.setItem(this.key, this.columnsList)
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
    max-height: 300px;
    overflow-y: auto;
    .el-checkbox {
      flex: 1;
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
    .dargBtn {
      width: 40px;
      align-self: stretch;
      vertical-align: middle;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .dargBtn:hover {
      background: #f5f7fa;
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
