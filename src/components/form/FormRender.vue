<template>
  <el-form
    ref="formRender"
    class="search-form"
    :model="currentData"
    :rules="rules"
    :label-width="`${labelWidth}px`"
    inline
  >
    <el-form-item
      v-for="(field, index) of fields"
      :class="{ 'form-item-hide': showAll ? false : index > showNumber }"
      :key="field.prop"
      :label="field.label"
      :label-width="field.labelWidth"
      :prop="field.prop"
    >
      <item-render
        v-model="currentData[field.prop]"
        :tag="field.type"
        :field="field.field"
        :label="field.label"
        :config="field.config"
      />
    </el-form-item>

    <el-form-item class="search-form-item">
      <el-button @click="expand">展开</el-button>
      <el-button type="primary">查询</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import ItemRender from './ItemRender'
import { debounce } from '@/utils/commons'

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
    // 规则
    rules: {
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
      default: 80,
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
    this.$nextTick(() => {
      this.init()
    })
    const deFn = debounce(this.init)
    window.addEventListener('resize', deFn)
    this.$on('hook:beforeDestroy', () => {
      window.removeEventListener('resize', deFn)
    })
  },
  methods: {
    init() {
      if (this.showAll) {
        return
      }
      const widthMap = Object.assign({
        input: 215,
        select: 215,
        cascader: 215,
        year: 220,
        date: 220,
        week: 220,
        daterange: 350,
      }, this.widthConfig) 
      const searchWidth = document.querySelector('.search-form').getBoundingClientRect().width
      const searchBtnWidth = document
        .querySelector('.search-form-item')
        .getBoundingClientRect().width

      const fields = this.fields
      let totalWidth = searchBtnWidth
      for (let index = 0; index < fields.length; index++) {
        const item = fields[index]
        const labelWidth = item.labelWidth || this.labelWidth
        const width = item.width || widthMap[item.type]
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

  .search-form-item {
    margin-left: auto;
  }

  .form-item-hide {
    display: none;
  }
}
</style>
