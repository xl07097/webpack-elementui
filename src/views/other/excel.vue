<template>
  <div>
    <el-button @click="exportExcel"> 导出 </el-button>
    <input
      type="file"
      multiple
      class="upfile"
      @change="upfile"
    >

    <FileUpload
      action="http://localhost:3003/upload/alioss"
      :file-list.sync="list"
      :limits="10"
      :headers="headers"
    />
  </div>
</template>

<script>
import writeXlsxFile from 'write-excel-file'
import readXlsxFile from 'read-excel-file'
import { title, row2, row3, row4, row5 } from './excelData'
import batchRequest from '@/utils/ponyfill'
import FileUpload from '@/components/file/FileUpload.vue'
export default {
  name: 'AppExcel',
  components: { FileUpload },
  data() {
    return {
      list: [],
      headers: {
        AuthToken: 'W88G0R46WEUP9JXKOF6H71WI',
      },
    }
  },
  methods: {
    exportExcel() {
      const data = [title, row2, row3, row4, row5]
      writeXlsxFile(data, {
        headerStyle: {
          height: 30,
          fontWeight: 'bold',
          fontSize: 20,
        },
        width: 20,
        fileName: '成功人力资源集团服务计算单.xlsx',
      })
    },
    async upfile(e) {
      const file = e.target.files[0]
      const schema = {
        '名称': {
          prop: 'name',
        },
        '简称': {
          prop: 'shortName',
        },
        '组合名': {
          prop: 'mergerName',
        },
        '层级': {
          prop: 'levelCode',
          type: Number
        },
        '父级行政代码': {
          prop: 'parentCode',
        },
        '行政代码': {
          prop: 'areaCode',
        },
        '邮政编码': {
          prop: 'zipCode',
        },
        '区号': {
          prop: 'cityCode',
        },
        '拼音': {
          prop: 'pinyin',
        },
        '经度': {
          prop: 'lng',
        },
        '纬度': {
          prop: 'lat',
        },
      }
      readXlsxFile(file).then((rows) => {
        console.log(rows)
      })
    },
    // async upfile(e) {
    //   const files = e.target.files
    //   batchRequest([...files], {
    //     request: this.uploadFile,
    //   }).then(console.log)
    // },
    async uploadFile(file) {
      const formData = new FormData()
      formData.append('upfile', file)
      const res = await fetch('http://localhost:3003/upload/alioss', {
        method: 'post',
        body: formData,
        headers: {
          AuthToken: 'W88G0R46WEUP9JXKOF6H71WI',
        },
      })
      return await res.json()
    },
  },
}
</script>
<style lang="scss"></style>
