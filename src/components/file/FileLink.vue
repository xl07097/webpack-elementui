<template>
  <el-link 
    :href="`${OSSURIPrefix}${url}`"
    target="_blank"
    icon="el-icon-document"
    :download="name"
  >
    {{ name }}
  </el-link>
</template>

<script>
// import { OSSURIPrefix } from '@/http/urls'
export default {
  props: {
    url: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      OSSURIPrefix: '',
    }
  },
}
</script>
