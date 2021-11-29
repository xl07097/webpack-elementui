<template>
  <el-table>
    <el-table-column>
      <template v-slot:header="scope">
        {{ scope }}
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      form: {
        formItem1: '',
        formItem2: [],
        formItem3: '',
      },
      items1: [
        // 输入框
        {
          type: 'input',
          key: 'formItem1',
          label: 'formItem1：',
          placeholder: '请输入',
        },
        // 下拉框
        {
          type: 'select',
          key: 'formItem2',
          label: 'formItem2：',
          placeholder: '请选择',
          config: {
            props: {
              filterable: true,
              clearable: true,
              disabled: false,
            },
            options: [
              {
                name: '1',
                code: 1,
              },
            ],
            optionConfig: {
              label: 'name',
              value: 'code',
            },
            listeners: {
              change: this.handleChange,
            },
          },
        },
      ],
      basicRules: {
        // formItem1: [ { required: true, trigger: 'blur' }]
      },
      formItem2s: [],
    };
  },
  methods: {
    handleChange() {},
  },
};
</script>
