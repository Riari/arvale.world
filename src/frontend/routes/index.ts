import Vue from 'vue'
import VueRouter from 'vue-router'

import LogIn from '../pages/LogIn.vue'
import News from '../pages/News.vue'
import SignUp from '../pages/SignUp.vue'
import Verify from '../pages/Verify.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  { path: '/', component: News, meta: { title: 'News' } },
  { path: '/user/login', component: LogIn, meta: { title: 'Log In' } },
  { path: '/user/signup', component: SignUp, meta: { title: 'Sign Up' } },
  { path: '/user/verify/:code', component: Verify, meta: { title: 'Verify Account' } }
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
