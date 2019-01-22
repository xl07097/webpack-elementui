<template>
  <div id="map">
    <div id="mapcontainer"></div>
  </div>
</template>

<script>
export default {
  name: "BMap",
  mounted() {

    let map = new BMap.Map("mapcontainer");
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
    //添加地图类型控件
    map.addControl(
      new BMap.MapTypeControl({
        mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
      })
    );
    map.setCurrentCity("苏州"); // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
  }
}
</script>

<style lang="less" scoped>
#map {
    #mapcontainer{
        width: 500px;
        height: 400px;
    }
}
</style>

