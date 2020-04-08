<template>
    <div>
        <slot name="header"></slot>
        <slot name="default" :sc="sc"></slot>
        <slot name="footer"></slot>
    </div>
</template>

<script>
export default {
    name: "Company",
    data() {
        return {
            sc: {
                lpl: "LPL"
            }
        };
    }
};
</script>

<style></style>
