<template>
    <i-table stripe :border="border" center :columns="columns" :data="data" :width="width" :height="tableHeight"
             :size="size" @on-selection-change="selectChange"></i-table>
</template>

<script>
    export default {
        name: 'Table',
        props: {
            border: {
                type: Boolean,
                default: false
            },
            center: {
                type: Boolean,
                default: true
            },
            columns: {
                type: Array,
                default: []
            },
            data: {
                type: Array,
                default: []
            },
            width: {
                type: [Number, String],
                // default: 648
            },
            height: {
                type: [Number, String],
                // default: 520
            },
            size: {
                type: String
            }
        },
        methods:{
            selectChange(value){
                this.$emit('on-selection-change',value);
            }
        },
        mounted() {
            this.tableHeight = this.height;
            if (!this.tableHeight) {
                if (window.innerHeight <= 768) {
                    this.tableHeight = 300;
                } else {
                    this.tableHeight = 520;
                }
                let that = this;
                window.onresize = function () {
                    if (window.innerHeight <= 768) {
                        that.tableHeight = 300;
                    } else {
                        that.tableHeight = 520;
                    }
                };
            }
        },
        data() {
            return {
                tableHeight: this.height,
            };
        },
    };
</script>

<style scoped>

</style>
