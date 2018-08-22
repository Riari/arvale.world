<template>
  <div class="row center-xs">
    <div class="col-xs-4">
      <input-text
        @keyup.enter="logIn"
        :fullWidth="true"
        v-model="credentials.email"
        :errors="validationErrors.email"
        type="email"
        placeholder="Email"
      ></input-text>
      <input-text
        @keyup.enter="logIn"
        :fullWidth="true"
        v-model="credentials.password"
        :errors="validationErrors.password"
        type="password"
        placeholder="Password"
      ></input-text>
      <notice v-show="error" type="warning">{{ error }}</notice>
      <v-button @click.native="logIn" :fullWidth="true" :loading="loading">Log in</v-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import AuthService from '../services/AuthService'

@Component
export default class LogIn extends Vue {
  loading = false

  credentials = {
    email: null,
    password: null
  }

  validationErrors = {
    email: null,
    password: null
  }

  error: string = null

  logIn () {
    this.loading = true

    this.$store.dispatch('logIn', this.credentials)
      .then(user => {
        this.$router.push('/')
        this.$toasted.show(`Welcome back, ${user.name}!`, { type: 'success' })
        this.loading = false
      })
      .catch(error => {
        this.loading = false
        switch (error.response.status) {
          case 422:
            this.validationErrors = error.response.data.errors
            break
          default:
            this.error = error.response.data.message
        }
      })
  }
}
</script>
