<!--
 * @Title: 百度地图展示
 * @Descripttion: 
 * @Author: shaojihao
-->

<template>
  <div class="mapWrapper" style="height: 100%;">
    <div :id="config.mapId" :style="{ height: config.height, width: config.width }" />
  </div>
</template>

<script>
import mapStart from '@/images/base/mapStart.png';
import mapEnd from '@/images/base/mapEnd.png';

export default {
  props: {
    config: {
      type: Object,
      default: {
        width: { // 图表宽度
          type: String,
          default: '100%'
        },
        height: { // 图表高度
          type: String,
          default: '100%'
        },
        lon: { // 定义经度
          type: Number,
          default: 116.404
        },
        lat: { // 定义维度
          type: Number,
          default: 39.915
        },
        data: { // 展示数据
          type: Object,
          default: null
        },
        flag: { // 标注物显示隐藏
          type: Boolean,
          default: false
        },
        mapId: { // 地图 DOM 节点
          type: String,
          default: 'GPSLine'
        },
        enableScrollWheelZoom: { // 开启滚轮缩放
          type: Boolean,
          default: true
        }
      }
    }
  },
  watch: {
    config: {
      deep: true,
      handler(val) {
        this.initMap(val);
      }
    }
  },
  mounted() {
    this.initMap(this.config);
  },
  methods: {
    /**
     * @name: 地图绘制加载
     * @param {*} val
     */    
    initMap(val) {
      const data = val.data;
      const map = new BMap.Map(this.config.mapId);
      map.clearOverlays(); // 初始化清空地图
      const centerAndZoomPoint = data.length > 0 ? new BMap.Point(data[data.length - 1].lon, data[data.length - 1].lat) : new BMap.Point(116.404, 39.915);
      if (val.enableScrollWheelZoom) map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
      map.centerAndZoom(centerAndZoomPoint, 6); // 初始显示中国
      map.addControl(new BMap.NavigationControl()); // 缩放导航
      map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP]})); // 图层选择
      
      // 添加需要展示的数据
      let points = [], data_info = [];
      if (data.length === 0) return;
      data.forEach(item =>{
        points.push(new BMap.Point(item.lon, item.lat)); // 添加经纬度点
        data_info.push([item.lon, item.lat, `时间:${item.gtm} | 车牌号:${item.vehiclePlate} | 描述:${item.label}`]); // 添加描述
      });

      // 添加车辆轨迹折线
      let polyline = new BMap.Polyline(points, {
        enableEditing: false, // 是否启用线编辑，默认为false
        enableClicking: true, // 是否响应点击事件，默认为true
        strokeWeight: '8', // 折线的宽度，以像素为单位
        strokeOpacity: 0.8, // 折线的透明度，取值范围0 - 1
        strokeColor: '#18a45b' // 折线颜色
      })
      map.addOverlay(polyline); // 增加折线
      
      // 添加起始终止点位
      let endMarker = new BMap.Marker(points[points.length - 1], { icon: new BMap.Icon(mapEnd, new BMap.Size(40, 32), {
        imageOffset: new BMap.Size(0, 0) // 设置图片偏移
      }) });
      let startMarker = new BMap.Marker(points[0], { icon: new BMap.Icon(mapStart, new BMap.Size(40, 32), {
        imageOffset: new BMap.Size(0, 0) // 设置图片偏移
      }) });
      map.addOverlay(startMarker);
      map.addOverlay(endMarker);

      map.centerAndZoom(points[points.length - 1], 6); // 重置中心点

      // 增加标注物
      if (this.config.flag) {
        for (let i = 0; i < data_info.length; i++) {
          let marker = new BMap.Marker(new BMap.Point(data_info[i][0], data_info[i][1])); // 创建标注
          let point = new BMap.Point(data_info[i][0], data_info[i][1]);
          let content = data_info[i][2];
          map.addOverlay(marker); // 将标注添加到地图中
          this.addinfoWindow(content, marker, point, map);
        }
      }
    },
    /**
     * @name: 创建百度地图点位展示弹窗
     * @param {string} content
     * @param {*} marker
     * @param {*} point
     * @param {*} map
     */    
    addinfoWindow(content, marker, point, map) {
      let opts = {title: ''}; // 信息窗口标题
      let infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象 
      marker.addEventListener('click', function() {
        map.openInfoWindow(infoWindow, point); // 开启信息窗口
      });
    }
  }
}
</script>