<template>
  <div class="row">
    <div class="col-xs-9">
      <panel>
      </panel>
    </div>
    <div class="col-xs-3">
      <panel>
      </panel>
      <panel>
      </panel>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class ForumThread extends Vue {
  threads = []

  created () {
    // const service = new ForumThreadService()
    // service.list().then(response => this.categories = response.data)
  }
}
</script>
