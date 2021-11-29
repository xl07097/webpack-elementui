<template>
  <div>
    <!--    <FormRender v-model='searchData' :fields='fields'></FormRender>-->

    <el-button @click='getValue'>查询</el-button>
  </div>
</template>

<script>
import FormRender from '@/components/form/FormRender';
import * as storage from 'store';
// import locals from 'store/storages/sessionStorage.js';

export default {
  name: 'TestCom',
  components: {
    FormRender,
  },
  data() {
    return {
      searchData: {
        name: '90',
        age: '',
        class: '',
      },
      fields: [
        {
          type: 'input',
          key: 'name',
          label: '姓名',
          config: {},
        },
        {
          type: 'input',
          key: 'age',
          label: '年龄',
          config: {},
        },
        {
          type: 'select',
          key: 'class',
          label: '班级',
          config: {
            lists: [
              {
                label: '一年级',
                value: 1,
              },
              {
                label: '二年级',
                value: 2,
              },
              {
                label: '三年级',
                value: 3,
              },
              {
                label: '四年级',
                value: 4,
              },
            ],
          },
        },
      ],
    };
  },
  methods: {
    transformPre(source = {}, tras = {}) {
      let tmp = {};
      Object.keys(source).forEach((item) => {
        if (tras[item]) {
          tmp[tras[item]] = source[item];
        } else {
          tmp[item] = source[item];
        }
      });
      return tmp;
    },
    getValue() {
      console.log(this.searchData);
    },
  },
  mounted() {

    // const local = storage.createStore(locals);
    // console.log(local);
    storage.set('name', {
      name: 'jack',
      age: 20,
    });

  },
};
</script>
