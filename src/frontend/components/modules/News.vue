<template>
  <panel title="News & Announcements" icon="file-text" :loading="loading">
    <transition name="fade">
      <div v-if="!loading">
        <div
          v-for="article in articles"
          :key="article.id"
          class="article-summary"
        >
          <router-link :to="`/news/${article.id}`" class="link">
            <h4>{{ article.title }}</h4>

            <div class="meta">
              <span class="category">{{ article.category.name }}</span>
              <span class="createdAt">{{ article.createdAt | moment('from') }}</span>
            </div>
          </router-link>
        </div>

        <hr>

        <div class="text-center">
          <router-link to="/news">See more</router-link>
        </div>
      </div>
    </transition>
  </panel>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import ArticleService from '../../services/ArticleService'

@Component
export default class NewsModule extends Vue {
  loading = true
  articles = []

  created () {
    const service = new ArticleService()
    service.list(1).then(response => {
      this.loading = false
      this.articles = response.data.data.slice(0, 5)
    })
  }
}
</script>


<style lang="scss">
@import "../../scss/variables";

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
