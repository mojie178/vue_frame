/*
 * @Title: main.js
 * @Descripttion: 
 * @Author: shaojihao
 */

import Vue from 'vue';
import vueRouter from 'vue-router';
import VueProgressBar from 'vue-progressbar';
import echarts from 'echarts';
import lodash from 'lodash';
import AFTableColumn from 'af-table-column';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/reset.less';
import './styles/common.less';
import './styles/element.less';
import App from './App.vue';
import router from './router';
import store from './store';
import * as filters from './filters';
import * as directives from './directives';
import { setDisplay, setDisabled } from '@/util/const';
import AES from './util/cryptoJS';

// 全局注册过滤器
for (const [key, value] of Object.entries(filters)) {
  Vue.filter(key, value);
}
// 全局注册指令
for (const [key, value] of Object.entries(directives)) {
  Vue.directive(key, value);
}

// 阻止启动生产消息
Vue.config.productionTip = false;

// 引入表格自适应
Vue.use(AFTableColumn);
// 引入 element-ui
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });

Vue.prototype.$lodash = lodash; // 引用 loadsh
Vue.prototype.$echarts = echarts; // 引用 echarts

// 引入加密解密
Vue.prototype.$Encrypt = AES.Encrypt;
Vue.prototype.$Decrypt = AES.Decrypt;

// 元素显示隐藏
Vue.prototype.$setDisplay = setDisplay;
Vue.prototype.$setDisabled = setDisabled;

// 引入 vue-progress-bar
Vue.use(VueProgressBar, {
  color: '#71D53F',
  failedColor: '#874b4b',
  thickness: '2px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 500
  },
  autoRevert: true,
  location: 'top',
  inverse: false
});

// 解决相同路由报错
const originalPush = vueRouter.prototype.push;
vueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
