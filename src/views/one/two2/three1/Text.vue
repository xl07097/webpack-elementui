<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
  },
  render(h) {
    return <span>{this.text}</span>
  },
}
</script>
