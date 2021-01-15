<template>
  <div id="datav">
    <dv-full-screen-container>
      <dv-loading v-if="loading">Loading...</dv-loading>
      <MapView :points="ProjectData"
               v-if="!loading"
               @onRegionClick="onRegionClick" />
      <div class="popup"
           v-if="isPopupVisible"
           @click="clickOverlay">
        <dv-border-box-11 :title="modelTitle"
                          ref="contentWrapper"
                          class="popupRegion">
          <div class="modelBox">
            <div class="modelList">
              <a-row :gutter="16">
                <a-col class="gutter-row"
                       :span="6"
                       v-for="(item, index) in ProjectView"
                       :key="index">
                  <dv-border-box-8 class="gutter-box">
                    <div class="box-image"
                         @click="handleToPanoView(item.id)">
                      <img :src="item.image"
                           alt=""
                           srcset="">
                    </div>
                    <div class="box-text">{{item.name}}</div>
                  </dv-border-box-8>
                </a-col>
              </a-row>
            </div>
          </div>
        </dv-border-box-11>
      </div>

      <div class="bg">
        <div v-if="!loading"
             class="host-body">
          <div class="d-flex jc-center">
            <dv-decoration-10 style="width:33.3%;height:.0625rem; z-index:9;" />
            <div class="d-flex jc-center"
                 style="z-index:9;">
              <dv-decoration-8 :color="['#568aea', '#000000']"
                               style="width:2.5rem;height:.625rem;" />
              <div class="title">
                <span class="title-text">项目展厅</span>
                <dv-decoration-6 class="title-bototm"
                                 :reverse="true"
                                 :color="['#50e3c2', '#67a1e5']"
                                 style="width:3.125rem;height:.1rem;" />
              </div>
              <dv-decoration-8 :reverse="true"
                               :color="['#568aea', '#000000']"
                               style="width:2.5rem;height:.625rem;" />
            </div>
            <dv-decoration-10
                              style="width:33.3%;height:.0625rem; transform: rotateY(180deg);" />
          </div>

          <!-- 第二行 -->
          <!-- <div class="d-flex jc-between px-2">
            <div class="d-flex"
                 style="width: 40%">
              <div class="react-right ml-4"
                   style="width: 6.25rem; text-align: left;background-color: #0f1325;">
                <span class="react-before"></span>
                <span class="text">数据分析1</span>
              </div>
              <div class="react-right ml-3"
                   style="background-color: #0f1325;">
                <span class="text colorBlue">数据分析2</span>
              </div>
            </div>
            <div style="width: 40%"
                 class="d-flex">
              <div class="react-left bg-color-blue mr-3">
                <span class="text fw-b">Matrix</span>
              </div>
              <div class="react-left mr-4"
                   style="width: 6.25rem; background-color: #0f1325; text-align: right;">
                <span class="react-after"></span>
                <span class="text">2020年03月16日 周一 12:00</span>
              </div>
            </div>
          </div> -->

          <div class="body-box">
            <!-- 第三行数据 -->
            <div class="content-box">
              <div>
                <!-- <dv-border-box-12>
                  <centerLeft1 />
                </dv-border-box-12> -->
              </div>
              <div>
                <!-- <dv-border-box-12>
                  <centerLeft2 />
                </dv-border-box-12> -->
              </div>
              <!-- 中间 -->
              <div>
                <!-- <center /> -->
              </div>
              <!-- 中间 -->
              <div>
                <!-- <centerRight2 /> -->
              </div>
              <div>
                <!-- <dv-border-box-13>
                <centerRight1 />
              </dv-border-box-13> -->
              </div>
            </div>
            <!-- 第四行数据 -->
            <div class="bototm-box">
              <!-- <dv-border-box-13>
              <bottomLeft />
            </dv-border-box-13> -->
              <!-- <dv-border-box-12> -->
              <!-- <bottomRight /> -->
              <!-- </dv-border-box-12> -->
            </div>
          </div>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>
import MapView from '@/components/Map/index2';
// import centerLeft1 from './centerLeft1';
// import centerLeft2 from './centerLeft2';
// import centerRight1 from './centerRight1';
// import centerRight2 from './centerRight2';
// import center from './center';
// import bottomLeft from './bottomLeft';
// import bottomRight from './bottomRight';

export default {
  name: 'index',
  components: {
    // // centerLeft1,
    // centerLeft2,
    // centerRight1,
    // centerRight2,
    // center,
    // bottomLeft,
    // bottomRight,
    MapView,
  },
  data() {
    return {
      loading: true,
      ProjectData: [],
      modelTitle: '深圳',
      isPopupVisible: false,
      ProjectView: [
        {
          id: 1,
          name: '香山别墅',
          image: 'http://aidct.matrixdesign.cn/src/assets/img/modern.png',
        },
        {
          id: 2,
          name: '江門中梁旭輝壹號院',
          image: 'http://aidct.matrixdesign.cn/src/assets/img/ou.png',
        },
        {
          id: 3,
          name: '南昌旭輝中心',
          image: 'http://aidct.matrixdesign.cn/src/assets/img/zhong.png',
        },
        {
          id: 4,
          name: '温州新希望玉锦麟B5户型样板间',
          image: 'http://aidct.matrixdesign.cn/src/assets/img/newzhong.png',
        },
      ],
    };
  },
  mounted() {
    this.cancelLoading();
  },
  methods: {
    onRegionClick(params) {
      console.log('拿到click', params);
      this.modelTitle = params.name;
      this.closePopup();
    },
    closePopup() {
      this.isPopupVisible = !this.isPopupVisible;
    },
    clickOverlay(e) {
      if (e.target.className === 'popup') {
        this.closePopup();
      }
    },
    handleToPanoView(id) {
      this.$router.push({ name: 'pano', params: { id } });
    },
    cancelLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
  },
};
</script>

<style lang="scss">
@import '../assets/scss/index.scss';
#datav {
  .popup {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 9999999;
    .popupRegion {
      width: 9rem;
      height: 60%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -60%);
    }
  }
  .modelBox {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 0.8rem 0.2rem 0.2rem 0.2rem;
  }
  .modelList {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background-color: rgba(54, 68, 74, 0.4);
    // background-color: #282c34;
    .gutter-row {
      margin-bottom: 0.1rem;
    }
    .gutter-box:hover {
      box-shadow: rgba(128, 128, 128, 0.8) 0px 0px 20px inset !important;
      .box-text {
        color: #c6a47e;
      }
      img {
        transform: scale(1.4);
      }
    }
    .gutter-box {
      padding: 0.1rem;
      height: 100%;
      cursor: pointer;
      text-align: center;
      .box-text {
        padding: 0.1rem 0.1rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        font-weight: 600;
      }
      .box-image {
        width: 100%;
        height: 1.8rem;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          transition: all 0.6s;
        }
      }
    }
  }
}
</style>
