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
      type: [String, Boolean, Object, Array, Number, Date],
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
    return {
      dateFormat: {
        year: 'yyyy',
        month: 'yyyy-MM',
        date: 'yyyy-MM-dd',
        dates: 'yyyy-MM-dd',
        daterange: 'yyyy-MM-dd',
        // week: 'yyyy 第 WW 周'
      },
    };
  },
  // computed:{
  //   currentValue:{
  //     get(){
  //       return this.value
  //     },
  //     set(val){
  //       console.log(val)
  //       this.$emit('input', val)
  //     }
  //   }
  // },
  methods: {
    renderInput(h) {
      return (
        <el-input value={this.value} on-input={this.input} placeholder={`请输入${this.label}`} />
      );
    },
    renderSelect(h) {
      const { lists = [] } = this.config;
      return (
        <el-select
          value={this.value}
          on-change={this.change}
          clearable
          placeholder={`请选择${this.label}`}
        >
          {lists.map((list) => {
            return <el-option key={list.value} label={list.label} value={list.value} />;
          })}
        </el-select>
      );
    },
    renderDate(h) {
      const { tag, dateFormat } = this;
      return (
        <el-date-picker
          value={this.value}
          type={tag}
          editable={false}
          format={dateFormat[tag]}
          valueFormat={dateFormat[tag]}
          onInput={this.input}
          on-change={this.change}
          placeholder={`请选择${this.label}`}
        ></el-date-picker>
      );
    },
    input(value) {
      this.$emit('input', value);
    },
    change(value) {
      console.log('change:', value);
      this.$emit('input', value);
    },
    selectClear() {
      this.$emit('input', '');
    },
  },
  render(h) {
    const tag = this.tag;
    if (tag === 'select') {
      return this.renderSelect(h);
    }
    if (
      [
        'year',
        'month',
        'date',
        'dates',
        'week',
        'datetime',
        'datetimerange',
        'daterange',
        'monthrange',
      ].includes(tag)
    ) {
      return this.renderDate(h);
    }
    return this.renderInput(h);
  },
};
</script>
