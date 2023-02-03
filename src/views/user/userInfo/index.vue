<template>
  <div>
    <ColumnSetting />
  </div>
</template>

<script>
import ColumnSetting from "@/components/ColumnSetting";
export default {
  name: 'UserInfo',
  components:{ColumnSetting},
  mounted(){
    const set1 = new BroadcastChannel('lplp')

    const set2 = new BroadcastChannel('lplp')

    set2.onmessage = (data) => {
      console.log(data)
    }

    set1.postMessage({
      lp: 9090
    })
  }
}
</script>

<style>

</style>
