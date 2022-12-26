<template>
  <div class="index">
    <FormRender :value="searchData" :fields="fields" />
    <el-button @click="gets"> 获取 </el-button>
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
        { type: 'select', prop: 'provice', label: '省', 
          config: { 
            request:{
              // url: 'sysArea/list',
              // method: 'post',
              remote: true,
              remoteMethod: (keyword) => {
                return post('sysArea/list',{"parentCode": keyword})
              },
              data:{
                "parentCode": "320500"
              },
              handleData: (res) => {
                return res.data.map(({id, name}) => {
                  return {
                    label: name,
                    value: id
                  }
                })
              }
            }
          } 
        },
        { type: 'cascader', prop: 'cascader', label: '菜单', 
          config: {
            request: {
              url: 'sysMenu/tree'
            },
            props: {
              checkStrictly: true,
              emitPath: false,
              value: 'id',
              label: 'name',
              children: 'children',
              multi: true
            }
          } 
        },
        { type: 'year', prop: 'year', label: '年' },
        { type: 'daterange', prop: 'createTime', label: '创建时间' },
        { type: 'date', prop: 'date', label: 'date' },
        { type: 'week', prop: 'week', label: 'week' },
      ],
    }
  },
  mounted() {
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
