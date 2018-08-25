<template>
  <panel :title="isUserAuthenticated ? `Hello, ${user.name}` : 'Log In'" icon="user">
    <template v-if="isUserAuthenticated">
    </template>
    <template v-else>
      <login-form @loggedIn="onLoggedIn"></login-form>
      <hr>
      <div class="text-center">
        Alternatively, <router-link to="/user/signup">sign up</router-link>.
        <br>
        Forgot password? <router-link to="/user/forgot-password">Request a new one</router-link>.
      </div>
    </template>
  </panel>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import { UserStateMixin } from '../../mixins/UserState'
import AuthService from '../../services/AuthService'
import LoginForm from '../forms/Login.vue'

@Component({
  components: { LoginForm }
})
export default class UserModule extends mixins(UserStateMixin) {
  onLoggedIn () {
    this.$toasted.show(`Welcome back, ${user.name}!`, { type: 'success' })
  }
}
</script>
