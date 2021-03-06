import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    sid: ''
  },
  mutations: {
    setSid(state, sid) {
      state.sid = sid
    }
  },
  getters: {
    getSid: state => state.sid
  },
  actions: {},
  modules: {}
})