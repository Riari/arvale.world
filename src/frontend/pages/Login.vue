<template>
  <div class="row center-xs">
    <div class="col-xs-4">
      <input-text :fullWidth="true" v-model="credentials.email" type="email" placeholder="Email"></input-text>
      <input-text :fullWidth="true" v-model="credentials.password" type="password" placeholder="Password"></input-text>
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

  error: string = null

  logIn () {
    this.$store.dispatch('logIn', this.credentials)
      .then(user => {
        alert(`Hello, ${user.name}! :D`)
      })
      .catch(error => {
        console.log(error.response.status)
        if (error.response.status == 404) {
          this.error = 'No user found with the given details'
        }
      })
  }
}
</script>
