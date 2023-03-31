<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
  },
  mounted(){
    console.log(this.$listeners)
  },
  render(h) {
    return <span>{this.text}</span>
  }
}
</script>
