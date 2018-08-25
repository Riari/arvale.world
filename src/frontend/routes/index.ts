import Vue from 'vue'
import VueRouter from 'vue-router'

import guards from './guards'

import Viewport from '../components/_Viewport.vue'
import LogIn from '../pages/LogIn.vue'
import Front from '../pages/Front.vue'
import SignUp from '../pages/SignUp.vue'
import Verify from '../pages/Verify.vue'

import Admin from '../components/Admin/_Viewport.vue'
import AdminDashboard from '../pages/Admin/Dashboard.vue'
import AdminUsersIndex from '../pages/Admin/Users/Index.vue'
import AdminNewsIndex from '../pages/Admin/News/Index.vue'
import AdminNewsCreate from '../pages/Admin/News/Create.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Viewport,
    children: [
      { path: '/', component: Front, meta: { title: 'Welcome' } },
      { path: '/user/login', component: LogIn, meta: { title: 'Log In' } },
      { path: '/user/signup', component: SignUp, meta: { title: 'Sign Up' } },
      { path: '/user/verify/:code', component: Verify, meta: { title: 'Verify Account' } }
    ]
  },
  {
    path: '/admin',
    beforeEnter: guards.isAuthenticated,
    component: Admin,
    children: [
      { path: '/', component: AdminDashboard, meta: { title: 'Dashboard' } },
      { path: 'users', component: AdminUsersIndex, meta: { title: 'Users' } },
      { path: 'news', component: AdminNewsIndex, meta: { title: 'News' } },
      { path: 'news/create', component: AdminNewsCreate, meta: { title: 'Create Article' } }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - Arvale`
  next()
})

export default router
