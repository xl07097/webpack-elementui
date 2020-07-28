<template>
    <div>

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
            let file = this.files[0];

                if (!file) {
                    return;
                }

                let form = new FormData();
                form.append("receiver", "1058392650@qq.com");
                form.append("subject", "wuti");
                form.append("content", "hahahahha");
                form.append('file', file);

                // $fetch(`mail/sendMailData`, form, true)
                //     .then(data => {
                //         console.log(data);
                //     })
        }
    },
    mounted(){

    }
}
</script>

<style>

</style>