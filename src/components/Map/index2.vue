<template>
  <div class="dashboard-map">
    <div id="project-map"
         class="chart"></div>
  </div>
</template>

<script>
import scriptjs from 'scriptjs';
import * as echarts from 'echarts';
import 'echarts/extension/bmap/bmap';
// import CustomMapConfig from './custom_map_config';
const mapStyle = [
  {
    featureType: 'land', // 调整土地颜色
    elementType: 'geometry',
    stylers: {
      color: '#081734',
    },
  },
  // 如果注释掉，该项就变成灰色
  // {
  //   featureType: 'building', // 调整建筑物颜色
  //   elementType: 'geometry',
  //   stylers: {
  //     color: '#04406F',
  //   },
  // },
  {
    featureType: 'building', // 调整建筑物标签是否可视
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'highway', // 调整高速道路颜色
    elementType: 'geometry',
    stylers: {
      color: '#015B99',
    },
  },
  {
    featureType: 'highway', // 调整高速名字是否可视
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'arterial', // 调整一些干道颜色
    elementType: 'geometry',
    stylers: {
      color: '#003051',
    },
  },
  {
    featureType: 'arterial',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'green',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: {
      color: '#044161',
    },
  },
  {
    featureType: 'subway', // 调整地铁颜色
    elementType: 'geometry.stroke',
    stylers: {
      color: '#003051',
    },
  },
  {
    featureType: 'subway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'railway',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'railway',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'all', // 调整所有的标签的边缘颜色
    elementType: 'labels.text.stroke',
    stylers: {
      color: '#313131',
    },
  },
  {
    featureType: 'all', // 调整所有标签的填充颜色
    elementType: 'labels.text.fill',
    stylers: {
      color: '#FFFFFF',
    },
  },
  {
    featureType: 'manmade',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'manmade',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'local',
    elementType: 'geometry',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'local',
    elementType: 'labels',
    stylers: {
      visibility: 'off',
    },
  },
  {
    featureType: 'subway',
    elementType: 'geometry',
    stylers: {
      lightness: -65,
    },
  },
  {
    featureType: 'railway',
    elementType: 'all',
    stylers: {
      lightness: -40,
    },
  },
  {
    featureType: 'boundary',
    elementType: 'geometry',
    stylers: {
      color: '#8b8787',
      weight: '1',
      lightness: -29,
    },
  },
];

export default {
  name: 'Map',
  data() {
    return {
      myChart: null,
      bmap: null,
    };
  },
  props: {
    center: {
      type: Array,
      default: () => [110, 38],
    },
    size: {
      type: Number,
      default: 5, // 6
    },
  },
  watch: {
    // points() {
    //   this.$nextTick(() => {
    //     if (this.isMapReady) {
    //       this.renderChart();
    //     }
    //   });
    // },
  },
  methods: {
    covertStopData() {
      const data = [{ name: '北京', value: 9 }];
      const geoCoordMap = [
        { name: '北京', value: ['116.3979471', '39.9081726'] },
        { name: '上海', value: ['121.4692688', '31.2381763'] },
        { name: '天津', value: ['117.2523808', '39.1038561'] },
        { name: '重庆', value: ['106.548425', '29.5549144'] },

        { name: '河北', value: ['114.4897766', '38.0451279'] },

        { name: '山西', value: ['112.5223053', '37.8357424'] },

        { name: '辽宁', value: ['123.4116821', '41.7966156'] },

        { name: '吉林', value: ['125.3154297', '43.8925629'] },

        { name: '黑龙江', value: ['126.6433411', '45.7414932'] },

        { name: '浙江', value: ['120.1592484', '30.265995'] },

        { name: '福建', value: ['119.2978134', '26.0785904'] },

        { name: '山东', value: ['117.0056', '36.6670723'] },

        { name: '河南', value: ['113.6500473', '34.7570343'] },

        { name: '湖北', value: ['114.2919388', '30.5675144'] },

        { name: '湖南', value: ['112.9812698', '28.2008247'] },

        { name: '广东', value: ['113.2614288', '23.1189117'] },

        { name: '海南', value: ['110.3465118', '20.0317936'] },

        { name: '四川', value: ['104.0817566', '30.6610565'] },

        { name: '贵州', value: ['106.7113724', '26.5768738'] },

        { name: '云南', value: ['102.704567', '25.0438442'] },

        { name: '江西', value: ['115.8999176', '28.6759911'] },

        { name: '陕西', value: ['108.949028', '34.2616844'] },

        { name: '青海', value: ['101.7874527', '36.6094475'] },

        { name: '甘肃', value: ['103.7500534', '36.0680389'] },

        { name: '广西', value: ['108.3117676', '22.8065434'] },

        { name: '新疆', value: ['87.6061172', '43.7909393'] },

        { name: '内蒙古', value: ['111.6632996', '40.8209419'] },

        { name: '西藏', value: ['91.1320496', '29.657589'] },

        { name: '宁夏', value: ['106.2719421', '38.4680099'] },

        { name: '台湾', value: ['120.9581316', '23.8516062'] },

        { name: '香港', value: ['114.139452', '22.391577'] },

        { name: '澳门', value: ['113.5678411', '22.167654'] },

        { name: '安徽', value: ['117.2757034', '31.8632545'] },

        { name: '江苏', value: ['118.7727814', '32.0476151'] },
      ];
      // const res = [];
      // const colors = ['#79D12E', '#F9DE1C', '#DA3838'];
      // const size = [35, 25, 20];
      // const length = data.length;
      // for (let i = 0; i < length; i + 1) {
      //   res.push({
      //     name: data[i].name,
      //     value: [data[i].lng, data[i].lat, data[i].total],
      //     itemStyle: {
      //       // color按照自己的需求设置，
      //       color: colors[data[i].level - 1],
      //     },
      //     symbolSize: size[this.stop_level - 1],
      //   });
      // }
      // return res;
      const res = [];
      for (let i = 0; i < data.length; i + 1) {
        const geoCoord = geoCoordMap.filter(
          (item) => item.name === data[i].name,
        );
        if (geoCoord) {
          res.push({
            name: geoCoord.name,
            value: geoCoord.value,
          });
        }
      }
      return res;
    },
    renderChart() {
      const $map = document.getElementById('project-map');
      this.myChart = echarts.init($map);

      const option = {
        // tooltip: { // 提示框
        //   trigger: 'item',
        // },
        bmap: {
          // 设置百度地图显示哪些东西
          // 百度地图中心经纬度
          center: this.center,
          // 百度地图缩放
          zoom: this.size,
          // 是否开启拖拽缩放，可以只设置 'scale' 或者 'move'
          roam: true,
          // 百度地图的自定义样式，见 http://developer.baidu.com/map/jsdevelop-11.htm
          mapStyle: {
            styleJson: mapStyle,
          },
        },
        series: [
          {
            type: 'scatter',
            coordinateSystem: 'bmap', // 设置为bmap
            data: [
              { name: '北京', value: ['116.3979471', '39.9081726'], total: 10 },
              { name: '深圳', value: ['114.026993', '22.589973'], total: 20 },
              { name: '广州', value: ['113.275004', '23.141953'], total: 15 },
              { name: '上海', value: ['121.482498', '31.240502'], total: 8 },
              { name: '南昌', value: ['115.880521', '28.693783'], total: 12 },
              { name: '成都', value: ['104.078655', '30.582177'], total: 18 },
            ],
            tooltip: {
              formatter(params) {
                return `${params.name}<br/>项目数：${params.data.total}`;
              },
            },
            symbolSize(val, { data }) {
              // console.log('-->', val, params);
              return (data.total / 10) * 20;
            },
            label: {
              normal: {
                formatter(params) {
                  return `${params.data.total}`;
                },
                position: 'inside',
                show: true,
                color: '#ffffff',
                fontSize: 14,
                fontWeight: 500,
              },
              emphasis: {
                show: true,
              },
            },
            itemStyle: {
              normal: {
                color: '#ddb926',
                borderWidth: 2,
                borderColor: '#fff',
              },
            },
          },
        ],
      };
      this.myChart.setOption(option);
      if (!this.bmap) {
        this.bmap = this.myChart.getModel().getComponent('bmap').getBMap();
      }

      this.myChart.on('bmaproam', () => {
        const _options = this.myChart.getOption();
        const zoom = _options.bmap[0].zoom;
        console.log('缩放时间', zoom);
        // if (zoom === this.defaultZoom) return;
        // if (zoom > 8) {
        //   this.stop_level = 3;
        // } else if (zoom > 6 && zoom <= 8) {
        //   this.stop_level = 2;
        // } else if (zoom <= 6) {
        //   this.stop_level = 1;
        // }
        // this.defaultZoom = zoom;
        // this.fetchData();
      });
      this.myChart.on('click', (params) => {
        console.log('单击了', params);
        this.$emit('onRegionClick', params);
      });
    },
  },
  created() {
    scriptjs(
      '//api.map.baidu.com/getscript?v=2.0&ak=4tVfZ7OBd2jVTMKop5YvV4gG3baQNPgX',
      () => {
        this.isMapReady = true;
        this.renderChart();
        // this.$emit('onMapReady');
      },
    );
  },
};
</script>

<style lang="scss" scoped>
.dashboard-map {
  position: absolute;
  height: 100vh;
  width: 100%;
  left: 0;
  top: 0;
  box-sizing: border-box;
  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>
