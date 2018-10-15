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
import '../static/css/common.css'
import '../static/css/style.css'
import '../static/css/overwrite.css'

import Dic from './lib/dic.js'
import moment from 'moment'

import store from './store'
import {localStorage, sessionStorage} from './assets/api/storage'

Vue.config.productionTip = false

window.moment = moment

Vue.use(Vuex)
Vue.use(iView)
Vue.use(commons)
Vue.use(VueAxios,Axios)
Vue.use(Validator)
Vue.use(Dic)

const response = {
  'code': 0,
  'message': 'OK'
}
window.addEventListener('message', (event) => {
  const currentGoTo = localStorage.getItem('currentGoTo')
  const message = !event.data ? {} : JSON.parse(event.data)
  const isToken = message.token !== undefined
  if (isToken && (currentGoTo === null || currentGoTo === '')) {
    localStorage.setItem('userInfo', event.data)
    top.postMessage(JSON.stringify(response), event.origin)
  } else {
    if ((currentGoTo !== null) && (currentGoTo !== '')) {
      localStorage.removeItem('currentGoTo')
      window.location.href = currentGoTo
    }
  }
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

app.$Message.config({
  top: 50,
  duration: 3
});
