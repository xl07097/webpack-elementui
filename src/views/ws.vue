<template>
    <div>
        <button @click="lp">hha</button>
        {{ko}}
    </div>
</template>

<script>
export default {
    name: "ws",
    data() {
        return {
            ws: "",
            sa: 0
        };
    },
    methods:{
        distroyWs(){
            if(this.ws){
                 this.ws.close();
                this.ws = "";
            }
        },
        lp(){
            console.log(80);
            this.sa = Math.random();
        }
    },
    computed:{
        ko(){
            console.log(90);
            return this.sa
        }
    },
    created() {
        this.$on("hook:deactivated", () =>{
            console.log('hook:deactivated')
            this.distroyWs();
        })
        this.$on("hook:beforeDestroy", () =>{
            console.log('hook:deactivated')
            this.distroyWs();
        })
        this.ws = new WebSocket("ws://tomcat.zhiqiuge.com/note/websocket/1");
        const that = this;
        //打开事件
        this.ws.onopen = function() {
            console.log("Socket 已打开");
            fetch("https://tomcat.zhiqiuge.com/note/socket/push/1?message=hello")
                .then(data => data.text())
                .then(data => {
                    console.log(data);
                });
            that.ws.send("这是来自客户端的消息" + location.href + new Date());
        };

        //获得消息事件
        this.ws.onmessage = function(msg) {
            console.log(msg.data);
            //发现消息进入    开始处理前端触发逻辑
        };

        //关闭事件
        this.ws.onclose = function() {
            console.log("Socket已关闭");
        };

        //发生了错误事件
        this.ws.onerror = function() {
            console.log("Socket发生了错误");
            //此时可以尝试刷新页面
        };
    }
};
</script>
<style lang="less"></style>
