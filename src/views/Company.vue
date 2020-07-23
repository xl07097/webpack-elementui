<template>
    <div>
        <slot name="header"></slot>
        <slot name="default" :sc="sc">哈哈哈哈</slot>
        <slot name="footer"></slot>
    </div>
</template>

<script>
export default {
    name: "Company",
    props: ['a'],
    data() {
        return {
            sc: {
                lpl: "LPL"
            }
        };
    },
    beforeUpdate(){
        console.log('beforeUpdate:1');
    },
    updated(){
        console.log('updated:1');
    },
};
</script>

<style></style>
