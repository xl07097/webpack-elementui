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
      class="table-column-all-check"
      v-model="all"
      label="全选"
      @change="changeAll"
    ></el-checkbox>
    <el-checkbox-group
      class="table-column-filter"
      @change="changeSingle"
      v-model="checkList"
      size="mini"
    >
      <el-checkbox label="1">1</el-checkbox>
      <el-checkbox label="2">2</el-checkbox>
      <el-checkbox label="3">3</el-checkbox>
      <el-checkbox label="4">4</el-checkbox>
      <el-checkbox label="5">5</el-checkbox>
      <el-checkbox label="6">6</el-checkbox>
      <el-checkbox label="7">7</el-checkbox>
      <el-checkbox label="8">8</el-checkbox>
      <el-checkbox label="9">9</el-checkbox>
    </el-checkbox-group>
    <div class="table-column-popover-footer">
      <el-button type="text" @click="reset" >还原</el-button>
      <el-button type="text" @click="confirm">确定</el-button>
    </div>
    <el-button slot="reference">手动激活</el-button>
  </el-popover>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      checkList: [],
      all: false,
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
    reset(){

    },
    confirm() {
      this.$nextTick(() => {
        document.body.click()
      })
    },
  },
}
</script>
