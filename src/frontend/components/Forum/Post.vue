<template>
  <div class="forum-post" :id="`post-${post.number}`">
    <div class="row row-gutterless-xs">
      <div class="col-xs-12 col-sm-2">
        <div class="author-pane">
          <div class="name"><user-link :user="post.author"></user-link></div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-10">
        <div class="body">
          <div class="number">
            <a :href="`${$router.currentRoute.path}#post-${post.number}`">#{{ post.number }}</a>
          </div>
          <div class="date">
            Posted {{ post.createdAt | moment('from') }}
          </div>

          <div v-html="post.body_html"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    post: Object
  }
})
export default class ForumPost extends Vue {
}
</script>

<style lang="scss">
@import "../../scss/variables";

.forum-post {
  margin: .2em 0;

  .author-pane, .body {
    padding: 1em 1.2em;
    border-radius: 3px;
    background: #1c2540d4;
  }

  .body {
    .number {
      float: right;
    }

    .date {
      margin-bottom: .5em;
      color: $color-muted;
    }

    blockquote {
      margin: 0;
      padding: .1em 1em;
      border-radius: 3px;
      border-left: 5px solid $color-primary;
      background: rgba(255, 255, 255, .05);
    }

    img {
      max-width: 100%;
    }
  }
}
</style>
