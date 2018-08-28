<template>
  <div class="row center-xs">
    <div class="col-xs-4">
      <input-text
        @keyup.enter="verify"
        :fullWidth="true"
        v-model="email"
        :errors="validationErrors.email"
        type="email"
        placeholder="Email"
      ></input-text>
      <notice v-show="error" type="warning">{{ error }}</notice>
      <v-button @click.native="verify" :fullWidth="true" :loading="loading">Verify</v-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

const validationErrors = {
  email: null
}

@Component({
  title: 'Verify Account'
})
export default class Verify extends Vue {
  loading: boolean = false

  email: string = null

  validationErrors = validationErrors

  error: string = null

  verify () {
    this.loading = true
    this.validationErrors = validationErrors
    this.error = null

    this.$store.dispatch('verify', { email: this.email, code: this.$route.params.code })
      .then(user => {
        this.$router.push('/')
        this.$toasted.show(`Account verified. Welcome, ${user.name}!`, { type: 'success' })
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
