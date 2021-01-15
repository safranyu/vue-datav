import Vue from 'vue';
import { Modal, Row, Col } from 'ant-design-vue';
import dataV from '@jiaminghi/data-view';
import Icon from 'vue-awesome/components/Icon';
import App from './App.vue';
import router from './router';
import store from './store';
import 'ant-design-vue/dist/antd.css';

// 按需引入vue-awesome图标
import 'vue-awesome/icons/chart-bar.js';
import 'vue-awesome/icons/chart-area.js';
import 'vue-awesome/icons/chart-pie.js';
import 'vue-awesome/icons/chart-line.js';
import 'vue-awesome/icons/align-left.js';

// 适配flex
import '@/common/flexible.js';
// 引入全局css
import './assets/scss/style.scss';

Modal.install(Vue);
Row.install(Vue);
Col.install(Vue);

Vue.use(dataV);

// 全局注册图标
Vue.component('icon', Icon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
