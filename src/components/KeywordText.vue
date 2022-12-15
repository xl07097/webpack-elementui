<script>
export default {
  name: "KeywordText",
  props:{
    keyword:{
      type: String,
      default: ''
    },
    text:{
      type: String,
      default: ''
    }
  },
  render(h){
    const vnodes = [];
    // const regExp = new RegExp(this.keyword, 'g')
    // const text = this.text.replace(regExp, `<span style="background: red;">${this.keyword}</span>`)
    const text = this.text.split(this.keyword)
    text.forEach(str => {
      vnodes.push(h('span', null, str))
      vnodes.push(h('span', {
        style: 'color:red;'
      }, this.keyword))
    })
    if(text.length){
      vnodes.pop()
    }
    return h('span', null, vnodes)
  }
}
</script>