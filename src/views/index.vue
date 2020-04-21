<template>
    <div class="index">
        hahah {{ userCount }} {{ count }}
        <el-button type="primary" @click="add">count</el-button>
        <el-button type="primary" @click="visible">visible</el-button>
        <!-- <img src="/static/image/163-1.png" alt="163" width="100" /> -->
        <!-- <span style="color:red;font-size:20px;">{{"★★★★★☆☆☆☆☆".slice(5 - 2, 10 - 2)}}</span> -->
        <span class="add" v-show="show">哈哈哈</span>

        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            :before-close="handleClose"
        >
            <span>这是一段信息</span>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import {EventEmitter} from 'events';

export default {
    name: "Index",
    data() {
        return {
            show: true,
            dialogVisible: false
        };
    },
    computed: {
        ...mapState(["count"]),
        ...mapState({
            userCount: state => state.user.userCount
        })
    },
    methods: {
        ...mapMutations(["add"]),
        // add(){
        //     this.show = !this.show;
        // },
        userList() {
            fetch("http://122.51.129.51:8080/note/user/getById?id=1")
                .then(data => data.json())
                .then(data => {
                    console.log(data);
                });
        },
        visible() {
            this.$router.push("/index");
            this.dialogVisible = !this.dialogVisible;
        },
        handleClose() {
            this.dialogVisible = !this.dialogVisible;
        }
    },
    mounted() {
        this.userList();
        console.log(new EventEmitter())
    }
};
</script>

<style lang="less">
.dd {
    position: absolute;
}
.add {
    display: none;
}
</style>
