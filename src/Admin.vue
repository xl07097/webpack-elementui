<template>
  <div id="app">
    admin
  </div>
</template>
<script>
import {copyRightConsole} from '@/utils/commons'
import UAParser from 'ua-parser-js'
const packageInfo = require('../package.json')
export default {
  name: 'App',
  mounted() {
    window.addEventListener('error', (eventErr) => {
      const filename = eventErr.filename || ''
      if (/(.css|.js)$/.test(filename)) {
        if (this.hasDialog) {
          return
        }
        this.hasDialog = true
        this.$alert('因版本更新，页面需重新载入以加载对应资源！', '提示', {
          confirmButtonText: '确定',
          callback: () => {
            window.location.reload(true)
          },
        })
      }
      eventErr.preventDefault()
    }, true)

    copyRightConsole(packageInfo)

    let parser = new UAParser()

    console.log(parser.getResult())
  },
};
</script>