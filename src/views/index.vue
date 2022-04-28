<template>
  <div class="index">
    <FormRender :value="searchData" :fields="fields" />
    <el-button @click="gets"> 获取 </el-button>
    <el-form ref="form" inline :model="form" :rules="rules">
      <el-form-item label="name" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="age" prop="age">
        <el-input v-model="form.age" />
      </el-form-item>
      <el-form-item label="total" prop="total">
        <el-input-number v-model="form.total" :min="1" :max="10" label="描述文字" />
      </el-form-item>

      <StarAddress v-model="form.address" />
    </el-form>
  </div>
</template>
<script>
import FormRender from '@/components/form/FormRender';
import StarAddress from './StarAddress';
export default {
  name: 'AppIndex',
  components: { FormRender, StarAddress },
  data() {
    return {
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
        { type: 'dates', prop: 'dates', label: 'dates' },
        { type: 'week', prop: 'week', label: 'week' },
      ],
      form: {
        name: '',
        age: '',
        address: {},
        total: 0,
      },
      address: {},
      rules: {
        name: { required: true, message: 'name', trigger: 'blur' },
        age: { required: true, message: 'age', trigger: 'blur' },
        total: { required: true, message: 'age', trigger: 'blur' },
        // 'address.provice': { required: true, message: 'provice', trigger: 'blur' },
        // 'address.city': { required: true, message: 'city', trigger: 'blur' },
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.fields[2].config.lists = [
        { label: 'lp', value: 'lp' },
        { label: 'lp1', value: 'lp1' },
        { label: 'lp2', value: 'lp2' },
      ];
    });
  },
  methods: {
    gets() {
      console.log(this.searchData);
      this.$refs.form.validate((state) => {});
    },
    selectChange(val) {
      console.log(val);
      this.value = new Date(val);
    },
  },
};
</script>

<style lang="less">
.dd {
  position: absolute;
}
.add {
  display: none;
}
</style>
