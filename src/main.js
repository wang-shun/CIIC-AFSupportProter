import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import iView from 'iview'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import commons from "./lib/commons";
import Validator from '@/validator/flexible_benefit'

import 'iview/dist/styles/iview.css'
import '../static/css/style.css' //修改全局樣式

import Dic from './lib/dic.js'
import moment from 'moment'

import store from './store'

Vue.config.productionTip = false

window.moment = moment

Vue.use(Vuex)
Vue.use(iView)
Vue.use(commons)
Vue.use(VueAxios,Axios)
Vue.use(Validator)
Vue.use(Dic)

window.addEventListener('message', (event) => {
  if ((event.source !== window.parent) || (event.data === '')) {
    return
  }
  const userInfo = window.sessionStorage.getItem('userInfo')
  if ((userInfo === null) || (userInfo === '')) {
    window.sessionStorage.setItem('userInfo', event.data)
  }
  const response = {
    'code': 0,
    'data': '',
    'message': 'OK'
  }
  window.parent.postMessage(JSON.stringify(response), event.origin)
}, false)

const app = new Vue({
  router,
  store,
  render: h => h(App)
})
app.$Notice.config({
  top:80
})
app.$mount('#app')
