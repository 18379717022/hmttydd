import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import './utils/dayjs'
// 加载Vant组件库
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant)

// 加载全局样式
import './styles/index.less'
import './styles/icon.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
