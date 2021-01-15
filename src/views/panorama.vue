<template>
  <div id="pano">
    <iframe src="http://aidct.matrixdesign.cn/ihouse/ihouse.html"
            frameborder="0"
            class="panoUrl"></iframe>
  </div>
</template>

<script>
import scriptjs from 'scriptjs';

export default {
  name: 'panorams',
  data() {
    return {
      id: null,
      krpano: null,
      tourSwfUrl:
        'http://120.24.22.210/users/share/chenx/savefile/E97DA54C-DB4A-E0C3-4E57-39A2DF70F84C/dee26be9-ee2d-44c6-9350-5cef6c58ea88/tour.swf',
      tourXmlUrl:
        'http://120.24.22.210/users/share/chenx/savefile/E97DA54C-DB4A-E0C3-4E57-39A2DF70F84C/dee26be9-ee2d-44c6-9350-5cef6c58ea88/tour.xml',
    };
  },
  methods: {
    renderPano() {
      console.log('引入成功');
      // eslint-disable-next-line no-undef
      embedpano({
        // js插件中的方法，用于加载全景图
        swf: this.tourSwfUrl,
        xml: this.tourXmlUrl,
        target: 'pano',
        html5: 'always',
        // mobilescale: 1.0,
        passQueryParameters: true,
      });
      this.krpano = document.getElementById('krpanoSWFObject');
    },
  },
  created() {
    this.id = this.$route.params.id;
    console.log('拿到id', this.id);
    scriptjs('//aidct.matrixdesign.cn/tour.js', () => {
      // this.renderPano();
    });
  },
};
</script>

<style lang="scss" scoped>
.panoUrl,
#pano {
  width: 100vw;
  height: 100vh;
}
@-ms-viewport {
  width: device-width;
}
@media only screen and (min-device-width: 800px) {
  html {
    overflow: hidden;
  }
}
html {
  height: 100%;
}
body {
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  color: #ffffff;
  background-color: #000000;
}
</style>
