<template>
  <div class="forum-category-index row">
    <div class="col-xs-12 col-sm-9">
      <panel :title="category.name" :loading="loading">
        <div class="links">
          <router-link to="/forum">← Return to forum index</router-link>
        </div>

        <div v-if="category.children && category.children.length">
          <hr>
          <div class="row">
            <div class="col-xs-8 col-sm-5">
              <div class="title">Subcategories</div>
            </div>
            <div class="col-sm-2 hide-xs-only thread-count-header">
              Threads
            </div>
            <div class="col-sm-2 hide-xs-only post-count-header">
              Posts
            </div>
            <div class="col-xs-4 col-sm-3 latest-post-header">
              Latest post
            </div>
          </div>
          <forum-category-row
            v-for="child in category.children"
            :key="child.id"
            :category="child"
          ></forum-category-row>
        </div>

        <div v-if="threads.length">
          <div class="row">
            <div class="col-xs-7">
              <div class="title">Threads</div>
            </div>
            <div class="col-xs-2 post-count-header">
              Replies
            </div>
            <div class="col-xs-3 latest-post-header">
              Latest post
            </div>
          </div>

          <forum-thread-row v-for="thread in threads" :key="thread.id" :thread="thread"></forum-thread-row>

          <pagination :path="$router.currentRoute.path" :currentPage="currentPage" :pages="totalPages"></pagination>

          <div class="category-actions">
            <v-button
              v-if="isUserAuthenticated && category.acceptsThreads"
              :route="{ name: 'forum-category-create-thread', params: { id: category.id } }"
            >
              Create thread
            </v-button>
          </div>
        </div>

        <div v-if="!loading && !threads.length" class="empty">
          <icon name="info"></icon>

          <p>No threads in this category yet.</p>

          <router-link v-if="category.id && isUserAuthenticated" :to="{ name: 'forum-category-create-thread', params: { id: category.id } }">
            Start a discussion
          </router-link>
        </div>
      </panel>
    </div>
    <div class="col-xs-12 col-sm-3">
      <latest-forum-threads-module></latest-forum-threads-module>
      <latest-forum-posts-module></latest-forum-posts-module>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { UserStateMixin } from '../../mixins/UserState'
import ForumCategoryService from '../../services/Forum/CategoryService'
import ForumCategoryRow from '../../components/Forum/CategoryRow.vue'
import ForumThreadRow from '../../components/Forum/ThreadRow.vue'
import Pagination from '../../components/Pagination.vue'
import LatestForumThreadsModule from '../../components/modules/LatestForumThreads.vue'
import LatestForumPostsModule from '../../components/modules/LatestForumPosts.vue'

@Component({
  components: {
    ForumCategoryRow,
    ForumThreadRow,
    Pagination,
    LatestForumThreadsModule,
    LatestForumPostsModule
  }
})
export default class ForumCategory extends mixins(UserStateMixin) {
  service: ForumCategoryService
  loading = true
  currentPage: Number
  totalPages: Number = 0

  category = {
    id: null,
    name: null,
    children: null
  }

  threads = []

  @Watch('$route.query.page')
  onPageChanged () {
    const page = parseInt(this.$route.query.page)
    if (page != this.currentPage) {
      this.currentPage = page
      this.getThreadList()
    }
  }

  async created () {
    this.currentPage = this.$route.query.page ? parseInt(this.$route.query.page) : 1
    this.service = new ForumCategoryService
    this.service.getByID(parseInt(this.$route.params.id))
      .then(response => {
        this.$title = response.data.name
        this.category = response.data

        this.getThreadList()
      })
      .catch(error => {
        switch (error.response.status) {
          case 401:
            this.$router.push('/')
        }
      })
  }

  getThreadList () {
    this.service.listThreads(this.category.id, this.currentPage).then(response => {
      this.loading = false
      this.threads = response.data.data
      this.totalPages = response.data.totalPages
    })
  }
}
</script>

<style lang="scss">
.forum-category-index {
  .links {
    margin-bottom: 1em;
  }

  .forum-category {
    padding: .5em 1.5em;
    font-size: 1em;
  }

  .category-actions {
    text-align: right;
  }
}
</style>
