<template>
  <panel title="Latest Threads" icon="activity" :loading="loading" class="latest-threads">
    <div v-for="thread in threads" :key="thread.id" class="thread">
      <router-link :to="{ name: 'forum-thread', params: { id: thread.id, slug: thread.slug } }" class="title">
        {{ thread.title }}
      </router-link>
      by <user-link :user="thread.author">{{ thread.author.name }}</user-link>
      {{ thread.createdAt | moment('from') }}
    </div>
  </panel>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import ForumThreadService from '../../services/Forum/ThreadService'

@Component
export default class LatestForumThreadsModule extends Vue {
  loading = true
  threads = []

  created () {
    const service = new ForumThreadService()
    service.listLatest().then(response => {
      this.loading = false
      this.threads = response.data
    })
  }
}
</script>

<style lang="scss">
@import "../../scss/variables";

.latest-threads {
  .thread {
    margin: .5em 0;

    .title {
      display: block;
    }
  }
}
</style>
