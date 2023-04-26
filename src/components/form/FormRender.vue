<template>
  <el-form
    ref="formRender"
    class="search-form"
    size="small"
    :label-width="`${labelWidth}px`"
    inline
  >
    <el-form-item
      v-for="(field, index) of filnalFields"
      :key="field.prop"
      :class="{ 'form-item-hide': showAll ? false : index > showNumber-1 }"
      :label="field.label"
      :label-width="field.labelWidth"
      :prop="field.prop"
    >
      <item-render
        v-model="currentData[field.prop]"
        :tag="field.type"
        :field="field.field"
        :label="field.label"
        :width="width"
        :config="field.config"
      />
      <!-- <span class="inner-label">{{ field.label }}</span> -->
    </el-form-item>

    <el-form-item class="search-form-btn">
      <el-button
        v-if="showNumber<filnalFields.length"
        type="text"
        @click="expand"
      >
        {{ showAll ? '收起':'展开' }}
        <i v-if="showAll" class="el-icon-arrow-up" />
        <i v-else class="el-icon-arrow-down" />
      </el-button>
      <el-button type="primary" @click="search">
        查询
      </el-button>
      <el-button @click="reset">
        重置
      </el-button>
      <SearchSetting
        :columns="fields"
        :active-name="activeName"
        @confirm="confirm"
      />
      <!-- <el-button type="text" @click="configuration">自定义配置</el-button> -->
    </el-form-item>
  </el-form>
</template>
<script>
import ItemRender from './ItemRender'
import SearchSetting from './SearchSetting.vue'

export default {
  name: 'FormRender',
  components: { ItemRender, SearchSetting },
  props: {
    value: {
      type: Object,
      default() {
        return {}
      },
    },
    fields: {
      type: Array,
      default() {
        return []
      },
    },
    labelWidth: {
      type: Number,
      default: 84,
    },
    width: {
      type: Number,
      default: 200,
    },
    widthConfig:{
      type: Object,
      default(){
        return {}
      }
    },
    activeName:{
      type: [Number, String],
      default: '0',
    }
  },
  data() {
    return {
      showNumber: 10,
      showAll: false,
      filnalFields: [],
      refreshFlag: false
    }
  },
  computed: {
    currentData: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
  watch:{
    activeName(){
      this.initWidth()
    }
  },
  mounted() {
    // this.initWidth()
    this.init()
  },
  methods: {
    getWidth(){
      return document.querySelector('.search-form').getBoundingClientRect().width
    },
    init() {
      let timer = null
      const observe = new ResizeObserver((entries) => {
        for (let entry of entries) {
          clearTimeout(timer)
          timer = setTimeout(() => {
            this.handleWidth(entry.contentRect.width)
          }, 300)
        }
      })
      const formRender =  this.$refs.formRender.$el
      observe.observe(formRender);
      this.$on('hook:beforeDestroy', () => {
        observe.disconnect()
      })
    },
    initWidth(){
      const searchWidth = this.getWidth()
      this.handleWidth(searchWidth)
    },
    handleWidth(searchWidth){
      if (this.showAll && !this.refreshFlag) {
        return
      }
      this.refreshFlag = false
      // const widthMap = Object.assign({
      //   input: 200,
      //   select: 200,
      //   cascader: 200,
      //   year: 200,
      //   date: 200,
      //   week: 200,
      //   daterange: 200,
      // }, this.widthConfig) 
      const fields = this.filnalFields
      // 初始按钮区域宽度
      let totalWidth = 260
      for (let index = 0; index < fields.length; index++) {
        const item = fields[index]
        const labelWidth = item.labelWidth || this.labelWidth
        const width = item.width || this.width // widthMap[item.type]
        const margin = 10
        if (totalWidth + labelWidth + width + margin > searchWidth) {
          this.showNumber = index 
          return
        }
        totalWidth = totalWidth + labelWidth + width + margin
      }
    },
    expand() {
      this.showAll = !this.showAll
    },
    search(){
      const fields = this.filnalFields
      let data = {}
      const value = this.value
      fields.forEach(item => {
        if(item.endProp){
          const currentData = value[item.prop] || []
          data[item.prop] = currentData[0]
          data[item.endProp] = currentData[1]
        }else{
          data[item.prop] = value[item.prop]
        }
      })
      console.log(data)
      this.$emit('search', data)
    },
    reset(){
      const data = {}
      this.fields.forEach(item => {
        // if(item.endProp){
        //   const currentData = value[item.prop] || []
        //   data[item.prop] = currentData[0]
        //   data[item.endProp] = currentData[1]
        // }else{
        data[item.prop] = null
        // }
      })
      this.currentData = data
    },
    // configuration(){

    // },
    confirm(fields) {
      this.filnalFields = Object.freeze(fields)
      this.refreshFlag = true
      this.$nextTick(() => {
        this.initWidth()
      })
    },
  },
}
</script>

<style lang="scss">
.search-form {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0 6px;

  .el-form-item {
    margin-bottom: 10px;
    // display: inline-flex;
    // flex-wrap: nowrap;
  }

  .search-form-btn {
    margin-left: auto;
  }

  .form-item-hide {
    display: none;
  }

  .inner-label{
    position: absolute;
    left: 15px;
    pointer-events: none;
    color: #6e6f73;;
    font-size: 13px;
    line-height: 20px;
    top: 6px;
    background: #fff;
    transition: top 0.1s linear;
  }
  .el-date-editor ~ .inner-label{
    left: 27px;
  }
  .is-fouce ~ .inner-label{
    top: -10px;
  }
}
</style>
