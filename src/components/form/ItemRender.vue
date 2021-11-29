<script>
export default {
  name: 'ItemRender',
  props: {
    tag: {
      type: String,
      default: 'input',
    },
    field: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Boolean, Object, Array, Number],
      default() {
        return '';
      },
    },
    label: {
      type: String,
      default: '',
    },
    config: {
      type: Object,
      default() {
        return {
          lists: [],
          props: {},
        };
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    renderInput(h) {
      return <el-input value={this.value} on-input={this.input} placeholder={`请输入${this.label}`} />;
    },
    renderSelect(h) {
      const { lists = [] } = this.config;
      return (
        <el-select
          value={this.value}
          on-change={this.selectChange}
          on-clear={this.selectClear}
          clearable
          placeholder={`请选择${this.label}`}
        >
          {lists.map((list, index) => {
            return <el-option key={index} label={list.label} value={list.value} />;
          })}
        </el-select>
      );
    },
    input(value) {
      this.$emit('input', value);
    },
    selectChange(value) {
      this.$emit('input', value);
    },
    selectClear() {
      this.$emit('input', '');
    },
  },
  render(h) {
    if (this.tag === 'input') {
      return this.renderInput(h);
    }
    if (this.tag === 'select') {
      return this.renderSelect(h);
    }
    return this.renderInput(h);
  },
};
</script>
