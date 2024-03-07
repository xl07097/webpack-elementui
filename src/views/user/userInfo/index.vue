<template>
  <div>
    lp
  </div>
</template>

<script>
import NP from 'number-precision'
export default {
  name: 'UserInfo',
  mounted(){
    // const set1 = new BroadcastChannel('lplp')

    // const set2 = new BroadcastChannel('lplp')

    // set2.onmessage = (data) => {
    //   console.log(data)
    // }

    // set1.postMessage({
    //   lp: 9090
    // })

    console.log(NP.float2Fixed(0.1234))
  }
}
</script>
