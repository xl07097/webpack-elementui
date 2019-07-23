<template>
  	<div class="index">
    	hahah {{userCount}} {{count}}
    	<Button @click="add">count</Button>
    	<!-- <img src="@/assets/qq5.png" id="login-btn" alt="qq" @click="qqLogin" /> -->
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

