<template>
  <div class="row center-xs">
    <div class="col-xs-4">
      <login-form @loggedIn="onLoggedIn"></login-form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import LoginForm from '../components/forms/Login.vue'

@Component({
  title: 'Log In',
  components: { LoginForm }
})
export default class LogIn extends Vue {
  onLoggedIn () {
    this.$router.push('/')
    this.$toasted.show('Welcome back!', { type: 'success' })
  }
}
</script>
