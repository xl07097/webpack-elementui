<template>
  <div>
    <el-input placeholder="kakak" v-model="keyword"> </el-input>
    <div>
      <div v-for="text of list">
        <KeywordTextVue :text="text" :key="text" :keyword="keyword"></KeywordTextVue>
      </div>
    </div>
  </div>
</template>

<script>
import KeywordTextVue from '@/components/KeywordText.vue'
export default {
  name: 'Department',
  components: { KeywordTextVue },
  data() {
    return {
      tab: 1,
      num: 0,
      lp: '',
      keyword: '',
      list: [
        'testtzdfhgnmhsnjkhj',
        'sthgdtyhfj',
        'testtfgxbzsdsnjkhj',
        'gsgfdgbdg',
        'testtxgnb snjkhj',
        'gtrsfgvrdg',
        'tesxgbxfvcttsnjkhj',
        'fvvsrf',
        'tesdefcttsnjkhj',
        'bsrfbdr',
        'testtsrgDfsnjkhj',
        'srtfdrtb',
      ],
    }
  },
  methods: {
    toggle() {
      this.tab = this.tab == 1 ? 2 : 1
    },
    blur(e) {
      console.log(e.target.value)
    },
    change(currentValue, oldValue) {
      console.log(currentValue, oldValue)
    },
    input(v) {
      console.log('v:', v)
    },
  },
}
</script>

<style>
[pseudo='-webkit-input-placeholder'] {
  display: none;
}
</style>
