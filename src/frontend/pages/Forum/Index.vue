<template>
  <div class="forum-index row">
    <div class="col-xs-12 col-sm-9">
      <panel title="Forum index" :loading="loading">
        <div v-for="category in categories" :key="category.id">
          <div class="row">
            <div class="col-xs-8 col-sm-5">
              <div class="category-title">{{ category.name }}</div>
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
          <forum-category-row v-if="category.children" v-for="child in category.children" :key="child.id" :category="child"></forum-category-row>
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
import Vue from 'vue'
import Component from 'vue-class-component'
import ForumCategoryService from '../../services/Forum/CategoryService'
import ForumCategoryRow from '../../components/Forum/CategoryRow.vue'
import LatestForumThreadsModule from '../../components/modules/LatestForumThreads.vue'
import LatestForumPostsModule from '../../components/modules/LatestForumPosts.vue'

@Component({
  title: 'Forum',
  components: {
    ForumCategoryRow,
    LatestForumThreadsModule,
    LatestForumPostsModule
  }
})
export default class ForumIndex extends Vue {
  loading = true
  categories = []

  created () {
    const service = new ForumCategoryService()
    service.list().then(response => {
      this.categories = response.data
      this.loading = false
    })
  }
}
</script>

<style lang="scss">
.forum-index, .forum-category-index {
  .category-title {
    margin: 0 0 1em 0;
    font-weight: bold;
    font-size: 1.2em;
  }

  .thread-count-header,
  .post-count-header,
  .latest-post-header {
    font-weight: bold;
    text-align: right;
  }

  .thread-count-header,
  .post-count-header {
    text-align: center;
  }
}
</style>
