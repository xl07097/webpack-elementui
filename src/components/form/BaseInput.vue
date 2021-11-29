<script>
export default {
  name: 'BaseInput',
  props: {
    tag: {
      type: String,
      default: '',
    },
    props: {
      type: Object,
      return() {
        return {};
      },
    },
  },
  render(h) {
    const tag = 'Input';
    switch (this.tag) {
      case 'input':
        break;
    }
    return h(tag, {
      props: this.props,
      styles: this.styles,
      on: this.events,
    });
  },
};
</script>

<style scoped></style>
