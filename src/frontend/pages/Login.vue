<template>
  <div class="row center-xs">
    <div class="col-xs-6">
      <div class="panel">
        <input-text v-model="credentials.email" type="email" placeholder="Email"></input-text>
        <input-text v-model="credentials.password" type="password" placeholder="Password"></input-text>
        <button @click="login">Log in</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import InputText from '../components/InputText.vue'
import AuthService from '../services/AuthService'

@Component({
  components: {
    InputText
  }
})
export default class Login extends Vue {
  credentials = {
    email: null,
    password: null
  }

  login () {
    this.$store.dispatch('login', this.credentials)
      .then(user => {
        alert(`Hello, ${user.name}! :D`)
      })
  }
}
</script>
