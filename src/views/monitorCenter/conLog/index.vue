<template>
  <div class="css-wrap">
    <CssTemplate />
    <XsyTitle title="基本信息" />
  </div>
</template>

<script>
const context = require.context('./components', false, /\.vue$/)
const modules = context.keys().reduce((acc, key) => {
  const name = key.replace(/(\.\/|\.vue)/g, '')
  acc[name] = context(key).default
  return acc
}, {})

import XsyTitle from '@/components/title/Title'
export default {
  name: 'ConLog',
  components:{...modules, XsyTitle},
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