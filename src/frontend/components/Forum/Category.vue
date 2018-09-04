<template>
  <div class="forum-category">
    <template v-if="link">
      <template v-if="showDetails">
        <div class="row">
          <div class="col-xs-6">
            <router-link :to="{ name: 'forum-category', params: { id: category.id, slug: category.slug } }">
              {{ category.name }}
            </router-link>
          </div>
          <div class="col-xs-2 thread-count">
            <icon name="file-text"></icon> {{ category.threadCount }} threads
          </div>
          <div class="col-xs-2 post-count">
            <icon name="message-circle"></icon> {{ category.postCount }} posts
          </div>
          <div class="col-xs-2 last-post">
            <router-link :to="{ name: 'forum-thread', params: { id: category.latestThread.id, slug: category.latestThread.slug } }">
              {{ category.latestThread.title }}
            </router-link>
            by
            {{ category.latestThread.author.name }}
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
    <div v-else class="title">{{ category.name }}</div>

    <div v-if="category.children && category.children.length" class="children">
      <forum-category
        v-for="child in category.children"
        :key="child.id"
        :category="child"
        :link="true"
        :showDetails="!showDetails"
      ></forum-category>
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
    ForumCategory
  }
})
export default class ForumCategory extends Vue {
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
      .last-post {
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

