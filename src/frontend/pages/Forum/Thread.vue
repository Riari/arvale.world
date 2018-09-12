<template>
  <div class="forum-thread row">
    <div class="col-xs-9">
      <panel :title="`Viewing thread: ${thread.title}`" :loading="loading">
        <div class="tags">
          <tag v-if="thread.category && thread.author" class="started">
            Started in
            <router-link :to="{ name: 'forum-category', params: { id: thread.category.id, slug: thread.category.slug } }">
              {{ thread.category.name }}
            </router-link>
            by
            <user-link :user="thread.author"></user-link>
            {{ thread.createdAt | moment('from') }}
          </tag>
        </div>

        <div class="actions">
        </div>

        <forum-post v-for="post in posts" :key="post.id" :post="post">
        </forum-post>

        <pagination :path="$router.currentRoute.path" :currentPage="currentPage" :pages="totalPages"></pagination>
      </panel>

      <panel v-if="isUserAuthenticated" title="Reply" :loading="loadingReply" id="reply">
        <editor ref="editor" :errors="errors.body"></editor>
        <div class="reply-actions">
          <v-button @click.native="addReply">Add reply</v-button>
        </div>
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
import { mixins } from 'vue-class-component'
import { UserStateMixin } from '../../mixins/UserState'
import ForumThreadService from '../../services/Forum/ThreadService'
import ForumPost from '../../components/Forum/Post.vue'
import Editor from '../../components/Editor.vue'
import Pagination from '../../components/Pagination.vue'

@Component({
  components: { ForumPost, Editor, Pagination }
})
export default class ForumThread extends mixins(UserStateMixin) {
  service: ForumThreadService
  loading = true
  loadingReply = false
  currentPage: Number
  totalPages: Number = 0
  thread = {}
  posts = []

  errors = {
    body: null
  }

  @Watch('$route.query.page')
  onPageChanged () {
    if (this.$route.query.page != this.currentPage) {
      this.currentPage = parseInt(this.$route.query.page)
      this.getList()
    }
  }

  async created () {
    this.currentPage = this.$route.query.page ? parseInt(this.$route.query.page) : 1
    this.service = new ForumThreadService
    const { data } = await this.service.getById(this.$route.params.id)
    this.$title = data.title
    this.thread = data
    this.getList()
  }

  getList () {
    this.service.listPosts(this.thread.id, this.currentPage).then(response => {
      this.loading = false
      this.posts = response.data.data
      this.totalPages = response.data.totalPages
    })
  }

  addReply () {
    this.loadingReply = true
    this.service.createPost(this.thread.id, this.$refs.editor.value()).then(response => {
      this.loadingReply = false

      const post = response.data
      const page = (post.number > 12) ? Math.ceil(post.number / 12) : 1

      this.$router.push(`/forum/thread/${post.thread.id}-${post.thread.slug}?page=${page}#post-${post.number}`)
      this.$toasted.show("Reply added", { type: 'success' })
    })
  }
}
</script>

<style lang="scss">
.forum-thread {
  .tags {
    margin-bottom: 1em;

    .tag {
      color: #fff;
    }
  }

  .actions {
    height: 64px;
    margin: -1em 0 1em 0;
  }

  #reply {
    .reply-actions {
      text-align: right;
    }
  }
}
</style>
