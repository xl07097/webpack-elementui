<template>
  <el-button type="primary" :disabled="status" @click="getCode">
    {{ text }}
  </el-button>
</template>

<script>
import { get } from '@/http/request'

export default {
  props:{
    url:{
      type:String,
      default:''
    },
    mobile:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      status: false,
      text: '',
      timer: null
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  methods:{
    getCode(){
      get(this.url, { mobile: this.mobile }).then(this.success).catch(this.error)
    },
    success(e){
      if (e.code === 0) {
        let time = (ms) => {
          this.timer = setTimeout(() => {
            if (ms < 1 || this.visible === false) {
              this.text = this.$t('获取验证码')
              this.verifyCode.state = 0
              return
            }
            this.text = this.$t('再次获取') + `${ms}S`
            time(ms - 1)
          }, 1000)
        }
        this.text = this.$t('再次获取') + '60S'
        time(59)
        this.verifyCode.state = 2
      } else {
        this.text = this.$t('获取验证码')
        this.verifyCode.state = 0
      }
    },
    error(){
      this.verifyCode.text = this.$t('获取验证码')
      this.verifyCode.state = 0
    }
  }
}
</script>
