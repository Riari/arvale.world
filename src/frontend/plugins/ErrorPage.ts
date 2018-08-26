import Vue from 'vue'
import ErrorPage from 'vue-error-page'

(window as any).eventBus = new Vue()

Vue.use(ErrorPage, {
  resolver: (component) => {
    return require('../pages/Errors/' + component).default;
  }
})
