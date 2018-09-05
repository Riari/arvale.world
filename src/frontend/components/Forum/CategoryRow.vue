<template>
  <div class="forum-category">
    <template v-if="link">
      <template v-if="showDetails">
        <div class="row">
          <div class="col-xs-5">
            <router-link :to="{ name: 'forum-category', params: { id: category.id, slug: category.slug } }">
              {{ category.name }}
            </router-link>
          </div>
          <div class="col-xs-2 thread-count">
            {{ category.threadCount }}
          </div>
          <div class="col-xs-2 post-count">
            {{ category.postCount }}
          </div>
          <div v-if="category.latestPostThreadId" class="col-xs-3 latest-post">
            in
            <router-link :to="{ name: 'forum-thread', params: { id: category.latestPostThreadId, slug: category.latestPostThreadSlug } }">
              {{ category.latestPostThreadTitle }}
            </router-link>
            by
            <router-link :to="{ name: 'user-profile', params: { name: category.latestPostAuthor } }">
              {{ category.latestPostAuthor }}
            </router-link>
          </div>
          <div v-else class="col-xs-3 latest-post">
            -
          </div>
        </div>
      </template>
      <template v-else>
        <router-link
          :to="{ name: 'forum-category', params: { id: category.id, slug: category.slug } }"
        >
          {{ category.name }}
        </router-link>
      </template>
    </template>
    <div v-else class="row">
      <div class="col-xs-5">
        <div class="title">{{ category.name }}</div>
      </div>
      <div class="col-xs-2 thread-count-header">
        Threads
      </div>
      <div class="col-xs-2 post-count-header">
        Posts
      </div>
      <div class="col-xs-3 latest-post-header">
        Latest post
      </div>
    </div>

    <div v-if="category.children && category.children.length" class="children">
      <forum-category-row
        v-for="child in category.children"
        :key="child.id"
        :category="child"
        :link="true"
        :showDetails="!showDetails"
      ></forum-category-row>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    category: Object,
    link: Boolean,
    showDetails: Boolean
  },
  components: {
    ForumCategoryRow
  }
})
export default class ForumCategoryRow extends Vue {
}
</script>

<style lang="scss">
@import "../../scss/variables";

.forum-category {
  .title {
    margin: 0 0 1em 0;
    font-weight: bold;
    font-size: 1.2em;
  }

  .thread-count-header,
  .post-count-header,
  .latest-post-header {
    font-weight: bold;
    text-align: right;
  }

  .thread-count-header,
  .post-count-header {
    text-align: center;
  }

  .children {
    .forum-category {
      font-size: 1.1em;
      padding: 1em 1.5em;
      margin: .3em -1.5rem;
      background: rgba(0, 0, 0, .2);

      &:last-child {
        margin-bottom: 2em;
      }

      .thread-count,
      .post-count,
      .latest-post {
        text-align: right;
        color: $color-muted;

        svg {
          width: 22px;
          height: 22px;
          vertical-align: middle;
          margin: -.3em .5em 0 0;
          color: $color-muted;
        }
      }

      .thread-count,
      .post-count {
        text-align: center;
      }

      .children {
        padding: 1em 0 0 1em;

        &:before {
          content: "—";
          display: inline-block;
          margin-right: 1em;
        }

        .forum-category {
          display: inline-block;
          margin: 0 1em 0 0;
          padding: 0;
          background: none;
          font-size: .8em;
        }
      }

      h3 {
        margin: 0;
        font-weight: 400;
        font-size: 1em;
      }
    }
  }
}
</style>

