<template>
  <div>
    <div class="page-actions">
      <v-button route="/admin/news/create">
        <icon name="plus"></icon>
        Create article
      </v-button>
    </div>
    <panel>
      <table>
        <thead>
          <tr>
            <th>Title</th><th>Author</th><th>Category</th><th>Created</th><th>Updated</th><th>Published</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="article in articles" :key="article.id">
            <td>{{ article.title }}</td>
            <td>{{ article.author.name }}</td>
            <td>{{ article.category.name }}</td>
            <td>{{ article.createdAt | moment('from') }}</td>
            <td>{{ article.updatedAt | moment('from') }}</td>
            <td>{{ article.published ? 'Yes' : 'No' }}</td>
            <td class="actions">
              <a v-if="!article.published" @click="publish($event, article)" href="#">Publish</a>
              <a v-else @click="unpublish($event, article)" href="#">Unpublish</a>
              <router-link :to="`/admin/news/${article.id}`">Edit</router-link>
              <a @click="remove($event, article)" href="#" class="dangerous">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>

      <pagination path="/admin/news" :currentPage="currentPage" :pages="totalPages"></pagination>
    </panel>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import Pagination from '../../../components/Pagination.vue'
import ArticleService from '../../../services/ArticleService'

@Component({
  components: { Pagination }
})
export default class AdminUsers extends Vue {
  service: ArticleService
  totalPages: Number = 0
  articles = []

  @Watch('$route.query.page')
  onPageChanged () {
    this.getList()
  }

  async created () {
    this.service = new ArticleService
    this.getList()
  }

  get currentPage () {
    return this.$route.query.page ? parseInt(this.$route.query.page) : 1
  }

  getList () {
    this.service.list(this.currentPage, { withUnpublished: true }).then(response => {
      this.articles = response.data.data
      this.totalPages = response.data.totalPages
    })
  }

  publish (event, article) {
    event.preventDefault()

    if (confirm(`Are you sure you want to publish "${article.title}"?`)) {
      this.service.update({ id: article.id, published: true }).then(response => {
        this.$toasted.show("Article updated", { type: 'success' })
      })
    }
  }

  unpublish (event, article) {
    event.preventDefault()

    if (confirm(`Are you sure you want to unpublish "${article.title}"?`)) {
      this.service.update({ id: article.id, published: false }).then(response => {
        this.$toasted.show("Article updated", { type: 'success' })
      })
    }
  }

  remove (event, article) {
    event.preventDefault()

    if (confirm(`Are you sure you want to remove "${article.title}"?`)) {
      this.service.destroy(article).then(response => {
        this.articles.splice(this.articles.indexOf(article), 1)
        this.$toasted.show("Article removed", { type: 'success' })
      })
    }
  }
}
</script>
