<template>
  <div class="index">
    <input type="file" @change="fileChange" />
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Index',
  data() {
    return {
      currentCom: null,
      show: true,
      com: null,
      test: 1,
      dialogVisible: false,
    };
  },
  computed: {
    ...mapState(['count']),
    ...mapState({
      userCount: (state) => state.user.userCount,
    }),
    lp() {
      console.log(80);
      return this.test;
    },
  },
  beforeUpdate() {
    console.log('变更');
  },
  methods: {
    ...mapMutations(['add']),
    visible() {
      this.$router.push('/index');
      this.dialogVisible = !this.dialogVisible;
    },
    fileChange(e) {
      console.log(e.target.files[0]);
      // console.time('label');
      // readXlsxFile(e.target.files[0]).then((rows) => {
      //   console.timeEnd('label');
      // });
    },
    removeFile() {
      this.$refs.uploadRef.clearFiles();
    },
  },
  mounted() {
    console.log(Object.freeze({}));
    // downloadGet('/qrcode/createCode').then(res => {
    //   console.log(res)
    // }).catch(err => {
    // // console.log(err);
    // })
  },
  beforeMount() {
    // console.log(this.$el);
  },
  created() {},
  destroyed() {
    // console.log('destroyed')
  },
  beforeDestroy() {
    // console.log('beforeDestroy')
  },
  activated() {
    // console.log('进入')
  },
  deactivated() {
    // console.log("离开");
  },
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
