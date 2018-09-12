import Vue from 'vue'

import store from './store'
import router from './routes'
import App from './App.vue'

import './plugins/Components'
import './plugins/ClassComponent'
import './plugins/ErrorPage'
import './plugins/FontAwesome'
import './plugins/Moment'
import './plugins/PageTitle'
import './plugins/ProgressBar'
import './plugins/Toasted'

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    scrollTo (id, event) {
      event.preventDefault()
      document.querySelector(id).scrollIntoView({
        behavior: 'smooth'
      })
    }
  }
})

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
