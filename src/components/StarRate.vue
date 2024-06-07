<template>
  <div class="star-rate">
    <div v-for="(item,index) in 5" :key="index" class="star-rate-item">
      <i class="iconfont icon-star" :class="{'active':index<=score}" />
    </div>
  </div>
</template>

<script>
export default {
  props:{
    rate:{
      type:Number,
      default:0,
      enum: [0, 1, 2, 3, 4, 5]
    }
  },
  render(){
    return '★★★★★☆☆☆☆☆'.slice(5-rate,10-rate);
  }
}
</script>
