<template>
  <panel title="News & Announcements" icon="file-text" :loading="loading">
    <transition name="fade">
      <div v-if="!loading">
        <article-summary v-for="article in articles" :key="article.id" :article="article"></article-summary>

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
import ArticleSummary from '../ArticleSummary.vue'

@Component({
  components: { ArticleSummary }
})
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
