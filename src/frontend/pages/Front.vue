<template>
  <div class="row">
    <div class="col-md-3 col-xs-12 last-xs first-sm">
      <discord-module></discord-module>
    </div>
    <div class="col-md-6 col-xs-12">
      <news-module></news-module>
    </div>
    <div class="col-md-3 col-xs-12 first-xs last-sm">
      <user-module></user-module>
      <latest-forum-threads-module></latest-forum-threads-module>
      <latest-forum-posts-module></latest-forum-posts-module>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import DiscordModule from '../components/modules/Discord.vue'
import NewsModule from '../components/modules/News.vue'
import UserModule from '../components/modules/User.vue'
import LatestForumThreadsModule from '../components/modules/LatestForumThreads.vue'
import LatestForumPostsModule from '../components/modules/LatestForumPosts.vue'

@Component({
  title: 'Welcome',
  components: {
    DiscordModule,
    NewsModule,
    UserModule,
    LatestForumThreadsModule,
    LatestForumPostsModule
  }
})
export default class Front extends Vue {
}
</script>
