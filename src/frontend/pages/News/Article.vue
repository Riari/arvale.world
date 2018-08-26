<template>
  <div class="row center-xs">
    <div class="col-xs-8">
      <div v-if="article" class="panel article">
        <div class="actions" v-if="canUser('administrate')">
          <tag v-if="!article.published">Unpublished</tag>
          <a v-if="!article.published" @click="publish($event, article)" href="#">Publish</a>
          <a v-else @click="unpublish($event, article)" href="#">Unpublish</a>
          <router-link :to="`/admin/news/${article.id}`">Edit</router-link>
          <a @click="remove($event, article)" href="#" class="dangerous">Delete</a>

          <hr>
        </div>

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
import Component, { mixins } from 'vue-class-component'
import { UserStateMixin } from '../../mixins/UserState'
import ArticleService from '../../services/ArticleService'

@Component
export default class NewsArticle extends mixins(UserStateMixin) {
  service: ArticleService
  article: object = null

  created () {
    this.service = new ArticleService
    this.service.get(parseInt(this.$route.params.id)).then(response => {
      const article = response.data
      this.article = article
      this.$title = article.title
    })
  }

  publish (event) {
    event.preventDefault()

    if (confirm(`Are you sure you want to publish "${this.article.title}"?`)) {
      this.article.published = true
      this.service.update({ id: this.article.id, published: true }).then(response => {
        this.$toasted.show("Article updated", { type: 'success' })
      })
    }
  }

  unpublish (event) {
    event.preventDefault()

    if (confirm(`Are you sure you want to unpublish "${this.article.title}"?`)) {
      this.article.published = false
      this.service.update({ id: this.article.id, published: false }).then(response => {
        this.$toasted.show("Article updated", { type: 'success' })
      })
    }
  }

  remove (event) {
    event.preventDefault()

    if (confirm(`Are you sure you want to remove "${this.article.title}"?`)) {
      this.service.destroy(this.article).then(response => {
        this.$router.push('/admin/news')
        this.$toasted.show("Article removed", { type: 'success' })
      })
    }
  }
}
</script>

<style lang="scss">
.panel.article {
  font-size: 1.2em;
  text-align: justify;

  .actions {
    text-align: center;

    span, a {
      display: inline-block;
      margin: 0 .5em;
    }
  }

  .posted {
    color: rgba(255, 255, 255, .5);
    text-align: center;
  }
}
</style>
