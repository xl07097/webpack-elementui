<template>
  <el-form
    ref="formRender"
    class="search-form"
    size="small"
    inline
  >
    <el-form-item
      v-for="(field, index) of filnalFields"
      :key="field.prop"
      :class="{ 'form-item-hide': showAll ? false : index > showNumber-1 }"
      :prop="field.prop"
    >
      <item-render
        v-model="form[field.prop]"
        :tag="field.type"
        :field="field.field"
        :label="field.label"
        :width="width"
        :config="field.config"
      />
      <span class="inner-label">{{ field.label }}</span>
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
    width: {
      type: Number,
      default: 220,
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
      refreshFlag: false,
      form: {},
    }
  },
  watch:{
    activeName(){
      this.initWidth()
    },
    value(val){
      this.form = {
        ...val
      }
    }
  },
  created(){
    this.form = {
      ...this.value
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    getWidth(){
      return document.querySelector('.search-form').getBoundingClientRect().width
    },
    init() {
      let timer = null
      let observe = new ResizeObserver((entries) => {
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
        observe = null
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
      const fields = this.filnalFields
      // 初始按钮区域宽度
      let totalWidth = 260
      for (let index = 0; index < fields.length; index++) {
        const width = this.width
        const margin = 10
        if (totalWidth + width + margin > searchWidth) {
          this.showNumber = index 
          return
        }
        totalWidth = totalWidth + width + margin
      }
    },
    expand() {
      this.showAll = !this.showAll
    },
    search(){
      const fields = this.filnalFields
      let data = {}
      const form = this.form
      fields.forEach(item => {
        if(item.endProp){
          const currentData = form[item.prop] || []
          data[item.prop] = currentData[0]
          data[item.endProp] = currentData[1]
        }else{
          data[item.prop] = form[item.prop]
        }
      })
      this.$emit('search', data)
    },
    reset(){
      const data = {}
      this.fields.forEach(item => {
        data[item.prop] = null
      })
      this.form = data
      this.$emit('reset', data)
    },
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
    font-size: 12px;
    line-height: 16px;
    top: 8px;
    background: #fff;
    transition: top 0.18s ease-in-out;
  }
  .el-date-editor ~ .inner-label{
    left: 27px;
  }
  .is-fouce ~ .inner-label{
    top: -8px;
  }
}
</style>
