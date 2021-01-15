/*
 * @Author: safran
 * @Date: 2021-01-12 16:18:01
 * @Last Modified by: safran
 * @Last Modified time: 2021-01-12 19:09:39
 */
import promiseLimit from 'promise-limit';
import scriptjs from 'scriptjs';
import * as echarts from 'echarts';
import 'echarts/extension/bmap/bmap';
import CustomMapConfig from './custom_map_config';

// const echarts = require('echarts');

export default {
  name: 'Map',
  data() {
    return {
      isMapReady: false,
      myChart: null,
      bmap: null,
    };
  },
  props: {
    points: {
      type: Array,
      default() {
        return [];
      },
    },
    size: {
      type: Number,
      default: 5, // 6
    },
    spot: {
      type: Object,
      default() {
        return {
          color: [
            'rgba(255, 245, 62, .9)',
            'rgba(255, 245, 62, .8)',
            'rgba(255, 245, 62, .6)',
            'rgba(255, 245, 62, .5)',
            'rgba(255, 245, 62, .4)',
          ],
        };
      },
    },
    center: {
      type: Array,
      default: () => [105, 49],
    },
  },
  watch: {
    isMapReady(n) {
      if (n) {
        this.init();
      }
    },
    points() {
      this.$nextTick(() => {
        if (this.isMapReady) {
          this.renderChart();
        }
      });
    },
    center() {
      this.mapCenter();
    },
  },
  methods: {
    BMapGeocoder(data) {
      // eslint-disable-next-line no-undef
      const myGeo = new BMap.Geocoder();

      // eslint-disable-next-line consistent-return
      return new Promise((resolve) => {
        if (!data.Name) {
          return resolve(false);
        }
        let geocoderCity = data.Name;
        if (/[大同市]/.test(data.Name)) {
          geocoderCity = `中国 ${geocoderCity}`;
        }
        if (/[香港|澳门]/.test(data.Name)) {
          geocoderCity = '深圳市';
        }
        myGeo.getPoint(
          data.Name,
          (location) => {
            if (location) {
              // eslint-disable-next-line no-param-reassign
              data.Location = [location.lng, location.lat];
            }
            resolve(true);
          },
          geocoderCity,
        );
      });
    },
    getLocation(data) {
      const limit = promiseLimit(10);
      return Promise.all(data.map((el) => limit(() => this.BMapGeocoder(el))));
    },
    renderChart() {
      this.getLocation(this.points).then(() => {
        this.renderMap();
      });
    },
    renderMap() {
      if (!this.myChart) {
        const $map = document.getElementById('project-map');
        this.myChart = echarts.init($map);
        const scatter = [];

        const option = {
          bmap: {
            // 地图扩展属性
            // mapOptions: {
            //   // 百度地图可点击
            //   enableMapClick: false,
            // },
            // 百度地图中心经纬度
            center: this.center, // , // [113.65, 34.76],
            // 百度地图缩放
            zoom: this.size,
            // 是否开启拖拽缩放，可以只设置 'scale' 或者 'move'
            roam: true,
            // 百度地图的自定义样式，见 http://developer.baidu.com/map/jsdevelop-11.htm
            mapStyle: {
              styleJson: CustomMapConfig,
            },
          },
          tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(54,68,74,0.75)',
            formatter: (data) => {
              const { seriesName, name, value } = data;
              let template = '';
              if (value[2]) {
                template = `<p>${seriesName}</p>`;
                template += `<p>${name}: <strong style="color:yellow">${value[2]}</strong>台</p>`;
              } else {
                template = name;
              }
              return template;
            },
          },
          visualMap: {
            show: false,
            min: 0,
            // max: 500,
            // splitNumber: 3,
            color: this.spot.color,
            pieces: [
              { lte: 50 },
              { gt: 50, lte: 100 },
              { gt: 100, lte: 500 },
              { gt: 500 },
            ],
            textStyle: {
              color: '#fff',
            },
          },
          series: [
            {
              name: '设备量',
              type: 'scatter',
              mapType: 'china',
              coordinateSystem: 'bmap',
              zlevel: 10,
              data: scatter,
              symbolSize(val) {
                try {
                  return 15 + val[2] / 20;
                } catch (err) {
                  return 15;
                }
              },
              label: {
                normal: {
                  show: false,
                },
                emphasis: {
                  show: false,
                },
              },
              itemStyle: {
                emphasis: {
                  borderColor: '#fff',
                  borderWidth: 1,
                },
              },
            },
          ],
        };

        this.myChart.setOption(option);

        if (!this.bmap) {
          this.bmap = this.myChart
            .getModel()
            .getComponent('bmap')
            .getBMap();
        }
      }
    },
    init() {
      this.renderChart();
    },
  },
  mounted() {},
  created() {
    window.HOST_TYPE = '2';
    window.BMap_loadScriptTime = new Date().getTime();
    scriptjs(
      '//api.map.baidu.com/getscript?v=2.0&ak=4tVfZ7OBd2jVTMKop5YvV4gG3baQNPgX',
      () => {
        this.isMapReady = true;
        this.$emit('onMapReady');
      },
    );
  },
};
