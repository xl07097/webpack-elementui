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
      <draggable v-model="list">
        <transition-group>
          <el-checkbox v-for="item of list" :key="item.id" :label="item.id">
            {{
              item.label
            }}
          </el-checkbox>
        </transition-group>
      </draggable>
    </el-checkbox-group>
    <div class="table-column-popover-footer">
      <el-button type="text" @click="reset">还原</el-button>
      <el-button type="text" @click="confirm">确定</el-button>
    </div>
    <el-button slot="reference">手动激活</el-button>
  </el-popover>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  components: { draggable },
  data() {
    return {
      visible: false,
      checkList: [],
      all: false,
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
  methods: {
    changeAll(val) {
      if (val) {
        this.checkList = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
      } else {
        this.checkList = []
      }
    },
    changeSingle(val) {
      this.all = val.length === 9
    },
    reset() {},
    confirm() {
      this.$nextTick(() => {
        document.body.click()
      })
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
    .el-checkbox:active{
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
