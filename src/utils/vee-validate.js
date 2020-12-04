import Vue from "vue";
import {
  ValidationObserver,
  ValidationProvider,
  localize
} from 'vee-validate'
import '../local/index'

// install rules and localization
// Object.keys(rules).forEach(rule => {
//   extend(rule, rules[rule]);
// });


// Install components globally
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

let LOCALE = "zh_CN";
localize(LOCALE);

// A simple get/set interface to manage our locale in components.
// This is not reactive, so don't create any computed properties/watchers off it.
Object.defineProperty(Vue.prototype, "locale", {
  get() {
    return LOCALE;
  },
  set(val) {
    LOCALE = val;
    localize(val);
  }
});