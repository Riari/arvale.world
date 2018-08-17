import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import * as Cookie from 'js-cookie'
import AuthService from './services/AuthService'

import App from './App.vue'
import LogIn from './pages/LogIn.vue'
import News from './pages/News.vue'
import SignUp from './pages/SignUp.vue'
import { reject } from 'bluebird';

library.add(faAngleDown)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueRouter)

const routes = [
  { path: '/', component: News, meta: { title: 'News' } },
  { path: '/user/login', component: LogIn, meta: { title: 'Log In' } },
  { path: '/user/signup', component: SignUp, meta: { title: 'Sign Up' } }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - Arvale`
  next()
})

const LOGIN_PENDING = 'LOGIN_PENDING'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'

const service = new AuthService

const store = new Vuex.Store({
  state: {
    auth: {
      isAuthenticated: false,
      isPending: false,
      user: {
        name: null,
        email: null
      }
    }
  },
  mutations: {
    [LOGIN_PENDING] (state) {
      state.auth.isPending = true
    },
    [LOGIN_SUCCESS] (state, user) {
      state.auth.isAuthenticated = true
      state.auth.isPending = false
      state.auth.user = user
    },
    [LOGOUT] (state) {
      state.auth.isAuthenticated = false
      state.auth.user = { name: null, email: null }
    }
  },
  actions: {
    initialise ({ commit }) {
      service.getMe()
        .then(response => {
          let user = {
            name: response.data.name,
            email: response.data.email
          }

          commit(LOGIN_SUCCESS, user)
        })
    },
    logIn ({ commit }, credentials) {
      commit(LOGIN_PENDING)

      return new Promise((resolve, reject) => {
        service.logIn(credentials.email, credentials.password)
          .then(data => {
            commit(LOGIN_SUCCESS, data.user)
            resolve(data.user)
          })
          .catch(error => reject(error))
      })
    },
    logOut ({ commit }) {
      service.logOut()
      commit(LOGOUT)
    }
  }
})

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
