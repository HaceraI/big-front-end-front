import Vue from 'vue'
import router from '@/router'
import App from './App.vue'
import store from '@/store/index'
import '@/utils/vee-validate'
import '@/utils/request'
import Alert from "@/components/modules/alert";

Vue.config.productionTip = false

Vue.use(Alert);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')