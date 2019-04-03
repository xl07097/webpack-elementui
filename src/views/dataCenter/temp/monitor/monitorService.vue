<template>
    <div class="monitorService">
        <div class="content-box clearfix">
            <div class="title">数据运行监控服务</div>

            <div class="wrapper">
                <div class="headers">
                    <div>数据库</div>
                    <div>
                        <img src="../../../../assets/monitor/alarm.png" alt="">
                        <span class="alarmNum">2</span>
                        <img src="../../../../assets/monitor/more.png" alt="">
                    </div>
                </div>
                <div class="bg-time">
                    <span class="tips">健康</span>
                    <span class="times">{{time}}</span>
                </div>
                <div class="inner">
                    <div class="item1">
                        <h4>CPU使用情况</h4>
                        <div class="img">
                            <img src="../../../../assets/monitor/i20.png" alt="">
                            <div class="dd1">
                                <div class="d1">
                                    <span class="span1">2%</span><br>
                                    <span class="span2">CPU</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="item2">
                        <h4>内存使用情况</h4>
                        <div class="img">
                            <img src="../../../../assets/monitor/i25.png" alt="">
                            <div class="dd1">
                                <div class="d1">
                                    <span class="span1">25%</span><br>
                                    <span class="span2">内存</span>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div class="item3">
                        <ul>
                            <li>
                                <div class="s1">730.96KB</div>
                                <div class="s2">
                                    数据库磁盘使用率
                                </div>
                            </li>
                            <li>
                                <div class="s1">4</div>
                                <div class="s2">
                                    数据库连接
                                </div>
                            </li>
                            <li>
                                <div class="s1">23/s</div>
                                <div class="s2">
                                    查询
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="data">
                    <div class="items">
                        <img src="../../../../assets/monitor/icon4.png" alt="">
                        <div class="speed">1.64MB/s</div>
                        <div class="tip">语句读取</div>
                    </div>
                    <div class="items">
                        <img src="../../../../assets/monitor/icon3.png" alt="">
                        <div class="speed">1.64MB/s</div>
                        <div class="tip">语句读取</div>
                    </div>
                    <div class="items">
                        <img src="../../../../assets/monitor/icon2.png" alt="">
                        <div class="speed">1.64MB/s</div>
                        <div class="tip">语句读取</div>
                    </div>
                    <div class="items">
                        <img src="../../../../assets/monitor/icon1.png" alt="">
                        <div class="speed">1.64MB/s</div>
                        <div class="tip">语句读取</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                time: ''
            };
        },
        mounted(){
            this.times();
        },
        methods: {
            times(){
                let t = new Date();
                let h = t.getHours();
                let m = t.getMinutes();
                if(m<10){
                    m = "0"+m;
                }
                if(h<10){
                    this.time = "上午0"+h+":"+m
                }else {
                    h = h-12;
                    this.time = "下午0"+h+":"+m
                }
                setTimeout(()=>{
                    this.times();
                },1000)
            }
        }
    };
</script>
<style lang="scss">
    .monitorService {
        .content-box {
            padding: 30px 44px;
        }
        .title {
            height: 80px;
            font-size: 26px;
            line-height: 1;
            font-family: SourceHanSansCN-Bold;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
        }
        .wrapper {
            width: 1048px;
            height: 688px;
            margin-left: 144px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(220, 220, 220, 1);
            box-shadow: 0 12px 57px 0 rgba(153, 220, 214, 0.22);
            border-radius: 6px;
        }
        .headers {
            display: flex;
            justify-content: space-between;
            padding: 16px 25px;
            font-size: 20px;
            font-family: SourceHanSansCN-Medium;
            font-weight: 500;
            color: rgba(0, 0, 0, 1);
            box-sizing: border-box;
            line-height: 24px;
        }
        .alarmNum{
            position: relative;
            top: -4px;
            margin-right: 39px;
        }
        .bg-time {
            height: 60px;
            width: 1065px;
            padding-left: 35px;
            line-height: 60px;
            position: relative;
            left: -10px;
            background-color: #29B35B;
            .tips {
                font-size: 18px;
                font-family: SourceHanSansCN-Medium;
                font-weight: 500;
                color: rgba(255, 255, 255, 1);
                line-height: 58px;
                text-shadow: 0 1px 1px rgba(81, 83, 84, 0.26);
            }
            .times {
                margin-left: 20px;
                font-size: 14px;
                font-family: SourceHanSansCN-Regular;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                line-height: 58px;
                text-shadow: 0 1px 1px rgba(81, 83, 84, 0.26);
            }
        }
        .img{
            position: relative;
            display: inline-block;
            .dd1{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items:  center;
            }
            .d1{
                position: relative;
                display: inline-block;

                .span1{
                    font-size:26px;
                    font-family:SourceHanSansCN-Medium;
                    font-weight:500;
                    color:rgba(51,51,51,1);
                }
                .span2{
                    font-size:16px;
                    font-family:SourceHanSansCN-Medium;
                    font-weight:500;
                    color:rgba(153,153,153,1);
                }
            }
        }
        .inner {
            display: flex;
            height: 400px;
            padding-top: 40px;
        }
        .item1 {
            width: 400px;
            text-align: center;
        }
        .item2 {
            width: 260px;
            text-align: center;
        }
        .item3 {
            flex: 1;
            padding-left: 160px;
            text-align: left;
        }
        li {
            position: relative;
            padding-left: 20px;
            margin-bottom: 68px;
        }
        li:before{
            position: absolute;
            left: 0;
            top: 29px;
            content: '';
            width: 0;
            height: 0;
            border: 4px solid #CCC;
            background-color: #CCC;
            border-radius: 4px;
        }

        h4 {
            font-size: 16px;
            font-family: SourceHanSansCN-Medium;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            line-height: 58px;
        }
        .s1 {
            font-size: 22px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
        }
        .s2 {
            font-size: 16px;
            font-family: SourceHanSansCN-Medium;
            font-weight: 500;
            color: rgba(153, 153, 153, 1);
        }

        .data{
            display: flex;
        }
        .items{
            width: 25%;
            text-align: center;
        }
        .speed{
            margin-top: 10px;
            font-size:22px;
            font-family:SourceHanSansCN-Regular;
            font-weight:400;
            color:rgba(51,51,51,1);
        }
        .tip{
            font-size:16px;
            font-family:SourceHanSansCN-Medium;
            font-weight:500;
            color:rgba(153,153,153,1);
        }
    }
</style>

