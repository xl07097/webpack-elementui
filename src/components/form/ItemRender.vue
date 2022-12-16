

<script>
import * as obj from '@/http/request'
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
      lists: [],
    };
  },
  computed:{
    optionList(){
      return this.config.lists || this.lists || []
    }
  },
  mounted(){
    const {request={}} = this.config
    if(request.url){
      const method = request.method || 'get'
      obj[method](request.url, request.data).then(res => {
        if(request.handleData){
          this.lists = Object.freeze(request.handleData(res))
        }else {
          this.lists = Object.freeze(res.data)
        }
      })
    }
  },
  methods: {
    renderInput(h) {
      return (
        <el-input value={this.value} on-input={this.input} placeholder={`请输入${this.label}`} />
      );
    },
    renderSelect(h) {
      return (
        <el-select
          value={this.value}
          on-change={this.change}
          clearable
          placeholder={`请选择${this.label}`}
        >
          {this.optionList.map((list) => {
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
    renderCascader(h){
      const props = this.config.props || {}
      console.log(props)
      return (
        <el-cascader 
          value={this.value} 
          showAllLevels={false} 
          options={this.optionList} 
          props={{props}} 
          on-change={this.change}></el-cascader>
      )
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
    if(tag === 'cascader'){
      return this.renderCascader(h);
    }
    return this.renderInput(h);
  },
};
</script>
