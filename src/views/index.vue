<template>
  <div class="index">
    <!-- <FormRender v-model="searchData" :fields="fields" />
    <el-button @click="gets"> 获取 </el-button>
    <el-button @click="test">测试</el-button> -->
    <el-button @click="gets1">获取</el-button>
    <!-- <Verify
      ref="verify"
      :captcha-type="'blockPuzzle'"
      :img-size="{ width: '400px', height: '200px' }"
      @success="login"
    /> -->
  </div>
</template>
<script>
import FormRender from '@/components/form/FormRender'
import { post } from '@/http/request'
// import Verify from '@/components/verifition/Verify.vue'
export default {
  name: 'AppIndex',
  // components: { Verify },
  data() {
    return {
      searchData: {
        name: 'hha',
        age: '',
        year: '2019',
        createTime: [],
        week: '',
      },
      fields: [
        { type: 'input', prop: 'name', label: '姓名' },
        { type: 'input', prop: 'age', label: '年龄' },
        {
          type: 'select',
          prop: 'provice',
          label: '省',
          config: {
            request: {
              // url: 'sysArea/list',
              // method: 'post',
              remote: true,
              remoteMethod: (keyword) => {
                return post('sysArea/list', { parentCode: keyword })
              },
              data: {
                parentCode: '320500',
              },
              handleData: (res) => {
                return res.data.map(({ id, name }) => {
                  return {
                    label: name,
                    value: id,
                  }
                })
              },
            },
          },
        },
        {
          type: 'cascader',
          prop: 'cascader',
          label: '菜单',
          config: {
            request: {
              url: 'sysMenu/tree',
            },
          },
        },
        { type: 'year', prop: 'year', label: '年' },
        {
          type: 'daterange',
          prop: 'createTime',
          label: '创建时间',
          config: {
            pickerOptions: {
              disabledDate(date) {
                return date.getTime() > Date.now()
              },
            },
          },
        },
        { type: 'date', prop: 'date', label: 'date' },
      ],
      lk: '',
    }
  },
  mounted() {},
  methods: {
    gets() {
      console.log(this.searchData)
    },
    test() {
      const key = `id_${~~(Math.random() * 100000)}`
      localStorage.setItem(key, key)
      // console.log(this.$store)
      // this.$store.commit('app/setAppData', {
      //   type: 'dict',
      //   data: []
      // })
    },
    gets1() {
      this.$refs.verify.show()
      // console.log(this.$store.getters['app/getAppData']('dict'))
    },
    login() {},
  },
}
</script>

<style lang="scss">
.dd {
  position: absolute;
}

.add {
  display: none;
}
</style>
