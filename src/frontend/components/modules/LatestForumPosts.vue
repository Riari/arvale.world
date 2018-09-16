<template>
  <panel title="Latest Posts" icon="activity" :loading="loading" class="latest-posts">
    <div v-for="post in posts" :key="post.id" class="post">
      <div>
        Re:
        <router-link :to="{ name: 'forum-thread', params: { id: post.thread.id, slug: post.thread.slug } }">
          {{ post.thread.title }}
        </router-link>
      </div>
      by <user-link :user="post.author">{{ post.author.name }}</user-link>
      {{ post.createdAt | moment('from') }}
    </div>
  </panel>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import ForumPostService from '../../services/Forum/PostService'

@Component
export default class LatestForumPostsModule extends Vue {
  loading = true
  posts = []

  created () {
    const service = new ForumPostService()
    service.listLatest().then(response => {
      this.loading = false
      this.posts = response.data
    })
  }
}
</script>

<style lang="scss">
@import "../../scss/variables";

.latest-posts {
  .post {
    margin: .5em 0;
  }
}
</style>
