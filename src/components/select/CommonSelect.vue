<template>
  <ElSelect
    v-model="_value"
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
      :key="item[primaryKey]"
      :value="item[primaryKey]"
      :label="item[label]"
    />
  </ElSelect>
</template>

<script>
export default {
  name: 'CommonSelect',
  props: {
    value: {
      type: [String, Number, Array],
      default: '',
    },
    placeholder: {
      type: String,
      default: '请输入关键字搜索',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array,
      default: () => [],
    },
    listObject: {
      type: Object,
      default: () => ({}),
    },
    primaryKey: {
      type: String,
      default: 'id',
    },
    label: {
      type: String,
      default: 'label',
    },
  },
  data() {
    return {
      isSearch: false,
      options: [],
    }
  },
  computed: {
    _value: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
    finalList() {
      if (this.isSearch) {
        return this.options
      }
      if (this.value) {
        let filterList = []
        if (this.multiple) {
          filterList = this.value.map((x) => this.listObject[x])
        }
        filterList = [this.listObject[this.value]]
        return Object.freeze(filterList.filter(Boolean))
      }
      return []
    },
  },
  methods: {
    remoteMethod(keyword) {
      if (!keyword) {
        return
      }
      this.isSearch = true
      const label = this.label
      this.options = Object.freeze(
        this.list.filter((x) => x[label].includes(keyword))
      )
    },
  },
}
</script>
