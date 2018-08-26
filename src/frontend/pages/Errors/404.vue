<template>
  <div class="error-page error-404">
    <panel title="404">
      That resource doesn't seem to exist, sorry. :(
      <br><br>
      <router-link to="/">Return to front page</router-link>
    </panel>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  title: 'Not Found'
})
export default class Error404 extends Vue {
}
</script>

<style lang="scss">
.error-404 .panel {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.2em;
  text-align: center;
}
</style>
