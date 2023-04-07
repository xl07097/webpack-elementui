<template>
  <el-form
    ref="formRender"
    class="search-form"
    size="small"
    :label-width="`${labelWidth}px`"
    inline
  >
    <el-form-item
      v-for="(field, index) of fields"
      :key="field.prop"
      :class="{ 'form-item-hide': showAll ? false : index > showNumber }"
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
      <span class="inner-label">{{ field.label }}</span>
    </el-form-item>

    <el-form-item class="search-form-btn">
      <el-button
        v-if="showNumber<fields.length"
        :icon="`${showAll?'el-icon-arrow-up':'el-icon-arrow-down'}`"
        type="text"
        @click="expand"
      >
        {{ showAll ? '收起':'展开' }}
      </el-button>
      <el-button type="primary" icon="el-icon-search" @click="search">
        查询
      </el-button>
      <el-button icon="el-icon-refresh-right" @click="reset">
        重置
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import ItemRender from './ItemRender'

export default {
  name: 'FormRender',
  components: { ItemRender },
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
        return {

        }
      }
    }
  },
  data() {
    return {
      showNumber: 10,
      showAll: false,
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
  mounted() {
    const searchWidth = document.querySelector('.search-form').getBoundingClientRect().width
    this.handleWidth(searchWidth)
    this.init()
  },
  methods: {
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
    handleWidth(searchWidth){
      if (this.showAll) {
        return
      }
      // const widthMap = Object.assign({
      //   input: 200,
      //   select: 200,
      //   cascader: 200,
      //   year: 200,
      //   date: 200,
      //   week: 200,
      //   daterange: 200,
      // }, this.widthConfig) 

      const fields = this.fields
      let totalWidth = 230
      for (let index = 0; index < fields.length; index++) {
        const item = fields[index]
        const labelWidth = item.labelWidth || this.labelWidth
        const width = item.width || this.width // widthMap[item.type]
        const margin = 10
        if (totalWidth + labelWidth + width + margin > searchWidth) {
          this.showNumber = index - 1
          return
        }
        totalWidth = totalWidth + labelWidth + width + margin
      }
    },
    expand() {
      this.showAll = !this.showAll
    },
    search(){
      const fields = this.fields
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
    }
  },
}
</script>

<style lang="scss">
.search-form {
  display: flex;
  flex-wrap: wrap;

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
