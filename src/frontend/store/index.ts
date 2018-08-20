import Vue from 'vue'
import Vuex from 'vuex'
import AuthService from '../services/AuthService'

Vue.use(Vuex)

const INITIALISED = 'INITIALISED'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'

const service = new AuthService

const defaultUserState = {
  name: null,
  email: null,
  roles: {},
  roleList: [],
  permissionList: []
}

const store = new Vuex.Store({
  state: {
    auth: {
      initialised: false,
      isAuthenticated: false,
      user: defaultUserState
    }
  },
  mutations: {
    [INITIALISED] (state, user) {
      state.auth.initialised = true
    },
    [LOGIN_SUCCESS] (state, user) {
      state.auth.isAuthenticated = true
      state.auth.user = user
    },
    [LOGOUT] (state) {
      state.auth.isAuthenticated = false
      state.auth.user = defaultUserState
    }
  },
  actions: {
    initialise ({ commit }) {
      service.getMe()
        .then(response => {
          let user = response.data
          commit(INITIALISED)
          commit(LOGIN_SUCCESS, user)
        })
    },
    verify ({ commit }, details) {
      return new Promise((resolve, reject) => {
        service.verify(details.email, details.code)
          .then(data => {
            commit(LOGIN_SUCCESS, data.user)
            resolve(data.user)
          })
          .catch(error => reject(error))
      })
    },
    logIn ({ commit }, credentials) {
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

export default store
