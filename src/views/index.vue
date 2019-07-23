<template>
  	<div class="index">
    	hahah {{userCount}} {{count}}
    	<Button type="primary" @click="add">count</Button>
        <img src="/static/image/163-1.png" alt="163" width="100">
  	</div>
</template>
<script>
import { mapState, mapMutations } from "vuex";

export default {
  	name: "Index",
  	computed: {
    	...mapState(["count"]),
    	...mapState({
      		userCount: state => state.user.userCount
    	})
  	},
  	methods: {
    	...mapMutations(["add"])
  	},
  	mounted() {
    	let obj = {
      		a: 1,
      		b: 2
    	};
    	console.log({ ...obj });
  	}
};
</script>


<style lang="less">
</style>

