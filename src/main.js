import Vue from 'vue'
import router from '@/router'
import App from './App.vue'
import axios from 'axios'
import './vee-validate'

Vue.config.productionTip = false

axios.defaults.baseURL = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'http://localhost:3000'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
