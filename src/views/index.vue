<template>
  <div class="index">
    <!-- <FormRender v-model="searchData" :fields="fields" />
    <el-button @click="gets"> 获取 </el-button>
    <el-button @click="test">测试</el-button>
    <el-button @click="gets1">获取</el-button> -->
    <el-input v-model="lk" type="textarea" rows="6" />
  </div>
</template>
<script>
import FormRender from '@/components/form/FormRender'
import { post } from '@/http/request'
export default {
  name: 'AppIndex',
  components: { FormRender },
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
            }
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
      lk: ''
    }
  },
  mounted() {
    console.log(this)
    this.lk = '【成功人力】2023-01-01 —— 2023-01-31 招聘信息\n\n【工作地点】大金制冷苏州有限公司\n【返费规则】男满10打卡日返500元，女满10打卡日返600元\n            男满20打卡日返1000元，女满20打卡日返1500元\n            男满30打卡日返1500元，女满30打卡日返2000元'
    this.$nextTick(() => {
      // this.fields[2].config.lists = [
      //   { label: 'lp', value: 'lp' },
      //   { label: 'lp1', value: 'lp1' },
      //   { label: 'lp2', value: 'lp2' },
      // ]
    })
  },
  methods: {
    gets() {
      console.log(this.searchData)
    },
    test(){
      const key =  `id_${~~(Math.random()*100000)}`
      localStorage.setItem(key, key)
      // console.log(this.$store)
      // this.$store.commit('app/setAppData', {
      //   type: 'dict',
      //   data: []
      // })
    },
    gets1(){
      console.log(this.$store.getters['app/getAppData']('dict'))
    }
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
