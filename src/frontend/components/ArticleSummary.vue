<template>
  <div class="article-summary">
    <router-link :to="{ name: 'news-article', params: { id: article.id, slug: article.slug } }" class="link">
      <tag v-if="!article.published">Unpublished</tag>

      <h4>{{ article.title }}</h4>

      <div v-if="withExcerpt" v-html="article.body" class="body"></div>

      <div class="meta">
        <span class="category">{{ article.category.name }}</span>
        <span class="createdAt">{{ article.createdAt | moment('from') }}</span>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    article: Object,
    withExcerpt: Boolean
  }
})
export default class ArticleSummary extends Vue {
}
</script>


<style lang="scss">
@import "../scss/variables";

.article-summary {
  position: relative;

  .link {
    display: block;
    padding: 1em 1.5em;
    margin: .5em -1.5em;
    background: rgba(0, 0, 0, .2);

    &:hover {
      background: rgba(0, 0, 0, .3);
    }

    h4 {
      margin: 0;
      font-size: 1.2em;
      font-weight: 400;
    }

    .body {
      color: #fff;
    }

    .meta {
      color: rgba(255, 255, 255, 0.5);

      .category {
        float: right;
        color: rgba(255, 255, 255, 0.2);
      }
    }
  }
}
</style>
