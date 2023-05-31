<template>
  <div class="css-wrap">
    <CssTemplate />
  </div>
</template>

<script>
const context = require.context('./components', false, /\.vue$/)
const modules = context.keys().reduce((acc, key) => {
  const name = key.replace(/(\.\/|\.vue)/g, '')
  acc[name] = context(key).default
  return acc
}, {})
export default {
  name: 'ConLog',
  components:{...modules},
  data() {
    return {
      list: [],
    };
  },
};
</script>

<style lang="scss">
.css-wrap{
  display: flex;
  gap: 20px;
}
</style>