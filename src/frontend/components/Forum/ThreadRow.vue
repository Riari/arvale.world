<template>
  <div class="forum-thread-row" :class="{ locked: !!thread.lockedAt, pinned: !!thread.pinnedAt }">
    <div class="row">
      <div class="col-xs-7">
        <router-link :to="route" class="thread-title">
          <tag v-if="thread.pinnedAt" class="pinned">Pinned</tag>
          <tag v-if="thread.lockedAt" class="locked">Locked</tag>
          {{ thread.title }}
        </router-link>
        by <user-link :user="thread.author">{{ thread.author.name }}</user-link>
        {{ thread.createdAt | moment('from') }}
      </div>
      <div class="col-xs-2 reply-count">
        {{ thread.postCount - 1 }}
      </div>
      <div class="col-xs-3 latest-post">
        <router-link :to="latestPostRoute">
          View post →
        </router-link>
        <br>
        by <user-link :user="thread.latestPost.author">{{ thread.latestPost.author.name }}</user-link>
        {{ thread.latestPost.createdAt | moment('from') }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    thread: Object
  }
})
export default class ForumThreadRow extends Vue {
  get route () {
    return `/forum/thread/${this.thread.id}-${this.thread.slug}`;
  }

  get latestPostRoute () {
    const page = Math.ceil(this.thread.postCount / 12)
    return `${this.route}?page=${page}#post-${this.thread.postCount}`
  }
}
</script>

<style lang="scss">
@import "../../scss/variables";

.forum-thread-row {
  padding: 1em 1.5em;
  margin: .3em -1.5rem;
  background: rgba(0, 0, 0, .2);

  &.locked {
    opacity: .8;
  }

  a.thread-title {
    display: block;
    font-size: 1.2em;

    .tag {
      margin-top: -.2em;
      margin-right: .5em;
      font-size: .7em;
      opacity: .8;

      &.pinned {
        color: #1ee0c6;
      }

      &.locked {
        color: #9bcbff;
      }
    }

    &:hover .tag {
      opacity: 1;
    }
  }

  .reply-count {
    color: $color-muted;
    text-align: center;
  }

  .latest-post {
    text-align: right;
  }
}
</style>

