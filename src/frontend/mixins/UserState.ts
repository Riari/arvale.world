import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export class UserStateMixin extends Vue {
  get user () {
    return this.$store.state.auth.user
  }

  get isUserAuthenticated () {
    return this.$store.state.auth.isAuthenticated
  }

  canUser (permission: string) {
    if (!this.user) {
      return false
    }

    return this.user.permissionList.includes(permission)
  }
}
