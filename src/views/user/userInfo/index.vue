<template>
  <div>
    lp
  </div>
</template>

<script>
// import Ws from 'ws'
export default {
  name: 'UserInfo',
  mounted(){
    const ws = new WebSocket('ws://localhost:9088/note/websocket/userChat/9087')
    ws.onopen = () => {
      ws.send(JSON.stringify({
        'receiverId': '9086',
        'message': '你好'
      }))
    }
    ws.onmessage = (e) => {
      console.log(e)
    }
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
