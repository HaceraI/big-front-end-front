import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

const Login = () => import( /* webpackChunkName: 'login' */ './views/Login.vue')
const Reg = () => import( /* webpackChunkName: 'reg' */ './views/Reg.vue')
const Forget = () => import( /* webpackChunkName: 'forget' */ './views/Forget.vue')

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/reg',
      name: 'reg',
      component: Reg
    },
    {
      path: '/forget',
      name: 'forget',
      component: Forget
    },
  ]
})