<template>
  <div class="row center-sm">
    <div class="col-xs-12 col-sm-8">
      <panel>
        User profiles coming soon!
      </panel>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class UserProfile extends Vue {
  created () {
    this.$title = 'User Profile'
  }
}
</script>
