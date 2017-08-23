// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Rem from '@/assets/js/rem.js'
import MintUI from 'mint-ui'
/* 引入css */
import 'mint-ui/lib/style.css'

Vue.use(Rem)
Vue.use(MintUI)
/* 注释错误 提示 警告代码 */
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
