<template>
  <div>
    <vxe-table
      border
      height="600"
      :scroll-y="{enabled: false}"
      :span-method="rowspanMethod"
      :data="list"
    >
      <vxe-column field="name1" title="功能模块">
        <template #default="{ row }">
          <vxe-checkbox v-model="row.check1" @change="check1ChangeEvent(row, row.check1)">{{ row.name1 }}</vxe-checkbox>
        </template>
      </vxe-column>
      <vxe-column field="name2" title="详细功能">
        <template #default="{ row }">
          <vxe-checkbox v-model="row.check2" @change="check2ChangeEvent(row, row.check2)">{{ row.name2 }}</vxe-checkbox>
        </template>
      </vxe-column>
      <vxe-column field="name3" title="权限类型">
        <template #default="{ row }">
          <vxe-checkbox v-model="row.check3" @change="check3ChangeEvent(row, row.check3)">{{ row.name3 }}</vxe-checkbox>
        </template>
      </vxe-column>
      <vxe-column field="name4" title="权限列表">
        <template #default="{ row }">
          <vxe-checkbox v-model="row.check4" @change="check4ChangeEvent(row, row.check4)">{{ row.name4 }}</vxe-checkbox>
        </template>
      </vxe-column>
    </vxe-table>
  </div>
</template>

<script>
import { get } from '@/http/request'
import XEUtils from 'xe-utils';
export default {
  name: 'ConLog',
  data() {
    return {
      list: [],
    };
  },
  mounted(){
    this.getList()
  },
  methods: {
    getList(){
      let list = []
      function flagMenu(data){
        data.forEach(item => {
          list.push({
            ...item,
            children: null
          })
          if(item.children && item.children.length>0){
            flagMenu(item.children)
          }
        })
      }
      get('/sysPrivilege/getPrivilege/10000').then(res => {
        this.toColTreeData(res.data.menuTree)
        // flagMenu(res.data.menuTree)
        // this.list = list
        // list = null
      })
    },
    toColTreeData (treeData){
      const options = { children: 'children' }
      const list = []
      const keyMap = {}
      XEUtils.eachTree(treeData, (item, index, result, paths, parent) => {
        keyMap[item.id] = item
        item.keys = parent ? parent.keys.concat([item.id]) : [item.id]
        if (!item.children || !item.children.length) {
          const row = {}
          item.keys.forEach((key, index) => {
            const level = index + 1
            const obj = keyMap[key]
            row[`check${level}`] = false
            row[`id${level}`] = obj.id
            row[`name${level}`] = obj.title
          })
          list.push(row)
        }
      }, options)
      this.list = list
    },
    rowspanMethod({ row, _rowIndex, column, visibleData }){
      const fields = ['name1', 'name2', 'name3']
      const cellValue = row[column.field]
      if (cellValue && fields.includes(column.field)) {
        const prevRow = visibleData[_rowIndex - 1]
        let nextRow = visibleData[_rowIndex + 1]
        if (prevRow && prevRow[column.field] === cellValue) {
          return { rowspan: 0, colspan: 0 }
        } else {
          let countRowspan = 1
          while (nextRow && nextRow[column.field] === cellValue) {
            nextRow = visibleData[++countRowspan + _rowIndex]
          }
          if (countRowspan > 1) {
            return { rowspan: countRowspan, colspan: 1 }
          }
        }
      }
      // if (rowIndex % 2 === 0) {
      //     if (columnIndex === 0) {
      //       return [1, 2];
      //     } else if (columnIndex === 1) {
      //       return [0, 0];
      //     }
      //   }
    },
    check1ChangeEvent(row, checked){
      let childList = this.list.filter(item => item.name1 === row.name1)
      childList.forEach(item => {
        item.check1 = checked
      })
      childList = this.list.filter(item => item.id1 === row.id1)
      childList.forEach(item => {
        this.check2ChangeEvent(item, checked)
      })
    },
    check2ChangeEvent(row, checked){
      let childList = this.list.filter(item => item.id1 === row.id1 && item.name2 === row.name2)
      childList.forEach(item => {
        item.check2 = checked
      })
      childList = this.list.filter(item => item.id2 === row.id2)
      childList.forEach(item => {
        this.check3ChangeEvent(item, checked)
      })
    },
    
    check3ChangeEvent(row, checked){
      let childList = this.list.filter(item => item.id2 === row.id2 && item.name3 === row.name3)
      childList.forEach(item => {
        item.check3 = checked
      })
      childList = this.list.filter(item => item.id3 === row.id3)
      childList.forEach(item => {
        this.check4ChangeEvent(item, checked)
      })
    },
    check4ChangeEvent(row, checked){
      let childList = this.list.filter(item => item.id3 === row.id3 && item.name4 === row.name4)
      childList.forEach(item => {
        item.check4 = checked
      })
      childList = this.list.filter(item => item.id3 === row.id3)
      const isChecked3 = childList.every(item => item.check4)
      childList.forEach(item => {
        item.check3 = isChecked3
      })
      childList = this.list.filter(item => item.id2 === row.id2)
      const isChecked2 = childList.every(item => item.check3)
      childList.forEach(item => {
        item.check2 = isChecked2
      })
      childList = this.list.filter(item => item.id1 === row.id1)
      const isChecked1 = childList.every(item => item.check2)
      childList.forEach(item => {
        item.check1 = isChecked1
      })
    }
  },
};
</script>
