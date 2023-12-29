<script>
import * as obj from '@/http/request'
import { delay } from '@/utils/commons'
const cacheRequest = {

}
export default {
  name: 'ItemRender',
  props: {
    tag: {
      type: String,
      default: 'input',
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
          list: [],
          props: {},
        };
      },
    },
    width: {
      type: Number,
      default: 200,
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
      list: [],
      isFouce: false,
    };
  },
  computed:{
    options(){
      return this.config.list || this.list || []
    },
    style() {
      let styleWidth = this.config.width || this.width
      return {
        width: `${styleWidth}px`,
      }
    },
  },
  created(){
    this.init()
  },
  methods: {
    async init(){
      const {request={}, delayTimeOut} = this.config
      // 请求延时
      if(delayTimeOut){
        await delay(delayTimeOut)
      }
      if(request.url){
        const method = request.method || 'get'
        obj[method](request.url, request.data).then(this.handleRes)
      }else if(request.cacheRequest){
        cacheRequest[request.cacheRequest](request.data).then(this.handleRes)
      }
    },
    renderInput(h) {
      return (
        <el-input value={this.value} style={this.style} class={{'is-fouce': this.value || this.isFouce}} on-focus={this.onFocus} on-blur={this.onBlur} on-input={this.input} clearable  />
      );
    },
    renderSelect(h) {
      const {request={}} = this.config
      // const placeholder = request.remote? '请输入关键字':`请选择${this.label}`
      return (
        <el-select
          value={this.value}
          on-change={this.change}
          clearable
          filterable
          class={{'is-fouce': this.value || this.isFouce}} 
          on-focus={this.onFocus} 
          on-blur={this.onBlur}
          remote={request.remote}
          remoteMethod={this.remoteMethod}
          placeholder={''}
          style={this.style} 
        >
          {this.options.map((item) => {
            return <el-option key={item.value} label={item.label} value={item.value} />;
          })}
        </el-select>
      );
    },
    renderDate(h) {
      const { tag, dateFormat } = this;
      const {pickerOptions={}} = this.config
      return (
        <el-date-picker
          value={this.value}
          type={tag}
          clearable
          format={dateFormat[tag]}
          valueFormat={dateFormat[tag]}
          picker-options={pickerOptions}
          onInput={this.input}
          on-change={this.change}
          class={{'is-fouce': this.value || this.isFouce}} 
          on-focus={this.onFocus} 
          on-blur={this.onBlur}
          placeholder={''}
          style={this.style} 
        ></el-date-picker>
      );
    },
    renderCascader(h){
      const props = Object.assign({
        checkStrictly: true,
        value: 'id',
        label: 'title',
        children: 'children',
        emitPath: false
      }, this.config.props||{})
      return (
        <el-cascader
          value={this.value}
          showAllLevels={false}
          options={this.options}
          props={{props}}
          filterable
          clearable
          class={{'is-fouce': this.value || this.isFouce}} 
          on-focus={this.onFocus} 
          on-blur={this.onBlur}
          on-change={this.change}
          placeholder={''}
          style={this.style}></el-cascader>
      )
    },
    renderAutocomplete(h){
      // const placeholder = request.remote? '请输入关键字':`请选择${this.label}`
      return (
        <el-autocomplete
          value={this.value}
          fetch-suggestions={this.querySearch}
          placeholder={''}
          class={{'is-fouce': this.value || this.isFouce}} 
          on-focus={this.onFocus} 
          on-blur={this.onBlur}
          style={this.style} 
        >
          <template v-slot:default="{item}">
            { item.label }
          </template>
        </el-autocomplete>
      )
    },
    input(value) {
      this.$emit('input', value);
    },
    change(value) {
      this.$emit('input', value);
    },
    selectClear() {
      this.$emit('input', '');
    },
    onFocus(){
      this.isFouce = true
    },
    onBlur(){
      this.isFouce = false
    },
    remoteMethod(keyword){
      const {request={}} = this.config
      request.remoteMethod(keyword).then(this.handleRes)
    },
    querySearch(keyword, cb){
      if(!keyword){
        cb([])
        return
      }
      const {request={}} = this.config
      request.remoteMethod(keyword).then((res) => {
        if(request.handleData){
          cb(Object.freeze(request.handleData(res)))
        }else {
          cb(Object.freeze(res.data))
        }
      })
    },
    handleRes(res){
      const {request={}} = this.config
      if(request.handleData){
        this.list = Object.freeze(request.handleData(res))
      }else {
        this.list = Object.freeze(res.data)
      }
    }
  },
  render(h) {
    const tag = this.tag;
    const label = this.label
    if (tag === 'select') {
      return <el-form-item label={label}>
        {this.renderSelect(h)}
      </el-form-item>
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
      return <el-form-item label={label}> {this.renderDate(h)} </el-form-item>
    }
    if(tag === 'cascader'){
      return <el-form-item label={label}> {this.renderCascader(h)} </el-form-item>
    }
    if(tag === 'autocomplete'){
      return <el-form-item label={label}> {this.renderAutocomplete(h)} </el-form-item>
    }
    return <el-form-item label={label}> {this.renderInput(h)} </el-form-item>
  },
};
</script>
