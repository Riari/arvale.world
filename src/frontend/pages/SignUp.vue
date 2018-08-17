<template>
  <div class="row center-xs">
    <div class="col-xs-4">
      <input-text :fullWidth="true" type="email" placeholder="Username"></input-text>
      <input-text :fullWidth="true" type="email" placeholder="Email"></input-text>
      <input-text :fullWidth="true" type="password" placeholder="Password"></input-text>
      <button class="fullWidth">Sign up</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import InputText from '../components/InputText.vue'

@Component({
  components: {
    InputText
  }
})
export default class SignUp extends Vue {
}
</script>
