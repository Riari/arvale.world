<template>
  <div class="row">
    <div class="col-xs-9">
      <panel v-if="thread" :title="thread.title">
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
import ForumThreadService from '../../services/Forum/ThreadService'

@Component
export default class ForumThread extends Vue {
  thread = null

  async created () {
    const service = new ForumThreadService()
    const { data } = await service.getById(parseInt(this.$route.params.id))
    this.thread = data
    this.$title = data.title
  }
}
</script>
