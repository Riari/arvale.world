<template>
  <router-link
    :to="{ name: 'user-profile', params: { name: user.name } }"
    v-bind:style="style"
  >
    {{ user.name }}
  </router-link>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    user: Object
  }
})
export default class UserLink extends Vue {
  get style () {
    return { color: this.user.roles.length ? this.user.roles[0].colour : null }
  }
}
</script>
