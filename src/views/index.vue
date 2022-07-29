<template>
  <div class="index">
    <FormRender :value="searchData" :fields="fields" />
    <el-button @click="gets"> 获取 </el-button>
    <StarNumber v-model="num" controls-position="right">
      <!-- <template #append>
        %
      </template> -->
    </StarNumber>

    <el-form ref="form" :model="obj" :rules="rules">
      <el-form-item prop="name"><el-input v-model="obj.name"></el-input></el-form-item>
      <el-form-item prop="pwd"><el-input v-model="obj.pwd"></el-input></el-form-item>
      <Address v-model="obj.address"></Address>
      <el-button type="primary" @click="submit"> 获取 </el-button>
    </el-form>
  </div>
</template>
<script>
import FormRender from '@/components/form/FormRender'
import StarNumber from '@/components/StarNumber'
import Address from './Address'
export default {
  name: 'AppIndex',
  components: { FormRender, StarNumber,Address },
  data() {
    return {
      num: 0,
      searchData: {
        name: 'hha',
        age: '',
        year: '2019',
        dates: [],
        week: '',
      },
      value: new Date(),
      fields: [
        { type: 'input', prop: 'name', label: '姓名' },
        { type: 'input', prop: 'age', label: '年龄' },
        { type: 'select', prop: 'provice', label: '省', config: { lists: [] } },
        { type: 'year', prop: 'year', label: '年' },
        { type: 'daterange', prop: 'createTime', label: '创建时间' },
        { type: 'date', prop: 'date', label: 'date' },
        { type: 'week', prop: 'week', label: 'week' },
      ],
      obj: {
        name: '',
        pwd: '',
        address: [
          {
            provice: '',
            city: '',
          },
        ],
      },
      rules: {
        name: [{ required: true }],
        pwd: [{ required: true }],
      },
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.fields[2].config.lists = [
        { label: 'lp', value: 'lp' },
        { label: 'lp1', value: 'lp1' },
        { label: 'lp2', value: 'lp2' },
      ]
    })
  },
  methods: {
    gets() {
      console.log(this.searchData)
    },
    selectChange(val) {
      console.log(val)
      this.value = new Date(val)
    },
    submit() {
      this.$refs.form.validate(() => {
        console.log(this.obj)
      })
    },
  },
}
</script>

<style lang="less">
.dd {
  position: absolute;
}

.add {
  display: none;
}
</style>
