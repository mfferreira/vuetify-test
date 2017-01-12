import Vue from 'vue'
import Router from 'vue-router'

import GetStartedView from '../views/GetStartedView.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Settings from '../views/Settings.vue'
import Clients from '../views/Clients.vue'
import Buildings from '../views/Buildings.vue'
import Members from '../views/Members.vue'
import Touchpoints from '../views/Touchpoints.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Login },
    { path: '/settings', name: 'settings', component: Settings },
    { path: '/clients', name: 'clients', component: Clients },
    { path: '/buildings', name: 'buildings', component: Buildings },
    { path: '/members', name: 'members', component: Members },
    { path: '/touchpoints', name: 'touchpoints', component: Touchpoints },
    { path: '/logout', name: 'logout', component: Logout },
    { path: '/getstarted', name: 'getstarted', component: GetStartedView }
  ]
})
