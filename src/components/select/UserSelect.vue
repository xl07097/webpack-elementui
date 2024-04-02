<template>
  <ElSelect
    v-model="id"
    :placeholder="placeholder"
    filterable
    clearable
    :multiple="multiple"
    v-bind="$attrs"
    remote
    :remote-method="remoteMethod"
  >
    <ElOption
      v-for="item of finalList"
      :key="item.value"
      :value="item.value"
      :label="item.label"
    />
  </ElSelect>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    value: {
      type: [String, Array],
      default: '',
    },
    multiple:{
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default() {
        return []
      },
    },
    excludeIds: {
      type: Array,
      default() {
        return []
      },
    },
    placeholder: {
      type: String,
      default: '请输入关键字搜索',
    },
  },
  data() {
    return {
      isSearch: false,
      options: [],
    }
  },
  computed: {
    id: {
      get() {
        return this.value
      },
      set(id) {
        this.$emit('input', id)
      },
    },
    finalList() {
      if (this.isSearch) {
        return this.options
      }
      if (this.value) {
        let filterList = []
        if (this.multiple) {
          filterList = this.value.map(x => this.userObject[x])
        }
        filterList = [this.userObject[this.value]]
        return Object.freeze(filterList.filter(Boolean))
      }
      return []
    },
    ...mapGetters(['userObject']),
  },
  methods: {
    remoteMethod(keyword) {
      if (!keyword) {
        return
      }
      this.isSearch = true
      this.options = Object.freeze(this.list.filter(x => x.label.includes(keyword)))
    },
  },
}
</script>
