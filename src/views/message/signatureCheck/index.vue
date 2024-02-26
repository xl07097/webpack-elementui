<template>
  <div>
    <!-- <PdfOffice /> -->
    <el-input style="width:200px;">
      <template #append>
        <el-button type="primary">哈哈哈</el-button>
      </template>
    </el-input>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'SignatureCheck',
  data(){
    return {

    }
  },
  mounted(){
    const now = dayjs()
    console.log(now.date())
    console.log(now.daysInMonth())
  },
  methods:{
  }
}
</script>
