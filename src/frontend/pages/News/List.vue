<template>
  <div class="row end-xs">
    <div class="col-xs-7">
      <panel>
        <article-summary v-for="article in articles" :key="article.id" :article="article" :withExcerpt="true"></article-summary>

        <pagination path="/news" :currentPage="currentPage" :pages="totalPages"></pagination>
      </panel>
    </div>
    <div class="col-xs-3">
      <panel title="Filter by category">
        <ul class="menu">
          <li><router-link to="/news">All</router-link></li>
          <li v-for="category in categories" :key="category.id">
            <router-link :to="{ name: 'news-category', params: { id: category.id, slug: category.slug } }">{{ category.name }}</router-link>
          </li>
        </ul>
      </panel>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import Pagination from '../../components/Pagination.vue'
import ArticleService from '../../services/ArticleService'
import ArticleSummary from '../../components/ArticleSummary.vue'

@Component({
  title: 'News & Announcements',
  components: { ArticleSummary, Pagination }
})
export default class NewsList extends Vue {
  service: ArticleService
  totalPages: Number = 0
  articles = []
  categories = []

  get currentPage () {
    return this.$route.query.page ? parseInt(this.$route.query.page) : 1
  }

  @Watch('$route.query.page')
  onPageChanged () {
    this.getList()
  }

  @Watch('$route')
  onParamsChanged (route) {
    this.getList(route.params.id ? route.params.id : null)
  }

  async created () {
    this.service = new ArticleService
    this.getList()
    this.service.listCategories().then(response => {
      this.categories = response.data
    })
  }

  getList (category?: number) {
    this.service.list(this.currentPage, { category }).then(response => {
      this.articles = response.data.data
      this.totalPages = response.data.totalPages
    })
  }
}
</script>
