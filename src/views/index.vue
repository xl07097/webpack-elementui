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
    ...mapMutations(["add"]),
    qqLogin() {
      function openWindow(url, width, height) {
        width = width || 600;
        height = height || 400;
        var left = (window.screen.width - width) / 2;
        var top = (window.screen.height - height) / 2;
        window.open(
          url,
          "_blank",
          "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, left=" +
            left +
            ", top=" +
            top +
            ", width=" +
            width +
            ", height=" +
            height
        );
      }

      function qqLogin() {
        var qqAppId = "424323422"; // 上面申请得到的appid
        var qqAuthPath = window.location; // 前面设置的回调地址
        var state = "fjdslfjsdlkfd"; // 防止CSRF攻击的随机参数，必传，登录成功之后会回传，最好后台自己生成然后校验合法性
        openWindow(
          `https://graph.qq.com/oauth2.0/authorize?response_type=token&client_id=${qqAppId}&redirect_uri=${encodeURIComponent(
            qqAuthPath
          )}&state=${state}`
        );
      }
    }
  },
  mounted() {
    let obj = {
      a: 1,
      b: 2
    };
    console.log({ ...obj });
    QC.Login({
      btnId: "login_btn",
      size: "B_M"
    });
    QC.Login(
      {
        btnId: "login-btn"
      },
      function(reqData, opts) {
        //根据返回数据，更换按钮显示状态方法
        //注意:传入此方法则需要自己渲染按钮
        var dom = document.getElementById(opts["btnId"]),
          _logoutTemplate = [
            //头像
            '<span><img src="{figureurl}" class="{size_key}"/></span>',
            //昵称
            "<span>{nickname}</span>",
            //退出
            '<span><a href="javascript:QC.Login.signOut();">退出</a></span>'
          ].join("");
        dom &&
          (dom.innerHTML = QC.String.format(_logoutTemplate, {
            nickname: QC.String.escHTML(reqData.nickname), //做xss过滤
            figureurl: reqData.figureurl
          }));
      },
      function(opts) {
        console.log("QQ登录 注销成功 !");
      }
    );

    // 通过jssdk调用api
    // 具体参数请参考 => http://wiki.connect.qq.com/api%e5%88%97%e8%a1%a8
    // QC.Login.getMe(function(openid, access_token) {
    //   QC.api("get_user_info", {
    //     oauth_consumer_key: "101490224", // appid
    //     access_token: openid,
    //     openid: access_token
    //   }).success(function(res) {
    //     console.log(res);
    //   });
    // });
  }
};
</script>


<style lang="less">
</style>

