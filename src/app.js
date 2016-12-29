import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import store from './store/index'
import router from './router/index'
import { sync } from 'vuex-router-sync'
import axios from 'axios'
import VueAxios from 'vue-axios'


sync(store, router)

Vue.use(Vuetify)
Vue.use(VueAxios, axios)

const app = new Vue(Vue.util.extend({
  router,
  store
}, App))

export { app, router, store }
