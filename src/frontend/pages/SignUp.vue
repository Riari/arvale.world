<template>
  <div class="row center-sm">
    <div class="col-xs-12 col-sm-4">
      <input-text
        @keyup.enter="signUp"
        :fullWidth="true"
        v-model="details.username"
        :errors="validationErrors.username"
        type="text"
        placeholder="Username"
      ></input-text>
      <input-text
        @keyup.enter="signUp"
        :fullWidth="true"
        v-model="details.email"
        :errors="validationErrors.email"
        type="email"
        placeholder="Email"
      ></input-text>
      <input-text
        @keyup.enter="signUp"
        :fullWidth="true"
        v-model="details.password"
        :errors="validationErrors.password"
        type="password"
        placeholder="Password"
      ></input-text>
      <notice v-show="error" type="warning">{{ error }}</notice>
      <v-button @click.native="signUp" :fullWidth="true" :loading="loading">Sign up</v-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import UserService from '../services/UserService'

@Component({
  title: 'Sign Up'
})
export default class SignUp extends Vue {
  service: UserService

  loading = false

  details = {
    username: null,
    email: null,
    password: null
  }

  validationErrors = {
    username: null,
    email: null,
    password: null
  }

  error: string = null

  mounted () {
    this.service = new UserService
  }

  signUp () {
    this.loading = true

    this.service.create(this.details.username, this.details.email, this.details.password)
      .then(response => {
        this.loading = false
        this.$router.push('/')
        this.$toasted.show("Account created. Check your inbox for a verification email!", { type: 'success' })
      })
      .catch(error => {
        this.loading = false

        switch (error.response.status) {
          case 422:
            this.validationErrors = error.response.data.errors
            break
          default:
            this.error = 'An unknown error occurred; please try again or contact an admin if the issue persists'
        }
      })
  }
}
</script>
