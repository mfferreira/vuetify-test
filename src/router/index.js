import Vue from 'vue'
import Router from 'vue-router'

import GetStartedView from '../views/GetStartedView.vue'
import Login from '../views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Login },
    { path: '/getstarted', name: 'getstarted', component: GetStartedView }
  ]
})
