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
        label: '姓名',
        prop: 'name'
      },{
        label: '性别',
        prop: 'name1'
      },{
        label: '姓名',
        prop: 'name2'
      },{
        label: '姓名',
        prop: 'name3'
      },{
        label: '姓名',
        prop: 'name4'
      },{
        label: '姓名',
        prop: 'name5'
      }],
      value:{
        name: '1',
        name1: '1',
        name3: '1',
        name2: '1',
        name4: '1',
        name5: '1',
        name6: '1',
        name7: '1',
      }
    };
  },
  methods: {

  },
};
</script>

<style lang="scss">

</style>
