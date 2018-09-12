<template>
  <div class="row">
    <div class="col-xs-9">
      <panel>
      </panel>
    </div>
    <div class="col-xs-3">
      <panel>
      </panel>
      <panel>
      </panel>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'

@Component
export default class ForumThread extends Vue {
  service: ArticleService
  loading: Boolean
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
    this.loading = true
    this.service.list(this.currentPage, { withUnpublished: true }).then(response => {
      this.loading = false
      this.articles = response.data.data
      this.totalPages = response.data.totalPages
    })
  }
}
</script>
