import Vue from 'vue'
import * as echarts from 'echarts'
import debounce from 'lodash.debounce'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import base from '@/assets/js/base'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts
Vue.prototype.$debounce = debounce
Vue.prototype.$uploadLink = base.baseUrl
Vue.prototype.$project = base.project
Vue.prototype.$package = base.package
Vue.prototype.$pageWidth = window.innerWidth || 0
Vue.prototype.$pageHeight = window.innerHeight || 0
Vue.prototype.$defaultImg = 'this.src="' + require('./assets/img/defaultPicture.jpg') + '"'

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
