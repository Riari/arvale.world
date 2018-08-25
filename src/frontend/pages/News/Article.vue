<template>
  <div class="row center-xs">
    <div class="col-xs-8">
      <div v-if="article" class="panel article">
        <div class="posted">
          Posted by
          <span :style="{ color: article.author.roles[0].colour }">
            {{ article.author.name }}
          </span>
          in
          <router-link :to="{ name: 'news-category', params: { id: article.category.id, slug: article.category.slug } }">
            {{ article.category.name }}
          </router-link>
          <br>
          {{ article.createdAt | moment('from') }}
        </div>

        <div v-html="article.body_html" class="body"></div>

        <hr>

        <div class="text-center">
          <router-link to="/news">See all News & Announcements</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import ArticleService from '../../services/ArticleService'

@Component
export default class NewsArticle extends Vue {
  article: object = null

  created () {
    const service = new ArticleService
    service.get(parseInt(this.$route.params.id)).then(response => {
      const article = response.data
      this.article = article
      this.$title = article.title
    })
  }
}
</script>

<style lang="scss">
.panel.article {
  font-size: 1.2em;
  text-align: justify;

  .posted {
    color: rgba(255, 255, 255, .5);
    text-align: center;
  }
}
</style>
