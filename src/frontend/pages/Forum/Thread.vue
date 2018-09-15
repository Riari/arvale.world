<template>
  <div class="forum-thread row">
    <div class="col-xs-9">
      <panel :title="`Viewing thread: ${thread.title}`" :loading="loading">
        <div class="tags">
          <tag v-if="thread.pinnedAt" class="pinned">Pinned</tag>
          <tag v-if="thread.lockedAt" class="locked">Locked</tag>
        </div>

        <div class="row details">
          <div class="col-xs-4">
            <router-link to="/forum">← Return to forum index</router-link>
          </div>
          <div v-if="thread.category" class="col-xs-4 category">
            Posted in
            <router-link :to="{ name: 'forum-category', params: { id: thread.category.id, slug: thread.category.slug } }">
              {{ thread.category.name }}
            </router-link>
          </div>
          <div v-if="thread.author" class="col-xs-4 author">
            Started by
            <user-link :user="thread.author"></user-link>
            {{ thread.createdAt | moment('from') }}
          </div>
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
      <latest-forum-threads></latest-forum-threads>
      <latest-forum-posts></latest-forum-posts>
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
import LatestForumThreads from '../../components/modules/LatestForumThreads.vue'
import LatestForumPosts from '../../components/modules/LatestForumPosts.vue'

@Component({
  components: {
    ForumPost,
    Editor,
    Pagination,
    LatestForumThreads,
    LatestForumPosts
  }
})
export default class ForumThread extends mixins(UserStateMixin) {
  service: ForumThreadService
  loading = true
  loadingReply = false
  currentPage: Number
  totalPages: Number = 0
  thread = {
    id: null
  }
  posts = []

  errors = {
    body: null
  }

  @Watch('$route.query.page')
  onPageChanged () {
    if (this.pageNumber != this.currentPage) {
      this.currentPage = this.pageNumber
      this.getPostList()
    }
  }

  get pageNumber () {
    return this.$route.query.page ? parseInt(this.$route.query.page) : 1
  }

  async created () {
    this.currentPage = this.pageNumber
    this.service = new ForumThreadService
    this.service.getByID(parseInt(this.$route.params.id))
      .then(response => {
        this.$title = response.data.title
        this.thread = response.data

        this.getPostList()
      })
      .catch(error => {
        switch (error.response.status) {
          case 401:
            this.$router.push('/')
        }
      })
  }

  getPostList () {
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
  position: relative;

  .tags {
    position: absolute;
    top: 1.2em;
    right: 1.5em;

    .tag {
      &.pinned {
        color: #1ee0c6;
      }

      &.locked {
        color: #9bcbff;
      }
    }
  }

  .details {
    .category {
      text-align: center;
    }

    .author {
      text-align: right;
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
