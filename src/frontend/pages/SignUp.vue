<template>
  <div class="row center-xs">
    <div class="col-xs-4">
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
      <button @click="signUp" class="fullWidth">Sign up</button>
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
export default class SignUp extends Vue {
  service: AuthService

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
    this.service = new AuthService
  }

  signUp () {
    this.service.createUser(this.details.username, this.details.email, this.details.password)
      .then(response => {

      })
      .catch(error => {
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
