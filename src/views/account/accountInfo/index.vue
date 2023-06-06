<template>
  <div>
    <GridLayout :fields="fields" :value="value" />
  </div>
</template>

<script>
import GridLayout from '@/components/grid/GridLayout.vue';
export default {
  components: { GridLayout },
  data() {
    return {
      fields: [{
        label: '姓名：',
        prop: 'name'
      },{
        label: '性别：',
        prop: 'name1'
      },{
        label: '姓名1：',
        prop: 'name2'
      },{
        label: '姓名2：',
        prop: 'name3'
      },{
        label: '姓名3：',
        prop: 'name4'
      },{
        label: '姓名4：',
        prop: 'name5'
      }],
      value:{
        name: '啊哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈',
        name1: '23',
        name3: '啊哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈',
        name2: '啊哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈',
        name4: '啊哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈',
        name5: '啊哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈',
        name6: '啊哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈',
        name7: '啊哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈啊哈哈哈哈哈',
      }
    };
  },
  methods: {

  },
};
</script>

<style lang="scss">

</style>
