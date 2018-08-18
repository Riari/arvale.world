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
      <button class="fullWidth" @click="logIn">Log in</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import InputText from '../components/InputText.vue'
import Notice from '../components/Notice.vue'
import AuthService from '../services/AuthService'

@Component({
  components: {
    InputText,
    Notice
  }
})
export default class LogIn extends Vue {
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
    this.$store.dispatch('logIn', this.credentials)
      .then(user => {
        this.$router.push('/')
      })
      .catch(error => {
        switch (error.response.status) {
          case 404:
            this.error = 'No user found with the given details'
            break
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
