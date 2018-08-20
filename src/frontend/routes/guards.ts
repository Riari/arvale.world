import store from '../store'

export default {
  isAuthenticated: (to, from, next) => {
    if (store.state.auth.initialised) {
      return next(store.state.auth.isAuthenticated)
    }

    store.watch(
      state => state.auth.initialised,
      initialised => {
        if (initialised) {
          return next(store.state.auth.isAuthenticated)
        }
      }
    )
  }
}
