<template>
    <div>
        <input multiple type="file" class="upfile">
        <button type="button" @click="send">发送</button>
    </div>
</template>

<script>
export default {
    name:"SendMail",
    data(){
        return {

        }
    },
    methods:{
        send(){
            let file = document.querySelector('.upfile').files;

                let form = new FormData();
                form.append("receiver", "1058392650@qq.com");
                form.append("subject", "wuti");
                form.append("content", "hahahahha");
                for(let i = 0;i < file.length;i++){
                    form.append('upfile', file[i]);
                }
                
                fetch("https://tomcat.zhiqiuge.com/note/mail/sendMailData",{
                    method: "POST",
                    body: form,
                    headers:{
                        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ4dWVsaWFuZyIsImV4cCI6MTYyNzU1OTgxMywidXNlcklkIjoiMSIsImlhdCI6MTYyNzU1MjYxM30.h3b-IGCLnnZWLIcBZ94AOnEq9NFz4M8uCBCLcHMj7bY'
                    }
                }).then(res => res.json)
        }
    },
    mounted(){

    }
}
</script>

<style>

</style>
