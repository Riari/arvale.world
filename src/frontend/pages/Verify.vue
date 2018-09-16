<template>
  <div class="row center-sm">
    <div class="col-xs-12 col-sm-4">
      <div class="panel">
        <template v-if="loading">
          Verifying...
        </template>
        <template v-else="!loading && error">
          <notice type="warning">{{ error }}</notice>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  title: 'Verify Account'
})
export default class Verify extends Vue {
  loading = true
  error: string = null

  created () {
    this.error = null

    this.$store.dispatch('verify', { code: this.$route.params.code })
      .then(user => {
        this.$router.push('/')
        this.$toasted.show(`Account verified. Welcome, ${user.name}!`, { type: 'success' })
      })
      .catch(error => {
        this.loading = false

        if (error.response.data.message) {
          this.error = error.response.data.message
        } else {
          this.error = 'Something went wrong. Please try refreshing the page or contact an admin if the issue persists.'
        }
      })
  }
}
</script>
