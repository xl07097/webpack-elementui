<template>
  <el-popover
    :key="keys"
    placement="bottom-end"
    title=""
    width="240"
    trigger="click"
    popper-class="table-column-popover"
    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
  >
    <el-checkbox
      v-model="checkAll"
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
      <Draggable
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
      </Draggable>
    </el-checkbox-group>
    <div class="table-column-popover-footer">
      <el-button type="text" @click="reset">还原</el-button>
      <el-button type="text" @click="confirm(true)">确定</el-button>
    </div>
    <el-button slot="reference">配置</el-button>
  </el-popover>
</template>

<script>
import { baseStorage } from '@/utils/storage'
import Draggable from 'vuedraggable'
import { deepClone } from '@/utils/commons'
export default {
  components: { Draggable: Draggable },
  props: {
    columns: {
      type: Array,
      default() {
        return []
      },
    },
    activeName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      checkList: [],
      checkAll: true,
      columnsList: [],
    }
  },
  computed: {
    key() {
      let path = this.$route.path.split('/')
      return `${path.at(-2)}_${path.at(-1)}`
    },
    keys() {
      return this.activeName || '99' // this.columnsList.map((item) => item.field).join('')
    },
  },
  watch: {
    columns() {
      this.init()
      this.confirm()
    },
  },
  created() {
    this.init()
    this.confirm()
  },
  methods: {
    init() {
      // 1. 获取本地存储的table字段
      const storageColumns = baseStorage.getItem(`${this.key}${this.activeName}`) || []
      // 2. 获取页面传递的table字段
      const columns = this.columns
      // 3. 判断本地存储数据，为0 代表没有存储，直接使用页面传递进来的，并全选
      if (storageColumns.length === 0) {
        this.columnsList = deepClone(columns).map(item => {
          return {
            title: item.title,
            field: item.field,
            fixed: item.fixed,
          }
        })
        this.checkList = columns.map((item) => item.field)
        this.checkAll = true
      } else {
        // 4. 备份页面传递进来的 field 数组
        const originProps = columns.map((item) => item.field)
        // 5. 页面传递的配置遍历，进行字段的增删
        columns.forEach((item, index) => {
        // 6. 判断当前字段在本地存储是否存在
          const findIndex = storageColumns.findIndex(
            (sf) => sf.field === item.field,
          )
          // 7 不存在
          if (findIndex === -1) {
            // 8 判断当前字段是否是第一个字段，是第一个字段，直接插入到数组第一个位置，并默认选中
            if (index === 0) {
              storageColumns.unshift({
                title: item.title,
                field: item.field,
                fixed: item.fixed,
                select: true,
              })
            } else {
              // 9 不是第一个字段，获取当前字段的前一个字段，找到前一个字段在本地存储的位置，插入到前一个字段的后面，并默认选中
              const preItem = columns[index - 1]
              const findPreIndex = storageColumns.findIndex(
                (sf) => sf.field === preItem.field,
              )
              storageColumns.splice(findPreIndex + 1, 0, {
                title: item.title,
                field: item.field,
                fixed: item.fixed,
                select: true,
              })
            }
          }
        })

        // 10. 本地存储的配置遍历，进行字段的删
        const filterColumns = storageColumns.filter((item) => {
          return originProps.includes(item.field)
        })
        this.columnsList = filterColumns
        // 11. 获取选中的字段
        this.checkList = filterColumns
          .filter((item) => item.select)
          .map((item) => item.field)

        // 12. 判断选中的字段是否和本地存储的字段一致，一致全选，不一致不全选
        this.checkAll = this.checkList.length === filterColumns.length
      }
    },
    changeAll(flag) {
      if (flag) {
        this.checkList = this.columnsList.map((item) => item.field)
      } else {
        this.checkList = []
      }
    },
    changeSingle(rows) {
      this.checkAll = rows.length === this.columnsList.length
    },
    reset() {
      this.checkList = this.columns.map(item => item.field)
      this.columnsList = deepClone(this.columns).map(item => {
        return {
          title: item.title,
          field: item.field,
          fixed: item.fixed,
        }
      })
      this.checkAll = true
      this.$nextTick(() => {
        this.confirm()
      })
    },
    // 13. 配置字段传递到页面显示
    confirm(flag) {
      this.$nextTick(() => {
        document.body.click()
      })
      // 14. 备份选中的字段
      const checkList = this.checkList
      // 15. 即将存储到本地的配置
      const storageColumns = this.columnsList.map((item) => {
        return {
          title: item.title,
          field: item.field,
          fixed: item.fixed,
          select: checkList.includes(item.field),
        }
      })
      const originColumns = this.columns
      // 16. 获取传递到页面显示的配置
      const columns = this.columnsList.filter((item) => checkList.includes(item.field)).map(item => {
        return originColumns.find(oc => oc.field === item.field)
      })
      if (flag == true) {
        baseStorage.setItem(`${this.key}${this.activeName}`, storageColumns)
        this.$emit('confirm', columns)

      } else if (this.columnsList.length > 0) {
        baseStorage.setItem(`${this.key}${this.activeName}`, storageColumns)
        this.$emit('confirm', columns)
      }
    },
    afterLeave() {
      // 17. 这个函数判断是否点击确认按钮，否：重置排序
      // const storageColumns = baseStorage.getItem(`${this.key}${this.activeName}`) || []
      // const storageKey = storageColumns.map(item => item.field).join('')
      // const columnsKey = this.columnsList.map(item => item.field).join('')
      // if (storageKey !== columnsKey) {
      this.init()
      // }
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
